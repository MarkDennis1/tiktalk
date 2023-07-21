import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import SendIcon from "../../components/SendIcon";
import { useMessages } from "../../hooks/useMessages";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { socket } from "../../hooks/useSocket";

const ChatInput = ({ selectedUser }: { selectedUser: any }) => {
  const [currentChatMessage, setCurrentChatMessage] = useState("");
  const { storeMessage } = useMessages();
  const { id } = useParams();
  const { user } = useAuthContext();

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentChatMessage.trim() !== "") {
      await storeMessage(selectedUser._id, id, currentChatMessage);
      socket.emit("message", {
        chat_id: id,
        sender: { email: user?.email },
        content: currentChatMessage,
      });
      console.log({ email: user?.email });
      setCurrentChatMessage("");
    }
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentChatMessage(e.target.value);
    socket.emit("typing", { chat_id: id, sender: { email: user?.email } });
  };
  return (
    <div>
      <form
        className="relative px-4 py-1 flex items-center gap-2"
        onSubmit={handleSendMessage}
      >
        <input
          className="w-full py-2 px-4 bg-gray-200 rounded-full outline-none"
          type="text"
          placeholder="Write your message..."
          onChange={handleTextChange}
          value={currentChatMessage}
        />
        <button type="submit" className="text-blue-700">
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
