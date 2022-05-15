const glob = require('glob');
const path = require('path');
const jsonServer = require('json-server');
const express = require('express');
const { appendFile } = require('fs');

const PORT = process.env.PORT || 3001;

const jsonFiles = glob.sync('data/json/*.json');

const server = jsonServer.create();
// const router = jsonServer.router(mergedObject, {});
const middlewares = jsonServer.defaults();
server.use(middlewares);

const mergedObject = {};
const listOfTables = [];

for (const jsonFilePath of jsonFiles) {
  const jsonFile = require(path.resolve(jsonFilePath));
  const filename = path.parse(jsonFilePath).name;
  listOfTables.push({ name: filename, columns: Object.keys(jsonFile[0]) });
  mergedObject[filename] = jsonFile;
}

const router = jsonServer.router(mergedObject);
server.use('/api', router);

// server.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'build'));
// });

server.use(express.static(path.resolve(__dirname, 'build')));

server.listen(PORT, () => {
  console.log('JSON server listening on port: ', PORT);
});

// module.exports = () => mergedObject;
