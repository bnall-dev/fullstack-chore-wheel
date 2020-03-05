import React, { useState } from 'react';

const Wheel = ({ roommates, chores, roommateChores, setRoommateChores }) => {
  const spinWheel = () => {};

  return (
    <div id="wheelDiv" className="component">
      <button id="spinButton" onClick={spinWheel}>
        <h1>SPIN!</h1>
      </button>
    </div>
  );
};

export default Wheel;
