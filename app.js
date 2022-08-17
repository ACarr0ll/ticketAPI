const express = require("express");
require("dotenv").config();
const cors = require("cors");

const dbo = require("./config/db");

const path = require("path");

const usersRouter = require("./routes/users");
const ticketsRouter = require("./routes/tickets");

const app = express();
app.use(cors());
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("Access-Control-Allow-Origin", "*");

app.use("/users", usersRouter);
app.use("/tickets", ticketsRouter);

dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }
});

app.get("/api/ticket/:id", async (req, res) => {
  const ticketID = req.params.id;

  const dbConnect = dbo.getDb();

  const ticket = await dbConnect
    .collection("tickets")
    .findOne({ id: ticketID });
  res.send(ticket);
});

app.get("/api/tickets", async (req, res) => {
  const dbConnect = dbo.getDb();
  const result = await dbConnect.collection("tickets").find({}).toArray();

  res.json(result);
});

app.post("/api/ticket/new", async (req, res) => {
  const dbConnect = dbo.getDb();
  console.log(req.body);
  const newTicket = {
    id: req.body.id,
    subject: req.body.subject,
    description: req.body.description,
  };

  const success = await dbConnect.collection("tickets").insertOne(newTicket);
  res.sendStatus(200);
  console.log("SUCCESS");
});

app.post("/api/ticket/update", async (req, res) => {
  const dbConnect = dbo.getDb();
  const updateTicket = {
    id: "5",
    subject: "Testing update method",
    description: "testing the update method through app.post",
  };
  const success = await dbConnect
    .collection("tickets")
    .replaceOne({ id: "1" }, updateTicket);
  res.sendStatus(200);
});

app.delete("/api/ticket/delete/:id", async (req, res) => {
  const dbConnect = dbo.getDb();
  const ticketID = req.params.id;

  dbConnect.collection("tickets").deleteOne({ id: ticketID });
  res.sendStatus(200);
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
