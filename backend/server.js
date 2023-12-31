import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Pusher from 'pusher'

// App config

const app=express()
const port=process.env.PORT || 8080;

// middlewares
app.use(express.json())
app.use(cors())

// db config


// api routes 

app.get('/',(req,res)=>{
    res.status(200).send('hello world')
})

// listener

app.listen(port, ()=> console.log(`listening at https://localhost:${port}`))

