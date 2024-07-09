import { Request, Response } from "express";
import { SignUpData} from "../types";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user.model";
import connectToDb from "../config/connectToDb";



export async function userSignUp(req : Request , res : Response) {
    try {
        const { firstname, lastname, email, company, password, confirmPassword} : SignUpData = req.body;
        //need to check if the confirm pass is the same to the password
        const hashPassword = await bcrypt.hash(password, 10);
       
        if(password !== confirmPassword) {
            console.log("magkaiba sila ahahhaa");
            return res.status(400).json({error :"Password is not the same to confirm password"});
        }
        
        const userType = company ? 'contractor' : 'client'; // pansamantala muna hanggat di pa finalize yung frontend sign up 
        
        await User.create({
            firstname,
            lastname,
            email,
            company,
            password : hashPassword,
            userType,
        })
        return res.status(200).json("Success Creation");

    } catch (error : any) {
        res.sendStatus(400);
        console.log(error.message);
    }
}

export async function userLogin(req : Request, res : Response)  {
    try{
        await connectToDb()
        //Get the email and password off rq body
        const {email, password} = req.body;
    
        //Find the user with requested email
        const user = await User.findOne({ email });
        if(!user) return res.sendStatus(401);
    
        //Compare sent in password with found user password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) return res.sendStatus(401);
        
        //Create a jwt token
        const expiration = Date.now() + 1000 * 60 * 60 *24 * 30; 
    
        const token = jwt.sign({ sub: user._id, exp: expiration }, process.env.SECRET_TOKEN as string);
        console.log("check token: ", token);
        //Set the Cookie
        res.cookie("Authorization", token, { 
            expires: new Date(expiration),
            // httpOnly: true,                                              
            // sameSite: "none",
            // secure: process.env.NODE_ENV === "production",
            
        })
    
        res.status(200).json({firstname : user.firstname, lastname : user.lastname, user_type :user.userType});
        }catch(err) {
            console.log(err);
            res.status(400).json({error : "There's an Error "});
        }
}

export async function userLogout(req : Request, res : Response) {
    try {
        res.clearCookie('Authorization');
        res.status(201).json({Success: "Logout Successful"})
    } catch (error : any) {
        res.clearCookie('Authorization')
        res.status(500).json({Error: "Error try to reload page"});
    }
}

export async function userAuthorization(req : Request, res : Response){
    try {
        const user= req.user;
        if(!user){
            res.status(401).json({error : "Please Log In"})
        }
        res.status(201).json({firstname : user?.firstName, lastname : user?.lastName, userType : user?.userType})
        

    } catch (error) {
        res.status(500).json({error : "Something went wrong"});
    }
}