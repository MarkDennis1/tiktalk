import { useEffect } from 'react'
import ChatApp from "./pages/chat/ChatApp";
import DefaultButton from "./components/DefaultButton";
import { useLogout } from "./hooks/useLogout";
import { useAuthContext } from "./hooks/useAuthContext";
import { useNavigate } from 'react-router-dom';

function App() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout();
  };

  useEffect(()=>{
    if (!user) {
      navigate("/login")
    }
  }, [user])

  return (
    <>
      <div>
        <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-3 bg-white border border-b-gray-400 shadow-md">
          <a href="/" className="text-xl truncate">
            {user?.name}
          </a>
          <ul>
            <li>
              <DefaultButton click={handleLogout}>Logout</DefaultButton>
            </li>
          </ul>
        </nav>
        <ChatApp />
      </div>
    </>
  );
}

export default App;
