/**
 * This script will convert all the csv files in the directory "data/csv" to JSON and will save the json files in the directory "data/json"
 */
import csvToJson from 'csvtojson';
import { writeFile } from 'fs';
import path from 'path';

import glob from 'glob';

glob('../csv/*.csv', (err, matches) => {
  if (err) {
    console.error(err.message);
  } else {
    for (const csvFilePath of matches) {
      const fileName = path.parse(csvFilePath).name;

      csvToJson()
        .fromFile(csvFilePath)
        .then((json) => {
          writeFile(
            path.join('../json/', `${fileName}.json`),
            JSON.stringify(json),
            { encoding: 'utf-8' },
            (err) => {}
          );
        });
    }
  }
});
