import express from 'express';
import QuestionController from '../app/Controllers/QuestionController.js';

const QuestionsApiRouter = express.Router();

QuestionsApiRouter.post('/v1/create', (request,response) => {
    const questionController = new QuestionController(response);
    questionController.createQuestion(request);
});
QuestionsApiRouter.get('/v1/question/:questionid', (request,response) => {
    const questionController = new QuestionController(response);
    questionController.getQuestion(request);
});
QuestionsApiRouter.get('/v1/questions', (request,response) => {
    const questionController = new QuestionController(response);
    questionController.getAllQuestions(request);
});


export default QuestionsApiRouter;
