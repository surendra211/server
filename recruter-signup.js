
const mongoose = require("mongoose")

const recruiterSchema=new mongoose.Schema({
    firstName:{
    type:String,
    required:true,
    trim:true,
   
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
       
        },
        
        email:{
            type:String,
            required:true,
            trim:true,
            unique:true,
            lowercase:true
        },
          password:{
            type:String,
            required:true
        },
       
        // contactNumber:{type:String},
        // profilePicture:{type:String}
})
const Recruiter=mongoose.model('recruiter',recruiterSchema)


export default Recruiter





