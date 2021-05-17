
import mongoose from "mongoose"

const postSchema=new mongoose.Schema({
    jobtitle:{
        type:String,
        required:true,
        trim:true
    },
    companyname:{
        type:String,
        required:true,
        trim:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true

    },
    description:{
        type:String,
        required:true,
        min:10,
        max:100
        
    },
    salary:{
        type:String,
    },
    jobtype:{
        type:String,
        
    },
    exp:{
        type:String
    },
    persons:{
        type:String
    },
    location:{
        type:String
    },
    

},{timestamps:true})
const Post=mongoose.model("postJob",postSchema)



export default Post
