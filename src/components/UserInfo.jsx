const UserInfo = ({ user }) => {
  return (
    <div className="bg-white p-3 flex items-center justify-between min-h-[90px] relative">
      <div className="flex items-center">
        <div
          className={`${
            user.class ? user.class.thumbnail : "border-black bg-gray-200"
          } border-2 mr-2 rounded-full h-16 w-16`}
        ></div>
        <div className="flex flex-col">
          <span className="text-xl">{user.name}</span>
          <span className="text-sm text-gray-500">Level {user.level}</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span>
          Class:{" "}
          <span
            className={`${user.class ? user.class.textColor : "text-gray-500"}`}
          >
            {user.class.name}
          </span>
        </span>
        <span>
          XP: <span className="text-gray-500">{user.xp}</span>
        </span>
      </div>
      {user.class.currentHealth && (
        <div className="absolute -bottom-11">
          <h1>Health: {user.class.currentHealth}</h1>
          <h1>
            {user.class.resource.type}: {user.class.resource.amount}
          </h1>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
