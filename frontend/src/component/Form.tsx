
import { z } from 'zod'
import Navbar from './Navbar'
import { Controller, FieldValues, UseControllerProps, useController, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorText } from '../utils'
import Select from 'react-select'
import { OPTION_COUNTRY } from '../utils/country.utils'
import { InputField } from './InputField'

const signUpValuesSchema = z.object({
  firstname : z.string().min(2).max(255),
  lastname : z.string().min(2).max(255),
  email : z.string().min(2).max(255),
  password : z.string().min(6).max(50),
  confirmPassword : z.string(),
  companyName : z.string().min(1).max(255),
  country : z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message : "Password Do Not Match",
  path: ["confirmPassword"]
})

type SignUpValues = z.infer<typeof signUpValuesSchema>;



const Form = () => {

  const {control, register, handleSubmit, formState: {errors, isSubmitting}, } = useForm<SignUpValues>({
    resolver : zodResolver(signUpValuesSchema),
  })

  
  const onSubmit = async(data : SignUpValues) => {
    await new Promise((resolve) => {
      setTimeout(() =>{
        resolve(console.log(data))
      }, 5000);
      
    })
  
  }
  return (
    <>
    {/* the form should be have button to filter out if its for client or contractual company */}
    <div className="max-w-[50%] p-4 flex flex-col items-center "> 
        <div>
        <h2 className="text-lg ml-10">Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField 
                  label='FirstName'
                  {...register("firstname")}
                  error={errors.email?.message}
                />
                <InputField 
                  label='LastName'
                  {...register("lastname")}
                  error={errors.email?.message}
                />
                <InputField 
                  type='email' 
                  label='Email'
                  {...register("email")}
                  error={errors.email?.message}
                />
                <InputField 
                  type='password' 
                  label='Password'
                  {...register("password")}
                  error={errors.email?.message}
                />
                <InputField 
                  type='password' 
                  label='Confirm Password'
                  {...register("confirmPassword")}
                  error={errors.email?.message}
                />
                <InputField 
                  label='Company Name'
                  {...register("companyName")}
                  error={errors.email?.message}
                />
                {/* <Controller
                  control={control}
                  name="country"
                  render={({field: {onChange}})=> (
                  <Select
                    onChange={(newValue) => onChange(newValue?.value)}
                    options={Object.entries(OPTION_COUNTRY).map(([value, label])=> ({
                      value, label
                    }))}
                  />
                  )}
                /> */}

                <SelectField
                  control={control}
                  name="country"
                  options={Object.entries(OPTION_COUNTRY).map(
                    ([value, label]) => ({
                      value,
                      label
                    })
                  )}
                />

                <ErrorText>{errors.country?.message}</ErrorText>
                <button type="submit" disabled={isSubmitting} className="bg-[#e3e3e3] text-[#25258a] px-4 py-1 rounded-full border border-[#25258a] hover:bg-[#25258a] hover:text-[#e3e3e3] ml-8">Enter</button> {/*improve this that it show  a lot that is disable because even it's disable the hovering continue */}
            </form>
        </div>
    </div>
    </>
  )
}





const SelectField =<T extends FieldValues> (
  props : UseControllerProps<T>& {
  options : {label : string; value: string}[];
}) => {
  const {options, ...controllerProps} = props;
  const {
    field: { onChange }
  } = useController(controllerProps);
  return (
    <Select
      onChange={(newValue) => onChange(newValue?.value)}
      options={options}
    />
  )
}
  
export default Form


// https://www.youtube.com/watch?v=HSNllclEcik continue this