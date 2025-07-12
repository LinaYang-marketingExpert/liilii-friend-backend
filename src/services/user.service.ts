import { userDA } from "../base-assets";

class UserService {
    constructor() {

    }

    async createUser (telegramId: string, userName: string) {
        return await userDA.create({ telegramId, userName });
    };

    async getUserByTelegramId (telegramId: string) {
        return await userDA.findOne({ telegramId });
    };

    async updateUserMedals (telegramId: string, medals: number) {
        const user = await userDA.findOne({ telegramId });
        const medalsCount = user.medals + medals;

        return await userDA.update({
            filter: { telegramId },
            data: { medals: medalsCount }
        })
    };
}

export { UserService };
