const YouBar = ({ you }) => {
  return (
    <div className="bg-white p-3 flex items-center justify-between min-h-[90px]">
      <div className="flex items-center">
        <div
          className={`${
            you.class.thumbnail
              ? you.class.thumbnail
              : "border-black bg-gray-200"
          } border-2 mr-2 rounded-full h-16 w-16`}
        ></div>
        <div className="flex flex-col">
          <span className="text-xl">{you.name}</span>
          <span className="text-sm text-gray-500">Level {you.level}</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span>
          Class:{" "}
          <span
            className={`${
              you.class.textColor ? you.class.textColor : "text-gray-500"
            }`}
          >
            {you.class.name}
          </span>
        </span>
        <span>
          XP: <span className="text-gray-500">{you.xp}</span>
        </span>
      </div>
    </div>
  );
};

export default YouBar;
