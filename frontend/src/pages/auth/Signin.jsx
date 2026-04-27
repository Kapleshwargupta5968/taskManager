import React, { useRef, useState } from 'react'
import FormWrapper from '../../components/reusableComponents/FormWrapper'
import Input from '../../components/reusableComponents/Input'
import Button from '../../components/reusableComponents/Button'
import { useDispatch, useSelector } from 'react-redux'
import { authFailure, authStart, authSuccess } from '../../features/auth/authSlice'
import { loginUser, verifyOtp } from '../../services/api/authService'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";

const Signin = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);         // 1 = credentials, 2 = OTP
  const [email, setEmail] = useState("");       // store email for OTP step
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  // Step 1: Submit email + password
  const handleSubmit = async (data) => {
    try {
      dispatch(authStart());
      const response = await loginUser(data);
      toast.success(response?.message || "OTP sent to your email!");
      setEmail(data.email);
      setStep(2);
    } catch (error) {
      dispatch(authFailure(error?.response?.data?.message));
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  // Step 2: Handle OTP box input
  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;         // digits only
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);          // take last digit only
    setOtp(newOtp);

    // Auto-focus next box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 filled
    if (newOtp.every((d) => d !== "") && newOtp.join("").length === 6) {
      handleVerifyOtp(newOtp.join(""));
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (otpValue) => {
    try {
      dispatch(authStart());
      const response = await verifyOtp({ email, otp: otpValue });
      toast.success(response?.message || "Login successful!");
      dispatch(authSuccess(response?.user));
      navigate("/dashboard");
    } catch (error) {
      dispatch(authFailure(error?.response?.data?.message));
      toast.error(error?.response?.data?.message || "Invalid OTP");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  return (
    <>
      {step === 1 ? (
        <FormWrapper onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">Sign In</h2>

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email"
              }
            }}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Min 6 characters"
              }
            }}
          />

          <Button type="submit" loading={loading}>
            {loading ? "Sending OTP..." : "Send OTP"}
          </Button>
        </FormWrapper>
      ) : (
        <div className="max-w-md mx-auto p-6 shadow-md rounded-lg bg-white">
          <h2 className="text-xl font-bold mb-2">Verify OTP</h2>
          <p className="text-sm text-gray-500 mb-6">
            Enter the 6-digit OTP sent to <strong>{email}</strong>
          </p>

          {/* 6-Box OTP Input */}
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                onKeyDown={(e) => handleOtpKeyDown(e, index)}
                className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                autoFocus={index === 0}
              />
            ))}
          </div>

          <Button
            loading={loading}
            onClick={() => handleVerifyOtp(otp.join(""))}
            disabled={otp.some((d) => d === "")}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>

          <p
            className="text-sm text-center text-blue-500 mt-4 cursor-pointer hover:underline"
            onClick={() => { setStep(1); setOtp(["", "", "", "", "", ""]); }}
          >
            ← Back to Sign In
          </p>
        </div>
      )}
    </>
  );
};

export default Signin;
