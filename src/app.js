const express = require('express');

const { loginRouter, userRouter } = require('./routers');

const app = express();

app.use(express.json());

app.use('/login', loginRouter);
app.use('/user', userRouter);

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
