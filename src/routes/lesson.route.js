import express from "express";
import { lesson } from "../controllers/lesson.controller.js";


const lessonRouter = express.Router()

lessonRouter.get('/getData', lesson)
lessonRouter.get('/createLesson', (req, res) => { res.send("createLesson") })
lessonRouter.get('/editLesson', (req, res) => { res.send("editLesson") })
lessonRouter.get('/deletLesson', (req, res) => { res.send("deletLesson") })



export default lessonRouter