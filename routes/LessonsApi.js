import express from 'express';
import LessonsController from '../app/Controllers/LessonsController.js';

const LessonsApiRouter = express.Router();

LessonsApiRouter.post('/v1/create', (request,response) => {
    const lessonsController = new LessonsController(response);
    lessonsController.createLesson(request);
});
LessonsApiRouter.get('/v1/lessons/:courseid', (request,response) => {
    const lessonsController = new LessonsController(response);
    lessonsController.getLessons(request);
});
LessonsApiRouter.get('/v1/lesson/:lessonid', (request,response) => {
    const lessonsController = new LessonsController(response);
    lessonsController.getLesson(request);
});
LessonsApiRouter.post('/v1/lessons/complete', (request,response) => {
    const lessonsController = new LessonsController(response);
    lessonsController.completeLesson(request);
});


export default LessonsApiRouter;
