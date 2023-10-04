const blogmodel = require('../model/blogmodel');
const cloudinary = require('cloudinary').v2;

          
cloudinary.config({ 
  cloud_name: 'dgl0ugw9p', 
  api_key: '233799267255433', 
  api_secret: 'JcgJ5SbrsgtWVCuQ2ne9ZRCjmUU' 
});

class BlogController {
    static display = async (req,res)=>{
      const result = await blogmodel.find();
     res.render("../views/admin/blog/display",{rew:result});
    };
    static create = (req,res)=>{
        res.render("../views/admin/blog/create");
       };
       static bloginsert =async (req,res)=>{
            try{
              const {title : tl,description : dsr} = req.body;
              const img = req.files.foo;
              const rimg = await cloudinary.uploader.upload(img.tempFilePath,{folder:"blog-images"});
              const result = new blogmodel({
                title : tl,
                description : dsr,
                image:{
                  public_id: rimg.public_id,
                  url: rimg.secure_url
                }
              })
              await result.save();
              res.redirect("/admin/blog/display");
              // console.log(rimg);
            }
            catch(error){
                console.log(error);
            }
       };
       static blogupdate =async (req,res)=>{
        try{
          const {title : tl,description : dsr} = req.body
          // const img = req.files;
          // console.log(img);
          if(req.files)
          {
            const user = await blogmodel.findById(req.params._id);
            const uimg = user.image.public_id;
            await cloudinary.uploader.destroy(uimg);
            const img = req.files.foo;
            const rimg = await cloudinary.uploader.upload(img.tempFilePath,{folder:"blog-images"});
            const result = await blogmodel.findByIdAndUpdate(req.params._id,{$set:
              {
                title : tl,
                description : dsr,
                image:{
                  public_id: rimg.public_id,
                  url: rimg.secure_url
              }
            }})
            // await result.save();
            res.redirect("/admin/blog/display");
          }
          else{
            const result = await blogmodel.findByIdAndUpdate(req.params._id,{$set:
              {
                title : tl,
                description : dsr,
               }
            })
            // await result.save();
            res.redirect("/admin/blog/display");
          }
        }
        catch(error){
            console.log(error);
        }
   };
       static viewblog = async (req,res)=>{
        try{
            const result = await blogmodel.findById(req.params._id);
            res.render("../views/admin/blog/view.ejs",{rew:result});
        }catch(error){
          console.log(error);
        }
       };
       static editblog = async (req,res)=>{
        try{
            const result = await blogmodel.findById(req.params._id);
            res.render("../views/admin/blog/edit.ejs",{rew:result});
        }catch(error){
          console.log(error);
        }
       };
       static deleteblog = async (req,res)=>{
        try{
            const result = await blogmodel.findByIdAndDelete(req.params._id);
            const uimg = result.image.public_id;
            await cloudinary.uploader.destroy(uimg);
            res.redirect("/admin/blog/display");
        }catch(error){
          console.log(error);
        }
       }
}
module.exports = BlogController;