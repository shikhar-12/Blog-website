const categorymodel =  require("../model/categorymodel");
class FrontendController {
    static index = async (req,res)=>{
        try{
            const result = await categorymodel.find()
            res.render("index",{rew:result});
        }catch(error){
            console.log(error);
        }
        
    }
    static dindex = async (req,res)=>{
        try{
            const result = await categorymodel.find()
            res.render("dindex",{rew:result});
        }catch(error){
            console.log(error);
        }
        
    }
    static about = (req,res)=>{
        res.render("about");
       }
       static dabout = (req,res)=>{
        res.render("dabout");
       }
       static contact = (req,res)=>{
        res.render("contact");
       }
       static bloglist = async (req,res)=>{
        // res.render("bloglist");
        try{
            const result = await categorymodel.find()
            res.render("bloglist",{rew:result});
        }catch(error){
            console.log(error);
        }
       }
       static detail = async (req,res)=>{
        try{
            const result = await categorymodel.findById(req.params._id);
            const result1 = await categorymodel.find().sort({_id:-1}).limit(6);
            // console.log(result);
            res.render("detail",{rew:result,rew1:result1});
        }catch(error){
            console.log(error);
        }
       }
       static login = (req,res)=>{

        res.render("login",{message : req.flash("success"),message1 : req.flash("error1")});
       }
       static logout = (req,res)=>{
        try {
            res.clearCookie("tokena");
            res.redirect("/login");
          } catch (error) {
            console.log(error);
          }
       }
}
module.exports = FrontendController;