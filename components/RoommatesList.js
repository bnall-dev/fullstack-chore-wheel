import React, { useState } from 'react';
import Axios from 'axios';

const RoommatesList = ({
  roommates,
  deleteRoommate,
  chores,
  roommateChores,
  setRoommateChores,
}) => {
  const rmList = roommates.map(rm => {
    const key = 'roommate-' + rm.id;

    return (
      <li className="rm" key={key}>
        <h4>{rm.name}</h4>
        <button className="deleteButton" onClick={() => deleteRoommate(rm)}>
          X
        </button>
      </li>
    );
  });

  return (
    <div id="roommatesListDiv" className="component list">
      <h3>Roommates</h3>
      <ul id="rmList">{rmList}</ul>
    </div>
  );
};

export default RoommatesList;
