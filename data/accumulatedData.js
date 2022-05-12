const glob = require('glob');
const path = require('path');

const jsonFiles = glob.sync('data/json/*.json');

const mergedObject = {};

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
  mergedObject[filename] = jsonFile;
}

module.exports = () => mergedObject;
