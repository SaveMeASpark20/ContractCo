import { Request, Response } from "express";
import Service, { ServiceDocument } from "../models/service.model";
import connectToDb from "../config/connectToDb";

export const getServices = async (req : Request, res : Response) => {
	try {
		await connectToDb();
		const services = await Service.find({});

		return res.status(201).json(services);

	} catch (error : any) {
		console.log(error.message)
		return res.status(500).json('Something Wrong please Try again Later');
	}
	
}

export const getService = async (req : Request, res : Response) => {
	try {
		req.params.id;
		await connectToDb();

		const service = await Service.findById({});
		return res.status(201).json(service);
	} catch (error : any) {
		console.log(error.message)
	}
	
}

export const getServiceById = async (req: Request, res : Response) => {
	
	try {
		const user_id = req.user?.id;
		console.log(user_id);
		if(!user_id){
			return res.status(401).json({ "Error" : "You are not Authorize please log in" })
		}
		await connectToDb();
		const services : ServiceDocument[] = await Service.find({user : user_id}).select('name image price')
		return res.status(201).json(services);
	} catch (error : any) {
		console.log(error.message);
		res.status(500).json('Something Went Wrong');
	}
}

// export type Service  = {
// 	name : string,
// 	image : string,
// 	price : string
//   }

export const postService = async (req : Request, res : Response) =>{
	try {
		const user = req.user?.id
		const data = req.body;
		await connectToDb();
		if(!req.user || !req.user.id) {
			res.status(401).json({error: "You are not Authorize please Log In "})
		}
		const service = await Service.create({name: data.name, price : data.price, image : data.image, user : req.user?.id})
		res.status(201).json({success : "Adding Service"});
	} catch (error : any) {
		console.log(error.message);
	}
}