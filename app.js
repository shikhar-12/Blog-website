const express = require('express');
const app = express();
const web = require('./routes/web');
const dbcon = require('./db/dbcon')
const fileupload = require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');
const cookieparser = require('cookie-parser');
const port = 3000;

dbcon();
app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.use(fileupload({useTempFiles:true}));
app.use(express.static("public"));
app.use(session({ secret:'blog',saveUninitialized:false,resave:false}));
app.use(flash());
app.use(cookieparser());
app.use("/",web)

app.listen(3000,()=>{
    console.log("Listening to port 3000")
})