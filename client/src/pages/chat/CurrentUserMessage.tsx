
const CurrentUserMessage = ({ message }: { message: string }) => {
  return <div className="self-end bg-blue-500 text-white px-2 py-1 rounded-full">{message}</div>;
};

export default CurrentUserMessage;
