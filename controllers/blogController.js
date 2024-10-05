const mongoose = require('mongoose');
const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');

//GET ALL Blogs
exports.getAllBlogsController = async (req, res)=>{

    try{
        const blogs = await blogModel.find({});
        if(!blogs){
            return res.status(200).send({
                success:true,
                message:"No Blogs Found"
            });
        }
        return res.status(200).send({
            success:true,
            BlogCount: blogs.length,
            message:"All Blogs lists",
            blogs,
        });

    }catch(error){
        console.log(error);
        return res.status(500).send({
            success: false,
            message:"Error while greeting Blogs"
        });
    }

    
}

//CREATE Blogs
exports.createBlogController = async (req,res)=>{
   
    try{
        const { title,description,image} = req.body;
        //validation
        if( !title || !description || !image ){
            return res.status(400).send({
                success:false,
                message:"Please Provide All Fields"
            });
        }

        const existingUser = await userModel.findById(user);
        //validation
        if(!existingUser){
            return res.status(404).send({
                success:true,
                message:"unable to find user"
            });
        }
        
        const  newBlog = new blogModel({title, description, image});
        
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({session});
        existingUser.blogs.push(newBlog);
        await existingUser.save({session});
        await session.commitTransaction();
        await newBlog.save();

        return res.status(201).send({
            success:true,
            message:"Blog is created"
        });

    }catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error while Creating Blog",
            error
        })

    }
}

//UPDATE Blogs
exports.updateBlogController= async (req,res)=>{
    try{
        const {id} = req.params;
        const {title,description,image}=req.body;
        
        const blog = await blogModel.findByIdAndUpdate(
            id,
            {...req.body},
            {new: true}
        );
        blog.updateOne();

        return res.status(200).send({
            success: true,
            message:"Blog is Updated"
        });

    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error Occur : Unable to update"
        });
    }
}

//SINGLE Blogs
exports.getBlogByIdController =  async (req,res)=>{
    try{
        
        const blog = await blogModel.findById(req.params)
        if(!blog){
            return res.status(404).send({
                success:false,
                message:'blog not found with this ID '
            })
        }

         return res.status(200).send({
            success:true,
            message:"Fetch single blog is sucessful"
        });

    }catch(error){
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"Error while getting single blog"
        });
    }
}

//DELETE Blogs
exports.deleteBlogController =  async (req,res)=>{
    try{
        
         await blogModel.findOneAndDelete(req.params.id)

      
         return res.status(200).send({
            success:true,
            message:"Blog is deleted!"
        });


    }catch(error){
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"Error in deletion"
        })
    }
}
