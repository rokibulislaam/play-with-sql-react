const glob = require('glob');
const path = require('path');
// const fs = require('fs')

const jsonFiles = glob.sync('data/json/*.json');

const mergedObject = {};
const listOfTables = [];

for (const jsonFilePath of jsonFiles) {
  const jsonFile = require(path.resolve(jsonFilePath));
  const filename = path.parse(jsonFilePath).name;
  listOfTables.push({ name: filename, columns: Object.keys(jsonFile[0]) });
  mergedObject[filename] = jsonFile;
}
mergedObject['listOfTables'] = listOfTables;

// fs.writeFileSync('data.json', JSON.stringify(mergedObject), 'utf-8')

module.exports = () => mergedObject;
