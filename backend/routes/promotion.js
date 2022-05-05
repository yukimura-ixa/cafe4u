const express = require("express");
const pool = require("../config");

const router = express.Router();

router.get("/promotion", async function (req, res, next) {
    try {
        const [rows, fields] = await pool.query("SELECT * FROM promotion left outer join promotion_product using(pro_id)");
        return res.json(rows);
    } catch (err) {
        return res.status(500).json(err)
    }
});


router.post("/promotion/add/:id", async function (req, res, next) {
    const pro_detail = req.body.pro_detail;
    const pro_type = req.body.pro_type;
    const product_free_id = req.body.product_free_id;
    const product_count_need = req.body.product_count_need;
    const discount = req.body.discount;
    const need_point = req.body.need_point;
    const need_price = req.body.need_price;
    const buy_count_need = req.body.buy_count_need;
    const product_id = req.body.product_id;

    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try {
        await conn.query(
            "INSERT INTO promotion(pro_id, pro_detail, pro_type, discount, buy_count_need, buy_price_need, point_need, product_free, product_count_need) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);",
            [req.params.id, pro_detail, pro_type, discount, buy_count_need, need_price, need_point, product_free_id, product_count_need]
        );
        if (product_id != null) {
            await conn.query(
                "INSERT INTO promotion_product(pro_id, product_id) VALUES(?, ?);",
                [req.params.id, product_id]
            );
        }
        console.log("yes")
        await conn.commit();
        res.send("success!");
    } catch (err) {
        console.log(req.body)
        console.log(req.params.id)
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }
});

router.delete('/promotion/:id', async function (req, res, next) {
    try {
        const [rows1, _] = await pool.query('SELECT * FROM promotion_product WHERE pro_id=?;', [req.params.id])
        if (rows1.length > 0) {
            await pool.query("DELETE FROM promotion_product WHERE pro_id=?;",[req.params.id])
        }
        await pool.query('DELETE FROM promotion WHERE pro_id=?;', [req.params.id])
        res.json("success")
    } catch (error) {
        res.status(500).json(error)
    }
});

exports.router = router