const express = require('express');
const { join } = require('path');
const fs = require('fs');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;

const isProd = process.env.NODE_ENV === 'production';

let logRoute = isProd ? join('/', 'var', 'log', 'node-app.log') : join(__dirname, 'node-app.log');

const accessLogStream = fs.createWriteStream(logRoute, {
  flags: 'a',
});

const app = express();

app.use(helmet());
app.use(compression());
app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () =>
  console.log(`Listening PORT: ${PORT}`)
);

