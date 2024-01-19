//Importing normally
// const xyz = require('./people');

// console.log(xyz.peopleProp, xyz.agesProp);

//Importing only selected Properties
// const{peopleProp} = require("./people");
// console.log(peopleProp);

//os already comes exported by default
const os = require("os");

console.log(os.platform(), os.homedir());