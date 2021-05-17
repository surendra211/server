
import Recruiter from '../models/recruter-signup'
import jwt from "jsonwebtoken"
import Post from '../models/post-model';
import Jobseeker from '../models/jobseeker-model';
import SaveResume from '../models/savedResume-model';
import Apply from '../models/apply-model';
export const signin=(req,res)=>{
    Recruiter.findOne({email:req.body.email})
    .exec(async (error,user)=>{
        if(user) return res.status(400).json({
            message:'user already registered'
        });
    const {firstName,
        lastName,
        email,
        password}=req.body
    const rec= new Recruiter({
        firstName,
        lastName,
        email,
        password

        })
        rec.save().then(() => {
           res.status(201).json({message:"registered successfully...."})
        }).catch((err) => {
        res.status(500).json({error: err, status: false})
        })
        
    })
}

export const login=(req,res)=>{
    Recruiter.findOne({email:req.body.email})
    .exec((error,recruiter)=>{ 
    if(error)return res.status(400).json({error})

    if(recruiter){
        
        const {_id,firstName,lastName,email,password}=recruiter
        if(password==(req.body.password)) { 
            const token=jwt.sign({_id:recruiter._id},process.env.JWT_SECRET,{expiresIn:'9h'})
            res.cookie('token', token,{expiresIn:'9h'})
        // const token=jwt.sign({_id:user._id, role:user.role},process.env.JWT_SECRET,{expiresIn:'9h'})
        //     res.cookie('token', token,{expiresIn:'9h'})
       
        res.status(200).json({
             token,
            recruiter:{_id,
                firstName,
                lastName,
                email,
                password
            }
        })
    }else{
        return res.status(202).json({message:'invalid password '})
    }
    }else{
        return res.status(201).json({message:'invalid email id'})
    }
    
    })
}

export const forget=(req,res)=>{
    Recruiter.findOne({email:req.body.email})
    .exec((error,recruiter)=>{ 
    if(error)return res.status(400).json({error})
    
        if(recruiter){
            const {_id,firstName,lastName,email,password}=recruiter
            res.status(200).json({ password:password } )
        }
    
    })
    }



    export const postjob=async(req,res)=>{
        const recruter=await Recruiter.findOne({email:req.body.email})
        console.log(recruter)
        if(!recruter) return res.status(400).send('Invalid Email Id')
        let postJ = new Post({
            jobtitle: req.body.jobtitle,
            companyname:req.body.companyname,
            name:req.body.name,
            email:req.body.email,
            description:req.body.description,
            salary:req.body.salary,
            jobtype:req.body.jobtype,
            exp:req.body.exp,
            persons:req.body.persons,
            location:req.body.location
            })
            postJ= await postJ.save();
            if(!postJ)
            return res.status(500).send('The post cannot be created')
            res.status(200).json({message:"posted successfully.."});
            
    }



    export const getjobdata=async (req,res)=>{
        try{

            let jobsdata=await Post.find({email:req.params.email})
            return res.status(200).send(jobsdata)

        }catch(err){
            return res.status(500).send({'message':`Get Error ${err}`})

        }

    }


    export const deletejob=async(req,res)=>{
        try{
         Post.findByIdAndRemove(req.params.id).then(Jobdata=>{
            return res.status(200).send(Jobdata)
         })          

        }catch(err){
            return res.status(500).send({'message':`delete error ${err}`})
        }
    }


    export const updateJob=async(req,res)=>{
       
        const job=await Post.findByIdAndUpdate(req.params.id,{
            name:req.body.name,
            jobtitle:req.body.jobtitle,
            companyname:req.body.companyname,
            description:req.body.description,
            salary:req.body.salary,
            jobtype:req.body.jobtype,
            persons:req.body.persons,
            location:req.body.location
        },{new:true})

        if(!job) {
            return res.status(404).send('the category cannot be Updated')
            } else {
            return res.status(200).json({message:"updated"})
            }
    }



    export const signout=(req,res)=>{
        res.clearCookie('token')
        res.status(200).json({
            message:"signout successfully...."
        })
    }


    // export const findresume=async (req,res)=>{
    //     //let filter={}

    //     // if(req.query.categories){
    //     //     filter={req.query.categories.split(',')}
    //     // }
    //     try{ 
    //     const jobsekers=await Jobseeker.find({
    //         skills:req.body.skills,
    //          location:req.body.location
    //     })
    //     return res.status(200).send(jobsekers)
    // }catch(err){ 
        
    //         res.status(500).json({message:err})
        
      
    // }}

    
    export const findresume=async (req,res)=>{
        try{

            let jobsdata=await Jobseeker.find({skills:req.params.skills,location:req.params.location})
            return res.status(200).send(jobsdata)

        }catch(err){
            return res.status(500).send({'message':`Get Error ${err}`})

        }

    }

    export const SaveResumes=async(req,res)=>{
       
        let saveR = new SaveResume({
            fullname: req.body.fullname,
            recrt:req.body.recrt,
            email:req.body.email,
            phone:req.body.phone,           
            qualification:req.body.qualification,
            stream:req.body.stream,
            skills:req.body.skills,
            exp:req.body.exp,
            resume:req.body.resume,
            location:req.body.location,
        })
            saveR= await saveR.save();
            if(!saveR)
            return res.status(500).send('The cannot be saved')
            res.status(200).json({message:"saved successfully.."});
        
    }

    export const getResume=async(req,res)=>{
        try{

            let data=await SaveResume.find({recrt:req.params.recrt})
            return res.status(200).send(data)

        }catch(err){
            return res.status(500).send({'message':`Get Error ${err}`})

        }
    }

    export const deletResume=async (req,res)=>{
        try{
            SaveResume.findByIdAndRemove(req.params.id).then(Jobdata=>{
               return res.status(200).send(Jobdata)
            })          
   
           }catch(err){
               return res.status(500).send({'message':`delete error ${err}`})
           }
    }

    export const findappliedpersons=async(req,res)=>{
        try{

            let data=await Apply.find({parentId:req.params.parentId})
            return res.status(200).send(data)

        }catch(err){
            return res.status(500).send({'message':`Get Error ${err}`})

        }
    }