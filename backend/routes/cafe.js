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

exports.router = router;
