var express = require("express");
const birds = require("./birds");
var app = express();
var PORT = 8000;

const middels = require("./middels");

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

app
  .route("/book")
  //   .use(logged)
  .get(middels.requestTime, (req, res) => {
    res.send(`Get a random book at time ${req.requestTime} `);
  })
  .post((req, res) => {
    res.send("Add a book");
  })
  .put((req, res) => {
    res.send("Update the book");
  });

//middelware for time request

app.use(middels.requestTime);

app.get("/", (req, res) => {
  let responseText = "Hello World!  ";
  responseText += `Requested at: ${req.requestTime}`;
  res.send(responseText);
});

app.use("/birds", birds);
// route skipping
app.get(
  "/user/:id",
  (req, res, next) => {
    // if the user ID is 0, skip to the next route
    if (req.params.id === "0") next("route");
    // otherwise pass the control to the next middleware function in this stack
    else next();
  },
  (req, res, next) => {
    // send a regular response
    res.send("regular");
  }
);

// handler for the /user/:id path, which sends a special response
app.get("/user/:id", (req, res, next) => {
  res.send("special");
});

app.listen(PORT, () =>
  console.log(`app is Running on http://localhost:${PORT}`)
);
