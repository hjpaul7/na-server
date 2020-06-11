require("dotenv").config();

const express = require("express"); // importing express
const app = express(); // starts express
const meeting = require("./controllers/meetingcontroller");
const user = require("./controllers/usercontroller");

const sequelize = require("./db");
sequelize.sync({
  force: true,
});

app.use(express.json());
app.use(require("./middleware/headers"));

app.listen(process.env.PORT, () =>
  console.log(`process is listening on ${process.env.PORT}`)
);

app.use("/user", user);
app.use(require("./middleware/validate_session"));
app.use("/meeting", meeting);
