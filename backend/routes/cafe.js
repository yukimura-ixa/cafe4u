const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/cafe/:id", function (req, res, next) {
  const promise1 = pool.query("SELECT * FROM `cafe` WHERE cafe_branchid=?", [
    req.params.id,
  ]);
  const promise2 = pool.query(
    "SELECT * FROM `review` JOIN `user` USING (user_id) WHERE cafe_id=?",
    [req.params.id]
  );
  const promise3 = pool.query("SELECT * FROM `image` WHERE cafe_id=?", [
    req.params.id,
  ]);

  Promise.all([promise1, promise2, promise3])
    .then((results) => {
      const [cafe, f1] = results[0];
      const [reviews, f2] = results[1];
      const [imgs, f3] = results[2];
      res.json({
        cafe: cafe[0],
        reviews: reviews,
        images: imgs,
        error: null,
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});


router.post("/cafe/add", async function (req, res, next) {
  const cafe_id = req.body.cafe_branchid;
  const cafe_location = req.body.cafe_location;
  const cafe_desc = req.body.cafe_desc;
  const cafe_name = req.body.cafe_name;
  const cafe_theme = req.body.cafe_theme;

  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    await conn.query(
      "INSERT INTO cafe(cafe_branchid, cafe_location, cafe_name, cafe_desc, cafe_theme) VALUES(?, ?, ?, ?, ?);",
      [cafe_id, cafe_location, cafe_name, cafe_desc, cafe_theme]
    );

    await conn.commit();
    res.send("success!");
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
});

router.get("/cafe", async function (req, res, next) {
  try {
      const [rows, fields] = await pool.query('SELECT * FROM cafe');
      return res.json(rows);
  } catch (err) {
      return res.status(500).json(err)
  }
});

exports.router = router;
