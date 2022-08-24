require('dotenv').config()
const express = require('express');
const path = require('path')
const indexRoute = require('./routes/indexRoute')
const dashboardRoute = require('./routes/dashboardRoute')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const expressEjsLayouts= require('express-ejs-layouts')
const passport = require('passport')
const expressSessions= require('express-session')

require('./config/passport')(passport)

const app = express()
const port = process.env.port
const link = process.env.mongodb

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(expressEjsLayouts)
app.use(expressSessions({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}))
app.use(express.json());
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(link,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    app.listen(port || 3000,(err)=>{
        console.log('app running')
        if(err) throw err;
    })
})    .catch(err=>{
        console.log(err)
    })

app.use('/', indexRoute)
app.use('/dashboard', dashboardRoute)
app.get('*',(req,res)=>{
    res.send('404')
})