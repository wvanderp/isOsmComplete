# The future dreams of this project

in this document, I will write down some ideas I have for this project.

## The CIA World Factbook

I am currently working on a script that would use some of the facts in the CIA factbook to compare to OSM.

I am focusing on the power generation section because it is the most interesting to me.

Its current state can be found in the `collect/countries/fromSource/factbook` file. I'm stuck on how to get the data out of OSM because the power generation is duplicated on, for example, the generator and the site.

## statistics sites

There are many sites offering statistics. They are often government or NGO sites. They often have a lot of data, but it is often hard to get to. I would like to make a script that can get data from these sites.

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

## CBS data

hotels
<https://opendata.cbs.nl/statline/#/CBS/nl/dataset/84040NED/table?ts=1702461218221>

## some ideas

- Amazon fulfillment centers
- metro stations/train stations
- Apple stores
- US National parks

## code fixes

Make a generic wikidata query compare function

Centralize the tag info servers

making sure that one failed task does not fail the whole collect
