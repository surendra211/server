import Jobseeker from "../models/jobseeker-model"
import jwt from "jsonwebtoken"
import Post from "../models/post-model"
import Apply from "../models/apply-model"
import AppliedJob from "../models/appliedjob-model"
import SaveJob from "../models/savedjobs-model"
export const jobseeker=(req,res)=>{
    Jobseeker.findOne({email:req.body.email})
    .exec(async (error,jober)=>{
        if(jober) return res.status(201).json({message:"jobseeker already registered"})

     const {fullname,email,password,phone,qualification,stream,skills,exp,location}=req.body

// let avatar=''
     
//      if(req.file){
//         // console.log('hello')
//          avatar=req.file.filename
//      }


     const rec=new Jobseeker({
         fullname,email,password,phone,qualification,stream,skills,exp,location,//avatar
     })
     if(req.file){
        rec.avatar=req.file.path
    }
     rec.save().then(()=>{
         res.status(200).json({file:"this is file",file:req.file,body:req.body,
             message:"registerd successfully....!"
            })
        }).catch((error)=>{
            res.status(500).json({error:error,})
         })
    
    })
    
}

export const jobsekersignin=(req,res)=>{
    Jobseeker.findOne({email:req.body.email})
    .exec((err,user)=>{
        if(err) return res.status(201).json({message:err})

        if(user){
            const {_id,fullname,email,password,phone,qualification,stream,skills,exp,location}=user

            if(password==(req.body.password)){
                const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'9h'})
            res.cookie('token', token,{expiresIn:'9h'})

             
        res.status(200).json({
            token,
           recruiter:{_id,
               fullname,            
               email,
               password,phone,qualification,stream,skills,exp,location
            
            }
            
            })       

            
         } else{
            return res.status(500).json({message:'invalid password '})
        }
    }else{
        return res.status(201).json({message:'invalid email id'})
    }
   
    })
}


export const findJobs=async(req,res)=>{
    try{
        let jobs=await Post.find({jobtitle:req.params.jobtitle,location:req.params.location})
       console.log(jobs)
        if(jobs.length !=0){ 
            return res.status(200).send(jobs)
       }else{
           return res.status(201).json({message:"no jobs found"})
       }
    }catch(err){
        return res.status(500).send({"message":`error${err}`})
    }
}

export const jobseekerDetails=async(req,res)=>{
    try{
        const seeker=await Jobseeker.findOne({email:req.params.email})
        return res.status(200).send(seeker)
    }catch(err){
        return res.status(500).send({'message':`error${err}`})
    }
}

export const applyjob= (req,res)=>{
    Apply.findOne({jobseekerEmail:req.body.jobseekerEmail,parentId:req.body.parentId})
    .exec(async (error,jober)=>{
        if(jober) return res.status(201).json({message:"jobseeker already applied a job"})

    const apply={
        jobseekerEmail:req.body.jobseekerEmail,
        name:req.body.name,
        phone:req.body.phone,
        location:req.body.location,
        qualification:req.body.qualification,
        stream:req.body.stream,
        exp:req.body.exp,
        skills:req.body.skills
    }
    if(req.body.parentId){
        apply.parentId=req.body.parentId
    }

    const applied=new Apply(apply)
    applied.save((error,app)=>{
        if(error) return res.status(400).json({error})

        if(app){
            return res.status(200).json({app})
        }
    })
    })
}

export const jobseekerUpdate=async(req,res)=>{

    //const d=Jobseeker.findOne({email:req.body.email})
   // if(!d){
    const job=await Jobseeker.findByIdAndUpdate(req.params.id,{
        fullname:req.body.fullname,
       // email:req.body.email,
        phone:req.body.phone,
        qualification:req.body.qualification,
        stream:req.body.stream,
        exp:req.body.exp,
        skills:req.body.skills,
        location:req.body.location,
    },{new:true})
    
    if(!job) {
        return res.status(404).send('the category cannot be Updated')
        } else {
        return res.status(200).json({message:"updated"})
        }
// }else{
//    return res.status(500).send('email id already exist') 
//}
}

export const appliedjobs=async(req,res)=>{
    let save1=new AppliedJob({
        jobid:req.body.jobid,
        seekerEmail:req.body.seekerEmail,
        exp:req.body.exp,
        name:req.body.name,
        companyname:req.body.companyname,
        location:req.body.location,
        salary:req.body.salary,
        jobtype:req.body.jobtype,
        description:req.body.description,
        jobtitle:req.body.jobtitle,
        email:req.body.email
    })
  const  saveA=await save1.save()
    if(!saveA)
    return res.status(500).send('The cannot be saved')
    res.status(200).json({message:"saved successfully.."})
}

export const getApplied=async (req,res)=>{
    //const job=await AppliedJob.find({seekerEmail:req.params.seekerEmail})

    try{
        const seeker=await AppliedJob.find({seekerEmail:req.params.seekerEmail})
        return res.status(200).send(seeker)
    }catch(err){
        return res.status(500).send({'message':`error${err}`})
    }
}

export const savejob=async(req,res)=>{
    console.log(req.body.seekerEmail)
    console.log(req.body.jobid)
     SaveJob.findOne({seekerEmail:req.body.seekerEmail,jobid:req.body.jobid})
    .exec(async(error,sajob)=>{
        console.log('hello')
        if(sajob) return res.status(400).send("job already saved")
        let saveR = new SaveJob({
            jobid:req.body.jobid,
            jobtitle: req.body.jobtitle,
            companyname:req.body.companyname,
            name:req.body.name,
            email:req.body.email,
            description:req.body.description,
            salary:req.body.salary,
            jobtype:req.body.jobtype,
            exp:req.body.exp,
            persons:req.body.persons,
            location:req.body.location,
            seekerEmail:req.body.seekerEmail,

        })
        console.log(req.body.name)
            saveR= await saveR.save();
            if(!saveR)
            return res.status(500).send('The cannot be saved')
            res.status(200).json({message:"saved successfully.."});
        
    
    })
   
}
export const getsaved=async(req,res)=>{
    try{
        const seeker=await SaveJob.find({seekerEmail:req.params.seekerEmail})
        return res.status(200).send(seeker)
    }catch(err){
        return res.status(500).send({'message':`error${err}`})
    }
}

export const deleteSavedjob=async(req,res)=>{
    try{
     SaveJob.findByIdAndRemove(req.params.id).then(Jobdata=>{
        return res.status(200).send(Jobdata)
     })          

    }catch(err){
        return res.status(500).send({'message':`delete error ${err}`})
    }
}


export const getCount=async(req,res)=>{
    const count=await SaveJob.countDocuments((count)=>count)

    if(!count){
        res.status(500).json({success:false})
    }
    res.status({
        count:count
    })
}
