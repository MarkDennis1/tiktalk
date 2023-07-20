import { ReactNode } from "react";

const ChatBody = ({ children }: { children: ReactNode | any }) => {
  return <div className="h-[calc(100vh-124px)] flex flex-col gap-1 px-4 pt-4 overflow-y-scroll">{children}</div>;
};

export default ChatBody;
