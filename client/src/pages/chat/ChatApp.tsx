import { useState, useEffect } from "react";
import Message from "./Message";
import MessageList from "./MessageList";
import User from "./User";
import UserList from "./UserList";
import { useUsers } from "../../hooks/useUsers";
import { useMessages } from "../../hooks/useMessages";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNotifContext } from "../../hooks/useNotifContext";
import { useNavigate } from "react-router-dom";
import { socket } from "../../hooks/useSocket";

const ChatApp = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const { getUsers } = useUsers();
  const { getConversations, storeConversation } = useMessages();
  const { user } = useAuthContext();
  const { notifications, setNotifications } = useNotifContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getUsers();
      setUsers(result);
    };

    const fetchMessages = async () => {
      const result = await getConversations();
      result.forEach((message: any) => {
        socket.emit("join", { chat_id: message._id });
      });
      setMessages(result);
    };

    fetchUsers();
    fetchMessages();
  }, []);

  useEffect(() => {
    const onReceive = (data: any) => {
      if (!notifications.includes(data)) {
        setNotifications((prevState: any) => [data, ...prevState]);
      }

      const fetchConversations = async () => {
        const result = await getConversations();
        setMessages(result);
      };
      fetchConversations();
    };
    socket?.on("receive", onReceive);

    return () => {
      socket?.off("receive", onReceive);
    };
  }, [socket]);

  const handleRedirectToMessage = async (receiverId: string) => {
    const { _id } = await storeConversation(receiverId);
    navigate(`/messages/${_id}`);
  };

  return (
    <div className="mt-16 max-w-2xl mx-auto h-[calc(100vh-158px)]">
      <UserList>
        {users.length &&
          users.map(({ avatar, name, _id }) => (
            <User
              click={() => handleRedirectToMessage(_id)}
              avatar={avatar}
              name={name}
              key={_id}
            />
          ))}
      </UserList>
      {messages.length > 0 ? (
        <MessageList>
          {messages.map(
            ({
              _id,
              participants,
              messages,
            }: {
              _id: string;
              participants: any;
              messages: any;
            }) => {
              let receiver = participants.filter(
                (participant: any) => participant.email != user?.email
              )[0];
              return (
                <Message
                  click={() => handleRedirectToMessage(receiver._id)}
                  avatar={receiver.avatar}
                  name={receiver.name}
                  sender={messages[messages.length - 1].sender}
                  message={messages[messages.length - 1].content}
                  isSeen={
                    notifications.filter((notif) => notif.chat_id === _id)
                      .length < 1
                  }
                  key={_id}
                />
              );
            }
          )}
        </MessageList>
      ) : (
        <div className="grid bg-gray-200 place-items-center h-full text-2xl">
          <div>No conversation.</div>
        </div>
      )}
    </div>
  );
};

export default ChatApp;
