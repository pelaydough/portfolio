export const initialMageState = {
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
};

export const mageStateReducer = (state, action) => {
  switch (action.type) {
    case "ATTACK":
      console.log("I am attacking.");
      return state;
    default:
      return state;
  }
};
