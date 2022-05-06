const express = require("express");
const pool = require("../config");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");
const { isLoggedIn } = require("../middlewares");

router = express.Router();

const passwordValidator = (value, helpers) => {
  if (value.length < 8) {
    throw new Joi.ValidationError(
      "Password must contain at least 8 characters"
    );
  }
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    throw new Joi.ValidationError("Password must be harder");
  }
  return value;
};

const usernameValidator = async (value, helpers) => {
  const [rows, _] = await pool.query(
    "SELECT user_login FROM user WHERE user_login = ?",
    [value]
  );
  if (rows.length > 0) {
    const message = "This username is already taken";
    throw new Joi.ValidationError(message, { message });
  }
  return value;
};

const signupSchema = Joi.object({
  email: Joi.string().required().email(),
  mobile: Joi.string()
    .required()
    .pattern(/0[0-9]{9}/),
  first_name: Joi.string().required().max(150),
  last_name: Joi.string().required().max(150),
  password: Joi.string().required().custom(passwordValidator),
  confirm_password: Joi.string().required().valid(Joi.ref("password")),
  username: Joi.string().required().min(5).max(20).external(usernameValidator),
  age: Joi.string()
    .required()
    .pattern(/[0-9]{2}/)
    .max(2),
  cafe_branchid: Joi.string()
    .required()
    .pattern(/[0-9]{2}/)
    .max(2),
  user_type: Joi.string().required(),
  address: Joi.string().required(),
});

router.post("/user/signup", async (req, res, next) => {
  // try {
  //     await signupSchema.validateAsync(req.body, { abortEarly: false })
  // } catch (err) {
  //     return res.status(400).send(err)
  // }

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  const username = req.body.username;
  const password = await bcrypt.hash(req.body.password, 5);
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const age = req.body.age;
  const address = req.body.address;
  const cafe_branchid = req.body.cafe_branchid;
  const user_type = req.body.user_type;

  try {
    await conn.query(
      "INSERT INTO user(user_login, password, fname, lname, age, address, phone, email, user_type, cafe_branchid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        username,
        password,
        first_name,
        last_name,
        age,
        address,
        mobile,
        email,
        user_type,
        cafe_branchid,
      ]
    );
    await conn.commit();
    res.status(201).send();
  } catch (err) {
    await conn.rollback();
    res.status(400).json(err.toString());
  } finally {
    conn.release();
  }
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
router.post("/user/login", async (req, res, next) => {
  try {
    await loginSchema.validateAsync(req.body, { abortEarly: false });
  } catch (err) {
    return res.status(400).send(err);
  }
  const username = req.body.username;
  const password = req.body.password;

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    // Check if username is correct
    const [users] = await conn.query("SELECT * FROM user WHERE user_login=?", [
      username,
    ]);
    const user = users[0];
    if (!user) {
      throw new Error("Incorrect username or password");
    }

    // Check if password is correct
    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error("Incorrect username or password");
    }

    // Check if token already existed
    const [tokens] = await conn.query("SELECT * FROM token WHERE user_id=?", [
      user.user_id,
    ]);
    let token = tokens[0]?.token;
    if (!token) {
      // Generate and save token into database
      token = generateToken();
      await conn.query("INSERT INTO token(user_id, token) VALUES (?, ?)", [
        user.user_id,
        token,
      ]);
    }

    conn.commit();
    res.status(200).json({ token: token });
  } catch (error) {
    conn.rollback();
    res.status(400).json(error.toString());
  } finally {
    conn.release();
  }
});

router.get("/user/me", isLoggedIn, async (req, res, next) => {
  // req.user ถูก save ข้อมูล user จาก database ใน middleware function "isLoggedIn"

  res.json(req.user);
});

exports.router = router;
