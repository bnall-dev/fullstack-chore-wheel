import React, { useState } from 'react';
import Axios from 'axios';

const Wheel = ({
  setMessage,
  roommates,
  chores,
  roommateChores,
  createRoommateChores,
  deleteRoommateChores,
  deleteRoommateChore,
}) => {
  const spinWheel = async e => {
    e.preventDefault();
    const message = document.getElementById('message');

    const wheelImg = document.getElementById('wheelImg');
    wheelImg.style.animation = 'rotation 1s infinite linear';
    setTimeout(function() {
      wheelImg.style.animationPlayState = 'paused';
    }, 1500);
    const needle = document.getElementById('needle');
    needle.style.animation = 'clicker 0.15s infinite linear';
    setTimeout(function() {
      needle.style = 'transform: initial';
    }, 1500);
    setTimeout(function() {
      if (roommates.length > 1 && chores.length > 1) {
        setMessage(['', '']);
        createRoommateChores();
      }
    }, 1500);
  };

  return (
    <div id="wheelDiv" className="component">
      <img id="wheelImg" src="../../assets/wheel.png" />
      <button id="spinButton" onClick={spinWheel}>
        <h1>SPIN!</h1>
      </button>
      <div id="needle"></div>
    </div>
  );
};

export default Wheel;
