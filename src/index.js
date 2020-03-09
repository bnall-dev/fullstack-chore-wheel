import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Wheel from '../components/Wheel';
import CreateRoommateForm from '../components/CreateRoommateForm';
import CreateChoreForm from '../components/CreateChoreForm';
import RoommatesList from '../components/RoommatesList';
import ChoresList from '../components/ChoresList';
import RoommateChores from '../components/RoommateChores';
import Header from '../components/Header';

const root = document.querySelector('#root');

const App = () => {
  const [roommates, setRoommates] = useState([]);
  const [chores, setChores] = useState([]);
  const [roommateChores, setRoommateChores] = useState([]);
  const [view, setView] = useState('#');
  const [message, setMessage] = useState([
    'Add Roommates and Chores',
    'Spin the Wheel to Assign Chores!',
  ]);

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
    const assignedChore = roommateChores.filter(
      rmc => rmc.roommateId === rmToDestroy.id
    );
    if (assignedChore.length === 0) {
      await axios.delete(`/api/roommates/${rmToDestroy.id}`);
      setRoommates(roommates.filter(rm => rm.id !== rmToDestroy.id));
    } else {
      assignedChore.map(chore => {
        axios.delete(`/api/roommate_chores/${chore.id}`);
        setRoommateChores(roommateChores.filter(rmc => rmc.id !== chore.id));
      });
      await axios.delete(`/api/roommates/${rmToDestroy.id}`);
      setRoommates(roommates.filter(rm => rm.id !== rmToDestroy.id));
    }
  };

  const createChore = async chore => {
    const created = (await axios.post('/api/chores/', chore)).data;
    setChores([...chores, created]);
  };
  const deleteChore = async choreToDestroy => {
    const assignedChore = roommateChores.filter(
      rmc => rmc.choreId === choreToDestroy.id
    );
    if (assignedChore.length === 0) {
      await axios.delete(`/api/chores/${choreToDestroy.id}`);
      setChores(chores.filter(chore => chore.id !== choreToDestroy.id));
    } else {
      await axios.delete(`/api/roommate_chores/${assignedChore[0].id}`);
      setRoommateChores(
        roommateChores.filter(chore => chore.id !== assignedChore[0].id)
      );
      await axios.delete(`/api/chores/${choreToDestroy.id}`);
      setChores(chores.filter(chore => chore.id !== choreToDestroy.id));
    }
  };

  const roommateIds = roommates.map(rm => rm.id);
  const choreIds = chores.map(chore => chore.id);

  const createRoommateChores = async assignedChores => {
    await axios.post('/api/roommate_chores/', { roommateIds, choreIds });
    const rmc = await axios.get('/api/roommate_chores/');
    setRoommateChores(rmc.data);
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
      <Header view={view} setView={setView} />
      <div id="components">
        {view === '#' && (
          <Wheel
            roommates={roommates}
            chores={chores}
            roommateChores={roommateChores}
            createRoommateChores={createRoommateChores}
            setRoommateChores={setRoommateChores}
            deleteRoommateChore={deleteRoommateChore}
            deleteRoommateChores={deleteRoommateChores}
            setMessage={setMessage}
          />
        )}
        {view === '#' && (
          <RoommateChores
            roommates={roommates}
            deleteRoommate={deleteRoommate}
            chores={chores}
            roommateChores={roommateChores}
            deleteRoommateChore={deleteRoommateChore}
            setRoommateChores={setRoommateChores}
            message={message}
          />
        )}
        {view === 'roommates' && (
          <CreateRoommateForm createRoommate={createRoommate} />
        )}
        {view === 'roommates' && (
          <RoommatesList
            roommates={roommates}
            deleteRoommate={deleteRoommate}
            chores={chores}
            roommateChores={roommateChores}
            deleteRoommateChore={deleteRoommateChore}
            setRoommateChores={setRoommateChores}
          />
        )}
        {view === 'chores' && <CreateChoreForm createChore={createChore} />}
        {view === 'chores' && (
          <ChoresList
            chores={chores}
            deleteChore={deleteChore}
            deleteRoommateChore={deleteRoommateChore}
          />
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, root);
