import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: 
    {
        type: String,
        default : "-"
    },
    email:
    {
     type:String,
     unique:true,

    },
    password:
    {
     type : String,
     required: true
    }, 
        
    mobile :
    {
       type : Number,
       default :0
    },
    address :
    {
        type : String,
        required : false
    },
    gender:{
        type:String,
        default : "Prefer not to say"
    }
})

 const User = model('User', userSchema);

 export default User;