const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

// now we need to authenticate, testing the connection
sequelize
  .authenticate() // returns a promise
  .then(() => console.log("postgres database is connected")) // promise resolver
  .catch((err) => console.log(err));

// export module to be able to access it in our other files
module.exports = sequelize;
