"use strict";


//var sphero = require("../../../");
var sphero = require("sphero");
var orb = sphero("/dev/tty.Sphero-PBB-AMP-SPP");


var TORK = 75;
var NORTH = 0;
var EAST = 90;
var SOUTH = 180;
var WEST = 270;


function commander(command, param) {

    if (command === "shape") {
        console.log("Command Sphero to make shapes... [" + param + "]");
        move(param);
    }

    if (command === "color") {
        console.log("Command Sphero to change colouring... [" + param + "]");
        color(param);
    }
    
    if (command === "connect") {
        connect();
    }
    
    if (command === "disconnect") {
        disconnect();
    }
        
}

// Connect Command
var connect = function () {
    orb.connect(function() {
        console.log("::SPHERO CONNECTING::");
        orb.color("magenta");
    });
};

// Disconnect Command
var disconnect = function () {
    orb.disconnect(function() {
        console.log("::SPHERO DISCONNECTED::");
    });
};

// Move in a Shape Command
var move = function (shape) {
    
    // Let's make shapes:

    // Square
    if (shape === "square") {

        // First move North:
        console.log("Rolling Sphero North");
        orb.roll(75, 0);//North

        // Second move:
        console.log("Rolling Sphero East");
        orb.roll(75, 90);

        // Third move:
        console.log("Rolling Sphero South");
        orb.roll(75, 180);

        // Fourth move:
        console.log("Rolling Sphero West and back to original point");
        orb.roll(75, 270);//West
    }
    // Triangle
    if (shape === "triangle") {

        // First Leg:
        console.log("Rolling Sphero 45 degrees");
        orb.roll(75, 45);//45 degrees

        // Second Leg:
        console.log("Rolling Sphero 135 degrees");
        orb.roll(75, 135);//135 degrees

        // Third Leg:
        console.log("Rolling Sphero 270 degrees");
        orb.roll(75, 270);//270 degrees
    }
    // Line  
    if (shape === "line") {
        
        // Roll One Way:
        console.log("Rolling Sphero North");
        orb.roll(75, 0);//North

        // Roll Back:
        console.log("Rolling Sphero South");
        orb.roll(75, 180);
    }
    

};

//Change the Color
var color = function (theColor) {
    console.log("::Changing Sphero Color to "+theColor+"::");
    orb.color(theColor);
};


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



module.exports = commander;