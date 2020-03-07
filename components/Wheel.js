import React, { useState } from 'react';
import Axios from 'axios';

const Wheel = ({
  roommates,
  chores,
  roommateChores,
  createRoommateChore,
  deleteRoommateChore,
}) => {
  const spinWheel = e => {
    e.preventDefault();
  };

  return (
    <div id="wheelDiv" className="component">
      <button id="spinButton" onClick={spinWheel}>
        <h1>SPIN!</h1>
      </button>
    </div>
  );
};

export default Wheel;
