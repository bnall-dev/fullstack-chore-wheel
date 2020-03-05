import React, { useState } from 'react';

const ChoresList = ({ chores }) => {
  const choreList = chores.map(chore => <li key={chore.id}>{chore.name}</li>);

  return (
    <div id="choresList">
      <h3>Chores</h3>
      <ul>
        <h4>{choreList}</h4>
      </ul>
    </div>
  );
};

export default ChoresList;
