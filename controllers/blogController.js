const mongoose = require("mongoose");
const Blog = require("../models/blog")

// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (req, res) =>{
    Blog.find()
    .sort({createdAt: -1})
    .then((result) =>{
        res.render("blogs/index",{title: "All Blogs", blogsParam: result})
    })
    .catch((err) => console.log(err));
};

const blog_details = (req,res) =>{
    const id = req.params.id.trim(); //because we called it id above
    oID = new mongoose.Types.ObjectId(id);
    Blog.findById(oID)
        .then((result)=> res.render("blogs/details", {blogsParam: result, title: "Blog Details"}))
        .catch((err)=>res.status(404).render("404", {title: "Blog not found"}));
};

const blog_create_get = (req,res) =>{
    res.render("blogs/create",{title: "Create blog"})
};

const blog_create_post = (req,res) =>{

    //we could just go const blog = new Blog(req.body);
    const blog = new Blog({
        title: req.body.title,
        snippet: req.body.snippet,
        body: req.body.body
    });

    blog.save()
        .then((result)=> res.redirect("/blogs"))
        .catch((err)=> console.log(err));
};

const blog_delete = (req,res) =>{
    const id = req.params.id.trim();
    oID = new mongoose.Types.ObjectId(id);
    Blog.findByIdAndDelete(oID)
        .then((result)=>{
            res.json({redirect: "/blogs"})
        })
        .catch((err)=>console.log(err));
};

module.exports={
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
};