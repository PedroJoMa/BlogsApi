const express = require('express');

const { loginRouter } = require('./routers');

const app = express();

app.use(express.json());

app.use('/login', loginRouter);

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
