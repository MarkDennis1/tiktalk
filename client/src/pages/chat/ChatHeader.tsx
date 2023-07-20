import { useNavigate } from "react-router-dom";
import BackIcon from "../../components/BackIcon";

const ChatHeader = ({ email, name }: { email: string | undefined; name: string | undefined }) => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div className="p-4 border border-b-gray-400">
      <div className="flex gap-2 items-center">
        <button
          onClick={handleBackClick}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <BackIcon />
        </button>
        <div className="">
          <div className="text-lg leading-none">{name}</div>
          <div className="text-xs leading-none">{email}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
