import app from "./app.js";
import dotenv from "dotenv"

// โหลดค่าจาก .env
dotenv.config()

// // แปลงข้อมูล
const PORT = process.env.PORT

// //run server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

// console.log(process.env.PORT)