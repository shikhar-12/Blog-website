const categorymodel = require("../model/categorymodel");
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'dgl0ugw9p', 
    api_key: '233799267255433', 
    api_secret: 'JcgJ5SbrsgtWVCuQ2ne9ZRCjmUU' 
  });

class CategoryController{
   static display = async (req,res)=>{
          const result = await categorymodel.find();
    res.render("../views/admin/category/display.ejs",{rew:result});
    }
    static create = async (req,res)=>{
  res.render("../views/admin/category/create.ejs");
  }
  static categoryinsert = async (req,res)=>{
    try{
        const {title : tl, description : dr, category : cr} = req.body;
    const img = req.files.foo;
    const rimg = await cloudinary.uploader.upload(img.tempFilePath,{folder: "CategoryImage"});
    const result = new categorymodel({
        title : tl,
        description : dr,
        category : cr,
        image: {
            public_id : rimg.public_id,
            url : rimg.url
        }
    })
    await result.save();
    res.redirect("/admin/category/display");
    // console.log(result.category);
    }catch(error){
        console.log(error);
    }
}
static catviewblog = async (req,res)=>{
    const result = await categorymodel.findById(req.params._id);
    res.render("../views/admin/category/view.ejs",{rew : result});
    }
    static cateditblog = async (req,res)=>{
        const result = await categorymodel.findById(req.params._id);
        res.render("../views/admin/category/edit.ejs",{rew : result});
        }
        static catdeleteblog = async (req,res)=>{
            try{
                const result = await categorymodel.findByIdAndDelete(req.params._id);
                // const user = await categorymodel.findById(req.params._id);
                const uimg = result.image.public_id;
                    await cloudinary.uploader.destroy(uimg);
                res.redirect("/admin/category/display");
            }catch(error){
                console.log(error);
            }
            }

        static categoryupdate = async (req,res)=>{
            try{
                const {title:tl,description:dr,category:cr} = req.body;
                if(req.files){
                    const user = await categorymodel.findById(req.params._id);
                    const uimg = user.image.public_id;
                    await cloudinary.uploader.destroy(uimg);
                    const img = req.files.ufoo;
              const rimg =  await cloudinary.uploader.upload(img.tempFilePath,{folder:"CategoryImage"});
               const result = await categorymodel.findByIdAndUpdate(req.params._id,{
                    title : tl,
                    description : dr,
                    category : cr,
                    image : {
                        public_id : rimg.public_id,
                        url : rimg.secure_url
                    }
                })
                // await result.save();
                res.redirect("/admin/category/display")
                }
                else
                {
                    const result = await categorymodel.findByIdAndUpdate(req.params._id,{
                        title : tl,
                        description : dr,
                        category : cr,
                    })
                    // await result.save();
                    res.redirect("/admin/category/display") 
                }
            }catch(error){
                console.log(error);
            }
            }
    
}
module.exports = CategoryController;