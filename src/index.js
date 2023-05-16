const express = require("express");
const authRoutes = require('./routes/route')
const bodyParser = require("body-parser");
const route = require("./routes/route");
const mongoose = require("mongoose");
const passport = require ('passport')
const app = express();
//const LocalStrategy = require('passport-local').Strategy;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://alokgautam:oy9GeF3PH5mGv95i@cluster0.hqxfz.mongodb.net/group56Database-db", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected ✅✅"))
.catch ( err => console.log(err) )

app.use('/', route);
app.use('/auth', authRoutes)


app.listen(process.env.PORT || 3000, function () {
    console.log("Express app running on port" + (process.env.PORT || 3000))
});