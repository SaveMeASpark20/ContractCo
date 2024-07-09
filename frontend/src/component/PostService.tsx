import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { InputField } from "./InputField";
import { ChangeEvent, useState } from "react";
import Navbar from "./Navbar";
import UploadFile from "./Upload";
import { useNavigate } from "react-router-dom";

const serviceValueSchema = z.object({
	title : z.string().min(5).max(100),
	price : z.string(),
	image: z
    .instanceof(FileList)
    .refine((fileList) => fileList.length > 0, 'No file selected')
    .refine((fileList) => fileList[0].type.startsWith('image/'), 'Must be an image file')
    .refine((fileList) => fileList[0].size <= 5 * 1024 * 1024, 'Max size is 5MB'),
})

type ServiceValues = z.infer<typeof serviceValueSchema>;

const PostService = () => {
	const  [isAddingService, setIsAddingService] = useState(false)
	const navigate = useNavigate();

	const {register, handleSubmit,   formState: {errors, isSubmitting, } } 
		= useForm<ServiceValues>({
			resolver : zodResolver(serviceValueSchema)
		})

	const onSubmit = async (data : ServiceValues) => {
		console.log(data.image); 
		const validationResult = serviceValueSchema.safeParse(data);
		if (validationResult.success) {
			console.log(validationResult.data);
			console.log(validationResult.data.image[0]);
			const file = validationResult.data.image[0];
			const imageId = await UploadFile(file , 'images');
			
			if(imageId){
				const response = await fetch("http://localhost:3000/api/postservice", {
					method : "POST",
					headers : {
					"Content-Type": "application/json"
					},
					body : JSON.stringify({name : data.title, price: data.price, image : imageId}),
					credentials: 'include'
				})
				if(response.ok){
					return navigate('/services');
				}

			}
		// Handle validation errors
		} else {
		console.log('Validation successful');
		console.error(validationResult.error.errors);
		}
			
	}

	const handleNumericInput = (e : ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value;
		// Filter out non-numeric characters using regex
		const numericInput = input.replace(/[^0-9]/g, ''); // Only allows digits 0-9
	
		// Update the input value with only numeric characters
		e.target.value = numericInput;
	};


  return (
    <>


			<button onClick={() => {setIsAddingService(!isAddingService)}}>
				{isAddingService ? "Close Add Service" : "Add Service"}
				</button>
			<form onSubmit={handleSubmit(onSubmit)}>

				<InputField 
					label="Title" 
					{...register('title')}
					error={errors.title?.message}
				/>

				<InputField 
					label="Price" 
					{...register("price", { 
						onChange: handleNumericInput 
					})}
					error={errors.price?.message}
				/>
				
				<label htmlFor="image">Upload Image:</label>
				<InputField 
					label="Image" 
					type="file"
					accept="image/*"
					{...register('image')}
					error={errors.image?.message}
				/>
				
				<button type="submit" disabled={isSubmitting}>Add Service</button>
		</form>
    </>
  )
}

export default PostService