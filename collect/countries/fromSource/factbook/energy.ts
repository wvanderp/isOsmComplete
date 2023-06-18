import { OverpassOsmElement, overpassJson } from 'overpass-ts';
import { iso1A2Code } from '@rapideditor/country-coder';
import { genericEnergyParser } from './parsers/parseEnergy';

export default async function getEnergyProduction(): Promise<Record<string, number>> {
    const query = `
[out: json][timeout: 2500];

(
    node["generator:output:electricity"~"[0-9\\.]+ (W)|(kW)|(MW)|(GW)"];
    way["generator:output:electricity"~"[0-9\\.]+ (W)|(kW)|(MW)|(GW)"];
    relation["generator:output:electricity"~"[0-9\\.]+ (W)|(kW)|(MW)|(GW)"];
);
  
out meta;
`;

    const data = await overpassJson(query);

    const elements = data.elements
        .reduce<OverpassOsmElement[]>((accumulator, current) => {
            if (current.type === 'node' || current.type === 'way' || current.type === 'relation') {
                accumulator.push(current);
            }
            return accumulator;
        }, []);

    const pairs = elements.map((element) => {
        // @ts-expect-error -- already checked when we filtered out elements without tags
        const energy = element.tags['generator:output:electricity'] ?? element.tags['generator:output'] ?? null;
        // @ts-expect-error -- already checked when we filtered out elements without tags
        const country = (element.type === 'node' ? iso1A2Code([element.lon, element.lat]) : iso1A2Code(element.center)) ?? null;
        return {
            country: country?.toLowerCase() ?? null,
            energy
        };
    }).filter((element) => element.country && element.energy) as { country: string; energy: string }[];

    return pairs
        .reduce<Record<string, number>>(
            (accumulator, current) => {
                const energy = genericEnergyParser(current.energy);
                accumulator[current.country] = (accumulator[current.country] ?? 0) + energy;
                return accumulator;
            },
            {}
        );
}
