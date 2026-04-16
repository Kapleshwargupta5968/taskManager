import React from 'react'
import FormWrapper from '../../components/reusableComponents/FormWrapper'
import Input from '../../components/reusableComponents/Input'
import Button from '../../components/reusableComponents/Button'
import { useDispatch, useSelector } from 'react-redux'
import { authFailure, authStart, authSuccess } from '../../features/auth/authSlice'
import { loginUser } from '../../services/api/authService'

const Signin = () => {
  const dispatch = useDispatch();
  const {loading} = useSelector((state) => state.auth);

  const handleSubmit = async (data) => {
    try{
      dispatch(authStart());
      console.log(data);
      const response = await loginUser(data);
      dispatch(authSuccess(response?.user));
    }catch(error){
      dispatch(authFailure(error?.response?.data?.message));
    }
  };
  
  return (
    <>
     <FormWrapper onSubmit={handleSubmit}>
      <h2 className='text-xl font-bold mb-4'>Sign in</h2>
      <Input
      label="Email"
      name="email"
      type="email"
      placeholder="Enter your email"
      rules={{
        required:"Email is required",
        pattern:{
                      value: /^\S+@\S+$/i,
                      message:"Invalid email"
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

      <Button type='submit' loading={loading}>
        {loading ? "Signing in..." : "Sign-in"}
      </Button>

      </FormWrapper> 
    </>
  )
}

export default Signin
