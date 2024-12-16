const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
const port = 3000;
app.use(bodyParser.json());

// mysql connection
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "todos",
});
db.connect((err) => {
  if (err) {
    console.log("Mysql connection error", err);
    return;
  }
  console.log("Connected Mysql database Successfylly..");
});

//create todos

app.post("/todo", (req, res) => {
  const sql = `INSERT INTO  todoapp (task,isCompleted) VALUES ("${req.body.task}", False)`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log("Error Inserting data", err);
      res.status(5000).send({ Error: "Failed to create todo" });
    } else {
      const sql = `SELECT * FROM todoapp WHERE id=${result.insertId} LIMIT 1`;
      db.query(sql, (err, result) => {
        if (err) {
          console.log("Error faching Data ", err);
          res.status(500).send({ error: "Unable to Create todos" });
        } else {
          res.status(201).send(result);
        }
      });
    }
  });
});

// get task
app.get("/todo", (req, res) => {
  const sql = ` SELECT * FROM todoapp`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log("Error feching todo", err);
    } else {
      res.send(result);
    }
  });
});
// updated TaskLis
app.put("/todo/:id", (req, res) => {
  const sql = `UPDATE todoapp
  SET task='${req.body.task}', isCompleted=${req.body.isCompleted}
  WHERE id=${req.params.id}`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log("DB Updated error", err);
      res.status(500).send({ message: "Unable to Updated Item" });
    } else {
      const sql = `SELECT * FROM todoapp WHERE id=${req.params.id} LIMIT 1`;
      db.query(sql, (err, result) => {
        if (err) {
          console.log("Error faching Data ", err);
          res.status(500).send({ error: "Unable to Updated todos" });
        } else {
          res.status(201).send(result);
        }
      });
    }
  });
});

// deleted task
app.delete("/todo/:id", (req, res) => {
  const sql = ` SELECT * FROM todoapp WHERE ${req.params.id} `;
  db.query(sql, (err, result) => {
    if (err) {
      console.log("Unable to deleted Item", err);
      res.status(500).send({ error: "unable to deleted item" });
    } else {
      res.status(200).send({ message: "Successfylly deleted item" });
    }
  });
});
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
