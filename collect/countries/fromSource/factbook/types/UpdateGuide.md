# Update Guide for the Factbook types

If you want to update the factbook types, follow the following steps:

Make sure that you have the latest copy of the factbook by running `npm run collect`

Run `collect\countries\fromSource\factbook\scripts\concatAll.ts` with `ts-node` to concat all the files into one file.

Go to <https://app.quicktype.io/?l=ts>, paste the file's content into the text area.

Use the name `FactbookCountry` and enable `Interfaces only`.

Copy over the generated code into `collect\countries\fromSource\factbook\types\FactBookCountry.ts`

Lastly format the file with the built-in formatter of vscode.
