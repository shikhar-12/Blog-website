const mongoose = require('mongoose');

const blogschema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
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

const BlogData = mongoose.model('Blog',blogschema)
module.exports = BlogData;