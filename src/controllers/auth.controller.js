import { createUser } from "../services/user.service.js"

export const register = async (req, res, next) => {
    const { firstname, lastname, password } = req.body


    const newUser = req.body

    const result = await createUser(newUser)
    // res.send(username)
    res.json({
        message: "Register Successful"
    })
}