const express = require('express');
const { join } = require('path');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(express.static('public'));
app.get('/*', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () =>
  console.log(`Listening PORT: ${PORT}`)
);

