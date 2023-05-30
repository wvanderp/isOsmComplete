import fs from 'fs';
import { FactbookCountry } from './FactBookCountry';

type returnData = {
    installed_generating_capacity?: number;
}

export default function parseEnergy(data: FactbookCountry): returnData {
    let installedRaw = data.Energy?.Electricity?.['installed generating capacity'].text ?? data.Energy?.['Electricity - installed generating capacity']?.text;
    // const backup = `${installedRaw}`;
    if (!installedRaw) return {};

    // clean the string
    // remove everything after the fist bracket
    const bracketIndex = installedRaw.indexOf('(');
    if (bracketIndex !== -1) {
        installedRaw = installedRaw.slice(0, Math.max(0, bracketIndex));
    }

    // remove all commas
    installedRaw = installedRaw.replaceAll(',', '');

    // split on spaces
    const [production, modifier] = installedRaw.split(' ');

    // convert to number
    let productionNumber = Number.parseFloat(production);

    if (modifier.includes('million')) {
        productionNumber *= 1000000;
    }

    // fs.appendFileSync('installedRaw.txt', `${backup} -> ${productionNumber}\n`);

    return {installed_generating_capacity: productionNumber};
}
