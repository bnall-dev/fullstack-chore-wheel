import React, { useState } from 'react';

const CreateChoreForm = ({ createChore }) => {
  const [name, setName] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    createChore({ name });
    setName('');
  };

  return (
    <form id="createChoreForm" onSubmit={handleSubmit} className="component">
      <h3>Add a Chore</h3>
      <input
        type="text"
        value={name}
        placeholder="Chore"
        onChange={e => setName(e.target.value)}
      />
      <input type="submit" value="Add!" />
    </form>
  );
};

export default CreateChoreForm;
