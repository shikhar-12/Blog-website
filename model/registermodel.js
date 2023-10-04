const mongoosse = require("mongoose");
const registerschema = new mongoosse.Schema({
    username:{
        type :String,
        required : true
    },
   email:{
        type :String,
        required : true
    },
    password:{
        type :String,
        required : true
    }
})
const registermodel = new mongoosse.model("registration",registerschema);
module.exports = registermodel;