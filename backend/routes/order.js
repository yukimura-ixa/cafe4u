const express = require("express");
const pool = require("../config");


router = express.Router();


// Customer
router.get("/orders/:user_id", async function (req, res, next) {
  // Begin transaction
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    let results = await conn.query(
      "select * from `order` o join cafe using (cafe_branchid) join user u on (emp_id = u.user_id) left outer join promotion using (pro_id) where o.user_id = ?;",
      [parseInt(req.params.user_id)]
    );
    let results2 = await conn.query(
        "select * from order_item  join product using (product_id) where order_id in (select order_id from `order`  where user_id = ?)",
        [parseInt(req.params.user_id)]
      );
    await conn.commit();
    res.json({
        orders:results[0],
        order_item:results2[0]
    });
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
});



// Employee
router.get("/admin/orders/:cafeId", async function (req, res, next) {
    // Begin transaction
    const conn = await pool.getConnection();
    await conn.beginTransaction();
  
    try {
      let results = await conn.query(
        "select * from `order` o join cafe using (cafe_branchid) join user u on (emp_id = u.user_id) left outer join promotion using (pro_id) where o.cafe_branchid = ?;",
        [parseInt(req.params.cafeId)]
      );
      let results2 = await conn.query(
          "select * from order_item  join product using (product_id) where order_id in (select order_id from `order`  where cafe_branchid = ?)",
          [parseInt(req.params.cafeId)]
        );
      await conn.commit();
      res.json({
          orders:results[0],
          order_item:results2[0]
      });
    } catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      conn.release();
    }
  });


//Both Use
router.put("/admin/orders/:orderId", async function (req, res, next) {


    const conn = await pool.getConnection();
    await conn.beginTransaction();
  
    try {
        await conn.query(
          "update `order` set order_status = ?  where order_id = ?",
          [req.body.toStatus,parseInt(req.params.orderId)]
        );
        let results = await conn.query(
            "select order_id,order_status from `order`  where order_id = ?",
            [parseInt(req.params.orderId)]
        );
      await conn.commit();
      res.json({
          newstatus:results[0]
      });
    } catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      conn.release();
    }
});

exports.router = router;
