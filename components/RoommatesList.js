import React, { useState } from 'react';

const RoommatesList = ({ roommates, deleteRoommate }) => {
  const rmList = roommates.map(rm => (
    <li key={rm.id}>
      {rm.name}
      <button onClick={() => deleteRoommate(rm)} />
    </li>
  ));

  return (
    <div id="roommatesList">
      <h3>Roommates</h3>
      <ul>
        <h4>{rmList}</h4>
      </ul>
    </div>
  );
};

export default RoommatesList;
