// Packages 
var express = require('express'),
	mongoose = require('mongoose'),
	User = require('./models/user'),
	bodyParser = require('body-parser'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	passportLocalMongoose = require('passport-local-mongoose')
	expressSession = require('express-session');



//==================

// App

var app = express();

mongoose.connect("mongodb://localhost/AuthDemo",{ useNewUrlParser: true, useUnifiedTopology: true });

app.use(expressSession({
	secret: "this is an express based auth",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==================

// Routes

app.get('/',function(req,res){
	res.render("home.ejs");
});

app.get('/secret', isLoggedIn, function(req,res){
	res.render("secret.ejs", {name: req.user});
});

app.get('/register',function(req,res){
	res.render("signup.ejs");
});

app.get('/login',function(req,res){
	res.render("login.ejs");
});

app.post('/register',function(req,res){
	console.log("Creating user");
	User.register(new User({username: req.body.username}), req.body.password, function(err,user){
		console.log("Creating user mofo ");
		if(err)return res.render("Run...");
		passport.authenticate("local")(req,res,function(){
			res.redirect('/secret');
		});
	});
});

app.post('/login', passport.authenticate("local", {successRedirect:"/secret", failureRedirect:"/register"}), function(req,res){});

app.get('/logout',function(req,res){
	req.logout();
	res.redirect('/');
})


function isLoggedIn(req, res, next){
	//return next();
	if(req.isAuthenticated()){
		return next();
	}else
	res.redirect('/login');
}



// =================

// Server on port 8000

app.listen(8000,function(){
	console.log("Server has started.....");
});

//============