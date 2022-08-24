const mongoose = require('mongoose')
const schema = mongoose.Schema;
const reqString = {
    type:String,
    required: true
}
const user = new schema({
    name: reqString,
    email: reqString,
    password: reqString
    // have to add more user info
},{
    timestamps: true
})

const userModel = mongoose.model('user', user)
module.exports = userModel;