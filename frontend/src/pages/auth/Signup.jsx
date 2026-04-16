import React from 'react'
import FormWrapper from '../../components/reusableComponents/FormWrapper'
import Input from '../../components/reusableComponents/Input'
import Button from '../../components/reusableComponents/Button'
import {useDispatch, useSelector} from "react-redux"
import { registerUser } from '../../services/api/authService'
import { authFailure, authStart, authSuccess } from '../../features/auth/authSlice'

const Signup = () => {

  const dispatch = useDispatch();
  const {loading} = useSelector((state) => state.auth);

  const handleSubmit = async (data) => {
    try{
      dispatch(authStart());
      console.log(data);
      const response = await registerUser(data);
      dispatch(authSuccess(response?.user));
    }catch(error){
      dispatch(authFailure(error?.response?.data?.message));
    }
  };

  return (
    <>
      <FormWrapper onSubmit={handleSubmit}>
        <h2 className='text-xl font-bold mb-4'>Signup</h2>
        <Input
        name="name"
        type="text"
        label="Name"
        placeholder="Enter your name..."
        rules={{required: "Name is required"}}
        />

        <Input
        name="email"
        type="email"
        placeholder="Enter your email..."
        label="Email"
        rules={{
          required: "Email is required",
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

      <Button type="submit" loading={loading}>
        {loading ? "Signing up..." : "SignUp"}
      </Button>

      </FormWrapper>
    </>
  )
}

export default Signup
