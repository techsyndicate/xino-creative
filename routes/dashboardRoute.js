const express = require('express')
const router = express.Router()
const user = require('../models/userSchema')
const {
    checkUser, forwardUser
} = require('../config/auth')
router.get('/',checkUser, async(req,res)=>{
    const user = await user.find({email: req.user.email})
    res.render('dashboard')
})

module.exports = router