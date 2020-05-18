const { Router } = require ('express');
const routes = Router();

const SearchController = require('./controllers/SearchControler');
const DevController = require('./controllers/DevControler');

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);

routes.get('/search', SearchController.index);

module.exports = routes;