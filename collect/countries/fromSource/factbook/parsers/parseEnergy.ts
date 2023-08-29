import { FactbookCountry } from '../types/FactBookCountry';

const unitLookup = {
    w: 1,
    kw: 1000,
    mw: 1000000,
    gw: 1000000000
};

export function genericEnergyParser(string_: string): number {
    if (!string_) return 0;

    let string__ = string_;

    // remove everything after the first bracket
    const bracketIndex = string__.indexOf('(');
    if (bracketIndex !== -1) {
        string__ = string__.slice(0, Math.max(0, bracketIndex));
    }

    string__ = string__.replaceAll(',', '');
    string__ = string__.trim();

    const parts = string__.split(' ');

    if (parts.length === 1) {
        // special case for 100W or 1000.0MW
        // split into 100 and W or 1000.0 and MW
        const number = parts[0].match(/[\d.]+/)?.[0];
        const unit = parts[0].match(/[A-Za-z]+/)?.[0];

        parts[0] = number ?? '';
        parts[1] = unit ?? '';
    }

    const production = parts[0];
    const modifier = parts.length === 3 ? parts[1] : null;
    const unit = parts.length === 3 ? parts[2] : parts[1];

    // convert to number
    let productionNumber = Number.parseFloat(production);

    if (modifier === 'million') {
        productionNumber *= 1000000;
    }

    // @ts-expect-error -- this is in a if statement
    if (unitLookup[unit.toLowerCase()]) {
        // @ts-expect-error -- we checked this above
        productionNumber *= unitLookup[unit.toLowerCase()];
    }

    return productionNumber;
}

type returnData = {
    installed_generating_capacity?: number;
}

export default function parseEnergy(data: FactbookCountry): returnData {
    const installedRaw = data.Energy?.Electricity?.['installed generating capacity'].text ?? data.Energy?.['Electricity - installed generating capacity']?.text;

    if (!installedRaw) return {};

    const productionNumber = genericEnergyParser(installedRaw);

    if (productionNumber === null) {
        console.warn(`Could not parse installed generating capacity for ${data.Government['Country name']}`);
        return {};
    }

    return {installed_generating_capacity: productionNumber};
}
