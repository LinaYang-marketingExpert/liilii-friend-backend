import { chatDA } from "../base-assets";
import { chatDB } from "../models";
import { GEMINI } from "../utils/gemini";
import { animalService } from "./";
import { v4 as uuidv4 } from "uuid";

const gemini = new GEMINI();

class ChatService {
    constructor() {

    }

    async createChat(userId: string) {
        const thinking = await animalService.createNewThinking();

        const newChatSeason = {
            id: uuidv4(),
            userId,
            animalData: {
                animalName: "LiiLii",
                animalThinking: thinking,
            },
            active: "active"
        }

        return await chatDA.create(newChatSeason);
    };

    async addMessage(data: any) {
        console.log("content to add: ", data)
        const chatSeason = await chatDA.findOne({id: data.chatId});
        console.log(chatSeason)

        await chatDB.findOneAndUpdate({ id: data.chatId }, { 
            $push: { chatHistory: { 
                role: data.role,
                content: data.content
            }} 
        })
    }

    async updateChatHistory(data: any) {
        console.log("data: ", data)
        const data1 = {
            chatId: data.chatId,
            role: data.role,
            content: data.content
        }
        await this.addMessage(data1);

        const contents: any = [{
            role: "user",
            content: data.thinking || "my thinking"
        }]
        console.log("start gemini")
        const result = await gemini.generateText({ contents, instruction: data.content });
        console.log("result result", result)

        const data2 = {
            chatId: data.chatId,
            role: "bot",
            content: result
        }
        await this.addMessage(data2);

        const chatSeason = await chatDA.findOne({ id: data.chatId });
        console.log("chatSeason", chatSeason)
        return chatSeason;
    };

    async getLastSeason(userId: string) {
        const lastSeason = await chatDA.getLast({
            filter: { userId },
            data: { createdAt: -1 }
        });

        if (lastSeason.active == "finish" || lastSeason == null) {
            const newChatSeason = await this.createChat(userId);
            return newChatSeason;
        }

        return lastSeason;
    }

    async updateChatHappiness(chatId: string, happiness: number) {
        return await chatDA.update({
            filter: { id: chatId },
            data: { ["animalData.happiness"]: happiness }
        });
    };
}

export { ChatService };