import mongoose from "mongoose"

const applySchema=new mongoose.Schema({
    parentId:{
        type:String
    }    ,
    jobseekerEmail:{
        type:String
    },
    name:{
        type:String
    },
    phone:{
        type:String
    },
    location:{
        type:String
    },
    qualification:{
        type:String
    },
    stream:{
        type:String
    },
    exp:{
        type:String
    },
    skills:{
        type:String
    }
},{timestamps:true})

const Apply=mongoose.model("appliedjobs",applySchema)
export default Apply