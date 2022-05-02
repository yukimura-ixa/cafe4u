const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/", async function (req, res, next) {
  res.json({test:'OK'})
});

exports.router = router;
