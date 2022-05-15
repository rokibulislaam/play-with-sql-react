const express = require('express');

const jsonServer = require('json-server');
const path = require('path');
const mergedObject = require('./data/accumulatedData')();

const app = express();

const PORT = process.env.PORT || 3001;

const jsonRoutes = jsonServer.router(mergedObject);
app.use('/api', jsonRoutes);
app.use(express.static(path.join(__dirname, 'build')));

app.listen(PORT, () => {
  console.log('JSON server listening on port: ', PORT);
});
