import {Schema, model, Types} from "mongoose";

export type ServiceType = {
    name : string,
    price : string,
    image : string,
    user : Types.ObjectId,
    reviews: [],
    
}

export type ServiceDocument = Document & ServiceType;

const serviceSchema = new Schema<ServiceDocument>({
    name: {type: String, require},
    price : {type: String, require},
    image : {type: String, require},
    user : { type :Schema.ObjectId, ref : 'user', require },
    reviews: {
          type: [
        {
            user : {type: Schema.ObjectId, ref : 'user'},
            comment : {type: String},
        }
        ],
        default: []
    },
    
}, {timestamps : true})

const Service = model<ServiceDocument>('Service', serviceSchema);

export default Service;