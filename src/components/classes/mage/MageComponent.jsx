const MageComponent = () => {
  const [mageState, dispath] = useReducer(mageStateReducer, initialMagetate);

  const handleAttack = () => {
    dispath({ type: "ATTACK" });
  };

  return (
    <div>
      <UserInfo />
      <h1>Mage</h1>
      <button onClick={() => handleAttack()}>Attack</button>
    </div>
  );
};

export default MageComponent;
