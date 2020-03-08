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
  const deleteRoommate = async rmToDestroy => {};

  const createChore = async chore => {
    const created = (await axios.post('/api/chores/', chore)).data;
    setChores([...chores, created]);
  };
  const deleteChore = async choreToDestroy => {};

  const roommateIds = roommates.map(rm => rm.id);
  const choreIds = chores.map(chore => chore.id);
  const createRoommateChores = async assignedChores => {
    const created = (
      await axios.post('/api/roommate_chores/', { roommateIds, choreIds })
    ).data;
    setRoommateChores(created);
  };

  const deleteRoommateChores = async () => {
    await axios.delete(`/api/roommate_chores/`);
    setRoommateChores([]);
  };

  const deleteRoommateChore = async rmcToDestroy => {
    await axios.delete(`/api/roommate_chores/${rmcToDestroy.id}`);
    setRoommateChores(roommateChores.filter(rmc => rmc.id !== rmcToDestroy.id));
  };

  return (
    <div id="app">
      <header>
        <h1>Chore Wheel</h1>
        <img id="icon" src="./assets/icon.png" />
      </header>
      <div id="components">
        <Wheel
          roommates={roommates}
          chores={chores}
          roommateChores={roommateChores}
          createRoommateChores={createRoommateChores}
          setRoommateChores={setRoommateChores}
          deleteRoommateChore={deleteRoommateChore}
          deleteRoommateChores={deleteRoommateChores}
        />
        <RoommatesList
          roommates={roommates}
          deleteRoommate={deleteRoommate}
          chores={chores}
          roommateChores={roommateChores}
          deleteRoommateChore={deleteRoommateChore}
        />
        <CreateRoommateForm createRoommate={createRoommate} />

        <CreateChoreForm createChore={createChore} />
        <ChoresList
          chores={chores}
          deleteChore={deleteChore}
          deleteRoommateChore={deleteRoommateChore}
        />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, root);
