const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const app=express()
const items=require('./routes/api/items')

app.use(bodyParser.json())
app.use('/api/items', items)

//mongo db
const db=require('./config/keys').mongoURI 
mongoose
    .connect(db,{useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log('mongoDB connected...'))
    .catch(err => console.log(err))

const Port=process.env.Port || 5000
app.listen(Port,()=>console.log(`server started on port ${Port}`))
