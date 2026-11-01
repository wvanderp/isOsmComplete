import { expect, it, vi } from 'vitest';
import { overpassSimpleQuery } from '../../../../collect/api/overpass';
import italy from '../../../../collect/countries/IT/italy';

vi.mock('../../../../collect/countries/IT/italyData', () => ({
    countCsvRows: vi.fn(),
    countPharmacies: vi.fn(),
    countParaPharmacies: vi.fn().mockResolvedValue(7215),
    pharmacySource: 'https://www.dati.salute.gov.it/it/dataset/farmacie/',
    paraPharmacySource: 'https://www.dati.salute.gov.it/it/dataset/parafarmacie/'
}));
vi.mock('../../../../collect/api/overpass', () => ({
    overpassSimpleQuery: vi.fn().mockResolvedValue(1204)
}));

it('compares active para-pharmacies with both OSM tags inside Italy', async () => {
    const result = await italy[2]();
    expect(overpassSimpleQuery).toHaveBeenCalledWith(
        [['amenity', 'pharmacy'], ['dispensing', 'no']], 3600365331, 'and'
    );
    expect(result).toMatchObject({ country: 'IT', expected: 7215, actual: 1204 });
});
