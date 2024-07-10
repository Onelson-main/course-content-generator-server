"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseFromAI = getCourseFromAI;
const config_1 = __importDefault(require("../core/config"));
const generative_ai_1 = require("@google/generative-ai");
const DB_module_1 = require("./DB_module");
const genAI = new generative_ai_1.GoogleGenerativeAI(config_1.default.GOOGLE_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
const generationConfig = {
    temperature: 0.1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 10240,
    responseMimeType: "text/plain",
};
async function getCourseFromAI(query) {
    // return
    try {
        const chatSession = model.startChat({
            generationConfig,
        });
        const result = (await chatSession.sendMessage(`For the topic \"${query}\", generate A brief course overview 200 words max, A list of modules (4-6), Detailed topics under each module (4-7) and expected duration in weeks and parse it as JSON with the following structure  title: string;\n    overview: string;\n  duration: number;\n    modules?: { title: string;\n        topics?: (string)[];}\n  }`)).response.text();
        let data = JSON.parse((result.match(/```json(.+)```/ms) || ['{}'])[1]);
        if (data) {
            await (0, DB_module_1.saveCourseToDB)(data);
        }
        return data;
    }
    catch (err) {
        console.log(err);
    }
}
