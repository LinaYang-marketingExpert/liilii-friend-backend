import express from 'express';
import { ChatController } from '../controllers/chat.controller';
const router = express.Router();

const chatController = new ChatController();

router.post('/chat/changeThought', chatController.createChatSession);
router.post('/chat/sendMessage', chatController.addChatMessage);


export default router;
