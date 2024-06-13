export const initialRogueState = {
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
};

export const rogueStateReducer = (state, action) => {
  switch (action.type) {
    case "ATTACK":
      console.log("I am attacking.");
      return state;
    default:
      return state;
  }
};
