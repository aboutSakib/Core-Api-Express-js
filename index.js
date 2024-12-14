const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
app.use(bodyParser.json());

//create todos
let taskList = {};
app.post("/todo", (req, res) => {
  const id = Math.floor(Math.random() * 100);
  let newTaskList = {
    id: id,
    task: req.body.task,
    isCompleted: true,
    CreateAt: new Date(),
    updatedAt: new Date(),
  };
  taskList[id] = newTaskList;
  res.send(newTaskList);
});

// get task
app.get("/todo", (req, res) => {
  res.send(taskList);
});
// updated TaskLis
app.put("/todo/:id", (req, res) => {
  let id = req.params.id;
  let taskItem = taskList[id];
  let updatedTaskList = {
    id: taskItem.id,
    task: req.body.task,
    isCompleted: req.body.isCompleted,
    CreateAt: new Date(),
    updatedAt: req.body.updatedAt,
  };
  taskList[id] = updatedTaskList;
  res.send(updatedTaskList);
});

// deleted task
app.delete("/todo/:id", (req, res) => {
  let id = req.params.id;
  delete taskList[id];
  res.send({ Message: "Your Task already deleted", id: id });
});
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
