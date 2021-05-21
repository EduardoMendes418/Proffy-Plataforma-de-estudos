import express from  'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const classesControllers = new ClassesController();
const connectionsController = new ConnectionsController();

//rota pra criacao da aula
routes.post('/classes', classesControllers.create);
//rota para lista de aula
routes.get('/classes', classesControllers.index);


//rotas connection  
routes.post('/connections', connectionsController.create);
//rotas buscar lista
routes.get('/connections', connectionsController.index);

export default routes;