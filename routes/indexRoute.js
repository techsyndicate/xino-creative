const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const user = require('../models/userSchema')
const {
    checkUser, forwardUser
} = require('../config/auth')

router.get('/',(req,res)=>{
    res.render('index')
})
router.get('/login', forwardUser,(req,res)=>{
    res.render('login')
})
router.get('/register',forwardUser,(req,res)=>{
    res.render('register')
})
router.post('/register',async (req,res)=>{
    const {
        name,email,password,password2
    } = req.body;
    if (password != password2){
        res.status(400).json({
            msg : 'passwords do not match'
        })
    }
    const userExisting = await user.findOne({
        email
    })
    if(userExisting){
        res.status(400).json({
            msg : 'user already exists'
        })
    }
    const salt = await bcrypt.genSalt(16);
    const hashedPassword=  await bcrypt.hash(password,salt)
    const create = new user({
        name,email, password: hashedPassword
    })
    const newUser = await create.save();
    try{
        const token = jwt.sign({
            id: newUser._id,
        },process.env.token)
        res.cookie('usertoken',token,{
            httpOnly: true
        })
        console.log('user created')
        res.redirect('/login')        
    }
    catch (e){
        console.log(e)
        res.render('error')
    }
    console.log(req.body)
})
router.post('/login',(req,res)=>{
    const {
        email, password
    } = req.body;
    user.findOne({
        email
    })
    .then(user=>{
        if(!user){
            return res.status(400).json({
                msg: 'User does not exist',
            })
        }
        bcrypt.compare(password,user.password).then(
            matchingPasswords =>{
                if(matchingPasswords){
                    const token = jwt.sign({
                        id: user._id
                    }, process.env.token)
                    res.cookie('usertoken', token,{
                        httpOnly: true,
                        maxAge: 1000*60*60*24
                    })
                    res.redirect('/dashboard')
                    
                }else{
                    return res.status(400).json({
                        msg: 'passwords dont match'
                    })
                }
            }
        ).catch(err=>{
            if (err) throw err;
        })
    })
})
router.get('/logout', async (req,res)=>{
    res.clearCookie('usertoken')
    req.user = null
    res.redirect('/login')
})
module.exports = router;