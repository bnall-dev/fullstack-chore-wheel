import React, { useState } from 'react';

const RoommatesList = ({ roommates, deleteRoommate }) => {
  const rmList = roommates.map(rm => (
    <li key={rm.id}>
      {rm.name}
      <button className="deleteButton" onClick={() => deleteRoommate(rm)}>
        x
      </button>
    </li>
  ));

  return (
    <div id="roommatesList" className="component">
      <h3>Roommates</h3>
      <ul>
        <h4>{rmList}</h4>
      </ul>
    </div>
  );
};

export default RoommatesList;
