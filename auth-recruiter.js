

import express from 'express'
import { appliedjobs, applyjob, findJobs, getApplied, getsaved, jobseeker, jobseekerDetails, jobseekerUpdate, jobsekersignin, savejob } from '../controller/jobseeker-controller'
//import { Postjob } from '../controller/post-controller'
import { deletejob, deletResume, findappliedpersons, findresume, forget, getjobdata, getResume, login, postjob, SaveResumes, signin, signout, updateJob } from '../controller/recruiter-controller'
//import { upload}  from '../Middleware1/upload'


import path from "path"
import multer from "multer"
const shortid=require('shortid')

//const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,path.join(path.dirname(__dirname),'upload'))
//     },
//     filename:(req,file,cb)=>{
//         //let ext=path.extname(file.originalname)
//         cb(null, shortid.generate() + '--' + file.originalname)
//     }
// })

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        let ext=path.extname(file.originalname)
        cb(null,Date.now() +ext)
    }
})
const upload=multer({storage:storage})
  
const router=express.Router()


router.post('/rec/signup',signin)
router.post('/login',login)
router.post('/forget',forget)
router.post('/post',postjob)
router.get('/jobdata/:email',getjobdata)

router.delete('/del/:id',deletejob)
router.put('/upd/:id',updateJob)
router.post('/signout',signout)

router.post('/jobseeker',upload.single('avatar'), jobseeker)

router.post("/savresume",SaveResumes)
router.get('/getting/:skills/:location',findresume)
router.get('/getresume/:recrt',getResume)
router.delete('/resumedelete/:id',deletResume)
router.get('/appliedpersons/:parentId',findappliedpersons)


//JOB SEEKER ROUTES

router.post('/seekerlogin',jobsekersignin)
router.post('/apply',applyjob)
router.get('/findjob/:jobtitle/:location',findJobs)
router.get('/jobseekerdetails/:email',jobseekerDetails)
router.post('/seekerupdate/:id',jobseekerUpdate)
router.post('/appliedjobs',appliedjobs)
router.get('/getapply/:seekerEmail',getApplied)
router.post('/savejobs',savejob)
router.get('/getsaved/:seekerEmail',getsaved)
module.exports =router