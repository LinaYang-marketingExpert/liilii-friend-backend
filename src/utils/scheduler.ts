import { bot } from "../index";
import { dailyLogDA, userDA } from "../base-assets";
import { getRandomCatContent } from "./cat";
import dayjs from "dayjs";

export async function sendDailyMessageToUsers() {
    const users = await userDA.findAll({});
    console.log(users);
    const today = dayjs().format('YYYY-MM-DD');

    for (const user of users) {
        const alreadySent = await dailyLogDA.findOne({ userId: user.telegramId, date: today });
        console.log(alreadySent);
        if (alreadySent) {
            if (alreadySent.count >= 5) continue;
            else {
                await dailyLogDA.update({
                    filter: { userId: user.telegramId },
                    data: {
                        count: alreadySent.count + 1
                    }
                })
            }
        } else {
            await dailyLogDA.create({
                userId: user.telegramId,
                date: today,
                count: 0
            })
        }

        const { imageUrl, caption, emotion } = getRandomCatContent();

        await bot.sendPhoto(user.telegramId, imageUrl, {
            caption: `*Today’s mood: ${emotion}*\n\n${caption}`,
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [[
                    { text: '❤️', callback_data: `react_${emotion}_love` },
                    { text: '😂', callback_data: `react_${emotion}_funny` },
                    { text: '👍', callback_data: `react_${emotion}_cool` },
                ]],
            }
        });
    }
}