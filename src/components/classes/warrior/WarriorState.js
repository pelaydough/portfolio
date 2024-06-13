export const initialWarriorState = {
  name: "Warrior",
  maxHealth: 250,
  currentHealth: 250,
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
  targetting: false,
  attack: {
    isOnCooldown: false,
    damage: 15,
    cooldown: 1.5,
  },
  slam: {
    isOnCooldown: false,
    damage: 25,
    cost: 20,
    cooldown: 1.5,
  },
  victoryRush: {
    isOnCooldown: false,
    damage: 30,
    heal: 0.1,
    cooldown: 25,
  },
  avatar: {
    isOnCooldown: false,
    cooldown: 90,
  },
};

export const warriorStateReducer = (state, action) => {
  switch (action.type) {
    case "ATTACK":
      return {
        ...state,
        targetting: true,
      };
    default:
      return state;
  }
};
