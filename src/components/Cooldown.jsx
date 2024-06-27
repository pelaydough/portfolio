import { useEffect, useState } from "react";

const Cooldown = ({ cooldown, remainingCooldown }) => {
  const [timeLeft, setTimeLeft] = useState(remainingCooldown);

  useEffect(() => {
    setTimeLeft(remainingCooldown);

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 0.1 : 0));
    }, 100);

    return () => clearInterval(intervalId);
  }, [remainingCooldown]);

  return (
    <div>
      <span className="text-xs text-gray-700">({timeLeft.toFixed(1)})</span>
    </div>
  );
};

export default Cooldown;
