const User = ({
  avatar,
  name,
  click,
}: {
  avatar: string | undefined;
  name: string;
  click: any;
}) => {
  return (
    <button
      onClick={click}
      className="flex flex-col w-24 items-center hover:bg-gray-200 rounded-lg px-4 py-2"
    >
      <div className="aspect-square h-14 w-14 rounded-full overflow-hidden">
        <img
          className="object-cover w-full h-full"
          src={
            avatar ||
            `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${name}`
          }
          alt={name}
        />
      </div>
      <div className="text-center text-sm line-clamp-2">{name}</div>
    </button>
  );
};

export default User;
