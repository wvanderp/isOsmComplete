# Update Guide for the Factbook types

if you want to update the factbook type follow the follwing steps:

make sure that you have the latest copy of the factbook by running `npm run collect`

run `collect\countries\fromSource\factbook\scripts\concatAll.ts` with `ts-node` to concat all the files into one file

go to <https://app.quicktype.io/?l=ts> and paste the content of the file into the text area.

copy over the generated code into `collect\countries\fromSource\factbook\types\FactBookCountry.ts`

lastly format the file with the built in formatter of vscode.
