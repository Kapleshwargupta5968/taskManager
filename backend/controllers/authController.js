const User = require("../models/user");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");

const signUp = async (req, res) => {
    try{
        const {name, email, password, role} = req.body;

        if(!name || !email || !password){
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({
                success:false,
                message:"User already exist"
            });
        }

        const user = await User.create({
            name,
            email,
            password,
            role
        });

        const payload = {
            id: user._id,
            email: user.email,
            role: user.role
        };

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        res.cookie("accessToken", accessToken, {
            httpOnly:true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",

            secure:true,
            maxAge:15*60*1000
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly:true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            secure:true,
            maxAge:7*24*60*60*1000
        });

        return res.status(201).json({
            suucess:true,
            user,
            message:"User registered successfully",
            accessToken
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

const signIn = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            });
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }

        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            return res.status(403).json({
                success:false,
                message:"Invalid credentials"
            });
        }

         const payload = {
            id: user._id,
            email: user.email,
            role: user.role
        };

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        res.cookie("accessToken", accessToken, {
            httpOnly:true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",

            secure:true,
            maxAge:15*60*1000
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly:true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            secure:true,
            maxAge:7*24*60*60*1000
        });

        return res.status(200).json({
            success:true,
            message:"User login successfully",
            accessToken
        });
        
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

const logout = async (req, res) => {
    try{
        const user = req.user;
        if(user && user._id){
            await User.findByIdAndUpdate(user._id, { refreshToken : null});
        }

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        return res.status(200).json({
            success:true,
            message:"Logout successfully"
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

const authMe = async (req, res) => {
    try{
        if(!req.user && !req.user._id){
            return res.status(403).json({
                success:false,
                message:"Unauthorized"
            });
        }
        const user = await User.findById(req.user._id);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }

        return res.status(200).json({
            success:true,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role:user.role
            },
            message:"User found"
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

const refreshAccessToken = async (req, res) => {
    try{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshTOken){
            return res.status(403).json({
                success:false,
                message: "refresh token missing"
            });
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);

        const user = await User.findById(decoded.id);
        if(!user || user.refreshTOken !== refreshToken){
            return res.status(403).json({
                success:false,
                message:"Invalid refresh token"
            });
        }
        const payload = {
            id: user.id,
            name:user.name,
            email:user.email,
            role:user.role
        };

        const newAccessToken = generateAccessToken(payload);

        res.cookie("accessToken", newAccessToken, {
            httpOnly:true,
            sameSite:prcess.env.NODE_ENV === "production" ? "none" : "lax",
            secure:true,
            maxAge:15*60*1000
        });

        return res.status(200).json({
            success:true,
            message:"Token refreshed",
            accessToken: newAccessToken
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

module.exports = {signUp, signIn, logout, authMe, refreshAccessToken};