import express from 'express';
import QuizController from '../app/Controllers/QuizController.js';

const QuizzesApiRouter = express.Router();

QuizzesApiRouter.post('/v1/create', (request,response) => {
    const quizController = new QuizController(response);
    quizController.createQuiz(request);
});
QuizzesApiRouter.get('/v1/quiz/:quizid', (request,response) => {
    const quizController = new QuizController(response);
    quizController.getQuiz(request);
});
QuizzesApiRouter.post('/v1/attempt', (request,response) => {
    const quizController = new QuizController(response);
    quizController.attemptQuiz(request);
});

QuizzesApiRouter.get('/v1/users/:userid/quizzes/:quizid/score', (request,response) => {
    const quizController = new QuizController(response);
    quizController.getQuizResults(request);
});

export default QuizzesApiRouter;
