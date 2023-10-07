// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date", function (req, res) {
    const options = {
        weekday: "short", // Short day name (e.g., Fri)
        day: "2-digit", // Two-digit day of the month (e.g., 25)
        month: "short", // Short month name (e.g., Dec)
        year: "numeric", // Full year (e.g., 2015)
        hour: "2-digit", // Two-digit hour (e.g., 00)
        minute: "2-digit", // Two-digit minute (e.g., 00)
        second: "2-digit", // Two-digit second (e.g., 00)
        timeZoneName: "short", // Short time zone name (e.g., GMT)
        hour12: false, // True
        timeZoneName: "short", // Specify the time zone as UTC
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    let reqDate = req.params.date;
    let unixTime = null;
    let date = null;
    let inputDate = null;
    if(/^\d{13}$/.test(reqDate)){
        inputDate = new Date(parseInt(reqDate));
    }else{
        inputDate = new Date(reqDate);
    }
    if(inputDate.toString() === 'Invalid Date'){
        res.json({ error: 'Invalid Date'});

    }else{
        date = new Date(reqDate); // UTC time
        const formatter = new Intl.DateTimeFormat("en-GB", options);
        const unixTime = Math.floor(inputDate.getTime());
        const formattedDate = formatter.format(inputDate);
  
        res.json({
            unix: unixTime,
            utc: formattedDate,
        });
    }

    
    // unixTime = Math.floor(date.getTime() / 1000); //
    
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
