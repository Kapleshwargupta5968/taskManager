import React from 'react'
import FormWrapper from '../../components/reusableComponents/FormWrapper'
import Input from '../../components/reusableComponents/Input'
import Button from '../../components/reusableComponents/Button'
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from '../../services/api/authService'
import { authFailure, authStart, authSuccess } from '../../features/auth/authSlice'
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

const Signup = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = async (data) => {
    try {
      dispatch(authStart());
      const response = await registerUser(data);
      toast.success(response?.message);
      dispatch(authSuccess(response?.user));
    } catch (error) {
      dispatch(authFailure(error?.response?.data?.message));
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#0f172a] text-slate-200 overflow-hidden pt-20 lg:pt-0">
      {/* Left Side: Visual/Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img 
          src="/assets/auth_background.png" 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0f172a] via-transparent to-transparent opacity-80" />
        
        <div className="relative z-10 p-16 flex flex-col justify-end h-full">
          <div className="animate-fade-in mb-12" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-5xl font-extrabold text-white leading-tight mb-6">
              Join the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Revolution.
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-md">
              Start managing your projects with the most intuitive task manager on the market.
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-500 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <span>Already a member?</span>
            <Link to="/signin" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#0f172a] relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -z-10" />

        <div className="w-full max-w-md animate-fade-in relative top-[4rem]">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-slate-400">Get started with your free account today.</p>
          </div>

          <FormWrapper onSubmit={handleSubmit}>
            <Input
              name="name"
              type="text"
              label="Full Name"
              placeholder="John Doe"
              rules={{ required: "Name is required" }}
            />

            <Input
              name="email"
              type="email"
              placeholder="john@example.com"
              label="Email Address"
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

            <div className="flex flex-col gap-1.5 mb-8">
              <label className="text-sm font-medium text-slate-400 ml-1">Account Role</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input type="radio" name="role" id="role-user" value="user" className="peer sr-only" defaultChecked />
                  <label htmlFor="role-user" className="flex flex-col items-center justify-center p-4 bg-slate-900/50 border-2 border-slate-800 rounded-xl cursor-pointer hover:bg-slate-800 peer-checked:border-indigo-500 peer-checked:bg-indigo-500/10 transition-all">
                    <span className="text-slate-200 font-medium">User</span>
                  </label>
                </div>
                <div className="relative">
                  <input type="radio" name="role" id="role-admin" value="admin" className="peer sr-only" />
                  <label htmlFor="role-admin" className="flex flex-col items-center justify-center p-4 bg-slate-900/50 border-2 border-slate-800 rounded-xl cursor-pointer hover:bg-slate-800 peer-checked:border-indigo-500 peer-checked:bg-indigo-500/10 transition-all">
                    <span className="text-slate-200 font-medium">Admin</span>
                  </label>
                </div>
              </div>
            </div>

            <Button type="submit" loading={loading}>
              Create Account
            </Button>
          </FormWrapper>

          <p className="mt-8 text-center text-slate-500 text-sm">
            By signing up, you agree to our{' '}
            <a href="#" className="text-slate-300 hover:underline">Terms of Service</a> and{' '}
            <a href="#" className="text-slate-300 hover:underline">Privacy Policy</a>.
          </p>
          
          <div className="lg:hidden mt-8 text-center">
            <p className="text-slate-400">
              Already have an account?{' '}
              <Link to="/signin" className="text-indigo-400 font-semibold">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
