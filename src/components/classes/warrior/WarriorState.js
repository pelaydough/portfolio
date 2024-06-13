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
    isTargetting: false,
    isDisabled: false,
  },
  slam: {
    isOnCooldown: false,
    damage: 25,
    cost: 20,
    cooldown: 1.5,
    isTargetting: false,
    isDisabled: false,
  },
  victoryRush: {
    isOnCooldown: false,
    damage: 30,
    heal: 0.1,
    cooldown: 25,
    isTargetting: false,
    isDisabled: false,
  },
  avatar: {
    isOnCooldown: false,
    cooldown: 90,
    isDisabled: false,
    isActive: false,
  },
};

export const warriorStateReducer = (state, action) => {
  switch (action.type) {
    case "ATTACK":
      if (!state.attack.isDisabled && !state.attack.isTargetting) {
        return {
          ...state,
          attack: {
            ...state.attack,
            isTargetting: true,
          },
          slam: {
            ...state.slam,
            isDisabled: true,
          },
          victoryRush: {
            ...state.victoryRush,
            isDisabled: true,
          },
          avatar: {
            ...state.avatar,
            isDisabled: true,
          },
        };
      }

      if (state.attack.isTargetting) {
        return {
          ...state,
          attack: {
            ...state.attack,
            isTargetting: false,
          },
          slam: {
            ...state.slam,
            isDisabled: false,
          },
          victoryRush: {
            ...state.victoryRush,
            isDisabled: false,
          },
          avatar: {
            ...state.avatar,
            isDisabled: false,
          },
        };
      }

      return state;
    case "ATTACKED":
      return {
        ...state,
        resource: {
          ...state.resource,
          amount: state.resource.amount + 10,
        },
        attack: {
          ...state.attack,
          isTargetting: false,
        },
        slam: {
          ...state.slam,
          isDisabled: false,
        },
        victoryRush: {
          ...state.victoryRush,
          isDisabled: false,
        },
        avatar: {
          ...state.avatar,
          isDisabled: false,
        },
      };
    case "SLAM":
      if (!state.slam.isDisabled && !state.slam.isTargetting) {
        return {
          ...state,
          slam: {
            ...state.slam,
            isTargetting: true,
          },
          attack: {
            ...state.attack,
            isDisabled: true,
          },
          victoryRush: {
            ...state.victoryRush,
            isDisabled: true,
          },
          avatar: {
            ...state.avatar,
            isDisabled: true,
          },
        };
      }

      if (state.slam.isTargetting) {
        return {
          ...state,
          slam: {
            ...state.slam,
            isTargetting: false,
          },
          attack: {
            ...state.attack,
            isDisabled: false,
          },
          victoryRush: {
            ...state.victoryRush,
            isDisabled: false,
          },
          avatar: {
            ...state.avatar,
            isDisabled: false,
          },
        };
      }

      return state;
    case "SLAMMED":
      return {
        ...state,
        slam: {
          ...state.slam,
          isTargetting: false,
        },
        attack: {
          ...state.attack,
          isDisabled: false,
        },
        victoryRush: {
          ...state.victoryRush,
          isDisabled: false,
        },
        avatar: {
          ...state.avatar,
          isDisabled: false,
        },
      };
    case "VICTORY_RUSH":
      if (!state.victoryRush.isDisabled && !state.victoryRush.isTargetting) {
        return {
          ...state,
          victoryRush: {
            ...state.victoryRush,
            isTargetting: true,
          },
          attack: {
            ...state.attack,
            isDisabled: true,
          },
          slam: {
            ...state.slam,
            isDisabled: true,
          },
          avatar: {
            ...state.avatar,
            isDisabled: true,
          },
        };
      }

      if (state.victoryRush.isTargetting) {
        return {
          ...state,
          victoryRush: {
            ...state.victoryRush,
            isTargetting: false,
          },
          attack: {
            ...state.attack,
            isDisabled: false,
          },
          slam: {
            ...state.slam,
            isDisabled: false,
          },
          avatar: {
            ...state.avatar,
            isDisabled: false,
          },
        };
      }

      return state;
    case "VICTORY_RUSHED":
      return {
        ...state,
        victoryRush: {
          ...state.victoryRush,
          isTargetting: false,
        },
        attack: {
          ...state.attack,
          isDisabled: false,
        },
        slam: {
          ...state.slam,
          isDisabled: false,
        },
        avatar: {
          ...state.avatar,
          isDisabled: false,
        },
      };
    case "AVATAR":
      if (!state.avatar.isDisabled) {
        return {
          ...state,
          avatar: {
            ...avatar,
            isActive: true,
          },
        };
      }
    default:
      return state;
  }
};
