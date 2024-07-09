import {Schema, model, Types} from "mongoose";

interface Iuser {
    firstname: string,
    lastname : string,
    email : string,
    password: string,
    company? : string,
    userType : string,

}

//i delete the image so i can put it in separate document to put all images like product images, profile, etc

const userSchema = new Schema<Iuser>({
    firstname : {type: String, required: true },
    lastname : {type: String, required: true },
    email : {
        type: String,
        unique: true, 
        lowercase: true, 
        required: true
    },
    password: {type: String, required: true},
    company : {type: String},
    userType : {type: String, required: true}, 
}, {timestamps : true})

const User = model('User', userSchema);

export default User;