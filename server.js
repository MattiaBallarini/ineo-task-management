const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router(path.join(__dirname, "db", "db.json"));

const delay = 1000;

const statuses = ["todo", "progress", "done"];

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

server.get("/tasks/status", (req, res) => {
  setTimeout(() => {
    res.jsonp(statuses);
  }, delay);
});

server.get("/tasks", (req, res) => {
  const from = req.query.from ? new Date(req.query.from) : null;
  const to = req.query.to ? new Date(req.query.to) : null;

  let tasks = router.db.get("tasks").value();

  if (from || to) {
    tasks = tasks.filter((task) => {
      const taskDate = new Date(task.date);
      return (!from || taskDate >= from) && (!to || taskDate <= to);
    });
  }

  tasks.sort((a, b) => new Date(a.date) - new Date(b.date));

  setTimeout(() => {
    res.json(tasks);
  }, delay);
});

server.post("/tasks", (req, res, next) => {
  setTimeout(() => next(), delay);
});

server.put("/tasks/:id", (req, res, next) => {
  setTimeout(() => next(), delay);
});

server.delete("/tasks/:id", (req, res, next) => {
  setTimeout(() => next(), delay);
});

server.use(router);

const port = 3000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
