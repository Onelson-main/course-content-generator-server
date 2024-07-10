import dotenv from "dotenv";
dotenv.config();
import { createServer } from "http";
import app from "./app";

const server = createServer(app)
const port = process.env.PORT || 8003;

try {
    server.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
} catch (err: any) {
    console.log(err)
    if (err.code === 'EADDRINUSE') {
        console.log('Port is already in use');
    }
}




let action = async () => {
    // const startTime = performance.now();
    // console.log(await getCourseFromAI("UI design"));
    // const endTime = performance.now();
    // const duration = endTime - startTime;
    // console.log(`Function took ${duration.toFixed(2)} milliseconds to execute.`);

    // @ts-ignore
    // await createCourse(temp_2)
}

// action()