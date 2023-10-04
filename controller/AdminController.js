const registermodel = require("../model/registermodel");
const bcrypt = require("bcrypt");
const flash = require('connect-flash');
const jwt = require("jsonwebtoken");
class AdminController {
    static dashboard = async (req,res)=>{
        const {username, email} = req.data1
        try{
            // const result = await registermodel.findOne({_id :uid});
            // console.log(result);
            res.render("../views/admin/dashboard",{em :email,un : username});
        }
        catch(error)
        {
            console.log(error);
        }
            
           
    }
    static register = (req,res)=>{
        res.render("../views/admin/register",{message : req.flash("error"), message1 : req.flash("error1")});
       }
       static signup = async (req,res)=>{
        const {username : un, email:em,password:pw,cpassword:cpw} = req.body
             const emailchk = await registermodel.findOne({email:em});
             if(emailchk)
             {
                req.flash("error","Email Already Exist");
                res.redirect("/admin/register");
             }
             else{
                try{
                    if(un && em && pw && cpw)
                    {
                        if(pw == cpw)
                        {
                            const hashpass = await bcrypt.hash(pw,10)
                            console.log(hashpass);
                            const result = new registermodel({
                                username: un,email:em,password:hashpass
                            })
                            await result.save();
                        req.flash("success","Registration Successfull, Please Login !")
                        res.redirect("/login")
                        console.log(result);
                    }
                        }
                        else if(pw!=cpw)
                        {
                            req.flash("error","Passwords Do not match");
                            res.redirect("/admin/register");
                        }
                        
                    else
                    {
                        req.flash("error1","Please Fill All fields !");
                        res.redirect("/admin/register");
                    }
                }catch(error){
                    console.log(error);
                }
             }
 
       }
       static verifylogin = async (req,res)=>{
        try{
            const{email :em,password:pw} = req.body;
            if(em && pw)
            {
              const result = await registermodel.findOne({email:em});
              if(result != null){
                    const ismatched = await bcrypt.compare(pw,result.password)
                    if(ismatched){
                        const token = jwt.sign({ ID: result._id }, "pn@975");
                        // console.log(token);
                        res.cookie("tokena", token);
                        res.redirect("/admin/dashboard");
                    }
                    else{
                        req.flash("error1","Incorrect Password !")
                res.redirect("/login");
                    }
              }
              else{
                req.flash("error1","Incorrect Email !")
                res.redirect("/login");
              }
            }
            else{
                req.flash("error1","Please Fill all Fields !")
                res.redirect("/login");
            }
        }
        catch(error){
            console.log(error);
        }
       }
   
}
module.exports = AdminController;