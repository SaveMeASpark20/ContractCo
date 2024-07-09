import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import connectToDb from "../config/connectToDb";

interface CustomJwt {
    sub: string,
    exp: number,
    iat : number,
}

export const requiredAuth = async (req: Request, res : Response, next : NextFunction) => {
    try {
        const token = req.cookies.Authorization;
        console.log("token", token);
        if(!token) {
          return res.status(401).json('Bakit pumapasok dito?');
        }
        const {sub, exp} = jwt.verify(token, process.env.SECRET_TOKEN as string) as CustomJwt;
        console.log("Pumapasok dito", sub);
        console.log("sub:" + sub);
        if(Date.now() > exp) return res.status(401).json('expired session');
        await connectToDb();
        const user = await User.findById(sub);
        if(!user){
            return res.status(401).json('not good');
        }
        console.log("user info: ", user);
        if(user) {
            req.user = {
                id: user.id,
                firstName : user.firstname,
                lastName : user.lastname, 
                userType : user.userType,
                };
        }
        next();

    } catch (error: any) {
        console.log( "ito error"+ error.message);
        return res.status(500).json({error : "Something Went Wrong"})
    }
}