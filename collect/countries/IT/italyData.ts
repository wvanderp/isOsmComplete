import axios from 'axios';
import { parse } from 'csv-parse/sync';

export const pharmacySource = 'https://www.dati.salute.gov.it/it/dataset/farmacie/';

export const paraPharmacySource = 'https://www.dati.salute.gov.it/it/dataset/parafarmacie/';

type CsvRow = Record<string, string>;

export async function countCsvRows(
    url: string,
    fromLine = 1,
    include: (row: CsvRow) => boolean = () => true
): Promise<number> {
    const { data } = await axios.get<string>(url);
    const rows = parse(data, {
        delimiter: ';',
        columns: true,
        bom: true,
        skip_empty_lines: true,
        from_line: fromLine
    }) as CsvRow[];

    return rows.filter((row) => include(row)).length;
}

function validityDate(value: string): string {
    const [day, month, year] = value.split('/');
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
        throw new Error(`Invalid pharmacy validity date: ${value}`);
    }
    return `${year}-${month}-${day}`;
}

export function countPharmacies(today?: string): Promise<number> {
    return countValidPharmacies(pharmacySource, /href=["']([^"']*\/FRM_FARMA_5_\d{8}\.csv)["']/i, today);
}

export function countParaPharmacies(today?: string): Promise<number> {
    return countValidPharmacies(paraPharmacySource, /href=["']([^"']*\/FRM_PFARMA_7_\d{8}\.csv)["']/i, today);
}

async function countValidPharmacies(source: string, downloadPattern: RegExp, today?: string): Promise<number> {
    const now = new Date();
    const collectionDate = today ?? now.toISOString().slice(0, 10);
    const { data } = await axios.get<string>(source);
    const download = downloadPattern.exec(data)?.[1];
    if (!download) {
        throw new Error('Could not find the pharmacy CSV download on the Ministry of Health dataset page');
    }

    const downloadUrl = new URL(download, source);
    return countCsvRows(downloadUrl.href, 1, (row) => {
        const start = validityDate(row.data_inizio_validita);
        const end = row.data_fine_validita;
        return start <= collectionDate && (end === '-' || validityDate(end) >= collectionDate);
    });
}
