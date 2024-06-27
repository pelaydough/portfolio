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
  attack: {
    isOnCooldown: false,
    damage: 15,
    cooldown: 1.5,
    remainingCooldown: 0,
    isTargetting: false,
    isDisabled: false,
  },
  slam: {
    isOnCooldown: false,
    damage: 25,
    cost: 20,
    cooldown: 1.5,
    remainingCooldown: 0,
    isTargetting: false,
    isDisabled: false,
  },
  victoryRush: {
    isOnCooldown: false,
    damage: 20,
    heal: 0.1,
    cooldown: 25,
    remainingCooldown: 0,
    isTargetting: false,
    isDisabled: false,
  },
  avatar: {
    isOnCooldown: false,
    duration: 20,
    cooldown: 90,
    remainingCooldown: 0,
    isDisabled: false,
    isActive: false,
  },
};

export const warriorStateReducer = (state, action) => {
  switch (action.type) {
    case "ATTACK":
      if (!state.attack.isTargetting) {
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
          isOnCooldown: true,
          remainingCooldown: state.attack.cooldown,
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
    case "ATTACK_OFF_COOLDOWN":
      return {
        ...state,
        attack: {
          ...state.attack,
          isOnCooldown: false,
          remainingCooldown: 0,
        },
      };
    case "SLAM":
      if (!state.slam.isTargetting) {
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
    case "SLAMMED":
      return {
        ...state,
        resource: {
          ...state.resource,
          amount: state.resource.amount - state.slam.cost,
        },
        slam: {
          ...state.slam,
          isTargetting: false,
          isOnCooldown: true,
          remainingCooldown: state.slam.cooldown,
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
    case "SLAM_OFF_COOLDOWN":
      return {
        ...state,
        slam: {
          ...state.slam,
          isOnCooldown: false,
          remainingCooldown: 0,
        },
      };
    case "VICTORY_RUSH":
      if (!state.victoryRush.isTargetting) {
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
    case "VICTORY_RUSHED":
      return {
        ...state,
        currentHealth:
          state.currentHealth <= state.maxHealth - state.maxHealth * 0.1
            ? state.currentHealth + state.maxHealth * 0.1
            : state.maxHealth,
        victoryRush: {
          ...state.victoryRush,
          isTargetting: false,
          isDisabled: true,
          isOnCooldown: true,
          remainingCooldown: state.victoryRush.cooldown,
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
    case "VICTORY_RUSH_OFF_COOLDOWN":
      return {
        ...state,
        victoryRush: {
          ...state.victoryRush,
          isOnCooldown: false,
          isDisabled:
            state.attack.isTargetting || state.slam.isTargetting
              ? state.victoryRush.isDisabled
              : false,
          remainingCooldown: 0,
        },
      };
    case "AVATAR":
      return {
        ...state,
        avatar: {
          ...state.avatar,
          isOnCooldown: true,
          remainingCooldown: state.avatar.cooldown,
          isDisabled: true,
          isActive: true,
        },
        attack: {
          ...state.attack,
          damage: state.attack.damage * 1.2,
        },
        slam: {
          ...state.slam,
          damage: state.slam.damage * 1.2,
        },
        victoryRush: {
          ...state.victoryRush,
          damage: state.victoryRush.damage * 1.2,
        },
      };
    case "AVATAR_TIMEOUT":
      return {
        ...state,
        avatar: {
          ...state.avatar,
          isDisabled:
            state.attack.isTargetting || state.slam.isTargetting
              ? state.avatar.isDisabled
              : false,
          isActive: false,
        },
        attack: {
          ...state.attack,
          damage: 15,
        },
        slam: {
          ...state.slam,
          damage: 25,
        },
        victoryRush: {
          ...state.victoryRush,
          damage: 20,
        },
      };
    case "AVATAR_OFF_COOLDOWN":
      return {
        ...state,
        avatar: {
          ...state.avatar,
          isOnCooldown: false,
          remainingCooldown: 0,
        },
      };
    default:
      return state;
  }
};
