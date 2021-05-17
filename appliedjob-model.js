import mongoose from "mongoose"

const appliedSchema=new mongoose.Schema({

   jobid:{
    type:String
   },
    seekerEmail:{
        type:String
    },
    jobtitle:{
        type:String
    },
    companyname:{
        type:String
    },
    salary:{
        type:String
    },
    jobtype:{
        type:String
    },
    location:{
        type:String
    },
    description:{
        type:String
    },
    email:{
        type:String
    },
    exp:{
        type:String
    },
    name:{
        type:String
    }


},{timestamps:true})

const AppliedJob=mongoose.model('jobseekerAppliedjobs',appliedSchema)

export default AppliedJob