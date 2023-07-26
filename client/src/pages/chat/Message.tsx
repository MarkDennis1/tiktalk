import { useAuthContext } from "../../hooks/useAuthContext";

const Message = ({
  avatar,
  name,
  sender,
  message,
  click,
  isSeen,
}: {
  avatar: string | undefined;
  name: string;
  sender: any;
  message: string;
  click: any;
  isSeen: boolean;
}) => {
  const { user } = useAuthContext()
  return (
    <button
      onClick={click}
      className={`group relative flex w-full px-6 py-2 gap-2 items-center ${isSeen && 'text-gray-500'} hover:bg-gray-200`}
    >
      <div className="aspect-square h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
        <img
          className="object-cover w-full h-full"
          src={
            avatar ||
            `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${name}`
          }
          alt={name}
        />
      </div>
      <div className="truncate text-start">
        <div className="text-lg truncate">{name}</div>
        <div className="truncate text-sm">
          <span>{sender.email !== user?.email ? `${name}: ` : "You: "}</span>
          <span className="">{message}</span>
        </div>
      </div>

      {/* delete button */}
      <button className="hidden group-hover:block absolute right-4">
          delete
      </button>
    </button>
  );
};

export default Message;
