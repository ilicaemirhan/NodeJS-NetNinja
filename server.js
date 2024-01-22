const http = require("http");
const fs = require("fs");
const ld = require("lodash");

//you cam store the server in an const variable. Keep in mind you don't have to.
//Gets a callback function as arguement which works whenever a request is made.
const server = http.createServer((req, res)=>
{
    //lodash
    const num = ld.random(0,20);
    console.log(num);

    const greet = ld.once(() =>{
        console.log("hello");
    })

    //set header content type
    res.setHeader("Content-Type", "text/html");
    // res.write("<h2>YOOOOO</h2>");
    // res.end();

    //routing system with switch cases
    let path = "./views/";
    switch(req.url)
    {
        case "/":
            path += "index.html";
            res.statusCode = 200;
            break;
        case "/about":
            path += "about.html";
            res.statusCode = 200;
            break;
        case "/about-you":
            res.statusCode = 301;//page moved status code
            res.setHeader("Location","/about");
            res.end();
            break;
        case "/index":
            path += "index.html";
            res.statusCode = 200;
            break;
        default:
            path += "404.html";
            res.statusCode = 404;
            break;
    }

    //reading html file
    fs.readFile(path,(err,data) =>{
        if(err)
        {
            console.log(err);
            res.end();
        }
        else
        {
            //we can just use res.end(data)
            //res.write(data); 
            
            res.end(data);
        }
    });
});

//gets port number as arguement
//default value is also localhost
//Function invokes when we start listening.
server.listen(3000, "localhost",() =>
{
    console.log("Listening for Requests on port 3000");
});