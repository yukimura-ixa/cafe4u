const express = require("express");
const pool = require("../config");

router = express.Router();

router.put("/cart", async function (req, res, next) {
  // Begin transaction
  var product = [];
  var option = [];
  var toFind = req.body.toFind;
  console.log(toFind);
  for (var i = 0; i < toFind.length; i++) {
    product.push(toFind[i].product_id);

    if (toFind[i].option != null) {
      option.push(toFind[i].option);
    }
  }
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    let results = await conn.query(
      "select * from product where product_id in (?)",
      [product]
    );
    let results2 = [[]];
    if (option.length > 0) {
      results2 = await conn.query(
        "select * from image where product_id in (?) or product_id in (?)",
        [product, option]
      );
    }
    let results3 = [[]];
    if (option.length > 0) {
      results3 = await conn.query(
        "select * from product where product_id in (?)",
        [option]
      );
    }

    let results4 = await conn.query(
      "select * from promotion  left outer join promotion_product p using (pro_id) left outer join product p2 on (p.product_id = p2.product_id) where pro_id in (select pro_id from cafe_promotion where cafe_branchid in (select cafe_id from product where product_id in (?)))",
      [product]
    );
    let results5 = await conn.query(
      "select distinct cafe_branchid from cafe_promotion where cafe_branchid in (select cafe_id from product where product_id in (?))",
      [product]
    );
    await conn.commit();
    res.json({
      product: results[0],
      image: results2[0],
      option: results3[0],
      promotion: results4[0],
      cafeid: results5[0],
    });
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
});

exports.router = router;
