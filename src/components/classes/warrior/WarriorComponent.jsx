import { useState, useReducer, useEffect } from "react";

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

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "q":
        handleAttack();
        return;
      case "w":
        handleSlam();
        return;
      case "e":
        handleVictoryRush();
        return;
      case "r":
        handleAvatar();
        return;
      default:
        return;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleAttack = () => {
    if (!warriorState.attack.isOnCooldown && !warriorState.attack.isDisabled) {
      dispatch({ type: "ATTACK" });
    }
  };

  const handleAttacked = () => {
    if (!warriorState.attack.isOnCooldown && !warriorState.attack.isDisabled) {
      dispatch({ type: "ATTACKED" });

      setTimeout(() => {
        dispatch({ type: "ATTACK_OFF_COOLDOWN" });
      }, warriorState.attack.cooldown * 1000);
    }
  };

  const handleSlam = () => {
    if (
      !warriorState.slam.isOnCooldown &&
      !warriorState.slam.isDisabled &&
      warriorState.resource.amount >= 20
    ) {
      dispatch({ type: "SLAM" });
    }
  };

  const handleSlammed = () => {
    if (!warriorState.slam.isOnCooldown && !warriorState.slam.isDisabled) {
      dispatch({ type: "SLAMMED" });

      setTimeout(() => {
        dispatch({ type: "SLAM_OFF_COOLDOWN" });
      }, warriorState.slam.cooldown * 1000);
    }
  };

  const handleVictoryRush = () => {
    if (
      !warriorState.victoryRush.isOnCooldown &&
      !warriorState.victoryRush.isDisabled
    ) {
      dispatch({ type: "VICTORY_RUSH" });
    }
  };

  const handleVictoryRushed = () => {
    if (
      !warriorState.victoryRush.isOnCooldown &&
      !warriorState.victoryRush.isDisabled
    ) {
      dispatch({ type: "VICTORY_RUSHED" });

      setTimeout(() => {
        dispatch({ type: "VICTORY_RUSH_OFF_COOLDOWN" });
      }, warriorState.victoryRush.cooldown * 1000);
    }
  };

  const handleAvatar = () => {
    if (
      !warriorState.avatar.isActive &&
      !warriorState.avatar.isDisabled &&
      !warriorState.avatar.isOnCooldown
    ) {
      dispatch({ type: "AVATAR" });

      setTimeout(() => {
        dispatch({ type: "AVATAR_TIMEOUT" });
      }, warriorState.avatar.duration * 1000);

      setTimeout(() => {
        dispatch({ type: "AVATAR_OFF_COOLDOWN" });
      }, warriorState.avatar.cooldown * 1000);
    }
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
                          ? {
                              ..._enemy,
                              health:
                                _enemy.health - warriorState.attack.damage,
                            }
                          : _enemy
                      )
                    );
                    handleAttacked();
                  }

                  if (warriorState.slam.isTargetting) {
                    console.log(`${enemy.name} is being slammed!`);
                    setEnemies(
                      enemies.map((_enemy) =>
                        _enemy.name === enemy.name
                          ? {
                              ..._enemy,
                              health: _enemy.health - warriorState.slam.damage,
                            }
                          : _enemy
                      )
                    );
                    handleSlammed();
                  }

                  if (warriorState.victoryRush.isTargetting) {
                    console.log(`${enemy.name} is being victory rushed!`);
                    setEnemies(
                      enemies.map((_enemy) =>
                        _enemy.name === enemy.name
                          ? {
                              ..._enemy,
                              health:
                                _enemy.health - warriorState.victoryRush.damage,
                            }
                          : _enemy
                      )
                    );
                    handleVictoryRushed();
                  }
                }}
                className="flex flex-col justify-center items-center mx-3"
              >
                <BasicSprite
                  targetting={
                    warriorState.attack.isTargetting ||
                    warriorState.slam.isTargetting ||
                    warriorState.victoryRush.isTargetting
                  }
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
            cooldown: warriorState.attack.cooldown,
            remainingCooldown: warriorState.attack.remainingCooldown,
            disabled:
              warriorState.attack.isDisabled ||
              warriorState.attack.isOnCooldown,
          },
          {
            message: "Slam",
            onClick: handleSlam,
            cooldown: warriorState.slam.cooldown,
            remainingCooldown: warriorState.slam.remainingCooldown,
            disabled:
              warriorState.slam.isDisabled ||
              warriorState.resource.amount < 20 ||
              warriorState.slam.isOnCooldown,
          },
          {
            message: ["Victory", "Rush"],
            onClick: handleVictoryRush,
            cooldown: warriorState.victoryRush.cooldown,
            remainingCooldown: warriorState.victoryRush.remainingCooldown,
            disabled:
              warriorState.victoryRush.isDisabled ||
              warriorState.victoryRush.isOnCooldown,
          },
          {
            message: "Avatar",
            onClick: handleAvatar,
            cooldown: warriorState.avatar.cooldown,
            remainingCooldown: warriorState.avatar.remainingCooldown,
            disabled:
              warriorState.avatar.isDisabled ||
              warriorState.avatar.isActive ||
              warriorState.avatar.isOnCooldown,
          },
        ]}
      />
    </div>
  );
};

export default WarriorComponent;
