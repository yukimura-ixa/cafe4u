const express = require("express");
const pool = require("../config");
const { isLoggedIn } = require("../middlewares");

router = express.Router();

const commentOwner = async (req, res, next) => {
  if (req.user.user_type === "admin") {
    return next();
  }
  const [[comment]] = await pool.query(
    "SELECT * FROM review WHERE review_id=?",
    [req.params.id]
  );

  // console.log(comment);
  if (comment.user_id !== req.user.user_id) {
    return res
      .status(403)
      .send("You do not have permission to perform this action");
  }

  next();
};

router.post("/cafe/:id/review", isLoggedIn, async function (req, res, next) {
  const comment = req.body.comment;
  const score = req.body.score;
  const uid = req.user.user_id;
  const cid = req.params.id;
  console.log(comment, score, uid, cid);

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    const [rows1, fields1] = await conn.query(
      "INSERT INTO review(review_comment, review_score, review_datetime, user_id, cafe_id) VALUES (?, ?, CURRENT_TIMESTAMP, ?,?)",
      [comment, score, uid, cid]
    );
    const [rows2, fields2] = await conn.query(
      "SELECT * FROM `review` WHERE `review_id` = ?",
      [rows1.insertId]
    );

    await conn.commit();
    return res.json(rows2[0]);
  } catch (err) {
    await conn.rollback();
    return res.json(err);
  } finally {
    conn.release();
  }
});

router.put(
  "/cafe/review/:id",
  isLoggedIn,
  commentOwner,
  async function (req, res, next) {
    const comment = req.body.comment;
    const score = req.body.score;

    console.log(comment, score);
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      const [rows1, fields1] = await pool.query(
        "UPDATE review SET review_comment=?, review_score=? WHERE review_id=?",
        [comment, score, req.params.id]
      );

      const [rows2, f] = await pool.query(
        "SELECT * FROM review WHERE review_id =?",
        [req.params.id]
      );
      await conn.commit();
      res.send(200)
    } catch (err) {
      await conn.rollback();
      return res.json(err);
    } finally {
      conn.release();
    }
  }
);

// Delete comment
router.delete(
  "/cafe/review/:id",
  isLoggedIn,
  commentOwner,
  async function (req, res, next) {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      const [rows1, fields1] = await pool.query(
        "DELETE FROM review WHERE review_id=?",
        [req.params.id]
      );
      res.json("success");
      await conn.commit();
    } catch (err) {
      await conn.rollback();
      return res.json(err);
    } finally {
      conn.release();
    }

  }
);

exports.router = router;
