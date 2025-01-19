const logger = require("../utils/logger");

const router = require("express").Router();


router.get("/users", (req, res) => {
  logger.info("User List")
  res.json({
    name: "Ashab",
    age: 24,
  });
});

router.post("/users", (req, res, next) => {
  try {
    const { name, age } = req.body;
    if (!name || !age) {
      throw new Error("Name and age required");
    }
    res.json({ message: "User create successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
