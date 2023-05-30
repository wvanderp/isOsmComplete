import unzipper from 'unzipper';
import { Readable } from 'stream';

/**
 * unzip a file to a directory
 *
 * @param {Buffer} zipFile the file to be unpacked
 * @param {string} outputDir the directory to unpack the file to
 * @returns {Promise<void>}
 */
export default async function unzip(zipFile: Buffer, outputDirectory: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const readStream = Readable.from(zipFile);
        readStream
            .pipe(unzipper.Extract({ path: outputDirectory }))
            .on('finish', () => resolve())
            .on('error', (error) => reject(error));
    });
}
