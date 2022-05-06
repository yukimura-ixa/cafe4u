const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");
const multer = require("multer");

// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./static/uploads/cafe");
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

router.post(
  "/image/:cafeId",
  upload.array("cafeImage"),
  async function (req, res, next) {
    const file = req.files;
    const cid = req.params.cafeId;
    let pathArray = [];

    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      next(error);
    }

    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      if (file.length > 0) {
        file.forEach((file, index) => {
          let path = [cid, file.path.substring(6)];
          pathArray.push(path);
          console.log(path);
        });
        console.log(pathArray);
        await conn.query("INSERT INTO image(cafe_id, image_path) VALUES ?;", [
          pathArray,
        ]);
      }

      await conn.commit();
      res.send("success!");
    } catch (error) {
      next(error);
      await conn.rollback();
      res.status(500).json(error);
    } finally {
      conn.release();
    }
  }
);

router.delete("/image/:imageId", async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    // Get Path files from the upload folder
    const [images, imageFields] = await conn.query(
      "SELECT * FROM `image` WHERE `image_id` = ?",
      [req.params.imageId]
    );
    // console.log(images[0]);

    // Delete Data from Table images
    const [rows1, fields1] = await conn.query(
      "DELETE FROM `image` WHERE `image_id`=?",
      [req.params.imageId]
    );

    if (rows1.affectedRows > 0) {
      // Delete File from path
      const appDir = path.dirname(require.main.filename); // Get app root directory
    //   console.log(appDir);
      const p = path.join(appDir, "static", images[0].image_path);
      fs.unlinkSync(p);
    }

    // commit
    res.send(200)
    await conn.commit();
    // res.json({ message: "Delete image Complete" });
  } catch (error) {
    res.json(error);
    await conn.rollback();
    res.status(500).json(error);
  } finally {
    conn.release();
  }
});

exports.router = router;
