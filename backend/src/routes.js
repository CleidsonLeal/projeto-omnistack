const express = require ('express');

const DoadoresController = require('./controllers/DoadoresController');
const NecessidadesController = require('./controllers/NecessidadesController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');  

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/doadores', DoadoresController.index);
routes.post('/doadores', DoadoresController.create);
routes.get('/profile', ProfileController.index);


routes.get('/necessidades', NecessidadesController.index);
routes.post('/necessidades', NecessidadesController.create);
routes.delete('/necessidades/:id', NecessidadesController.delete);
 





module.exports = routes;