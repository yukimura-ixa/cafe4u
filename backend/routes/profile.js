const express = require("express");
const pool = require("../config");

const router = express.Router();

router.get("/profile/:id", async function (req, res, next) {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM `user` WHERE `user_id` = ?', [req.params.id]);
        return res.json(rows);
    } catch (err) {
        return res.status(500).json(err)
    }
});

exports.router = router