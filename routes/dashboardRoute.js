const express = require('express')
const router = express.Router()
const user = require('../models/userSchema')
const {
    ensureAuthenticated,
    forwardAuthenticated
} = require('../config/auth')
router.get('/', ensureAuthenticated,async(req,res)=>{
    res.render('dashboard')
})

module.exports = router