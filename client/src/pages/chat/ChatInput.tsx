import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import SendIcon from "../../components/SendIcon";
import { useMessages } from "../../hooks/useMessages";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { socket } from "../../hooks/useSocket";
import { useLottie } from "lottie-react";
import typingAnimation from "../../lotties/typing_animation.json";

const ChatInput = ({ selectedUser }: { selectedUser: any }) => {
  const [currentChatMessage, setCurrentChatMessage] = useState("");
  const [otherUserIsTyping, setOtherUserIsTyping] = useState(false);
  const { storeMessage } = useMessages();
  const { id } = useParams();
  const { user } = useAuthContext();

  useEffect(() => {
    const onTyping = (data: any) => {
      // set the state to true
      console.log(`user typing: ${data.sender.email}`);
      console.log(user?.email);
      if (user?.email != data.sender.email) {
        setOtherUserIsTyping(true);
        setTimeout(() => {
          setOtherUserIsTyping(false);
        }, 2000);
      }
    };
    socket?.on("otherIsTyping", onTyping);

    return () => {
      socket.off("otherIsTyping", onTyping);
    };
  }, [socket]);

  const lottieOptions = {
    animationData: typingAnimation,
    loop: true,
  };

  const lottieStyle = {
    height: 28,
  };

  const { View } = useLottie(lottieOptions, lottieStyle);

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
    setTimeout(() => {
      setOtherUserIsTyping(false);
    }, 2000);
  };
  return (
    <div>
      <form
        className="relative px-4 py-1 flex items-center gap-2"
        onSubmit={handleSendMessage}
      >
        <div
          className={`${
            otherUserIsTyping ? "" : "hidden"
          } absolute -top-2/3 left-4 bg-gray-200 rounded-full px-2`}
        >
          {View}
        </div>
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
