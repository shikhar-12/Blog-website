const mongoose = require('mongoose');

const categoryschema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    category : {
    type : String,
    required : true
},
image:{
    public_id : {
        type : String,
    required : true
    },
    url: {
        type : String,
    required : true
    }
}
},{timestamps:true})

const cat = mongoose.model("categorymodel",categoryschema)
module.exports = cat;