# The future dreams of this project

In this document, I will write down my ideas for this project.

## The CIA World Factbook

I am working on a script that would compare some of the facts in the CIA factbook to OSM.

I am focusing on the power generation section because it interests me the most.

Its current state can be found in the `collect/countries/fromSource/factbook` file. I'm stuck on how to get the data out of OSM because the power generation is duplicated on, for example, the generator and the site.

## statistics sites

There are many sites offering statistics. They are often government or NGO sites. They usually have a lot of data, but it is often hard to get to. I want to make a script that can get data from these sites.

<https://data.worldbank.org/>
<https://cbs.nl/en-gb>

## reoccurring tasks

<https://opendata.cbs.nl/statline/#/CBS/nl/navigatieScherm/recent>
<https://www.stats.gov.cn/english/PressRelease/>

## McDonald's in many countries

<https://en.wikipedia.org/wiki/List_of_countries_with_McDonald%27s_restaurants>

## untapped sources

<https://gruppe.schwarz/en>

<https://corporate.walmart.com/about>

<https://duo.nl/open_onderwijsdata/>

<https://www.alltheplaces.xyz/wikidata>

<https://www.euronetatms.nl/?allow_cookies=yes#:~:text=c.%2050%2C000,geldautomaten%20in%20beheer>

<https://www.submarinecablemap.com/>

<https://www.nps.gov/subjects/digital/nps-data-api.htm>

## CBS data

hotels
<https://opendata.cbs.nl/statline/#/CBS/nl/dataset/84040NED/table?ts=1702461218221>

## some ideas

- Amazon fulfillment centers
- metro stations/train stations
- Apple stores
- US National parks

## code fixes

Make a generic wikidata query compare function.

Making sure that one failed task does not fail the whole collection.
