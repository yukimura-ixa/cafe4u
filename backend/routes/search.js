const express = require("express");
const pool = require("../config");


router = express.Router();


//Search speperate image from cafe
router.get("/search", async function (req, res, next) {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        let results = await conn.query(
            "select * from cafe where cafe_name like ?",
            [req.query.like+'%']
        );
        let results1 = await conn.query(
            "select * from image where cafe_id in (select cafe_branchid from cafe where cafe_name like ?)",
            [req.query.like+'%']
        );
        let results2 = await conn.query(
            "select cafe_theme from cafe group by cafe_theme"
        );
      await conn.commit();
      res.json({
          cafe:results[0],
          image:results1[0],
          type:results2[0]
      });
    } catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      conn.release();
    }
});

exports.router = router;
