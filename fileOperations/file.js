const fs = require("fs");//adding module named "fs"

//reading file
fs.readFile("./Github/NodeJS-Netninja/fileOperations/docs/blog1.txt", (err, data)=>{
if(err)
{
    console.log(err);
}
console.log(data.toString());
});

//writing files It also creates a file if it does not exist.
fs.writeFile("./Github/NodeJS-Netninja/fileOperations/docs/blog1.txt", "New String", (err) =>{
    if(err)
        console.log(err);
    else
        console.log("Writing Success");
})


//directories - folders
if(!fs.existsSync("./assets"))
{
    fs.mkdir("./assets", (err) =>{
        if(err)
            console.log(err);
        else
            console.log("folder created");
    })
}
else
    fs.rmdir("./assets", (err)=>{
        if(err)
            console.log(err);
        else
            console.log("folder deleted")
    });


//deleting files
if(fs.existsSync("./Github/NodeJS-Netninja/fileOperations/docs/d.txt"))
{
    fs.unlink("./Github/NodeJS-Netninja/fileOperations/docs/d.txt", (error) =>{
        if(error)
            console.log(error);
        else
            console.log("remove success");
    });
}
else
{
    fs.writeFile("./Github/NodeJS-Netninja/fileOperations/docs/d.txt","",(err) =>{
        if(err)
            console.log(err);
    });
}