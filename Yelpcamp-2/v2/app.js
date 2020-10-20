
var express = require('express');
var app = express();
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
var request = require('request');

mongoose.connect("mongodb://localhost/Yelpcamp",{ useNewUrlParser: true, useUnifiedTopology: true });

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
});

var Campground = mongoose.model("Campground",campgroundSchema);

// Campground.create({
// 	name: "Weed camp",
// 	image: "https://q-cf.bstatic.com/images/hotel/max1024x768/164/164526298.jpg"
// });

// var camps = [
// 	{name:"Weed camp", image:"https://q-cf.bstatic.com/images/hotel/max1024x768/164/164526298.jpg"},
// 	{name:"coke camp", image:"https://q-cf.bstatic.com/images/hotel/max1024x768/176/176776570.jpg"},
// 	{name:"advanced", image:"https://q-cf.bstatic.com/images/hotel/max1024x768/176/176776570.jpg"},
// 	{name:"regular", image:"https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/2017/08/18121829/17082017_camping_01.jpg"},
// 	{name:"Gold", image:"https://images.oyoroomscdn.com/uploads/hotel_image/56860/adf16c2be41a74df.jpg"},
// 	{name:"Weed camp", image:"https://q-cf.bstatic.com/images/hotel/max1024x768/164/164526298.jpg"},
// 	{name:"coke camp", image:"https://q-cf.bstatic.com/images/hotel/max1024x768/176/176776570.jpg"},
// 	{name:"advanced", image:"https://q-cf.bstatic.com/images/hotel/max1024x768/176/176776570.jpg"},
// 	{name:"regular", image:"https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/2017/08/18121829/17082017_camping_01.jpg"},
// 	{name:"Gold", image:"https://images.oyoroomscdn.com/uploads/hotel_image/56860/adf16c2be41a74df.jpg"},
// 	{name:"coke camp", image:"https://q-cf.bstatic.com/images/hotel/max1024x768/176/176776570.jpg"},
// 	{name:"advanced", image:"https://q-cf.bstatic.com/images/hotel/max1024x768/176/176776570.jpg"},
// 	{name:"regular", image:"https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/2017/08/18121829/17082017_camping_01.jpg"},
// 	{name:"Gold", image:"https://images.oyoroomscdn.com/uploads/hotel_image/56860/adf16c2be41a74df.jpg"}
// ];

app.get("/",function(req,res){
	res.render("home.ejs");
});

app.get("/campgrounds",function(req,res){
	Campground.find({},function(err, allcamp){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds.ejs",{camps: allcamp})
		}
	})
	// res.render("campgrounds.ejs",{camps: camps});
});

app.get("/campgrounds/new",function(req,res){
	res.render("new.ejs");
});

app.post("/campgrounds",function(req,res){
	var cname = req.body.name;
	var cimg = req.body.image;
	//camps.push({name:cname,image:cimg});
	var cnew = {name:cname, image:cimg};
	Campground.create(cnew);
	res.redirect("/campgrounds");
});

app.listen(3000);