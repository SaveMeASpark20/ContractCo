import { useForm } from "react-hook-form"
import {  z } from 'zod'
import Navbar from "../component/Navbar"
import { InputField } from "../component/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";


const signUpValuesSchema = z.object({
  firstname : z.string().min(2).max(255),
  lastname : z.string().min(2).max(255),
  email : z.string().min(2).max(255),
  password : z.string().min(6).max(50),
  confirmPassword : z.string(),
  companyName : z.string().min(1).max(255),

}).refine((data) => (
  
  data.password === data.confirmPassword, 
  {
  message : "Password Do Not Match",
  path: ["confirmPassword"]
  }

))

type SignUpValues = z.infer<typeof signUpValuesSchema>;

const SignUp = () => {
  const {user} = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: {errors, isSubmitting}, } = useForm<SignUpValues>({
    resolver : zodResolver(signUpValuesSchema),
  })

  useEffect(() => {
    if(user) return navigate('/home');
  }, [])

  const onSubmit = async (data : SignUpValues ) => {
    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method : "POST",
        headers : {
          "Content-Type": "application/json"
        },
        body : JSON.stringify(data),
        credentials: 'include'
      });
      if(response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      }    
      
    } catch (error : any) {
      console.log(error.message);
    }
  }
  return (
    <>
    <Navbar/>
    {/* the form should be have button to filter out if its for client or contractual company */}
    <div className="max-w-[50%] p-4 flex flex-col items-center "> 
        <div>
        <h2 className="text-lg ml-10">Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField 
                  label="First Name"
                  {...register("firstname")}
                  error={errors.firstname?.message}
                  />
                <InputField 
                  label="Last Name"
                  {...register("lastname")}
                  error={errors.lastname?.message}
                  />
                <InputField 
                  label="Email"
                  {...register("email")}
                  error={errors.email?.message}
                  />
                <InputField 
                  label="Password"
                  type="password"
                  {...register("password")}
                  error={errors.password?.message}
                  />
                <InputField 
                  label="Confirm Password"
                  type="password"
                  error={errors.confirmPassword?.message}
                  {...register("confirmPassword")}
                  />
                <InputField 
                  label="Company Name"
                  {...register("companyName")}
                  error={errors.companyName?.message}
                  />
                <button type="submit" disabled={isSubmitting} className="bg-[#e3e3e3] text-[#25258a] px-4 py-1 rounded-full border border-[#25258a] hover:bg-[#25258a] hover:text-[#e3e3e3] ml-8">{isSubmitting? "Sign Up...." : "Sign Up"}</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default SignUp