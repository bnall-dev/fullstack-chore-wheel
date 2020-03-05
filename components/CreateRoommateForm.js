import React, { useState } from 'react';

const CreateRoommateForm = ({ createRoommate }) => {
  const [name, setName] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    createRoommate({ name });
    setName('');
  };

  return (
    <form id="createRoommateForm" onSubmit={handleSubmit} className="component">
      <h3>Add a Roommate</h3>
      <input
        type="text"
        value={name}
        placeholder="Roommate's Name"
        onChange={e => setName(e.target.value)}
      />
      <input type="submit" value="Add!" />
    </form>
  );
};

export default CreateRoommateForm;
