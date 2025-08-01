const express = require('express');
const app= express();


require('dotenv').config();
const main= require('./config/db')
const cookieParser= require('cookie-parser');
const authRouter= require('./routes/userAuth');
const redisClient = require('./config/redis');
const problemRouter = require('./routes/problemCretor');
const submitRouter = require('./routes/submit');
const cors = require('cors');
const aiRotuer = require('./routes/AiChatting');
const videoRouter = require('./routes/videoCreator');

//for cross origin
app.use(cors({
    origin: 'https://byteleaf-frontend.onrender.com',
    credentials: true,
    exposedHeaders: ['set-cookie']
}))

app.use(express.json())
app.use(cookieParser())

app.use('/user',authRouter);
app.use('/problem',problemRouter);
app.use('/submission',submitRouter);
app.use('/ai',aiRotuer);
app.use('/video',videoRouter);


const initalizeConnection=async()=>{

    try{
        await Promise.all([main(),redisClient.connect()]);
        console.log("DataBaase Connected.")

        app.listen(process.env.port,()=>{
            console.log("Server listen at port number :"+process.env.port)
        })
    }
    catch(error)
    {
        console.log("Error Occuerrd :",error)
    }
}


initalizeConnection();
