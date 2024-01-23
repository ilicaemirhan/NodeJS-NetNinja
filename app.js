const express = require("express");

//express app
const app = express();

//register view engine
app.set("view engine", "ejs");

//listen request
app.listen(3000);

app.get("/",(req,res) =>{
    //there is no need to set headers thanks to res.send
    //res.send("<p>Home Page</p>");
    
    res.redirect("/index");
});
app.get("/index",(req,res) =>{
    //there is no need to set headers thanks to res.send
    //res.send("<p>Home Page</p>");
    
    //res.sendFile("./views/index.html", {root: __dirname});

    const blogs = [
        {title: "Yoshi finds eggs", snippet: "Lorem ipsum dolor sit amet"},
        {title: "Mario finds stars", snippet: "Lorem ipsum dolor sit amet2"},
        {title: "How to defeat Bowser", snippet: "Lorem ipsum dolor sit amet3"}
    ];

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

app.get("/blogs/create",function(req,res)
{
    res.render("create",{title: "Create blog"});
});

//404 page - works in sync so palce it in the bottom of code
app.use((req,res) =>{
    res.status(404).render("404",{title: "404"});
});