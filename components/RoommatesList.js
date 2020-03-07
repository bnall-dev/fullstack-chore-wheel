import React, { useState } from 'react';

const RoommatesList = ({
  roommates,
  deleteRoommate,
  chores,
  roommateChores,
}) => {
  const rmList = roommates.map(rm => {
    const rmAssignedChores = roommateChores.filter(
      rmc => rmc.roommateId === rm.id
    );
    const rmAssignedChoresList = rmAssignedChores.map((rmac, i) => {
      const key = 'roommateassignedchore-' + i;
      const rmAssignedChore = chores.find(chore => chore.id === rmac.choreId);
      return <li key={key}>{rmAssignedChore.name}</li>;
    });
    const key = 'roommate-' + rm.id;

    return (
      <li key={key}>
        {rm.name}
        <button className="deleteButton" onClick={() => deleteRoommate(rm)}>
          x
        </button>
        <ul>{rmAssignedChoresList}</ul>
      </li>
    );
  });

  return (
    <div id="roommatesList" className="component list">
      <h3>Roommates</h3>
      <ul>
        <h4>{rmList}</h4>
      </ul>
    </div>
  );
};

export default RoommatesList;
