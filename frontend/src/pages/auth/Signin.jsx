import React, { useRef, useState } from 'react'
import FormWrapper from '../../components/reusableComponents/FormWrapper'
import Input from '../../components/reusableComponents/Input'
import Button from '../../components/reusableComponents/Button'
import { useDispatch, useSelector } from 'react-redux'
import { authFailure, authStart, authSuccess } from '../../features/auth/authSlice'
import { loginUser, verifyOtp } from '../../services/api/authService'
import { useNavigate, Link } from 'react-router-dom'
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

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

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
    <div className="min-h-screen w-full flex bg-[#0f172a] text-slate-200 overflow-hidden pt-20 lg:pt-0">
      {/* Left Side: Visual/Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img 
          src="/assets/auth_background.png" 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105 hover:scale-100 transition-transform duration-10000 ease-linear"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80" />
        
        <div className="relative z-10 p-16 flex flex-col justify-end h-full">
          <div className="animate-fade-in mb-12" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-5xl font-extrabold text-white leading-tight mb-6">
              Manage Tasks <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                With Precision.
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-md">
              The ultimate platform for teams to collaborate, track, and ship products faster.
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-500 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <span>© 2024 TaskMaster Inc.</span>
            <span className="w-1 h-1 bg-slate-700 rounded-full" />
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#0f172a] relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] -z-10" />

        <div className="w-full max-w-md animate-fade-in">
          {step === 1 ? (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-slate-400">Sign in to continue to your dashboard</p>
              </div>

              <FormWrapper onSubmit={handleSubmit}>
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
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
                  placeholder="••••••••"
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Min 6 characters"
                    }
                  }}
                />

                <div className="flex items-center justify-end mb-6">
                  <a href="#" className="text-sm font-medium text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                  </a>
                </div>

                <Button type="submit" loading={loading}>
                  Sign In
                </Button>
              </FormWrapper>

              <p className="text-center text-slate-400">
                Don't have an account?{' '}
                <Link to="/signup" className="text-indigo-400 font-semibold hover:text-indigo-300">
                  Create an account
                </Link>
              </p>
            </div>
          ) : (
            <div className="glass-dark p-8 rounded-3xl border border-slate-700/50 space-y-8 animate-fade-in">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Security Check</h2>
                <p className="text-slate-400">
                  We've sent a 6-digit code to <br />
                  <span className="text-indigo-400 font-medium">{email}</span>
                </p>
              </div>

              <div className="flex justify-between gap-2">
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
                    className="w-12 h-14 text-center text-2xl font-bold bg-slate-800 border-2 border-slate-700 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-white"
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              <div className="space-y-4">
                <Button
                  loading={loading}
                  onClick={() => handleVerifyOtp(otp.join(""))}
                  disabled={otp.some((d) => d === "")}
                >
                  Verify Code
                </Button>
                
                <button
                  type="button"
                  className="w-full text-sm font-medium text-slate-400 hover:text-white transition-colors py-2"
                  onClick={() => { setStep(1); setOtp(["", "", "", "", "", ""]); }}
                >
                  ← Use a different email
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;
