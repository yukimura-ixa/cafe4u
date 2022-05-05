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
      "select * from `order` o join cafe using (cafe_branchid) join user u on (emp_id = u.user_id) left outer join promotion p using (pro_id) left outer join product p2 on (p.product_free = p2.product_id) where o.user_id = ?;",
      [parseInt(req.params.user_id)]
    );
    let results2 = await conn.query(
        "select * from order_item  join product using (product_id) where order_id in (select order_id from `order`  where user_id = ?)",
        [parseInt(req.params.user_id)]
      );
    let results3 = await conn.query(
        "select * from image where product_id in (select distinct product_id from order_item  join product using (product_id) where order_id in (select order_id from `order`  where user_id = ?)) \
        or product_id in (SELECT product_id FROM `order` join promotion_product using (pro_id)  where user_id = ?)",
        [parseInt(req.params.user_id),parseInt(req.params.user_id)]
    );
    let results4 = await conn.query(
      "select * from order_item join product_order_item p using (item_no) join product p2 on (p.product_id = p2.product_id) where order_id in (select order_id from `order`  where user_id = ?)",
      [parseInt(req.params.user_id)]
    );
    await conn.commit();
    res.json({
        orders:results[0],
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



// Employee
router.get("/admin/orders/:cafeId", async function (req, res, next) {
    // Begin transaction
    const conn = await pool.getConnection();
    await conn.beginTransaction();
  
    try {
      let results = await conn.query(
        "select * from `order` o join cafe using (cafe_branchid) join user u on (emp_id = u.user_id) left outer join promotion p using (pro_id) left outer join product p2 on (p.product_free = p2.product_id) where o.cafe_branchid = ?;",
        [parseInt(req.params.cafeId)]
      );
      let results2 = await conn.query(
          "select * from order_item  join product using (product_id) where order_id in (select order_id from `order`  where cafe_branchid = ?)",
          [parseInt(req.params.cafeId)]
        );
      let results3 = await conn.query(
          "select * from image where product_id in (select distinct product_id from order_item  join product using (product_id) where order_id in (select order_id from `order`  where cafe_branchid = ?)) \
          or product_id in (SELECT product_id FROM `order` join promotion_product using (pro_id)  where cafe_branchid = ?)",
          [parseInt(req.params.cafeId),parseInt(req.params.cafeId)]
      );
      let results4 = await conn.query(
        "select * from order_item join product_order_item p using (item_no) join product p2 on (p.product_id = p2.product_id) where order_id in (select order_id from `order`  where cafe_branchid = ?)",
        [parseInt(req.params.cafeId)]
      );
      await conn.commit();
      res.json({
          orders:results[0],
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


//Both Use
router.put("/admin/orders/:orderId", async function (req, res, next) {


    const conn = await pool.getConnection();
    await conn.beginTransaction();
  
    try {
      if(req.body.toStatus == 'pending'){
        await conn.query(
          "update `order` set order_status = ?, emp_id = ? where order_id = ?",
          [req.body.toStatus,req.body.user.user_id,parseInt(req.params.orderId)]
        );
      }
      else{

        await conn.query(
          "update `order` set order_status = ?  where order_id = ?",
          [req.body.toStatus,parseInt(req.params.orderId)]
        );
      }
        let results = await conn.query(
            "select * from `order` o join cafe using (cafe_branchid) join user u on (emp_id = u.user_id) left outer join promotion p using (pro_id) left outer join product p2 on (p.product_free = p2.product_id) where o.order_id = ?;",
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
