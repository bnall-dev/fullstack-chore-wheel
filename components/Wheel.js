import React, { useState } from 'react';
import Axios from 'axios';

const Wheel = ({
  roommates,
  chores,
  roommateChores,
  createRoommateChores,
  deleteRoommateChores,
  deleteRoommateChore,
}) => {
  const spinWheel = e => {
    e.preventDefault();
    if (roommates.length !== 0 && chores.length !== 0) {
      deleteRoommateChores();
      createRoommateChores();
    }
  };

  return (
    <div id="wheelDiv" className="component">
      <img id="wheelImg" src="../../assets/wheel.png" />
      <button id="spinButton" onClick={spinWheel} onTouchStart={spinWheel}>
        <h1>SPIN!</h1>
      </button>
    </div>
  );
};

export default Wheel;
