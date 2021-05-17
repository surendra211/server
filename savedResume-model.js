
import mongoose from "mongoose"

const resumeSchema=new mongoose.Schema({
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
   recrt:{
       type:String
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
        required:true
    },
     exp:{
        type:String
    },
    resume:{
        type:String
    },
    
    location:{
        type:String
    },
   

},{timestamps:true})
const SaveResume=mongoose.model("savedResumes",resumeSchema)



export default SaveResume
