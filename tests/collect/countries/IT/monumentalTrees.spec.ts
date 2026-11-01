import { expect, it, vi } from 'vitest';
import { taginfoKey } from '../../../../collect/api/taginfo';
import italy from '../../../../collect/countries/IT/italy';
import taginfoServers from '../../../../collect/utils/tagInfoServers';

vi.mock('../../../../collect/api/taginfo', () => ({
    default: vi.fn(),
    taginfoKey: vi.fn().mockResolvedValue(1234)
}));

it('counts MASAF-tagged objects in Italy, including tree groups', async () => {
    const result = await italy[3]();
    expect(taginfoKey).toHaveBeenCalledWith('ref:masaf', taginfoServers.IT);
    expect(result).toMatchObject({
        country: 'IT', expected: 5008, actual: 1234,
        lastUpdated: '2026-07-24', tags: ['🌳']
    });
});
