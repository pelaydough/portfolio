import { useState, useEffect, useRef } from "react";
import BasicSprite from "./components/BasicSprite";
import YouBar from "./components/YouBar";
import CooldownTimer from "./components/CooldownTimer";

const classes = [
  {
    name: "Warrior",
    currentHealth: 250,
    maxHealth: 250,
    resource: {
      type: "Rage",
      amount: 0,
    },
    flavor: "Power through with brute force!",
    thumbnail: "border-red-800 bg-red-200",
    textColor: "text-red-800",
    unlocks: [
      "- Unlock a strength never before seen!",
      "- Boast a hefty health pool!",
      "- Take reduced damage!",
    ],
    victoryRushOnCooldown: false,
    victoryRushCooldownTimer: 25,
    avatarOnCooldown: false,
    avatarCooldownTimer: 90,
  },
  {
    name: "Mage",
    currentHealth: 150,
    maxHealth: 150,
    resource: {
      type: "Mana",
      amount: 200,
    },
    flavor: "Weave spells, control magic!",
    thumbnail: "border-blue-800 bg-blue-200",
    textColor: "text-blue-800",
    unlocks: [
      "- Unlock spell weaving!",
      "- Outsmart the enemy!",
      "- Learn more efficiently!",
    ],
  },
  {
    name: "Rogue",
    currentHealth: 180,
    maxHealth: 180,
    resource: {
      type: "Energy",
      amount: 100,
    },
    flavor: "Sneaking and cheating is the way...",
    thumbnail: "border-green-800 bg-green-200",
    textColor: "text-green-800",
    unlocks: [
      "- Unlock cheats and shortcuts!",
      "- Avoid encounters!",
      "- Critically strike your enemies!",
    ],
  },
];

