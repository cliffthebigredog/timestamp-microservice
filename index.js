// index.js
// where your node app starts

// project instructions here 
// (https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/timestamp-microservice)

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const moment = require('moment');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//API endpoint for date
app.get("/api/:date", function (req, res) {

  // if date is of format 2015-12-25
  if(req.params.date.includes("-")) {
    const dateRouteParam = new Date(req.params.date)
    res.json({
      unix: dateRouteParam.getTime(), 
      utc: dateRouteParam.toUTCString()
    });
  }

  //for unix timestamps
  else {
    const unixToUTC = new Date();  //init date object
    const unix = parseInt(req.params.date)
    unixToUTC.setTime(unix)  

    res.json({
      unix: unix,
      utc: unixToUTC.toUTCString()
    });
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
