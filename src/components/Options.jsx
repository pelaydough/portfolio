import Cooldown from "./Cooldown";

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
                ? "min-h-[90px] flex flex-col justify-center items-center cursor-not-allowed bg-gray-400"
                : "min-h-[90px] flex flex-col justify-center items-center cursor-pointer hover:bg-gray-300"
            }`}
            onClick={() => option.onClick()}
          >
            <p>
              {Array.isArray(option.message)
                ? option.message[0]
                : option.message}
            </p>
            {Array.isArray(option.message) && <p>{option.message[1]}</p>}
            {option.remainingCooldown > 0 && (
              <Cooldown
                cooldown={option.cooldown}
                remainingCooldown={option.remainingCooldown}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Options;
