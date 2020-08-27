const express=require('express')
const mongoose=require('mongoose')
const app=express()
const path=require('path')
const config=require('config')
app.use(express.json())
app.use('/api/items', require('./routes/api/items'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const db=config.get('mongoURI')
mongoose.set('useCreateIndex', true)
mongoose
    .connect(db,{useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log('mongoDB connected...'))
    .catch(err => console.log(err))

app.listen(process.env.PORT || 5000)
