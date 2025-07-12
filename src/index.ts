import TelegramBot from 'node-telegram-bot-api';
import dayjs from 'dayjs';
import dotenv from 'dotenv';
import cron from "node-cron";
import connectDB from './utils/database';
import { reactionDA, userDA } from './base-assets';
import { sendDailyMessageToUsers } from "./utils/scheduler";

import express from "express";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: "Welcome to LiiLii backend!" });
})

export const bot = new TelegramBot(process.env.BOT_TOKEN!, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id.toString();

  try {
    const existing = await userDA.findOne({ telegramId: chatId });
    if (!existing) {
      console.log("not exist!")
      const user = await userDA.create({ telegramId: chatId });
      bot.sendMessage(chatId, `👋 Hi! I’m LiiLii — your daily cat friend.`);
    } else {
      bot.sendMessage(chatId, `🐱 You’re already part of the LiiLii club!`);
    }
  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, '😿 Something went wrong.');
  }
});

bot.on('callback_query', async (query) => {
  const userId = query.from.id;
  const data = query.data;
  const [_, emotion, type]: any = data?.split('_');

  await reactionDA.create({
    userId,
    date: dayjs().format('YYYY-MM-DD'),
    emotion,
    reaction: type
  });

  bot.answerCallbackQuery(query.id, { text: 'Reaction saved! 😺' })
})

function getRandomTimes(num: any) {
  const times = new Set();
  while (times.size < num) {
    const hour = Math.floor(Math.random() * 24);      // 0 to 23
    const minute = Math.floor(Math.random() * 60);    // 0 to 59
    times.add(`${minute} ${hour} * * *`);             // cron format: minute hour * * *
  }
  
  console.log(times)
  return Array.from(times);
}


function scheduleRandomJobs(num: any) {
  const randomTimes = getRandomTimes(num);

  randomTimes.forEach((cronTime: any) => {
    cron.schedule(cronTime, async () => {
      console.log(`[Scheduler] Sending daily cat message at ${cronTime}`);
      await sendDailyMessageToUsers();
    });
  });
}


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  scheduleRandomJobs(8);
})









