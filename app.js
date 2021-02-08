const express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require('passport-local-mongoose'),
    methodOverride = require('method-override'),
    expressSanitizer = require("express-sanitizer"),
    bodyParser = require("body-parser"),
    User = require("./models/user"),
    Item = require("./models/item");

//APP CONFIG
mongoose.set('useFindAndModify', false);
var url = "mongodb+srv://dbadmin:plainsight246@cluster0.039bz.mongodb.net/storage_data?retryWrites=true&w=majority";
mongoose.connect(url, {
    poolSize: 10,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride('_method'));

//PASSPORT
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
    User.find({}, (err, allUsers) => {
        res.render('index', {
            users: allUsers
        });
    });
});

app.get('/newitem', (req, res) => {
    res.render('newitem');
});

app.get('/mystorage', (req, res) => {
    Item.find({}, (err, allItems) => {
        res.render('mystorage', {
            items: allItems
        });
    });
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 5501;
}

http.listen(port, function () {
    console.log("App has started");
});

module.exports = app;