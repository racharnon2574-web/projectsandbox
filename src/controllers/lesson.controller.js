import { getLesson } from "../services/lesson.service.js";


export const lesson = async (req, res) => {
    const lessonData = await getLesson()
    res.send(lessonData)
}