import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv, { config } from "dotenv";
import postRoutes from "./routes/posts.js";


const app=express();//every express apllication we have to initialize with app we are simple run this with express function
dotenv.config();



app.use(express.json({limit:"30mb",extended:true}));//we are sending some inages
app.use(express.urlencoded({limit:"30mb",extended:true}));
app.use(cors());


//we need to use express middleware to connect our application
app.use("/posts",postRoutes);

app.get("/",(req,res)=>{
    res.send("Hello to Memories API")
});


//https://www.mongodb.com/cloud/atlas//their cloud atlas is the version of mongodb
//which means they host our database on their cloud.

//const CONNECTION_URL="mongodb+srv://john:john123@cluster0.bg8rf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

//so before deployement we can encoded the passcode and username

const PORT=process.env.PORT || 5000;

//we are using mongoose here to connect the db
mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})//it accept 2 params
//if we dont give this two options in objects it gives some error in console
.then(()=>app.listen(PORT,()=>console.log(`server running on port: ${PORT}`)))
.catch((error)=>console.log(error.message));



//thats it we are connecting now to db;
