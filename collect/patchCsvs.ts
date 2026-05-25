/**
 * One-time script to backfill the `expected` column in all existing CSV files.
 *
 * Each CSV line is currently `date,actual`. This script rewrites them to
 * `date,actual,expected` using the current expected value from compare.json.
 *
 * Run with:
 *   npx ts-node collect/patchCsvs.ts
 */

import fs from 'fs';
import path from 'path';

import { Comparison } from './types';

const dataDirectory = path.join(__dirname, '../data');
const graphsDirectory = path.join(dataDirectory, 'graphs');
const compareFile = path.join(dataDirectory, 'compare.json');

const comparisons = JSON.parse(fs.readFileSync(compareFile, 'utf8')) as Comparison[];

let patched = 0;
let skipped = 0;
let missing = 0;

for (const comparison of comparisons) {
    const file = path.join(graphsDirectory, `${comparison.id}.csv`);

    if (!fs.existsSync(file)) {
        missing++;
        continue;
    }

    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');

    const rewritten = lines.map((line) => {
        if (line.trim() === '') return line;

        const parts = line.split(',');
        if (parts.length >= 3) {
            // Already has an expected column — leave it alone
            return line;
        }

        return `${line},${comparison.expected}`;
    });

    const newContent = rewritten.join('\n');

    if (newContent !== content) {
        fs.writeFileSync(file, newContent, 'utf8');
        patched++;
    } else {
        skipped++;
    }
}

console.log(`Done. Patched: ${patched}, already up-to-date: ${skipped}, CSV missing: ${missing}`);
