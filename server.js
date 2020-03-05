const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const db = require('./db');
app.use(require('cors')());
app.use(express.json());
app.use('/dist', express.static(path.join(__dirname, 'dist')));

var myLogger = function(req, res, next) {
  console.log(req.body);
  next();
};
app.use(myLogger);

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'index.html'))
);

// ROOMMATES REQUESTS
app.get('/api/roommates', (req, res, next) => {
  db.readRoommates()
    .then(rms => res.send(rms))
    .catch(next);
});
app.get('/api/roommates/:id', (req, res, next) => {
  const id = req.params.id;
  db.readRoommate(req.params.id)
    .then(rm => res.send(rm))
    .catch(next);
});
app.post('/api/roommates/', (req, res, next) => {
  db.createRoommate(req.body)
    .then(rm => res.send(rm))
    .catch(next);
});
app.delete('/api/roommates/:id', (req, res, next) => {
  db.deleteRoommate(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
});
app.put('/api/roommates/:id', (req, res, next) => {
  const id = req.params.id;
  db.updateRoommate(req.body).then(updated => {
    res.send(updated);
  });
});

// CHORES REQUESTS
app.get('/api/chores', (req, res, next) => {
  db.readChores()
    .then(chores => res.send(chores))
    .catch(next);
});
app.get('/api/chores/:id', (req, res, next) => {
  const id = req.params.id;
  db.readChore(req.params.id)
    .then(chore => res.send(chore))
    .catch(next);
});
app.post('/api/chores', (req, res, next) => {
  db.createChore(req.body)
    .then(chore => res.send(chore))
    .catch(next);
});
app.delete('/api/chores/:id', (req, res, next) => {
  db.destroyChore(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
});
app.put('/api/chores/:id', (req, res, next) => {
  const id = req.params.id;
  db.updateChore(req.body).then(updated => {
    res.send(updated);
  });
});

// ROOMMATE CHORES REQUESTS
app.get('/api/roommate_chores', (req, res, next) => {
  db.readRoommateChores()
    .then(rmc => res.send(rmc))
    .catch(next);
});
app.get('/api/roommate_chores/:id', (req, res, next) => {
  const id = req.params.id;
  db.readRoommateChore(req.params.id)
    .then(rmc => res.send(rmc))
    .catch(next);
});
app.post('/api/roommate_chores', (req, res, next) => {
  db.createRoommateChore(req.body)
    .then(rmc => res.send(rmc))
    .catch(next);
});
app.delete('/api/roommate_chores/:id', (req, res, next) => {
  db.destroyRoommateChore(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
});
app.put('/api/roommate_chores/:id', (req, res, next) => {
  const id = req.params.id;
  db.updateRoommateChore(req.body).then(updated => {
    res.send(updated);
  });
});

const port = process.env.PORT || 3000;
db.sync().then(() => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
