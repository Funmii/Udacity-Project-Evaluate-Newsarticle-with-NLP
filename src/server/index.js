var dotenv = require('dotenv');
dotenv.config();
var path = require("path");

const mockAPIResponse = require("./mockAPI.js");

// Aylien API
var aylienApi = require("aylien_textapi")
var aylienapi = new aylienApi({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
})

const express = require("express");
const app = express();


app.use(express.static("dist"));
// Configure express to use cors
const cors = require("cors");
app.use(cors());


const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

// Set up  POST Route (Client sending data to Server)
app.post("/sendText", function (req, res) {
  textapi.sentiment({
    'url': req.body.url
  }, function (error, textResults) {
    if (error === null) {
      console.log("Success: You got the Aylien results");
      res.send(textResults);
      console.log(textResults);
    } else {
      console.log("Error: Aylien request not successful");
      console.log(error);
      return;
    }
  });
});