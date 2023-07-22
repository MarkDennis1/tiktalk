import { useEffect, useState } from "react";
import ChatApp from "./pages/chat/ChatApp";
import DefaultButton from "./components/DefaultButton";
import { useLogout } from "./hooks/useLogout";
import { useAuthContext } from "./hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useNotifContext } from "./hooks/useNotifContext";
import NotificationIcon from "./components/NotificationIcon";

function App() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { notifications } = useNotifContext();
  const [showNotif, setShowNotif] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const handleNotifClick = (notif: any) => {
    navigate(`/messages/${notif.chat_id}`);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <>
      <div>
        <nav className="fixed top-0 left-0 w-full bg-white border border-b-gray-400 shadow-md">
          <div className="md:w-[42rem] mx-auto flex justify-between items-center px-6 py-3">
            <a href="/" className="text-xl truncate">
              {user?.name}
            </a>
            <ul className="flex items-center gap-2">
              <li className="relative">
                <button className="hover:bg-gray-200 rounded-full p-2" onClick={() => setShowNotif((prev) => !prev)}>
                  <NotificationIcon numberOfNotif={notifications.length} />
                </button>
                {showNotif && (
                  <div className="absolute flex flex-col top-14 -right-1/2 bg-white rounded-lg border border-gray-500 max-h-[calc(100vh-100px)] overflow-y-scroll">
                    {notifications.length > 0 ? (
                      notifications.map((notif, index) => {
                        return (
                          <button
                            onClick={() => handleNotifClick(notif)}
                            key={index}
                            className="p-4 hover:bg-gray-200 text-gray-700 text-start w-52"
                          >
                            <div>
                              {" "}
                              <span className="font-semibold">
                                Message from:
                              </span>{" "}
                              {notif.sender.email}
                            </div>
                            <div>
                              <span className="font-semibold">Content:</span>{" "}
                              {notif.content}
                            </div>
                          </button>
                        );
                      })
                    ) : (
                      <div className="w-52 p-4 text-center">
                        No notifications
                      </div>
                    )}
                  </div>
                )}
              </li>
              <li>
                <DefaultButton click={handleLogout}>Logout</DefaultButton>
              </li>
            </ul>
          </div>
        </nav>
        <ChatApp />
      </div>
    </>
  );
}

export default App;
