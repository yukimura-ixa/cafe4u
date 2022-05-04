const express = require("express");
const pool = require("../config");

const router = express.Router();

router.get("/promotion", async function (req, res, next) {
    try {
        const [rows, fields] = await pool.query("SELECT * FROM promotion");
        return res.json(rows);
    } catch (err) {
        return res.status(500).json(err)
    }
});

exports.router = router