var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a user");
});

router.post("/users", (req, res, next) => {
  return res.send("POST HTTP method on user resource");
});

router.put("/:userId", (req, res, next) => {
  return res.send(`PUT HTTP method on users/${req.params.userId} resource`);
});

router.delete("/:userId", (req, res, next) => {
  return res.send(`DELETE HTTP method on users/${req.params.userId} resource`);
});

module.exports = router;
