import { useState } from "react";
import YouBar from "./components/YouBar";

const classes = [
  {
    name: "Warrior",
    flavor: "Power through with brute force!",
    thumbnail: "border-red-800 bg-red-200",
    textColor: "text-red-800",
    unlocks: [
      "- Unlock a strength never before seen!",
      "- Boast a hefty health pool!",
      "- Take reduced damage!",
    ],
  },
  {
    name: "Mage",
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
  const [classModal, setClassModeal] = useState({
    open: false,
    class: null,
  });
  const [you, setYou] = useState({
    name: "You",
    level: 1,
    class: {
      name: "Visiter",
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
              // setYou({ ...you, class: "Warrior" });
              // setFloor(2.0);
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
              // setYou({ ...you, class: "Mage" });
              // setFloor(2.0);
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
              // setYou({ ...you, class: "Rogue" });
              // setFloor(2.0);
            }}
          >
            Rogue...
          </p>
        </div>
      </div>
    );
  }

  if (floor === 2.0) {
    return (
      <div className="min-h-screen">
        <YouBar you={you} />
        <div className="min-h-[calc(100vh-180px)] flex flex-col justify-center items-center px-16">
          {you.class === "Developer" ? (
            <>
              <h1>fsdfds</h1>
            </>
          ) : (
            <>
              <h1>sadasd</h1>
            </>
          )}
        </div>
        <div className="min-h-[90px] bg-gray-200 w-full grid grid-cols-2">
          <p
            className="min-h-[90px] flex justify-center items-center cursor-pointer hover:bg-gray-300"
            onClick={() => {
              setYou({ ...you, class: "Developer" });
              setFloor(2.0);
            }}
          >
            I'm a developer.
          </p>
          <p
            className="min-h-[90px] flex justify-center items-center cursor-pointer hover:bg-gray-300"
            onClick={() => {
              setYou({ ...you, class: "Recruiter" });
              setFloor(2.0);
            }}
          >
            I'm a recruiter.
          </p>
        </div>
      </div>
    );
  }
}

export default App;
