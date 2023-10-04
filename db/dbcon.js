const mongoose = require('mongoose');
const local_url = 'mongodb://127.0.0.1:27017/BlogProject';
const live_url = 'mongodb+srv://shikhars74:shikhar123@admissioncluster.a378mpj.mongodb.net/?retryWrites=true&w=majority';

const condb = ()=>{
return mongoose.connect(live_url)
.then(()=>{console.log("Blog Database Connectivity Successfull...")})
.catch((error)=>{console.log(error)});
}
module.exports = condb;