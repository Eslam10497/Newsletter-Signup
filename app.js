/////////////////////////////////////////////////// npm Packages initialization ////////////////////////////////////////
//Express
require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
//Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
/////////////https
const https = require("https");
////////////////////////////////////////////////// End of npm initialization /////////////////////////////////////////

/////////////////////////////////////////////////  Main /////////////////////////////////////////////////////////////
app.use(express.static("Public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
  const firstName = req.body.first;
  console.log("🚀 ~ file: app.js ~ line 18 ~ app.post ~ firstName", firstName);
  const lastName = req.body.last;
  console.log("🚀 ~ file: app.js ~ line 18 ~ app.post ~ last Name", lastName);
  const email = req.body.email;
  console.log("🚀 ~ file: app.js ~ line 18 ~ app.post ~ email", email);
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const ans = JSON.stringify(data);
  const url = "https://us8.api.mailchimp.com/3.0/lists/519bc1f85f";
  const options = {
    method: "POST",
    auth: process.env.AUTH,
  };
  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log("🚀 ~ file: app.js ~ line 46 ~ response.on ~ JSON.parse(data)", JSON.parse(data));
    });
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  });
  request.write(ans);
  request.end();
});
app.post("/failure", function (req, res) {
  res.redirect("/");
});
app.listen(process.env.PORT || 3000, function () {
  console.log("🚀 ~ file: app.js ~ line 19 ~ app.listen ~ , Server is running on port 3000 or on the server");
});
//app key = 70784b8b4a11f5d9d0540ade379475f8-us8
//audience id = list if = 519bc1f85f
