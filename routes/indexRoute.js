const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/userSchema')
const passport = require('passport')

router.get('/',(req,res)=>{
    res.render('index')
})
router.get('/login', (req,res)=>{
    res.render('login')
})
router.get('/register',(req,res)=>{
    res.render('register')
})

router.post('/register',(req,res)=>{
    console.log(req.body)
    const {
        name, 
        email,
        password,
        password2,
    } = req.body
    let errors = []
    if (password !== password2) {
        errors.push({msg: 'Passwords do not match'})
    }
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2,
        })
    } else {
        User.findOne({email:email})
        .then((user)=>{
            if(user){
                errors.push({msg: 'Email already exists'})
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2,
                })
            }
            else{
                const newUser = new User({
                    name,
                    email,
                    password
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err
                        newUser.password = hash
                        newUser.save()
                        .then(user => {
                            console.log('User saved')
                            res.redirect('/login')
                        })
                        .catch(err => console.log(err))
                    })
                })
            }
        })


    }
})
router.post('/login',  (req,res,next)=>{
    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/login',
    })(req,res,next)
})
router.get('/logout',(req,res)=>{
    req.logout()
    res.redirect('/')
})

module.exports = router;