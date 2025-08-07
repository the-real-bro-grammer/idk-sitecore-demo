import fs from 'fs';

const queryPath = 'queries';
const outputPath = '.\\src\\lib\\graphql\\Generated.ts';

const generateQueryTemplate = (fileName: string, contents: string) => {
    return `export const ${fileName} = \`${contents}\`;  
    `;
};

fs.readdir(queryPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    let queries = '';

    for (const file of files) {
        if (!file.indexOf('graphql')) {
            continue;
        }

        const fileName = file.split('.graphql')[0];
        const contents = fs.readFileSync(`${queryPath}\\${file}`, 'utf8');

        const template = generateQueryTemplate(fileName, contents);

        queries += template;
    }

    fs.writeFile(outputPath, queries, (err) => {
        if (err) {
            console.error('Error writing Generated queries to file', err);
            return;
        }

        console.log('Queries successfully generated!');
    });
});
