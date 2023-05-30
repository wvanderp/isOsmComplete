import {resolve} from 'path';
import {readdir} from 'fs/promises';

/**
 * this function walks a directory and returns a list of all files in it
 * stolen from https://stackoverflow.com/a/45130990
 *
 * @param {string} directory the directory to walk
 * @returns {string[]} a list of all files in the directory
 */
export default async function* directoryWalk(directory: string): AsyncGenerator<string> {
    // Get a list of all files and folders in the directory.
    const dirents = await readdir(directory, { withFileTypes: true });

    // Iterate through each file/folder in the directory.
    for (const dirent of dirents) {
        // Get the full path to the file/folder.
        const result = resolve(directory, dirent.name);

        // If the file/folder is a directory, iterate through its files/folders.
        if (dirent.isDirectory()) {
            yield* directoryWalk(result);
        // Otherwise, return the file path.
        } else {
            yield result;
        }
    }
}
