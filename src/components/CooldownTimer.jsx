import React, { useState, useEffect } from "react";

const CountdownTimer = ({ initialTime }) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return <span className="text-white">( {timeRemaining} )</span>;
};

export default CountdownTimer;
