import bodyParser from "body-parser";
import cors from "cors";
import express, { Response, Request } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
import { getCourseFromAI } from "./modules/AI_module";
import { getCoursesFromDB, getCourseFromDBByName, getCourseFromDBByID } from "./modules/DB_module";

const app = express();
app.use(morgan("tiny"))
app.use(bodyParser.json());

let corsOptions = {
    origin: ["http://localhost:5173", "192.168.43.1", "https://smarteru.netlify.app"],
}

app.use(cors(corsOptions))

app.get('/', (req: Request, res: Response) => {
    res.send('pong');
});


app.get('/courses', async (req: Request, res: Response) => {
    try {
        let { data } = await getCoursesFromDB()
        res.status(200).send({ data: data });
    } catch (err) {
        console.log(err);
        res.status(500).send({ data: {} });
    }
})


app.get('/courses/search', async (req: Request, res: Response) => {
    try {
        let title = req.query.q as string;
        if (!title) {
            res.status(400).send({ data: {} });
            return
        }
        let data;
        let { status, data: courseData } = await getCourseFromDBByName(title)
        if (status) {
            data = courseData
        } else {
            data = await getCourseFromAI(title)
        }
        if (data.title) {
            res.status(200).send({ data });
        } else {
            // would most likely never get triggered unless AI credits run out
            res.status(404).send({ data: {} });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ data: {} });
    }
})

app.get('/courses/:id', async (req: Request, res: Response) => {
    try {
        let id = req.params.id as unknown as number
        let data
        data = (await getCourseFromDBByID(id)).data
        if (data?.title) {
            res.status(200).send({ data });
        } else {
            res.status(404).send({ data: {} });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ data: {} });
    }
})




export default app

