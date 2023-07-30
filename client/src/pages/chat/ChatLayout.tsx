import { useParams } from "react-router-dom";
import ChatBody from "./ChatBody";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { useMessages } from "../../hooks/useMessages";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import CurrentUserMessage from "./CurrentUserMessage";
import OtherUserMessage from "./OtherUserMessage";
import { socket } from "../../socket";
import { useLottie } from "lottie-react";
import typingAnimation from "../../lotties/typing_animation.json";
import { useNotifContext } from "../../hooks/useNotifContext";
import { useNotification } from "../../hooks/useNotification";

export interface User {
  _id: number;
  name: string;
  email: string;
}

const ChatLayout = () => {
  const { id } = useParams();
  const { getConversationWithId } = useMessages();
  const { user } = useAuthContext();
  const [selectedUser, setSelectedUser] = useState<User | any>();
  const [messages, setMessages] = useState<Array<any>>([]);
  const [reRunCount, setReRunCount] = useState(0);
  const [otherUserIsTyping, setOtherUserIsTyping] = useState(false);
  const { setNotifications } = useNotifContext();
  const { destroyNotification } = useNotification();

  const lottieOptions = {
    animationData: typingAnimation,
    loop: true,
  };

  const lottieStyle = {
    height: 28,
  };

  const { View } = useLottie(lottieOptions, lottieStyle);

  useEffect(() => {
    socket.emit("join", { chat_id: id });
  }, []);

  useEffect(() => {
    // Bug: When refreshing the browser,
    // the chat header displays the authenticated user instead of the selectedUser
    // Temporary solution: ReRun the fetch for 2 times
    if (reRunCount < 2) {
      setNotifications((prevNotifs: Array<any>) =>
        prevNotifs.filter((prevNotif) => prevNotif.chat_id !== id)
      );
      const updateNotification = async () => {
        destroyNotification(id);
      };
      const fetchMessages = async () => {
        try {
          const conversation = await getConversationWithId(id);
          setSelectedUser(conversation?.selectedUser);
          setMessages(conversation?.messages);
        } catch (error) {
          // Handle any errors that occur during the fetch.
        }
      };

      fetchMessages();
      updateNotification();

      // Increase the reRunCount by 1 after each execution.
      setReRunCount((prevCount) => prevCount + 1);

      // Clean-up function
      return () => {
        setSelectedUser(null);
        setMessages([]);
        setReRunCount(0);
      };
    }
  }, [reRunCount]);

  useEffect(() => {
    const onReceive = (data: any) => {
      // set the new selectChat
      setMessages((prevMessages: any) => [
        ...(prevMessages || []),
        { sender: { email: data.sender.email }, content: data.content },
      ]);
    };
    const onTyping = (data: any) => {
      // set the state to true
      if (user?.email != data.sender.email) {
        setOtherUserIsTyping(true);
        setTimeout(() => {
          setOtherUserIsTyping(false);
        }, 2000);
      }
    };
    socket?.on("receive", onReceive);
    socket?.on("otherIsTyping", onTyping);

    return () => {
      socket.off("receive", onReceive);
      socket.off("otherIsTyping", onTyping);
    };
  }, [socket]);

  return (
    <div className="md:max-w-2xl mx-auto">
      <ChatHeader email={selectedUser?.email} name={selectedUser?.name} />
      <ChatBody>
        {messages.length ? (
          messages.map(
            (
              {
                sender,
                content,
              }: {
                sender: { email: string; name: string };
                content: string;
              },
              index: any
            ) => {
              return sender.email === user?.email ? (
                <CurrentUserMessage key={index} message={content} />
              ) : (
                <OtherUserMessage key={index} message={content} />
              );
            }
          )
        ) : (
          <div className="flex flex-col text-2xl h-full w-full justify-center items-center">
            {`Start a chat with ${selectedUser?.name}`}
          </div>
        )}
        <div
          className={`${
            otherUserIsTyping ? "inline-block" : "hidden"
          } self-start bg-gray-200 rounded-full px-2`}
        >
          {View}
        </div>
      </ChatBody>
      <ChatInput selectedUser={selectedUser} />
    </div>
  );
};

export default ChatLayout;
