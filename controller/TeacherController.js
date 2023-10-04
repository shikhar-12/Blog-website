class TeacherController {
    static create = (req,res)=>{
     res.render("../views/teacher/create.ejs");
    }
    static display = (req,res)=>{
        res.render("../views/teacher/display.ejs");
       }
   
}
module.exports = TeacherController;