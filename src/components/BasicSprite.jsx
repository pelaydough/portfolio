const BasicSprite = ({ targetting, setTargettedEnemy, enemy }) => {
  return (
    <div className="w-12 h-16 grid grid-cols-12 grid-rows-12 p-2 relative">
      <div className="absolute bg-black w-full h-full bg-opacity-0"></div>
      {/* Row 1 */}
      <div className="col-span-3"></div>
      <div className="col-span-6 bg-black"></div>
      <div className="col-span-3"></div>
      {/* Row 2 */}
      <div className="col-span-2"></div>
      <div className="bg-black"></div>
      <div className="col-span-6"></div>
      <div className="bg-black"></div>
      <div className="col-span-2"></div>
      {/* Row 3 */}
      <div></div>
      <div className="bg-black"></div>
      <div className="col-span-2"></div>
      <div className="bg-black"></div>
      <div className="col-span-2"></div>
      <div className="bg-black"></div>
      <div className="col-span-2"></div>
      <div className="bg-black"></div>
      <div></div>
      {/* Row 4 */}
      <div></div>
      <div className="bg-black"></div>
      <div className="col-span-8"></div>
      <div className="bg-black"></div>
      <div></div>
      {/* Row 5 */}
      <div></div>
      <div className="bg-black"></div>
      <div className="col-span-2"></div>
      <div className="col-span-4 bg-black"></div>
      <div className="col-span-2"></div>
      <div className="bg-black"></div>
      <div></div>
      {/* Row 6 */}
      <div className="col-span-2"></div>
      <div className="bg-black"></div>
      <div className="col-span-6"></div>
      <div className="bg-black"></div>
      <div className="col-span-2"></div>
      {/* Row 7 */}
      <div className="col-span-3"></div>
      <div className="col-span-6 bg-black"></div>
      <div className="col-span-3"></div>
      {/* Row 8 */}
      <div className="col-span-4"></div>
      <div className="col-span-4 bg-black"></div>
      <div className="col-span-4"></div>
      {/* Row 9 */}
      <div className="col-span-3"></div>
      <div className="bg-black"></div>
      <div className="col-span-1"></div>
      <div className="col-span-2 bg-black"></div>
      <div className="col-span-1"></div>
      <div className="bg-black"></div>
      <div className="col-span-3"></div>
      {/* Row 10 */}
      <div className="col-span-2"></div>
      <div className="bg-black"></div>
      <div className="col-span-2"></div>
      <div className="col-span-2 bg-black"></div>
      <div className="col-span-2"></div>
      <div className="bg-black"></div>
      <div className="col-span-2"></div>
      {/* Row 11 */}
      <div className="col-span-4"></div>
      <div className="bg-black"></div>
      <div className="col-span-2"></div>
      <div className="bg-black"></div>
      <div className="col-span-4"></div>
      {/* Row 12 */}
      <div className="col-span-2"></div>
      <div className="col-span-2 bg-black"></div>
      <div className="col-span-4"></div>
      <div className="col-span-2 bg-black"></div>
      <div className="col-span-2"></div>
    </div>
  );
};

export default BasicSprite;
