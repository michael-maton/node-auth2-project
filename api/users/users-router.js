const router = require("express").Router();
const bcrypt = require("bcryptjs")
const Users = require("./users-model");

router.get("/users", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/register", (req, res) => {
    const { username, password, department } = req.body;
  
    const hashedPass = bcrypt.hashSync(password, 12);
  
    Users.add({ username, password: hashedPass, department })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
});

module.exports = router;
