import { UserService } from "./user.service";
import { AnimalService } from "./animal.service";
import { ChatService } from "./chat.service";


const chatService = new ChatService();
const userService = new UserService();
const animalService = new AnimalService();

export {
    animalService,
    chatService,
    userService,
}
