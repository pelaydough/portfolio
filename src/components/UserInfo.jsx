const UserInfo = ({ user, classState }) => {
  return (
    <div className="bg-white p-3 flex items-center justify-between min-h-[90px] relative">
      <div className="flex items-center">
        <div
          className={`${
            classState ? classState.thumbnail : "border-black bg-gray-200"
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
            className={`${classState ? classState.textColor : "text-gray-500"}`}
          >
            {classState ? classState.name : user.class.name}
          </span>
        </span>
        <span>
          XP: <span className="text-gray-500">{user.xp}</span>
        </span>
      </div>
      {classState && (
        <div className="absolute -bottom-11">
          <h1>Health: {classState.currentHealth}</h1>
          <h1>
            {classState.resource.type}: {classState.resource.amount}
          </h1>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
