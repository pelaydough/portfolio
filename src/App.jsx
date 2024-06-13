import { useState } from "react";

import { initialWarriorState } from "./components/classes/warrior/WarriorState";
import { initialMageState } from "./components/classes/mage/MageState";
import { initialRogueState } from "./components/classes/rogue/RogueState";

import UserInfo from "./components/UserInfo";
import Message from "./components/Message";
import Options from "./components/Options";

import BasicSprite from "./components/BasicSprite";

import WarriorComponent from "./components/classes/warrior/WarriorComponent";

function App() {
  const [floor, setFloor] = useState(1);
  const [enemies, setEnemies] = useState([
    {
      name: "Combat Dummy",
      health: 1000,
      sprite: BasicSprite,
    },
  ]);
  const [user, setUser] = useState({
    name: "Traveler",
    level: 1,
    class: {
      name: "Visitor",
      thumbnail: "border-black bg-gray-200",
      textColor: "text-gray-500",
    },
    xp: 0,
  });
  const [modal, setModal] = useState({
    isOpen: false,
    class: null,
  });

  if (floor === 1) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center cursor-pointer"
        onClick={() => setFloor(2)}
      >
        <h1 className="text-2xl">Welcome.</h1>
        <p className="text-sm">Click anywhere to continue...</p>
      </div>
    );
  }

  if (floor === 2) {
    return (
      <div>
        <UserInfo user={user} />
        <Message content={<p>How did you find this place, traveler?</p>} />
        <Options
          options={[
            {
              id: 1,
              message: "You called me here...",
              onClick: () => {
                setFloor(3);
              },
            },
            {
              id: 2,
              message: "I stumbled in...",
              onClick: () => {
                setFloor(3);
              },
            },
          ]}
        />
      </div>
    );
  }

  if (floor === 3) {
    return (
      <div>
        <UserInfo user={user} />
        <Message
          content={[
            <p className="mb-5">
              You're brave to have answered the call. Very well done. What is
              your name?
            </p>,
            <input
              className="border-b outline-none text-center name-change"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />,
          ]}
        />
        <Options
          options={[
            {
              message: `My name is, ${user.name}. [follow]`,
              onClick: () => {
                setFloor(4);
              },
            },
          ]}
        />
      </div>
    );
  }

  if (floor === 4) {
    return (
      <div>
        <UserInfo user={user} />
        <Message
          content={[
            <p className="mb-3">
              Welcome, {user.name}. I hope you serve us well... For everyone's
              sake. Let's get started.
            </p>,
            <p>What class of adventurer are you?</p>,
          ]}
        />
        {modal.isOpen && (
          <div className="bg-opacity-50 px-4 flex justify-center items-center bg-gray-800 absolute top-0 left-0 w-full h-full">
            <div className="bg-white w-11/12 rounded-md">
              <div className="p-6 flex items-center">
                <div
                  className={`${
                    modal.class
                      ? modal.class.thumbnail
                      : "border-black bg-gray-200"
                  } border-2 mr-2 rounded-full h-16 w-16`}
                ></div>
                <div>
                  <h3 className="text-xl">{modal.class.name}</h3>
                  <span className="text-sm text-gray-500">
                    {modal.class.flavor}
                  </span>
                </div>
              </div>
              <div className="p-8 pt-0">
                {modal.class.unlocks.map((unlock, index) => {
                  return <p key={index}>{unlock}</p>;
                })}
              </div>
              <div className="grid grid-cols-2 w-full">
                <p
                  className="text-center bg-gray-200 p-5 rounded-bl-md hover:bg-gray-300 cursor-pointer"
                  onClick={() => {
                    setUser({ ...user, class: modal.class });
                    setModal({ isOpen: false, class: null });
                    setFloor(5);
                  }}
                >
                  Yes!
                </p>
                <p
                  className="text-center bg-gray-200 p-5 rounded-br-md hover:bg-gray-300 cursor-pointer"
                  onClick={() => {
                    setModal({ isOpen: false, class: null });
                  }}
                >
                  No.
                </p>
              </div>
            </div>
          </div>
        )}
        <Options
          options={[
            {
              message: "Warrior!",
              onClick: () => {
                setModal({ isOpen: true, class: initialWarriorState });
              },
            },
            {
              message: "Mage.",
              onClick: () =>
                setModal({ isOpen: true, class: initialMageState }),
            },
            {
              message: "Rogue...",
              onClick: () =>
                setModal({ isOpen: true, class: initialRogueState }),
            },
          ]}
        />
      </div>
    );
  }

  if (floor === 5) {
    if (user.class.name === "Warrior") {
      return (
        <WarriorComponent
          user={user}
          enemies={enemies}
          setEnemies={setEnemies}
        />
      );
    }

    if (user.class.name === "Mage") {
    }

    if (user.class.name === "Rogue") {
    }
  }
}

export default App;
