import parse from 'csv-parse';
import fileToBuffer from './fileToBuffer';

const parseCsvFile = async (file: File): Promise<string[][]> => {
    const data = await fileToBuffer(file);
    return new Promise((resolve, reject) => {
        parse(data, { relax: true }, (error, output) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(output);
        });
    });
};

export default parseCsvFile;