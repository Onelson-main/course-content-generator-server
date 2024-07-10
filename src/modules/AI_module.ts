import config from "../core/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { saveCourseToDB } from "./DB_module";
const genAI = new GoogleGenerativeAI(config.GOOGLE_GEMINI_API_KEY || "");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });


const generationConfig = {
    temperature: 0.1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 10240,
    responseMimeType: "text/plain",
};
export async function getCourseFromAI(query: string) {
    // return
    try {
        const chatSession = model.startChat({
            generationConfig,
        });
        const result = (await chatSession.sendMessage(`For the topic \"${query}\", generate A brief course overview 200 words max, A list of modules (4-6), Detailed topics under each module (4-7) and expected duration in weeks and parse it as JSON with the following structure  title: string;\n    overview: string;\n  duration: number;\n    modules?: { title: string;\n        topics?: (string)[];}\n  }`)).response.text();
        let data = JSON.parse((result.match(/```json(.+)```/ms) || ['{}'])[1]);
        if (data) {
            await saveCourseToDB(data);
        }
        return data;
    } catch (err) {
        console.log(err)
    }
}

