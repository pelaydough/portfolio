const Options = ({ options }) => {
  return (
    <div
      className={`bg-gray-200 grid ${
        options.length === 1
          ? "grid-cols-1"
          : options.length === 2
          ? "grid-cols-2"
          : options.length === 3
          ? "grid-cols-3"
          : "grid-cols-4"
      } w-full`}
    >
      {options.map((option) => {
        return (
          <div
            key={option.message}
            className={`${
              option.disabled
                ? "min-h-[90px] flex justify-center items-center cursor-not-allowed bg-gray-400"
                : "min-h-[90px] flex justify-center items-center cursor-pointer hover:bg-gray-300"
            }`}
            onClick={() => option.onClick()}
          >
            <p>{option.message}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Options;
