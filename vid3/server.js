const http = require("http");

//you cam store the server in an const variable. Keep in mind you don't have to.
//Gets a callback function as arguement which works whenever a request is made.
const server = http.createServer((req, res)=>
{
    console.log(req.url, req.method);

    //set header content type
    res.setHeader("Content-Type", "text/html");
    res.write("<h2>YOOOOO</h2>");
    res.end();
});

//gets port number as arguement
//default value is also localhost
//Function invokes when we start listening.
server.listen(3000, "localhost",() =>
{
    console.log("Listening for Requests on port 3000");
});