import axios from 'axios';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { countCsvRows, countPharmacies, countParaPharmacies, pharmacySource, paraPharmacySource } from '../../../../collect/countries/IT/italyData';

vi.mock('axios');
const get = vi.mocked(axios.get);
afterEach(() => vi.resetAllMocks());

describe('Italian CSV counts', () => {
    it.each(['\n', '\r\n'])('counts records with %j endings, quoted newlines and trailing blanks', async (newline) => {
        get.mockResolvedValue({ data: '\u{FEFF}id;name\n1;"A;B\nC"\n2;D\n\n'.replaceAll('\n', () => newline) });
        expect(await countCsvRows('https://example.com/data.csv')).toBe(2);
    });

    it('counts the final row without a trailing newline', async () => {
        get.mockResolvedValue({ data: 'id;name\n1;A' });
        expect(await countCsvRows('https://example.com/data.csv')).toBe(1);
    });

    it('skips the fuel refresh timestamp before parsing the header', async () => {
        get.mockResolvedValue({ data: 'Updated 01/11/2026\nid;name\n1;A\n2;B\n' });
        expect(await countCsvRows('https://example.com/fuel.csv', 2)).toBe(2);
    });

    it('counts a header-only CSV as zero', async () => {
        get.mockResolvedValue({ data: 'id;name\n' });
        expect(await countCsvRows('https://example.com/data.csv')).toBe(0);
    });

    it('rejects malformed CSV instead of publishing an incorrect count', async () => {
        get.mockResolvedValue({ data: 'id;name\n1;"unclosed' });
        await expect(countCsvRows('https://example.com/data.csv')).rejects.toThrow();
    });
});

describe.each([
    ['pharmacy', countPharmacies, pharmacySource, 'FRM_FARMA_5'],
    ['para-pharmacy', countParaPharmacies, paraPharmacySource, 'FRM_PFARMA_7']
] as const)('%s dataset', (_name, count, source, filename) => {
    it('discovers the dated CSV and counts only registrations valid on the collection date', async () => {
        get.mockResolvedValueOnce({ data: `<a href="/sites/default/files/opendata/${filename}_20261031.csv">CSV</a>` })
            .mockResolvedValueOnce({ data: [
                'cod_farmacia;data_inizio_validita;data_fine_validita',
                '1;01/01/2005;30/06/2023',
                '1;01/07/2023;-',
                '2;01/12/2026;-',
                '3;01/01/2026;30/11/2026',
                '4;01/11/2026;01/11/2026'
            ].join('\n') });

        expect(await count('2026-11-01')).toBe(3);
        expect(get).toHaveBeenNthCalledWith(1, source);
        expect(get).toHaveBeenNthCalledWith(2,
            `https://www.dati.salute.gov.it/sites/default/files/opendata/${filename}_20261031.csv`);
    });

    it('fails clearly when the dataset page no longer links to the CSV', async () => {
        get.mockResolvedValue({ data: '<html>Unavailable</html>' });
        await expect(count()).rejects.toThrow('Could not find the pharmacy CSV download');
    });

    it('rejects unexpected validity dates', async () => {
        get.mockResolvedValueOnce({ data: `<a href='/sites/default/files/opendata/${filename}_20261031.csv'>CSV</a>` })
            .mockResolvedValueOnce({ data: 'data_inizio_validita;data_fine_validita\nunknown;-\n' });
        await expect(count()).rejects.toThrow('Invalid pharmacy validity date');
    });
});
