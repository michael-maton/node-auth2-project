const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("./users-model");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/secrets");

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

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const checkingUser = await Users.findBy({ username }).first();
    if (checkingUser && bcrypt.compareSync(password, checkingUser.password)) {
      const token = generateToken(checkingUser);
      res.json({ message: "welcome back", token });
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  } catch {
    res.status(500).json({ message: "username or password incorrect" });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
