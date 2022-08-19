var express = require("express");
var app = express();
var PORT = 8000;

app.get("/", (req, res) => {
  res.status(200).send({ name: "Hello World!" });
});
// respond on multiple B after a and vefore cd
app.get("/ab+cd", (req, res) => {
  res.send("ab+cd");
});
//start with ab and end with cd
app.get("/ab*cd", (req, res) => {
  res.send("ab*cd");
});
app.get("/user", (req, res) => {
  res.send("Got a get request at /user");
});

app.listen(PORT, () =>
  console.log(`app is Running on http://localhost:${PORT}`)
);
