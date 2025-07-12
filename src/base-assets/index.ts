import { BaseAssets } from "./basic";
import { userDB, reactionDB, dailyLogDB } from "../models";

const userDA = new BaseAssets(userDB);
const reactionDA = new BaseAssets(reactionDB);
const dailyLogDA = new BaseAssets(dailyLogDB);

export {
    userDA,
    reactionDA,
    dailyLogDA
}