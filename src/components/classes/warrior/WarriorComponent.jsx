import { useState, useReducer } from "react";

import UserInfo from "../../UserInfo";
import Message from "../../Message";
import Options from "../../Options";

import BasicSprite from "../../BasicSprite";

import { initialWarriorState, warriorStateReducer } from "./WarriorState";

const WarriorComponent = ({ user, enemies }) => {
  const [targettedEnemy, setTargettedEnemy] = useState(null);
  const [warriorState, dispath] = useReducer(
    warriorStateReducer,
    initialWarriorState
  );

  const handleAttack = () => {
    dispath({ type: "ATTACK" });
  };

  const handleSlam = () => {
    dispath({ type: "SLAM" });
  };

  const handleVictoryRush = () => {
    dispath({ type: "VICTORY_RUSH" });
  };

  const handleAvatar = () => {
    dispath({ type: "AVATAR" });
  };

  return (
    <div>
      <UserInfo user={user} />
      <Message
        content={[
          <h1 className="mb-5 text-center">
            A <span className={`${user.class.textColor}`}>warrior</span>! Your
            strength will prove to be useful in the battles to come. Happy to
            have you on our side.
          </h1>,
          <h1 className="mb-8">
            Show us what you're capable of! We've set up a combat dummy below.
            Have at it!
          </h1>,
          <div className="flex">
            {enemies.map((enemy, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center mx-3"
              >
                <BasicSprite
                  targetting={warriorState.targetting}
                  setTargettedEnemy={setTargettedEnemy}
                  enemy={enemy}
                />
                <span>HP: {enemy.health}</span>
              </div>
            ))}
          </div>,
        ]}
      />
      <Options
        options={[
          { message: "Attack!", onClick: handleAttack },
          { message: "Slam", onClick: handleSlam },
          { message: "Victory Rush", onClick: handleVictoryRush },
          { message: "Avatar", onClick: handleAvatar },
        ]}
      />
    </div>
  );
};

export default WarriorComponent;
