const Todo = require("../models/todo");

const createTodo = async (req, res) => {
    try{
        const {title, description, duration} = req.body;
        if(!title || !description || !duration){
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            });
        }

        const existingTodo = await Todo.findOne({title});
        if(existingTodo){
            return res.status(409).json({
                success:false,
                message:"Todo already exist"
            });
        }

        const todo = await Todo.create({
            title,
            description,
            duration
        });

        return res.status(201).json({
            success:true,
            message:"Todo create successfully"
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

const getAllTodo = async (req, res) => {
    try{
        const allTodo = await Todo.find();
        return res.status(200).json({
            success:true,
            message:"Todo fetch successfully"
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

const getTodoById = async (req, res) => {
    try{
        const todoId = req.params.id;

        const todo = await Todo.findById({todoId})
        if(!todo){
            return res.status(404).json({
                success:false,
                message:"Todo not found"
            });
        }

        return res.status(200).json({
            success:true,
            todo,
            message:"Todo found"
        });
          
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

const updateTodo = async (req, res) => {
    try{
        const todoId = req.params.id;
        const updateTodo = await Todo.findByIdAndUpdate(todoId, req.body, {
            new:true,
            runValidators: true
        });
        
        if(!updateTodo){
            return res.status(404).json({
                success:false,
                message:"Todo not found"
            });
        }

        return res.status(200).json({
            success:true,
            message:"Todo update successfully",
            data: updateTodo
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

const deleteTodo = async (req, res) => {
    try{
        const todoId = req.params.id;
        const deleteTodo = await Todo.findByIdAndDelete({todoId});
        if(!deleteTodo){
            return res.status(404).json({
                success:false,
                message:"Todo not found"
            });
        }
        return res.status(200).json({
            success:true,
            message:"Todo delete successfully"
        });
    }catch(error){
           return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

module.exports = {createTodo, getAllTodo, getTodoById, updateTodo, deleteTodo};