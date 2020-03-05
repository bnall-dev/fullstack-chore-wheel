import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import CreateRoommateForm from '../components/CreateRoommateForm';
import CreateChoreForm from '../components/CreateChoreForm';
import RoommatesList from '../components/RoommatesList';
import ChoresList from '../components/ChoresList';

const root = document.querySelector('#root');

const App = () => {
  useEffect(() => {
    Promise.all([
      axios.get('/api/roommates'),
      axios.get('/api/chores'),
      axios.get('/api/roommate_chores'),
    ])
      .then(responses => responses.map(response => response.data))
      .then(results => {
        setRoommates(results[0]);
        setChores(results[1]);
      })
      .catch(ex => setError(ex.response.data.message));
  }, []);

  const [roommates, setRoommates] = useState([]);
  const [chores, setChores] = useState([]);

  const createRoommate = async rm => {
    const created = (await axios.post('/api/roommates/', rm)).data;
    setRoommates([...roommates, created]);
  };
  const deleteRoommate = async rmToDestroy => {
    await axios.delete(`/api/roommates/${rmToDestroy.id}`);
    setRoommates(roommates.filter(rm => rm.id !== rmToDestroy.id));
  };

  const createChore = async chore => {
    const created = (await axios.post('/api/chores/', chore)).data;
    setChores([...chores, created]);
  };

  return (
    <div id="app">
      <CreateRoommateForm createRoommate={createRoommate} />
      <RoommatesList roommates={roommates} deleteRoommate={deleteRoommate} />
      <CreateChoreForm createChore={createChore} />
      <ChoresList chores={chores} />
    </div>
  );
};

ReactDOM.render(<App />, root);
