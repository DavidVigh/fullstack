const express = require("express");
const app = express();

app.use(express.json());

// Environment variables import
const dotenv = require("dotenv").config().parsed;
const port = dotenv.PORT;

// Node environment import
const process = require("process");
const NODE_ENV = process.env.NODE_ENV || "development";

const db = require("./models");
// Routers
const userRouter = require("./routes/Users");
app.use("/users", userRouter);

// Sequelize sync based on environment
const syncOptions = NODE_ENV === 'development' ? { alter: true } : {};
db.sequelize.sync(syncOptions).then(() => {
  console.log(`Database synced (${NODE_ENV})`);
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(err => {
  console.error("Database sync failed:", err);
});
