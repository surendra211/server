//console.log("hello")
import cors from "cors"
import express from "express"
const app=express()
require("dotenv").config()
app.use(express.json())
app.use(cors())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use('/uploads',express.static('uploads'))
import {readdirSync} from 'fs'
//import { jobseeker } from "./controller/jobseeker-controller"
// var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })
const mongoose = require("mongoose")// OR import mongoose from 'mongoose'
mongoose.connect(process.env.MONGO_DB_URL, {
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex:true
}).then(() => {
console.log("DB Connection Success...")
}).catch((err) => {
console.log("DB Connection Error ", err)
})

app.get("/api", (req, res) => {
    res.status(200).send("Welcome to Node REST Example")
    })
    //app.post('/jobseeker',upload.single('avatar'), jobseeker)

    // app.post('/upload',upload.single('document'),(req , res) => {
    //     console.log("this is from server",req.file, req.body)
    //   });
    readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)))
    // Configure Server
    const port = process.env.PORT || 8000
    app.listen(port, () => console.log(`Server is ready. Running on port ${port}`))