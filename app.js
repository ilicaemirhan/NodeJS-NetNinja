const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const { result } = require("lodash");
//express app
const app = express();

//connect to mongo db - add db name prior to ?retryWrites!!
const dbURI = "mongodb+srv://spartanranger:TiTbX2ykkPzEivWA@nodetutorial.bw3mfyd.mongodb.net/node-tut?retryWrites=true&w=majority"; 
mongoose.connect(dbURI).then((result)=> {
    console.log("connected to db");
    app.listen(3000);
})
.catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");

//listen request
// app.listen(3000);

//middleware & static files
app.use(express.static("public"));//You cant use you static files (css etc) without making them available here public is the folder name we keep static files

//middleware that comes with express to hande post requests. -- The extended: true part is not forced
app.use(express.urlencoded({extended: true}));

app.use(morgan("dev"));

//mongoose and mongo route sanboxes
// app.get("/add-blog",(req,res)=>{
//     const blog = new Blog({
//         title: "new blog",
//         snippet: "about my new blog",
//         body: "body of the blog"
//     });

//     blog.save()
//         .then((result)=>res.send(result))
//         .catch((err) => console.log(err));
// });

// app.get("/all-blogs",(req,res) =>
// {
//     Blog.find()
//         .then((result) => res.send(result))
//         .catch((err)=> console.log(err));
// });

// app.get("/single-blog", (req,res)=>{
//     Blog.findById("65b0d45394b07fd3490ad477")
//         .then((result) => res.send(result))
//         .catch((err)=>console.log(err));
// });


// app.use((req,res,next)=>{
//     console.log("new request made: ");
//     console.log("Host: ", req.hostname);
//     console.log("path: ", req.path);
//     console.log("method: ", req.method);
//     next();  
// });

// app.use((req,res,next)=>{
//     console.log("In the next middleware.");
//     next();  
// });

app.get("/",(req,res) =>{
    //there is no need to set headers thanks to res.send
    //res.send("<p>Home Page</p>");
    
    res.redirect("/index");
});
app.get("/index",(req,res) =>{
    //there is no need to set headers thanks to res.send
    //res.send("<p>Home Page</p>");
    
    //res.sendFile("./views/index.html", {root: __dirname});

    // const blogs = [
    //     {title: "Yoshi finds eggs", snippet: "Lorem ipsum dolor sit amet"},
    //     {title: "Mario finds stars", snippet: "Lorem ipsum dolor sit amet2"},
    //     {title: "How to defeat Bowser", snippet: "Lorem ipsum dolor sit amet3"}
    // ];

    res.redirect("blogs");

    //when working with view engine just render them.
    res.render("index",{title: "Home", blogsParam : blogs});
});
app.get("/about",(req,res) =>{

    //there is no need to set headers thanks to res.send
    //res.send("<p>about Page</p>");

    // res.sendFile("./views/about.html", {root: __dirname});

    //when working with view engine just render them.

    res.render("about",{title: "About"});
});


//blog routes
app.get("/blogs",(req,res)=>{
    Blog.find()
        .sort({createdAt: -1})
        .then((result) =>{
            res.render("index",{title: "All Blogs", blogsParam: result})
        })
        .catch((err) => console.log(err));
});

app.post("/blogs", (req,res)=>{

    //we could just go const blog = new Blog(req.body);
    const blog = new Blog({
        title: req.body.title,
        snippet: req.body.snippet,
        body: req.body.body
    });

    blog.save()
        .then((result)=> res.redirect("/blogs"))
        .catch((err)=> console.log(err));
});

app.get("/blogs/:id",(req,res)=>{
    const id = req.params.id.trim(); //because we called it id above
    oID = new mongoose.Types.ObjectId(id);
    Blog.findById(oID)
        .then((result)=> res.render("details", {blogsParam: result, title: "Blog Details"}))
        .catch((err)=>console.log("HELP ", err));
})

app.get("/blogs/create",function(req,res)
{
    res.render("create",{title: "Create blog"});
});

//404 page - works in sync so place it in the bottom of code
app.use((req,res) =>{
    res.status(404).render("404",{title: "404"});
});