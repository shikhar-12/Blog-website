const mongoose = require('mongoose');
const local_url = 'mongodb://127.0.0.1:27017/BlogProject';

const condb = ()=>{
return mongoose.connect(local_url)
.then(()=>{console.log("Blog Database Connectivity Successfull...")})
.catch((error)=>{console.log(error)});
}
module.exports = condb;