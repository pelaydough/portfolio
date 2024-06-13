const RogueComponent = () => {
  const [rogueState, dispath] = useReducer(
    rogueStateReducer,
    initialRogueState
  );

  const handleAttack = () => {
    dispath({ type: "ATTACK" });
  };

  return (
    <div>
      <UserInfo />
      <h1>Rogue</h1>
      <button onClick={() => handleAttack()}>Attack</button>
    </div>
  );
};

export default RogueComponent;
