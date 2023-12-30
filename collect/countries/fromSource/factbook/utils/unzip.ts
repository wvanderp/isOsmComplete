import extract from 'extract-zip';
import fs from 'fs';

/**
 * unzip a file to a directory
 * also deletes the original zip file
 *
 * @param {string} zipFile path to the zip file
 * @param {string} outputDir the directory to unpack the file to
 * @returns {Promise<void>}
 */
export default async function unzip(zipFile: string, outputDirectory: string): Promise<void> {
    await extract(zipFile, { dir: outputDirectory });
    fs.unlinkSync(zipFile);
}
