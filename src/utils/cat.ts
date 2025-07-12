import path from 'path';
import fs from 'fs';

interface EmotionData {
  [emotion: string]: {
    url: string;
    messages: string[];
  };
}

export function getRandomCatContent() {
  const jsonPath = path.join(__dirname, './emotion.json');
  const raw = fs.readFileSync(jsonPath, 'utf-8');
  const data = JSON.parse(raw);

  const emotionArray = data.emotions as EmotionData[];

  // Pick random emotion object
  const randomEmotionObj = emotionArray[Math.floor(Math.random() * emotionArray.length)];

  // Get the emotion name and data
  const emotion = Object.keys(randomEmotionObj)[0];
  const { url, messages } = randomEmotionObj[emotion];

  // Pick random message
  const caption = messages[Math.floor(Math.random() * messages.length)];

  return { imageUrl: url, caption, emotion };
}
