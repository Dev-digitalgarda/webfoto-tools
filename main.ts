import * as path from 'path';
import * as fs from 'fs';
import * as dree from 'dree';
import { Logger } from 'euberlog';

const logger = new Logger();

// function main() {
//     const args = process.argv.slice(2);
//     const [src] = args;

//     if (!src) {
//         logger.error('Error, required positional agument src path is missing');
//         throw new Error('Error, required positional agument src path is missing');
//     }

//     const handledSrc = path.resolve(process.cwd(), src);

//     const files: string[] = [];
//     dree.scan(handledSrc, { extensions: ['jpg'] }, file => {
//         files.push(file.path);
//     });

//     for (const file of files) {
//         const filename = path.basename(file);
//         const dirname = path.dirname(file);
//         const date = new Date(filename.replace('.jpg', ''));
//         const newFileName = `${date.toISOString().slice(0, 19)}.jpg`;
//         const newPath = path.join(dirname, newFileName);
//         fs.renameSync(file, newPath);
//     }

// }
function main() {
    const args = process.argv.slice(2);
    const [src] = args;

    if (!src) {
        logger.error('Error, required positional agument src path is missing');
        throw new Error('Error, required positional agument src path is missing');
    }

    const handledSrc = path.resolve(process.cwd(), src);

    const queries: string[] = [];

    dree.scan(handledSrc, { extensions: ['jpg'] }, file => {
        const filename = path.basename(file.path);
        const date = filename.replace('.jpg', '').replace('T', ' ');

        queries.push(`
            INSERT INTO images(name, path, timestamp)
            VALUES ('hotelmadrigale', '/hotelmadrigale/${filename}', '${date}');`
        );
    });

    fs.writeFileSync('./result.sql', queries.join('\n\n'));

}
main();