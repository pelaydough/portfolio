import { useState, useReducer } from "react";

import UserInfo from "../../UserInfo";
import Message from "../../Message";
import Options from "../../Options";

import BasicSprite from "../../BasicSprite";

import { initialWarriorState, warriorStateReducer } from "./WarriorState";

const WarriorComponent = ({ user, enemies, setEnemies }) => {
  const [targettedEnemy, setTargettedEnemy] = useState(null);
  const [warriorState, dispatch] = useReducer(
    warriorStateReducer,
    initialWarriorState
  );

  const handleAttack = () => {
    dispatch({ type: "ATTACK" });
  };

  const handleAttacked = () => {
    dispatch({ type: "ATTACKED" });
  };

  const handleSlam = () => {
    dispatch({ type: "SLAM" });
  };

  const handleSlammed = () => {
    dispatch({ type: "SLAMMED" });
  };

  const handleVictoryRush = () => {
    dispatch({ type: "VICTORY_RUSH" });
  };

  const handleVictoryRushed = () => {
    dispatch({ type: "VICTORY_RUSHED" });
  };

  const handleAvatar = () => {
    dispatch({ type: "AVATAR" });
  };

  return (
    <div>
      <UserInfo user={user} classState={warriorState} />
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
                onClick={() => {
                  if (warriorState.attack.isTargetting) {
                    console.log(`${enemy.name} is being attacked!`);
                    setEnemies(
                      enemies.map((_enemy) =>
                        _enemy.name === enemy.name
                          ? { ..._enemy, health: _enemy.health - 50 }
                          : _enemy
                      )
                    );
                    handleAttacked();
                  }

                  if (warriorState.slam.isTargetting) {
                    console.log(`${enemy.name} is being slammed!`);
                    handleSlammed();
                  }

                  if (warriorState.victoryRush.isTargetting) {
                    console.log(`${enemy.name} is being victory rushed!`);
                    handleVictoryRushed();
                  }
                }}
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
          {
            message: "Attack!",
            onClick: handleAttack,
            disabled: warriorState.attack.isDisabled,
          },
          {
            message: "Slam",
            onClick: handleSlam,
            disabled: warriorState.slam.isDisabled,
          },
          {
            message: "Victory Rush",
            onClick: handleVictoryRush,
            disabled: warriorState.victoryRush.isDisabled,
          },
          {
            message: "Avatar",
            onClick: handleAvatar,
            disabled: warriorState.avatar.isDisabled,
          },
        ]}
      />
    </div>
  );
};

export default WarriorComponent;
