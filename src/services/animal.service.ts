import { animalDA } from "../base-assets";
import { GEMINI } from "../utils/gemini";
import dotenv from "dotenv";

dotenv.config();

const gemini = new GEMINI();

class AnimalService {
    constructor() {

    }

    private generateCatWantPrompt (): string {
        return `
        You are LiiLii, a curious and emotional domestic cat who loves her human.

        Generate a realistic, cute, and emotionally expressive short thought or desire a real-life cat might have today.

        Keep it unique and natural like:
        - "I want to sleep on your keyboard again."
        - "Please sing that soft lullaby from yesterday."

        Avoid system instructions or long stories. Just return the thought text only.
        `.trim();
    };

    async getAnimalByName (name: string) {
        return await animalDA.findOne({ name });
    };

    async createNewThinking () {
        console.log("start create")
        const prompt = this.generateCatWantPrompt();
        // const contents: any = [{
        //     role: "user",
        //     content: "LiiLii Thinking"
        // }];
        console.log("start gemini", "prompt", prompt)
        const judgementResult = await gemini.generateTextFromMessage(prompt);
        console.log("judgementResult", judgementResult)
        const result = gemini.geminiFormatResult(judgementResult);
        console.log("end create result", result)
        console.log("end create")

        return judgementResult;
    }
}

export { AnimalService };