import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Wheel from '../components/Wheel';
import CreateRoommateForm from '../components/CreateRoommateForm';
import CreateChoreForm from '../components/CreateChoreForm';
import RoommatesList from '../components/RoommatesList';
import ChoresList from '../components/ChoresList';

const root = document.querySelector('#root');

const App = () => {
  const [roommates, setRoommates] = useState([]);
  const [chores, setChores] = useState([]);
  const [roommateChores, setRoommateChores] = useState([]);

  useEffect(() => {
    Promise.all([axios.get('/api/roommates'), axios.get('/api/chores')])
      .then(responses => responses.map(response => response.data))
      .then(results => {
        setRoommates(results[0]);
        setChores(results[1]);
      })
      .catch(ex => setError(ex.response.data.message));
  }, []);

  useEffect(() => {
    Promise.all([axios.get('/api/roommate_chores')])
      .then(responses => responses.map(response => response.data))
      .then(results => {
        setRoommateChores(results[0]);
      })
      .catch(ex => setError(ex.response.data.message));
  }, []);

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
  const deleteChore = async choreToDestroy => {
    const assigned = roommateChores.filter(
      chore => chore.choreId === choreToDestroy.id
    );
    assigned.map(
      async chore =>
        await axios.delete(`/api/roommate_chores/${assigned[0].id}`)
    );
    await axios.delete(`/api/chores/${choreToDestroy.id}`);
    setChores(chores.filter(chore => chore.id !== choreToDestroy.id));
  };

  const createRoommateChore = async rmc => {};
  const deleteRoommateChore = async rmcToDestroy => {
    await axios.delete(`/api/roommate_chores/${rmcToDestroy.id}`);
    setRoommateChores(roommateChores.filter(rmc => rmc.id !== rmcToDestroy.id));
  };

  return (
    <div id="app">
      <header>
        <h1>Chore Wheel</h1>
      </header>
      <Wheel
        roommates={roommates}
        chores={chores}
        roommateChores={roommateChores}
        createRoommateChore={createRoommateChore}
        setRoommateChores={setRoommateChores}
        deleteRoommateChore={deleteRoommateChore}
      />
      <RoommatesList
        roommates={roommates}
        deleteRoommate={deleteRoommate}
        chores={chores}
        roommateChores={roommateChores}
      />
      <CreateRoommateForm createRoommate={createRoommate} />

      <CreateChoreForm createChore={createChore} />
      <ChoresList chores={chores} deleteChore={deleteChore} />
    </div>
  );
};

ReactDOM.render(<App />, root);
