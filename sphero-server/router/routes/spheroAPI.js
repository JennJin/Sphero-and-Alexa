"use strict";
var sphero = require("../core/spheroCore");

var routes = function (app, queue) {
	
    // Request to Connect
	app.post('/sphero/connect', function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");

		try {
			console.log(new Date()+"API + [" + req.url + "]");

			// Connect
			queue.push(function () { sphero("connect"); });
		} catch (ex) {
			res.status(500).json({ error: "Something went wrong!", details: ex });
			return;
		}
            res.status(202).end();
      });
      
    // Request to Disconnect
	app.post('/sphero/disconnect', function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");

		try {
			//var color = "magenta";
			console.log(new Date()+" API + [" + req.url + "]");

			// Disconnect
			queue.push(function () { sphero("disconnect"); });
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

			// Let's make some shapes
			queue.push(function () { sphero("shape", shape); });
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
			queue.push(function () { sphero("color", color); });
		} catch (ex) {
			res.status(500).json({ error: "Something went wrong!", details: ex });
			return;
		}
            res.status(202).end();
      });
      
      
	// Request to Stop
	app.post('/sphero/stop', function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");

		try {
			console.log(new Date()+" API + [" + req.url + "]");

			// Stop Sphero from moving
			queue.push(function () { sphero("stop"); });
		} catch (ex) {
			res.status(500).json({ error: "Something went wrong!", details: ex });
			return;
		}
            res.status(202).end();
      });
};

module.exports = routes;  