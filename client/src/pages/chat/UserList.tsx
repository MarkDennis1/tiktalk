import { ReactNode } from "react";

const UserList = ({ children }: { children: ReactNode | any }) => {
  return (
    <div className="overflow-x-scroll border border-b-gray-400">
      <div className="flex">{children}</div>
    </div>
  );
};

export default UserList;
