require('dotenv').config()
const express = require('express');
const path = require('path')
const indexRoute = require('./routes/indexRoute')
const dashboardRoute = require('./routes/dashboardRoute')
const port = process.env.port
const cookieParser = require('cookie-parser')

const app = express()


app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.listen(port || 3000,(err)=>{
    console.log('app running')
    if(err) throw err;
})

app.use('/', indexRoute)
app.use('/dashboard', dashboardRoute)
app.get('*',(req,res)=>{
    res.send('404')
})