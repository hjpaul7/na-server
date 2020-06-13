const router = require("express").Router();
const User = require("../db").import("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", (req, res) => {
  console.log(req.body);
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
  }).then(
    (createSuccess = (user) => {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      res.json({
        user: user,
        message: "user created",
        sessionToken: token,
      });
    }),
    (createError = (err) => res.send(500, err))
  );
});

// Login
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then(
    (user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, matches) => {
          if (matches) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24,
            });
            res.json({
              user: user,
              message: "You have succesfully logged in",
              sessionToken: token,
            });
          } else {
            res.status(502).send({ error: "Bad Gateway" });
          }
        });
      } else {
        res.status(500).send({ error: "Failed to authenticate" });
      }
    },
    (err) => res.status(501).send({ error: "Failed to process" })
  );
});

module.exports = router;
