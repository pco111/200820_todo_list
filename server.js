const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const app=express()
const items=require('./routes/api/items')

app.use(bodyParser.json())
app.use('/api/items', items)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}

//mongo db
const db=require('./config/keys').mongoURI 
mongoose
    .connect(db,{useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log('mongoDB connected...'))
    .catch(err => console.log(err)) 

app.listen(process.env.PORT || 5000)
