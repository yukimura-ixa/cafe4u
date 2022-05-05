const express = require("express");
const pool = require("../config");
const Joi = require('joi')
const bcrypt = require('bcrypt');

const router = express.Router();

const passwordValidator = (value, helpers) => {
    if (value.length < 8) {
        throw new Joi.ValidationError('Password must contain at least 8 characters')
    }
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        throw new Joi.ValidationError('Password must be harder')
    }
    return value
}

const usernameValidator = async (value, helpers) => {
    const [rows, _] = await pool.query("SELECT user_login FROM user WHERE user_login = ?", [value])
    if (rows.length > 1) {
        const message = 'This username is already taken'
        throw new Joi.ValidationError(message, { message })
    }
    return value
}

router.get("/profile/:id", async function (req, res, next) {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM `user` WHERE `user_id` = ?', [req.params.id]);
        return res.json(rows);
    } catch (err) {
        return res.status(500).json(err)
    }
});

const updateProfileSchema = Joi.object({
    email: Joi.string().required().email(),
    mobile: Joi.string().required().pattern(/0[0-9]{9}/),
    first_name: Joi.string().required().max(150),
    last_name: Joi.string().required().max(150),
    username: Joi.string().required().min(5).max(20).external(usernameValidator),
    password: Joi.string().required().custom(passwordValidator),
    address: Joi.string().required(),
})

router.put('/profile/update/:id', async (req, res, next) => {
    try {
        await updateProfileSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).send(err)
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    const username = req.body.username
    const password = req.body.password
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email
    const mobile = req.body.mobile
    const address = req.body.address

    try {
        await conn.query(
            'UPDATE `user` SET user_id = ?, user_login = ?, fname = ?, lname = ?, address = ?, phone = ?, email = ?, password = ? WHERE `user_id` = ?',
            [req.params.id, username, first_name, last_name, address, mobile, email, password, req.params.id]
        )
        conn.commit()
        res.status(201).send()
    } catch (err) {
        console.log(req.body)
        console.log(err)
        conn.rollback()
        res.status(400).json(err.toString());
    } finally {
        conn.release()
    }
})


exports.router = router