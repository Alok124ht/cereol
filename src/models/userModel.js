const mongoose = require("mongoose")

//--------------------------------------------------------------------------------------//
const userschema = new mongoose.Schema({
    Email:{
        type: String,
        required: true,
        trim: true,
        unique : true
    },
    Name :{
        type: String,
        required: true,
        trim: true
    },
    Gender :{
        type: String,
        required : true,
        trim : true
    },
    Password : {
     type : String,
     required : true,
     lowercase: true
    }
}, { timestamps : true})

//----------------------------------------------------------------------------------//
module.exports= mongoose.model('userModel', userschema)