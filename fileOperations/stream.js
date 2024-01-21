const fs = require("fs");

const readStream = fs.createReadStream("./Github/NodeJS-Netninja/fileOperations/docs/blog2.txt", {encoding: "utf-8"});
const writeStream = fs.createWriteStream("./Github/NodeJS-Netninja/fileOperations/docs/blog3.txt")

// readStream.on("data", (chunk) =>
// {
//     console.log("-------------------------------NEW CHUNK---------------------");
//     console.log(chunk);
//     writeStream.write(chunk);
//     writeStream.write("\n New Chunk \n");
// })

//piping
readStream.pipe(writeStream);