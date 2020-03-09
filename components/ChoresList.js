import React, { useState } from 'react';

const ChoresList = ({ chores, deleteChore }) => {
  const choreList = chores.map(chore => {
    const key = 'chore-' + chore.id;
    return (
      <li className="chore" key={key}>
        <h4>{chore.name}</h4>
        <button className="deleteButton" onClick={() => deleteChore(chore)}>
          X
        </button>
      </li>
    );
  });

  return (
    <div id="choresListDiv" className="component list">
      <h3>Chores</h3>
      <ul id="choreList">{choreList}</ul>
    </div>
  );
};

export default ChoresList;
