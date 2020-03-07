import React, { useState } from 'react';

const ChoresList = ({ chores, deleteChore }) => {
  const choreList = chores.map(chore => {
    const key = 'chore-' + chore.id;
    return (
      <li key={key}>
        {chore.name}
        <button className="deleteButton" onClick={() => deleteChore(chore)}>
          x
        </button>
      </li>
    );
  });

  return (
    <div id="choresList" className="component list">
      <h3>Chores</h3>
      <ul>
        <h4>{choreList}</h4>
      </ul>
    </div>
  );
};

export default ChoresList;
