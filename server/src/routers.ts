import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConectionsController from './controllers/ConectionsController';

const routers = express.Router();
const classesController = new ClassesController();
const conectionsController = new ConectionsController();
routers.post('/classes',classesController.create);
routers.get('/classes',classesController.index);
routers.post('/connections',conectionsController.create)
routers.get('/connections',conectionsController.index)
export default routers;