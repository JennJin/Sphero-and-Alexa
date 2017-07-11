"use strict";
var sphero = require("../core/spheroCore");


var routes = function (app, queue) {
	
      // Request to Connect
	app.post('/sphero/connect', function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");

		try {
			var color = "magenta";
			console.log(new Date()+"API + [" + req.url + "]");

			// Let's change color:
			queue.push(function () { sphero("connect", color) });

		} catch (ex) {
			res.status(500).json({ error: "Something went wrong!", details: ex });
			return;
		}
            res.status(202).end();
      });
      
      // Request to Disonnect
	app.post('/sphero/disconnect', function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");

		try {
			var color = "magenta";
			console.log(new Date()+" API + [" + req.url + "]");

			// Let's change color:
			queue.push(function () { sphero("disconnect", color) });

		} catch (ex) {
			res.status(500).json({ error: "Something went wrong!", details: ex });
			return;
		}
            res.status(202).end();
      });
	
      // Request for Sphero to move in a shape
      app.post('/sphero/shape/:shape', function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");

		try {
			var shape = req.params.shape;
			console.log("API + [" + req.url + "]");

			// Let's make some shapes with colors:
			queue.push(function () { sphero("shape", shape) });

		} catch (ex) {
			res.status(500).json({ error: "Something went wrong!", details: ex });
			return;
		}
            res.status(202).end();
      });
      
      // Request to Change Sphero Color
      app.post('/sphero/color/:color', function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");

		try {

			var color = req.params.color;

			console.log(new Date()+"API + [" + req.url + "]");

			// Let's change color:
			queue.push(function () { sphero("color", color) });

		} catch (ex) {
			res.status(500).json({ error: "Something went wrong!", details: ex });
			return;
		}
            res.status(202).end();
      });
      
      // Request to Stop Sphero
       // Request to Disonnect
	app.post('/sphero/stop', function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");

		try {
			var color = "";
			console.log(new Date()+" API + [" + req.url + "]");

			// Let's change color:
			queue.push(function () { sphero("stop", color) });

		} catch (ex) {
			res.status(500).json({ error: "Something went wrong!", details: ex });
			return;
		}
            res.status(202).end();
      });

};

module.exports = routes;  