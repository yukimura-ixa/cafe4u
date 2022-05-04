const express = require("express");
const pool = require("../config");


router = express.Router();


// Customer
router.get("/order/:order_id", async function (req, res, next) {
  // Begin transaction
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    let results = await conn.query(
      "select * from `order` o join cafe using (cafe_branchid) left outer join promotion p using (pro_id) left outer join product p2 on (p.product_free = p2.product_id) where o.order_id = ?;",
      [parseInt(req.params.order_id)]
    );
    let results2 = await conn.query(
        "select * from order_item  join product using (product_id) where order_id = ?",
        [parseInt(req.params.order_id)]
      );
    let results3 = await conn.query(
        
        "select * from image where product_id in (select product_id from order_item  join product using (product_id) where order_id = ?) \
        or product_id in (SELECT product_id FROM `order` join promotion_product using (pro_id)  where order_id = ?)\
        ",
        [parseInt(req.params.order_id),parseInt(req.params.order_id)]
    );
    let results4 = await conn.query(
        
        "select * from order_item join product_order_item p using (item_no) join product p2 on (p.product_id = p2.product_id) where order_id = ?",
        [parseInt(req.params.order_id)]
    );
    await conn.commit();
    res.json({
        order:results[0],
        order_item:results2[0],
        image:results3[0],
        option:results4[0]
    });
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
});






exports.router = router;
