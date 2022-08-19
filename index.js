var express = require("express");
const birds = require("./birds");
var app = express();
var PORT = 8000;

const logged = function (req, res, next) {
  console.log("LOGGED");
  next();
};

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
//3 handlers for 1 route of book
const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};
app
  .route("/book")
  //   .use(logged)
  .get(requestTime, (req, res) => {
    res.send(`Get a random book at time ${req.requestTime} `);
  })
  .post((req, res) => {
    res.send("Add a book");
  })
  .put((req, res) => {
    res.send("Update the book");
  });

//middelware for time request

app.use(requestTime);

app.get("/", (req, res) => {
  let responseText = "Hello World!  ";
  responseText += `Requested at: ${req.requestTime}`;
  res.send(responseText);
});

app.use("/birds", birds);

app.listen(PORT, () =>
  console.log(`app is Running on http://localhost:${PORT}`)
);
