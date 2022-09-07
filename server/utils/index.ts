import fs from 'fs/promises';
import path from 'path';
import { parse } from 'csv-parse'

export const getCSVData = async <T>(filename: string): Promise<T> => {

  const csvFilePath = path.resolve(__dirname, `../data/${filename}`);
  const csvFileData = await fs.readFile(csvFilePath, { encoding: 'utf8' });

  return new Promise((resolve, reject) => {
    parse(csvFileData, { delimiter: ",", columns: true }, (err, records) => {
      if (err) reject(err);
      resolve(records);
    });
  });
  
}