import { useParams } from "react-router-dom";
import ChatBody from "./ChatBody";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { useMessages } from "../../hooks/useMessages";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import CurrentUserMessage from "./CurrentUserMessage";
import OtherUserMessage from "./OtherUserMessage";
import { socket } from "../../hooks/useSocket";

export interface User {
  _id: number;
  name: string;
  email: string;
}

const ChatLayout = () => {
  const { id } = useParams();
  const { getConversationWithId, error, loading } = useMessages();
  const { user } = useAuthContext();
  const [selectedUser, setSelectedUser] = useState<User | any>();
  const [messages, setMessages] = useState<Array<any>>();
  const [reRunCount, setReRunCount] = useState(0);

  useEffect(() => {
    // Bug: When refreshing the browser,
    // the chat header displays the authenticated user instead of the selectedUser
    // Temporary solution: ReRun the fetch for 2 times
    if (reRunCount < 2) {
      const fetchMessages = async () => {
        try {
          const conversation = await getConversationWithId(id);
          console.log("selected user: ", conversation?.selectedUser);
          setSelectedUser(conversation?.selectedUser);
          setMessages(conversation?.messages);
        } catch (error) {
          // Handle any errors that occur during the fetch.
        }
      };
  
      fetchMessages();
  
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
      console.log(`sender: ${data.sender.email}`);
      console.log(`current user: ${user}`);
      // set the new selectChat
      setMessages((prevMessages: any) => [
        ...(prevMessages || []),
        { sender: { email: data.sender.email }, content: data.content },
      ]);
    };
    socket?.on("receive", onReceive);

    return () => {
      socket.off("receive", onReceive);
    };
  }, [socket]);

  return (
    <div>
      <ChatHeader email={selectedUser?.email} name={selectedUser?.name} />
      <ChatBody>
        {!!messages &&
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
          )}
      </ChatBody>
      <ChatInput selectedUser={selectedUser} />
    </div>
  );
};

export default ChatLayout;
