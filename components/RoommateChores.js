import React, { useState } from 'react';
import Axios from 'axios';

const RoommatesList = ({
  message,
  roommates,
  deleteRoommate,
  chores,
  roommateChores,
  setRoommateChores,
}) => {
  const rmList = roommates.map(rm => {
    const rmAssignedChores = roommateChores.filter(
      rmc => rmc.roommateId === rm.id
    );
    const rmAssignedChoresList = rmAssignedChores.map((rmac, i) => {
      const key = 'roommateassignedchore-' + i;
      const rmAssignedChore = chores.find(chore => chore.id === rmac.choreId);

      const doChore = async choreToUpdate => {
        const updated = roommateChores.find(
          ch => ch.choreId === choreToUpdate.choreId
        );
        const choreId = roommateChores.find(
          ch => ch.choreId === updated.choreId
        );

        if (choreToUpdate.isDone == 'true' || choreToUpdate.isDone == true) {
          updated.isDone = false;
        } else {
          updated.isDone = true;
        }

        await axios.put(`/api/roommate_chores/${choreId.id}`, updated);
      };
      const done = rmac.isDone.toString();

      const handleClick = e => {
        e.preventDefault();
        doChore(rmac);
        if (rmac.isDone == false) {
          e.target.innerText = 'Done?';
          e.target.setAttribute('isdone', 'false');
        } else if (rmac.isDone == true) {
          e.target.innerText = 'Done!';
          e.target.setAttribute('isdone', 'true');
        }
      };

      return (
        <li key={key} className="rmChore">
          <h5>{rmAssignedChore.name}</h5>
          <button className="isDoneButton" isdone={done} onClick={handleClick}>
            Done?
          </button>
        </li>
      );
    });

    const key = 'roommate-' + rm.id;

    return (
      <li className="roommate" key={key}>
        <h4>{rm.name}</h4>

        <ul className="rmcList">{rmAssignedChoresList}</ul>
      </li>
    );
  });

  return (
    <div id="rmListDiv">
      <h3>To Do</h3>
      <div id="message">
        <h5>{message[0]}</h5>
        <h5>{message[1]}</h5>
      </div>

      <ul id="roommatesList">{rmList}</ul>
    </div>
  );
};

export default RoommatesList;
