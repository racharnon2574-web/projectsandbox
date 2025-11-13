import { createUser, getUserBy } from "../services/user.service.js"
import { loginSchema, registerSchema } from "../validations/schema.user.js"
import createHttpError from "http-errors"
import bcrypt from "bcryptjs";
import dotenv from "dotenv"
import jwt from "jsonwebtoken";
import { getLesson } from "../services/lesson.service.js";

export const register = async (req, res, next) => {
    // รับข้อมูล
    const { firstName, lastName, password, confirmPassword, email, phone, contactInfo, bio, profile } = req.body

    // ตรวจสอบเงื่อนไข 
    const user = registerSchema.parse(req.body)

    const newUser = { ...user, password: await bcrypt.hash(password, 10) }
    // console.log(newUser)
    const result = await createUser(newUser)

    res.json({
        message: "Register Successful"
    })
}

export const login = async (req, res, next) => {
    // รับข้อมูล
    const { email, password } = req.body
    const user = loginSchema.parse(req.body)
    const foundUser = await getUserBy("email", email)

    // find user
    if (!foundUser) {
        return next(createHttpError[401]("Invalid Login"))
    }
    let pwOk = await bcrypt.compare(password, foundUser.password)
    if (!pwOk) {
        return next(createHttpError[401]("Invalid Login"))
    }

    // mockdata
    const { ...userData } = foundUser

    // jwt
    const payload = { id: foundUser.id }
    console.log('payload', payload)
    const token = jwt.sign(payload, process.env.JWT_SECRECT, {
        algorithm: "HS256",
        expiresIn: "15d"
    })
    console.log(token)
    // showdata
    res.json({
        message: "Register Successful",
        // แสดงข้อมูล
        user: userData,
        token: token,
    })
}