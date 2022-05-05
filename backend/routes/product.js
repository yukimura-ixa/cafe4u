const express = require("express");
const pool = require("../config");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./static/uploads/products");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router = express.Router();

router.get("/cafe/:id/product", function (req, res, next) {
  const promise1 = pool.query(
    "SELECT * FROM product left outer join image using (product_id) WHERE product.cafe_id=?",
    [req.params.id]
  );
  const promise2 = pool.query("SELECT * FROM cafe WHERE cafe_branchid=?", [
    req.params.id,
  ]);

  Promise.all([promise1, promise2])
    .then((results) => {
      const [products, blogFields] = results[0];
      const [cafe, cafeFields] = results[1];
      res.json({
        products: products,
        cafe: cafe[0],
        error: null,
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

//add product
router.post(
  "/product/:cafe_id",
  upload.single("productImage"),
  async function (req, res, next) {
    const cid = req.params.cafe_id;
    const file = req.file;
    const name = req.body.name;
    const desc = req.body.desc;
    const price = req.body.price;
    var type = req.body.type;

    console.log("INSERTING", cid, file, name, desc, price, type);
    if (type === "") {
      type = null;
      console.log("type is null");
    }

    if (!file) {
      return res.status(400).json({ message: "Please upload a file" });
    }

    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try {
      const [add, f1] = await conn.query(
        "INSERT INTO `product`(product_name, product_desc, product_price, product_type, cafe_id) VALUES (?,?,?,?,?)",
        [name, desc, price, type, cid]
      );

      let inserted = add.insertId;
      const [img, f2] = await conn.query(
        "INSERT INTO `image`(image_path, product_id, cafe_id) VALUES (?,?,?)",
        [file.path.substring(6), inserted, cid]
      );

      res.send('Inserted ID' + inserted)
      await conn.commit();
    } catch (err) {
      console.log(err);
      await conn.rollback();
      return res.status(500).json(err);
    } finally {
      conn.release();
    }
  }
);
//update product
router.put(
  "/product/:id",
  upload.single("productImage"),
  async function (req, res, next) {
    const file = req.file;
    const name = req.body.name;
    const desc = req.body.desc;
    const price = req.body.price;
    const pid = req.params.id;

    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      console.log(name, desc, price, pid, file);
      const [update, f] = await conn.query(
        "UPDATE `product` SET product_name =?, product_desc =?, product_price=? WHERE product_id=?",
        [name, desc, price, pid]
      );

      if (file) {
        const [img, f] = await conn.query(
          "UPDATE `image` SET image_path =? WHERE product_id=?",
          [file.path.substring(6), pid]
        );
      }
      res.send('Updated ID' + pid)
      await conn.commit();
    } catch (err) {
      console.log(err);
      await conn.rollback();
      return res.status(500).json(err);
    } finally {
      conn.release();
    }
  }
);

router.delete("/product/:id", async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    // Delete promotion_product
    const [prochk, f] = await conn.query(
      "SELECT COUNT(*) FROM `promotion_product` WHERE `product_id` = ?",
      [req.params.id]
    );
    console.log(prochk);
    if (prochk[0]["COUNT(*)"] > 0) {
      const [r, f] = await conn.query(
        "DELETE FROM `promotion_product` WHERE `product_id` = ?",
        [req.params.id]
      );
    }

    // Delete Free Promotion fk
    const [freechk, f4] = await conn.query(
      "SELECT `pro_id` ,COUNT(*) FROM `promotion` WHERE `product_free` = ?",
      [req.params.id]
    );
    console.log(freechk);
    if (freechk[0]["COUNT(*)"] > 0) {
      const [r, f] = await conn.query(
        "DELETE FROM `promotion` WHERE `product_free` = ?",
        [req.params.id]
      );

      // Delete Cafe_Promotion
      const [r2, f2] = await conn.query(
        "DELETE FROM `cafe_promotion` WHERE `pro_id` = ?",
        [req.params.id]
      );
    }

    // Delete images
    const [imgchk, f3] = await conn.query(
      "SELECT COUNT(*) FROM `image` WHERE `product_id` = ?",
      [req.params.id]
    );
    console.log(imgchk);
    if (imgchk[0]["COUNT(*)"] > 0) {
      const [r, f] = await conn.query(
        "DELETE FROM `image` WHERE `product_id` = ?",
        [req.params.id]
      );
    }

    // Delete Product
    const [r1, f1] = await conn.query(
      "DELETE FROM `product` WHERE `product_id` = ?",
      [req.params.id]
    );
    if (r1.affectedRows === 1) {
      await conn.commit();
      res.status(204).send();
    } else {
      throw "Cannot delete the selected blog";
    }
  } catch (err) {
    console.log(err);
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    conn.release();
  }
});

exports.router = router;
