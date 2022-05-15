const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('../routers/userRouter');
const loginRouter = require('../routers/loginRouter');
const recipesRouter = require('../routers/recipesRouter');

const app = express();

app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
