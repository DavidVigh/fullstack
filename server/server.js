const express = require("express");
const app = express();

app.use(express.json());

// Environment variables import
const dotenv = require("dotenv").config().parsed;
const port = dotenv.PORT;

// Node environment import
const process = require("process");
const NODE_ENV = process.env.NODE_ENV || "development";

const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:3000", 
    "http://127.0.0.1:3000",
    "http://10.90.206.250" // replace with your actual local IP
  ],
  credentials: true,
}));

const db = require("./models");
// Routers

const userRouter = require("./routes/User");
app.use("/users", userRouter);

const postRouter = require("./routes/Post");
app.use("/posts", postRouter)

const tagRouter = require("./routes/Tag");
app.use("/tags", tagRouter);

const postTagRouter = require("./routes/PostTag");
app.use("/postTags", postTagRouter);

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
