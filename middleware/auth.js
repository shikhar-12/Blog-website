const jwt = require('jsonwebtoken');
const registermodel = require("../model/registermodel");
const checkuserauth = async(req,res,next)=>
{
   //  console.log('hello auth');
    const {tokena} = req.cookies
    // console.log(tkn);
    if(!tokena)
    {
        req.flash('error1','Unauthorized Admin, Please Login')
        res.redirect('/login');
    }
    else
    {
       const verifytoken = jwt.verify(tokena,'pn@975');
      //  console.log(verifytoken);
       const data = await registermodel.findOne({_id:verifytoken.ID})
      //  console.log(data);
    req.data1 = data;
       next();
    }
}
module.exports = checkuserauth