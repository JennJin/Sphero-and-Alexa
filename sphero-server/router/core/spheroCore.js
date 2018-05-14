// Sphero SDK - Javascript
// http://sdk.sphero.com/community-apis/javascript-sdk/

"use strict";

var sphero = require("sphero");

// *** Configure Sphero Port Here ***
// var orb = sphero("COM4") //windows
// var orb = sphero("/dev/tty.Sphero-BRB-AMP-SPP"); // mac

var orb = sphero("<Sphero Port>");


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
    
    if (command === "stop") {
        stop();
    }   
}

// Connect Command
var connect = function () {
    orb.connect(function() {
        console.log("::SPHERO CONNECTED::");
        orb.color("magenta");
    });
};

// Disconnect Command
var disconnect = function () {
    orb.disconnect(function() {
        console.log("::SPHERO DISCONNECTED::");
    });
};

// Stop Command
var stop = function () {
    orb.stop(function() {
        console.log("::SPHERO STOPPED::");
    });
};

// Stop in Disconnect
var stopOnDisconnect = function () {
    orb.stopOnDisconnect(function() {
        console.log("::SPHERO STOP on DISCONNECT:");
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
    
    // Short Hop
    if (shape === "hop") {
        
        // Roll One Way:
        console.log("Sphero Hop North");
        orb.roll(15, 0);//North
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