function App() {
  const [welcomeMessageClicked, setWelcomeMessageClicked] = useState(false);
  const [floor, setFloor] = useState(1.0);
  const [enemy, setEnemy] = useState({
    name: "Bad Guy",
    currentHealth: 1000,
    maxHealth: 1000,
  });
  const [tutorialStep, setTutorialStep] = useState(1);
  const [classModal, setClassModeal] = useState({
    open: false,
    class: null,
  });
  const [you, setYou] = useState({
    name: "You",
    level: 1,
    class: {
      name: "Visitor",
    },
    xp: 0,
  });

  if (!welcomeMessageClicked) {
    return (
      <div
        className="min-h-screen flex flex-col justify-center items-center cursor-pointer"
        onClick={() => setWelcomeMessageClicked(true)}
      >
        <h1 className="text-4xl mb-2">Welcome</h1>
        <span>Click anywhere to continue...</span>
      </div>
    );
  }

  if (floor === 1.0) {
    return (
      <div className="min-h-screen">
        <YouBar you={you} />
        <div className="min-h-[calc(100vh-180px)] flex justify-center items-center">
          <h1>How did you get here?</h1>
        </div>
        <div className="min-h-[90px] bg-gray-200 w-full">
          <div className="grid grid-cols-2">
            <p
              className="min-h-[90px] flex justify-center items-center cursor-pointer hover:bg-gray-300"
              onClick={() => {
                setFloor(1.1);
              }}
            >
              You called me here...
            </p>
            <p
              className="min-h-[90px] flex justify-center items-center cursor-pointer hover:bg-gray-300"
              onClick={() => {
                setFloor(1.2);
              }}
            >
              I stumbled into this place...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (floor === 1.1) {
    return (
      <div className="min-h-screen">
        <YouBar you={you} />
        <div className="min-h-[calc(100vh-180px)] flex flex-col justify-center items-center">
          <h1>You've answered the call.</h1>
          <h1>Well done, brave visiter...</h1>
          <h1 className="mb-5">What is your name?</h1>
          <input
            className="border-b outline-none text-center name-change"
            value={you.name}
            onChange={(e) => setYou({ ...you, name: e.target.value })}
          />
        </div>
        <div className="min-h-[90px] bg-gray-200 w-full">
          <p
            className="min-h-[90px] flex justify-center items-center cursor-pointer hover:bg-gray-300"
            onClick={() => {
              setFloor(1.3);
            }}
          >
            My name is {you.name}. [ Follow ]
          </p>
        </div>
      </div>
    );
  }

  if (floor === 1.3) {
    return (
      <div className="min-h-screen">
        <YouBar you={you} />
        <div className="min-h-[calc(100vh-180px)] flex flex-col justify-center items-center px-16">
          <h1>Welcome, {you.name}.</h1>
          <h1 className="mb-4">Let's get started.</h1>
          <h1>What class of adventurer are you?</h1>
          {classModal.open && (
            <div className="w-full min-h-screen absolute flex justify-center items-center bg-gray-900 bg-opacity-50">
              <div className="w-11/12 h-80 bg-white rounded-md flex flex-col justify-between">
                <div className="flex items-center pt-5 px-5">
                  <div
                    className={`${classModal.class.thumbnail} border-2 mr-4 rounded-full h-16 w-16`}
                  ></div>
                  <div>
                    <p className={`${classModal.class.textColor} text-xl`}>
                      {classModal.class.name}
                    </p>
                    <span>{classModal.class.flavor}</span>
                  </div>
                </div>
                <div className="flex flex-col ml-10">
                  {classModal.class.unlocks.map((unlock) => (
                    <span key={unlock}>{unlock}</span>
                  ))}
                </div>
                <div className="grid grid-cols-2">
                  <span
                    className="text-center bg-gray-200 p-5 rounded-bl-md hover:bg-gray-300 cursor-pointer"
                    onClick={() => {
                      setYou({ ...you, class: classModal.class });
                      setFloor(2.0);
                    }}
                  >
                    Yes!
                  </span>
                  <span
                    className="text-center bg-gray-200 p-5 rounded-br-md hover:bg-gray-300 cursor-pointer"
                    onClick={() => {
                      setClassModeal({
                        open: false,
                        class: "",
                      });
                    }}
                  >
                    No.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="min-h-[90px] bg-gray-200 w-full grid grid-cols-3">
          <p
            className="min-h-[90px] text-red-900 flex justify-center items-center cursor-pointer hover:bg-gray-300"
            onClick={() => {
              setClassModeal({
                open: true,
                class: classes.find((_class) => _class.name === "Warrior"),
              });
            }}
          >
            Warrior!
          </p>
          <p
            className="min-h-[90px] text-blue-800 flex justify-center items-center cursor-pointer hover:bg-gray-300"
            onClick={() => {
              setClassModeal({
                open: true,
                class: classes.find((_class) => _class.name === "Mage"),
              });
            }}
          >
            Mage.
          </p>
          <p
            className="min-h-[90px] text-green-900 flex justify-center items-center cursor-pointer hover:bg-gray-300"
            onClick={() => {
              setClassModeal({
                open: true,
                class: classes.find((_class) => _class.name === "Rogue"),
              });
            }}
          >
            Rogue...
          </p>
        </div>
      </div>
    );
  }

  if (floor === 2.0) {
    if (you.class.name === "Warrior") {
      return (
        <div className="min-h-screen">
          <YouBar you={you} />
          <div className="min-h-[calc(100vh-180px)] flex flex-col justify-center items-center px-16">
            <h1 className="mb-5 text-center">
              A <span className={`${you.class.textColor}`}>warrior</span>! Your
              strength will prove to be useful in the battles to come. Happy to
              have you on our side.
            </h1>
            <h1>Won't you show us what you're capable of?</h1>
          </div>
          <div className="min-h-[90px] bg-gray-200 w-full grid grid-cols-2">
            <p
              className="min-h-[90px] flex justify-center items-center cursor-pointer hover:bg-gray-300"
              onClick={() => {
                setFloor(2.1);
              }}
            >
              Fuck yeah!
            </p>
            <div
              className="min-h-[90px] flex flex-col justify-center items-center cursor-pointer hover:bg-gray-300"
              onClick={() => {
                setFloor(2.2);
              }}
            >
              <p>Just trust, bro.</p>
              <span className="text-xs text-gray-500">(skip tutorial)</span>
            </div>
          </div>
        </div>
      );
    }
    if (you.class.name === "Mage") {
      return (
        <div className="min-h-screen">
          <YouBar you={you} />
          <div className="min-h-[calc(100vh-180px)] flex flex-col justify-center items-center px-16">
            <h1 className="mb-5 text-center">
              A <span className={`${you.class.textColor}`}>mage</span>,
              excellent. Your wit and intelligence will surely give us an edge
              against the enemy at hand.
            </h1>
            <h1>Won't you show us what you're capable of?</h1>
          </div>
          <div className="min-h-[90px] bg-gray-200 w-full grid grid-cols-2">
            <p
              className="min-h-[90px] flex justify-center items-center cursor-pointer hover:bg-gray-300"
              onClick={() => {
                setFloor(2.1);
              }}
            >
              As you wish...
            </p>
            <div
              className="min-h-[90px] flex flex-col justify-center items-center cursor-pointer hover:bg-gray-300"
              onClick={() => {
                setFloor(2.2);
              }}
            >
              <p>Fret not.</p>
              <span className="text-xs text-gray-500">(skip tutorial)</span>
            </div>
          </div>
        </div>
      );
    }
    if (you.class.name === "Rogue") {
      return (
        <div className="min-h-screen">
          <YouBar you={you} />
          <div className="min-h-[calc(100vh-180px)] flex flex-col justify-center items-center px-16">
            <h1 className="mb-5 text-center">
              A <span className={`${you.class.textColor}`}>rogue</span>, very
              nice... In trying times like these, often what makes the
              difference between life and death is choosing to not fight fair.
            </h1>
            <h1>Won't you show us what you're capable of?</h1>
          </div>
          <div className="min-h-[90px] bg-gray-200 w-full grid grid-cols-2">
            <p
              className="min-h-[90px] flex justify-center items-center cursor-pointer hover:bg-gray-300"
              onClick={() => {
                setFloor(2.1);
              }}
            >
              Hm.. [nod]
            </p>
            <div
              className="min-h-[90px] flex flex-col justify-center items-center cursor-pointer hover:bg-gray-300"
              onClick={() => {
                setFloor(2.2);
              }}
            >
              <p>[glare threateningly]</p>
              <span className="text-xs text-gray-500">(skip tutorial)</span>
            </div>
          </div>
        </div>
      );
    }
  }

  if (floor === 2.1) {
    switch (you.class.name) {
      case "Warrior":
        return (
          <div className="min-h-screen">
            <YouBar you={you} />
            <div className="min-h-[calc(100vh-180px)] flex flex-col justify-center items-center px-16">
              {tutorialStep === 2 ? (
                <h1 className="mb-5 text-center">
                  You've accumulated enough rage to hit that dummy a little
                  harder. Slam it into the ground!
                </h1>
              ) : (
                <h1 className="mb-5 text-center">
                  We've prepared a combat dummy for you to display your brute
                  force. Show us what you're made of, {you.name}!
                </h1>
              )}
              <div className="mb-3">
                <BasicSprite />
              </div>
              <span>Health: {enemy.currentHealth}</span>
            </div>
            <div
              className={`min-h-[90px] bg-gray-200 w-full grid ${
                tutorialStep >= 2 ? `grid-cols-${tutorialStep}` : "grid-cols-1"
              }`}
            >
              <p
                className="min-h-[90px] flex justify-center items-center cursor-pointer hover:bg-gray-300"
                onClick={() => {
                  setEnemy({
                    ...enemy,
                    currentHealth: enemy.currentHealth - 15,
                  });

                  setYou({
                    ...you,
                    class: {
                      ...you.class,
                      resource: {
                        ...you.class.resource,
                        amount: you.class.resource.amount + 10,
                      },
                    },
                  });

                  if (tutorialStep === 1 && you.class.resource.amount === 10) {
                    setTutorialStep(2);
                  }
                }}
              >
                Attack
              </p>
              {tutorialStep >= 2 && (
                <p
                  className={`${
                    you.class.resource.amount < 20
                      ? "min-h-[90px] flex justify-center items-center cursor-not-allowed bg-gray-400"
                      : "min-h-[90px] flex justify-center items-center cursor-pointer hover:bg-gray-300"
                  }`}
                  onClick={() => {
                    if (you.class.resource.amount >= 20) {
                      setEnemy({
                        ...enemy,
                        currentHealth: enemy.currentHealth - 25,
                      });
                      setYou({
                        ...you,
                        class: {
                          ...you.class,
                          resource: {
                            ...you.class.resource,
                            amount: you.class.resource.amount - 20,
                          },
                        },
                      });

                      if (tutorialStep === 2) {
                        setTutorialStep(3);
                      }
                    } else {
                      return;
                    }
                  }}
                >
                  Slam
                </p>
              )}
              {tutorialStep >= 3 && (
                <div
                  className={`${
                    you.class.victoryRushOnCooldown
                      ? "min-h-[90px] flex flex-col justify-center items-center cursor-not-allowed bg-gray-400"
                      : "min-h-[90px] flex flex-col justify-center items-center cursor-pointer hover:bg-gray-300"
                  }`}
                  onClick={() => {
                    if (!you.class.victoryRushOnCooldown) {
                      setEnemy({
                        ...enemy,
                        currentHealth: enemy.currentHealth - 25,
                      });

                      setYou({
                        ...you,
                        class: {
                          ...you.class,
                          currentHealth:
                            you.class.currentHealth <= you.class.maxHealth * 0.9
                              ? you.class.currentHealth +
                                you.class.maxHealth * 0.1
                              : you.class.currentHealth,
                          victoryRushOnCooldown: true,
                        },
                      });

                      setTutorialStep(4);

                      setTimeout(() => {
                        setYou({
                          ...you,
                          class: {
                            ...you.class,
                            victoryRushOnCooldown: false,
                          },
                        });
                      }, you.class.victoryRushCooldownTimer * 100);
                    } else {
                      return;
                    }
                  }}
                >
                  <p>Victory Rush</p>
                  {/* {you.class.victoryRushOnCooldown && (
                    <CooldownTimer
                      initialTime={you.class.victoryRushCooldownTimer}
                    />
                  )} */}
                </div>
              )}
              {tutorialStep >= 4 && (
                <div
                  className={`${
                    you.class.avatarOnCooldown
                      ? "min-h-[90px] flex flex-col justify-center items-center cursor-not-allowed bg-gray-400"
                      : "min-h-[90px] flex flex-col justify-center items-center cursor-pointer hover:bg-gray-300"
                  }`}
                  onClick={() => {
                    if (!you.class.avatarOnCooldown) {
                      setEnemy({
                        ...enemy,
                        currentHealth: enemy.currentHealth - 25,
                      });

                      setYou({
                        ...you,
                        class: {
                          ...you.class,
                          avatarOnCooldown: true,
                        },
                      });

                      setTimeout(() => {
                        setYou({
                          ...you,
                          class: {
                            ...you.class,
                            avatarOnCooldown: false,
                          },
                        });
                      }, you.class.avatarCooldownTimer * 1000);
                    } else {
                      return;
                    }
                  }}
                >
                  <p>Avatar</p>
                  {/* {you.class.avatarOnCooldown && (
                    <CooldownTimer
                      initialTime={you.class.avatarCooldownTimer}
                    />
                  )} */}
                </div>
              )}
            </div>
          </div>
        );
      case "Mage":
        return (
          <div className="min-h-screen">
            <YouBar you={you} />
            <div className="min-h-[calc(100vh-180px)] flex flex-col justify-center items-center px-16">
              <h1 className="mb-5 text-center">
                A <span className={`${you.class.textColor}`}>warrior</span>!
                Your strength will prove to be useful in the battles to come.
                Happy to have you on our side.
              </h1>
              <h1>Won't you show us what you're capable of?</h1>
            </div>
            <div className="min-h-[90px] bg-gray-200 w-full grid grid-cols-2">
              <p
                className="min-h-[90px] flex justify-center items-center cursor-pointer hover:bg-gray-300"
                onClick={() => {
                  setFloor(2.1);
                }}
              >
                Fuck yeah!
              </p>
              <div
                className="min-h-[90px] flex flex-col justify-center items-center cursor-pointer hover:bg-gray-300"
                onClick={() => {
                  setFloor(2.2);
                }}
              >
                <p>Just trust, bro.</p>
                <span className="text-xs text-gray-500">(skip tutorial)</span>
              </div>
            </div>
          </div>
        );
      case "Rogue":
        return (
          <div className="min-h-screen">
            <YouBar you={you} />
            <div className="min-h-[calc(100vh-180px)] flex flex-col justify-center items-center px-16">
              <h1 className="mb-5 text-center">
                A <span className={`${you.class.textColor}`}>warrior</span>!
                Your strength will prove to be useful in the battles to come.
                Happy to have you on our side.
              </h1>
              <h1>Won't you show us what you're capable of?</h1>
            </div>
            <div className="min-h-[90px] bg-gray-200 w-full grid grid-cols-2">
              <p
                className="min-h-[90px] flex justify-center items-center cursor-pointer hover:bg-gray-300"
                onClick={() => {
                  setFloor(2.1);
                }}
              >
                Fuck yeah!
              </p>
              <div
                className="min-h-[90px] flex flex-col justify-center items-center cursor-pointer hover:bg-gray-300"
                onClick={() => {
                  setFloor(2.2);
                }}
              >
                <p>Just trust, bro.</p>
                <span className="text-xs text-gray-500">(skip tutorial)</span>
              </div>
            </div>
          </div>
        );
      default:
        break;
    }
  }
}

export default App;
