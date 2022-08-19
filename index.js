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
// more than 1 handlers
// end with fly
app.get(
  /.*fly$/,
  (req, res, next) => {
    console.log("the response will be sent by the next function ...");
    next();
  },
  (req, res) => {
    res.send("Hello from 2nd handler of fly!");
  }
);

app
  .route("/book")
  .get((req, res) => {
    res.send("Get a random book");
  })
  .post((req, res) => {
    res.send("Add a book");
  })
  .put((req, res) => {
    res.send("Update the book");
  });

app.listen(PORT, () =>
  console.log(`app is Running on http://localhost:${PORT}`)
);
