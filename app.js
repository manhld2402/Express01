const express = require("express");
const app = express();
const port = 3001;
const fs = require("fs");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//GET toàn bộ data users
app.get("/api/v1/users", (req, res) => {
  fs.readFile(`${__dirname}/data/users.json`, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ err: err }));
    } else {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      console.log(JSON.parse(data));
      res.json(JSON.parse(data));
    }
  });
});

//GET ONE data user
app.get("/api/v1/users/:id", (req, res) => {
  fs.readFile(`${__dirname}/data/users.json`, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json(JSON.stringify({ err: err }));
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      let resultCheck = JSON.parse(data).find((e) => e._id == req.params.id);
      console.log(resultCheck);
      //   console.log(JSON.parse(data));
      res.json(resultCheck);
    }
  });
});

//POST request
app.post("/api/v1/users", (req, res) => {
  fs.readFile(`${__dirname}/data/users.json`, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json(err);
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      let checkId = JSON.parse(data).find((e) => e._id == req.body._id);
      if (checkId) {
        res.json({ message: "User already exists" });
      } else {
        let newData = [...JSON.parse(data), req.body];
        console.log(newData);
        fs.writeFile(
          `${__dirname}/data/users.json`,
          JSON.stringify(newData),
          (err) => {
            if (err) {
              res.json(err);
            } else {
              res.json({ message: "Create successfully" });
            }
          }
        );
      }
    }
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
