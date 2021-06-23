const express = require('express');
const cors = require('cors');
const usersController = require('./routes/users/Controller/users-controller');
const vacationsController = require('./routes/vacations/Controller/vacations-controller');
const followedVacationsController = require('./routes/followedVacations/Controller/followed-controller');
const errorHandler = require('./middleware/errors/error-handler');

const server = express();

server.use(cors({ origin: 'http://localhost:3000' }));
server.use(express.json());

server.use('/users', usersController);
server.use('/vacations', vacationsController);
server.use('/followedVacations', followedVacationsController);
server.use(errorHandler);

server.listen(3001, () => {
  console.log('Running on 3001');
});
