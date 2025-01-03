import { baseUrl } from "@/lib/constant";
import axios from "axios";

class ChatService {
async createChat(history) {
    const response = await axios.post(`${baseUrl}/chat/createChat`, { history });
    console.log(response.data);
    return response.data;
}
} 
const chatService = new ChatService();
export default chatService;