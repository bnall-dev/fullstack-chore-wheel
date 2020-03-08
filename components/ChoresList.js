import React, { useState } from 'react';

const ChoresList = ({ chores, deleteChore }) => {
  const choreList = chores.map(chore => {
    const key = 'chore-' + chore.id;
    return (
      <h4 key={key}>
        <li>
          {chore.name}
          <button className="deleteButton" onClick={() => deleteChore(chore)}>
            x
          </button>
        </li>
      </h4>
    );
  });

  return (
    <div id="choresList" className="component list">
      <h3>Chores</h3>
      <ul>{choreList}</ul>
    </div>
  );
};

export default ChoresList;
