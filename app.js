// create todos
let todosList = {};
app.post("/todo", (req, res) => {
  const id = Math.floor(Math.random() * 1000);
  let newTodosList = {
    task: req.body.task,
    id: id,
    isCompleted: true,
    createAt: new Date(),
    updateAt: new Date(),
  };
  todosList[id] = newTodosList;
  console.log(todosList);

  res.send(newTodosList);
});

// show todos
app.get("/todo", (req, res) => {
  res.send(todosList);
});
// updated todos
app.put("/todo/:id", (req, res) => {
  let id = req.params.id;
  let todoItem = todosList[id];
  let updatedTodosList = {
    task: req.body.task,
    id: todoItem.id,
    isCompleted: req.body.isCompleted,
    createAt: todoItem.createAt,
    updateAt: new Date(),
  };
  todosList[id] = updatedTodosList;
  res.send(updatedTodosList);
});

app.delete("/todo/:id", (req, res) => {
  let id = req.params.id;
  delete todosList[id];
  res.send({ message: "your todo list is delted", id: id });
});
