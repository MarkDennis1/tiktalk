import { MouseEventHandler, ReactNode } from "react";

const DefaultButton = ({
  children,
  click,
}: {
  children: ReactNode;
  click: MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  return (
    <button
      onClick={click}
      className="w-full bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg"
    >
      {children}
    </button>
  );
};

export default DefaultButton;
