
import mongoose from "mongoose"

const jobseekerSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true

    },
    qualification:{
        type:String,
        required:true,
        min:10,
        max:100
        
    },
    stream:{
        type:String,
        required:true
    },
    skills:{
        type:String,
        required:true,
        

    },
     exp:{
        type:String
    },
    
    location:{
        type:String
    },
   avatar:{       
       type:String
       }


},{timestamps:true})
const Jobseeker=mongoose.model("jobseeker",jobseekerSchema)



export default Jobseeker
