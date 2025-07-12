const axios = require("axios");
const { HttpsProxyAgent } = require('https-proxy-agent');

class GEMINI {
    private apiKey = process.env.GEMINI_KEY;

    constructor() {

    }

    async generateTextFromMessage(message: string) {
        const contents = [{
            role: "user",
            content: message
        }]
        const result = await this.generateText({ contents });
        return result
    }

    async generateText({ contents, instruction = "" }: { contents: any[], instruction?: string }) {
        const geminiContents = this._convertToGeminiFormat(contents);
        console.log(geminiContents);
        const geminiInstruction = this._convertToInstructionFormat(instruction);
        console.log(geminiInstruction);
        const data = { contents: geminiContents, system_instruction: geminiInstruction };
        return this._generateFromGemini(data);
    }

    async _generateFromGemini(data: any) {
        // const modelId = 'gemini-2.0-flash-thinking-exp-01-21';
        const modelId = 'gemini-2.0-flash';
        // const modelId = 'gemini-2.0-pro-exp-02-05';

        const apiKey = this.apiKey;
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;
        console.log("apiUrl", apiUrl)
        const proxyAgent = this.getAgent();

        const useProxy = process.env.USE_PROXY;
        console.log("useProxy", useProxy)
        // let response;
        // if (!!useProxy) {
        const response = await axios.post(apiUrl, data, {
            httpsAgent: proxyAgent
        });
        // } else {
        // response = await axios.post(apiUrl, data);
        // }
        // console.log(response)
        const generatedContent = response.data.candidates[0].content;
        const resultText = generatedContent.parts[0].text;
        console.log("resultText", resultText)
        return resultText;
    }

    _convertToGeminiFormat(contents: any) {
        const geminiContents = contents.map((content: any) => ({
            role: content.role,
            parts: [{
                text: content.content
            }]
        }));
        return geminiContents;
    }

    _convertToInstructionFormat(instruction: string) {
        return {
            parts: {
                text: instruction
            }
        };
    }

    geminiFormatResult(data: any) {
        console.log("gemini format result start", data)
        const regex = /\{([\s\S]*?)\}/;
        const match = data.match(regex);
        const result = match ? JSON.parse("{" + match[1] + "}") : null;
        console.log("gemini foramte result end", result)
        return result
    }

    getAgent() {
        const proxyHost = process.env.PROXY_HOST;
        const proxyPort = process.env.PROXY_PORT; // Replace with your proxy's port
        const proxyUser = process.env.PROXY_USER; // Optional
        const proxyPass = process.env.PROXY_PASS; // Optional
        // Create a proxy agent
        const proxyUrl = `http://${proxyUser}:${proxyPass}@${proxyHost}:${proxyPort}`;
        const httpAgent = new HttpsProxyAgent(proxyUrl)
        return httpAgent
    }
}
export { GEMINI }