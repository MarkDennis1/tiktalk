import { ReactNode } from "react";

const UserList = ({ children }: { children: ReactNode | any }) => {
  return (
    <div className="overflow-x-auto border-b">
      <div className="flex">{children}</div>
    </div>
  );
};

export default UserList;
