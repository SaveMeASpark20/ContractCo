import Navbar from '../component/Navbar'
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {  useAuth } from '../auth/AuthProvider';
import { InputField } from '../component/InputField';
import {  z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorText } from '../utils';

const logInValuesSchema = z.object({
  email : z.string().email('This field is an email'),
  password : z.string().min(6).max(255)
})

type LogInValues = z.infer<typeof logInValuesSchema>;

const LogIn = () => {
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const {login} = useAuth();

  const { register, handleSubmit, formState: {errors, isSubmitting}, } = useForm<LogInValues>({
    resolver : zodResolver(logInValuesSchema),
  })

  const onSubmit = async (data : LogInValues ) => {
    try {
      const success = await login(data);
      if(success) {
        navigate('/');
      }
      return setError('Wrong Email or Password');

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
        <h2 className="text-lg ml-10">Log In</h2>
        {error && 
          <div className='p-2 m-2 bg-[#e57373c9] max-w-[300px]'>
            <ErrorText>{error}</ErrorText>
          </div>
        }
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField 
                label="Email"
                type='email'
                {...register("email")}
                error={errors.email?.message}
              />
              <InputField 
                label="Password"
                type='password'
                {...register("password")}
                error={errors.password?.message}
              />
                <button type="submit" disabled={isSubmitting} className="bg-[#e3e3e3] text-[#25258a] px-4 py-1 rounded-full border border-[#25258a] hover:bg-[#25258a] hover:text-[#e3e3e3] ml-8">{isSubmitting ? "LogIn..." : "Login"}</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default LogIn    