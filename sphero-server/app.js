const express = require('express');  
const app = express();

var queue = [];

require('./router')(app, queue); 

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.listen(3000, function () {
  console.log('Listening on port 3000');
});

app.get('/', function (request, response) {
    response.send('Hello this is my web server');
});

app.get('/test', function (request, response) {
    console.log(' /test Request - Local Server is Running');
    response.json({ status: 'Local Server Running'});
});


setInterval(function(){
	if(queue.length > 0){
    console.log(JSON.stringify(queue));
		handleQueue(queue.shift());
	}
}, 1000);

function handleQueue(callbackFunction){

	callbackFunction();
}

module.exports = app;