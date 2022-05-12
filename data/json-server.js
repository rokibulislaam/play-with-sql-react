const glob = require('glob');
const path = require('path');
const jsonServer = require('json-server');

const PORT = process.env.PORT || 3001;

const jsonFiles = glob.sync('data/json/*.json');

const mergedObject = {};

const server = jsonServer.create();
// const router = jsonServer.router(mergedObject, {});
const middlewares = jsonServer.defaults();
// console.log(router);
// server.use(router);
server.use(middlewares);

for (const jsonFilePath of jsonFiles) {
  const jsonFile = require(path.resolve(jsonFilePath));
  // const idField =
  const firstElement = jsonFile[0];

  const keys = Object.keys(firstElement);
  const IdField = keys.filter((key) => key.includes('ID'));

  const options = {};

  if (IdField) {
    options.id = IdField;
  }
  const filename = path.parse(jsonFilePath).name;
  // mergedObject[filename] = jsonFile;
  console.log({filename})
  const router = jsonServer.router({ [filename]: jsonFile });
  server.use(router);
}

server.listen(PORT, () => {
  console.log('JSON server listening on port: ', PORT);
});

// module.exports = () => mergedObject;
