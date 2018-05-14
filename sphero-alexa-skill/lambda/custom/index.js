'use strict';
const Alexa = require('alexa-sdk');
const http = require('http');

var APP_ID = '<insert>';
var SKILL_NAME = 'Sphero Alexa';

const HELP_MESSAGE = "The Sphero skill allows you to control your Sphero device with your voice."+
    "You can change its color, have it make a shape, control its movement, and connect and disconnect it. "+
    "Try saying things like, change the color to blue, or, hop backwards.";
const STOP_MESSAGE = "Lator!";
const REPROMPT = "What would like to do next?";

// Sets the ngrok hostname value from the Lambda Environment Variable
const HOST = process.env.ngrokURL;

exports.handler = function(event, context, callback) {
    // Prints the JSON Request to CloudWatch for easier troubleshooting
    console.log("===EVENT=== \n" + JSON.stringify(event));
    
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'NewSession': function () {
        if (this.event.request.type === 'IntentRequest') {
            this.emit(this.event.request.intent.name);
        } else {
            this.emit('LaunchRequest');
        }
    },
    'LaunchRequest': function () {
        console.log("LaunchRequest");
        
        const rePrompt = "What color would you like your Sphero to change to?";
        const speechOutput = "Entering the Sphero Alexa Skill. "+
            "With this skill, you can control your Sphero through voice. Super Cool, Eh?"+
            "At the moment, I'm only able to change colors, but it's up to you to extend my functionality. "+
            "Let's jump into it! "+
            "I'm programed with 3 colors, Red, Green, Blue. "+rePrompt;
        const cardTitle = "Sphero Alexa Skill";
        const cardContent = "You've entered the Sphero Alexa Skill...";
        const cardImage = {
            "smallImageUrl": "https://s3.amazonaws.com/ask-sample-misc/Sphero-icon-small.png",
            "largeImageUrl": "https://s3.amazonaws.com/ask-sample-misc/Sphero-icon-small.png"
        };
        
        // Sends response with a Card in the Alexa App and prompts user for input
        this.response.speak(speechOutput).listen(rePrompt).cardRenderer(cardTitle, cardContent, cardImage);
        this.emit(':responseReady');
    },
    'SpheroConnect' : function () {
        // Establish connection to Sphero
        console.log('SpheroConnect Intent');
        
        var requestPath = "/sphero/connect";
        var options = {
                host: HOST,
                path: requestPath,
                method: "POST"
            };
        var req = http.request(options, function(res) {
                console.log("Making HTTP request");
                var responseString;
                
                res.on("data", function(data) {
                    responseString += data;
                });
                res.on("end", function() {
                    console.log(responseString);
                    var rePrompt = "What would you like to do now?";
                    var speechOutput = "Ok. Connecting Sphero. Sphero should become a solid color. "+rePrompt;

                    // Sends response and prompts user for input
                    this.response.speak(speechOutput).listen(rePrompt);
                    this.emit(':responseReady');
                });
            });
        req.end();      
    },
    'SpheroDisconnect' : function () {
        // Close Connection with Sphero
        console.log('SpheroDisconnect Intent');
        var requestPath = "/sphero/disconnect";
        var options = {
                host: HOST,
                path: requestPath,
                method: "POST"
            };
        var req = http.request(options, function(res) {
                console.log("Making HTTP request");
                var responseString;
                
                res.on("data", function(data) {
                    responseString += data;
                });
                res.on("end", function() {
                    console.log(responseString);
                    var speechOutput = "Ok. Disconnecting Sphero. See you next time!";

                    // Sends response and prompts user for input
                    this.response.speak(speechOutput);
                    this.emit(':responseReady');
                });
            });
        req.end();
    },
    'SpheroColorOnly': function () {
        console.log('SpheroColorOnly Intent');
        this.emit('SpheroColor');
    },
    'SpheroColor': function () {
        // Change color of Sphero
        console.log('SpheroColor Intent');
       
        // Pull slot values from Request JSON  **look in CloudWatch Logs for full JSON Response
        var uColor = this.event.request.intent.slots.color.value;
 
        var rePrompt = "What color would you like your Sphero to change to?";
        var speechOutput;
        
        console.log("SpheroColor: "+uColor);
        var arr = ['blue', 'green', 'red'];
        
        //Check for valid color choice
        if (arr.indexOf(uColor) == -1) {
            // Invalid Color
            console.log("Invalid Color");
            speechOutput = "Sorry, I can't do "+uColor+"yet. Choose Red, Green or Blue.";
            this.response.speak(speechOutput).listen(rePrompt);
            this.emit(':responseReady');
        } else {
            // Valid Color
            var options = {
                host: HOST,
                path: "/sphero/color/"+uColor,
                method: "POST"
            };
            var req = http.request(options, function(res) {
                console.log("Making HTTP request");
                var responseString;
                
                res.on("data", function(data) {
                    responseString += data;
                });
                res.on("end", function() {
                    console.log(responseString);
                    
                    speechOutput = "Ok. Changing to "+uColor+". Nice. You changed the color. What color next?";
                    this.response.speak(speechOutput).listen(rePrompt);
                    this.emit(':responseReady');
                });
            });
            req.end();
        }
    },
    'SpheroMoveOnly': function () {
        console.log('SpheroMoveOnly Intent');
        this.emit('SpheroMove');
    },
    'SpheroMove': function () {
        // Move Sphero in a shape
        console.log('SpheroMove Intent');
        
        // Pull slot values from Request JSON  **look in CloudWatch Logs for full JSON Response
        var requestedShape = this.event.request.intent.slots.shape.value;
        
        // Reprompt used if user doesn't respond in 8 secs
        var rePrompt = "What would you like to do next?";
        var speechOutput;
        
        // Set path value
        var requestPath = "/sphero/shape/"+requestedShape;
        
        console.log("SpheroMove: "+requestedShape);
        // Build Shape Request
        var options = {
            host: HOST,
            path: requestPath,
            method: "POST"
        };
        var req = http.request(options, function(res) {
            console.log("Making HTTP request");
            var responseString;
                
            res.on("data", function(data) {
                responseString += data;
            });
            res.on("end", function() {
                console.log(responseString);
                speechOutput = "Ok. Sphero moving in a "+requestedShape+". What next?";

                // Sends response and prompts user for input
                this.response.speak(speechOutput).listen(rePrompt);
                this.emit(':responseReady');
            });
        });            
        req.end();
    },
    'AMAZON.HelpIntent': function () {
        console.log('Helo Intent');
        this.response.speak(HELP_MESSAGE+" "+REPROMPT).listen(REPROMPT);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        console.log('Cancel Intent');
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        console.log('Stop Intent');
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'Unhandled' : function () {
        console.log('Unhandled Intent');
        const speechOutput = "Sorry, I didn't get that. "+REPROMPT;
        this.response.speak(speechOutput).listen(REPROMPT);
        this.emit(':responseReady');
    }
};
