const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const app=express()
const items=require('./routes/api/items')
const path=require('path')

app.use(bodyParser.json())
app.use('/api/items', items)

if(process.env.NODE_ENV==='production') {
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

//mongo db
const db=require('./config/keys').mongoURI 
mongoose
    .connect(db,{useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log('mongoDB connected...'))
    .catch(err => console.log(err))

const port_number = server.listen(process.env.PORT || 5000);
app.listen(port_number);
