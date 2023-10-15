export interface FactbookCountry {
    Introduction: Introduction;
    Geography: Geography;
    'People and Society'?: PeopleAndSociety;
    Environment?: Environment;
    Government: Government;
    Economy: Economy;
    Energy?: Energy;
    Communications?: Communications;
    Transportation: Transportation;
    'Military and Security'?: MilitaryAndSecurity;
    Terrorism?: Terrorism;
    'Transnational Issues'?: TransnationalIssues;
}

export interface Communications {
    'Telephones - fixed lines'?: Telephones;
    'Telephones - mobile cellular'?: Telephones;
    'Telecommunication systems'?: TelecommunicationSystems;
    'Broadcast media'?: Text;
    'Internet country code'?: TextWithNote;
    'Internet users'?: InternetUsers;
    'Broadband - fixed subscriptions'?: BroadbandFixedSubscriptions;
    'Communications - note'?: Text;
}

export interface BroadbandFixedSubscriptions {
    total: Text;
    'subscriptions per 100 inhabitants'?: Text;
    note?: string;
}

export interface Text {
    text: string;
}

export interface TextWithNote {
    text: string;
    note?: string;
}

export interface InternetUsers {
    total: Text;
    'percent of population': Text;
    note?: string;
}

export interface TelecommunicationSystems {
    'general assessment'?: Text;
    domestic?: Text;
    international?: Text;
    note?: string;
    text?: string;
    'overseas departments'?: Text;
}

export interface Telephones {
    'total subscriptions': Text;
    'subscriptions per 100 inhabitants': Text;
    note?: string;
}

export interface Economy {
    'Economic overview'?: Text;
    'Real GDP (purchasing power parity)'?: RealGDPPurchasingPowerParity;
    'Real GDP growth rate'?: RealGDPGrowthRate;
    'Real GDP per capita'?: RealGDPPerCapita;
    'GDP (official exchange rate)'?: TextWithNote;
    'Inflation rate (consumer prices)'?: InflationRateConsumerPrices;
    'Credit ratings'?: CreditRatings;
    'GDP - composition, by sector of origin'?: GDPCompositionBySectorOfOrigin;
    'GDP - composition, by end use'?: GDPCompositionByEndUse;
    'Agricultural products'?: TextWithNote;
    Industries?: TextWithNote;
    'Industrial production growth rate'?: TextWithNote;
    'Labor force'?: TextWithNote;
    'Labor force - by occupation'?: LaborForceByOccupation;
    'Unemployment rate'?: UnemploymentRate;
    'Youth unemployment rate (ages 15-24)'?: YouthUnemploymentRateAges1524;
    'Population below poverty line'?: TextWithNote;
    'Gini Index coefficient - distribution of family income'?: GiniIndexCoefficientDistributionOfFamilyIncome;
    'Average household expenditures'?: AverageHouseholdExpenditures;
    'Household income or consumption by percentage share'?: HouseholdIncomeOrConsumptionByPercentageShare;
    Budget?: Budget;
    'Budget surplus (+) or deficit (-)'?: Text;
    'Public debt'?: PublicDebt;
    'Taxes and other revenues'?: TextWithNote;
    'Fiscal year'?: TextWithNote;
    'Current account balance'?: CurrentAccountBalance;
    Exports?: Exports;
    'Exports - partners'?: Text;
    'Exports - commodities'?: TextWithNote;
    Imports?: Imports;
    'Imports - partners'?: Text;
    'Imports - commodities'?: Text;
    'Reserves of foreign exchange and gold'?: ReservesOfForeignExchangeAndGold;
    'Debt - external'?: DebtExternal;
    'Exchange rates'?: ExchangeRates;
    'GDP real growth rate'?: GDPRealGrowthRate;
    'GDP (purchasing power parity) - real'?: Text;
    'GDP - per capita (PPP)'?: Text;
    'Ease of Doing Business Index scores'?: EaseOfDoingBusinessIndexScores;
    'Agriculture - products'?: Text;
    'Economy of the area administered by Turkish Cypriots'?: Text;
}

export interface AverageHouseholdExpenditures {
    'on food': Text;
    'on alcohol and tobacco': Text;
}

export interface Budget {
    revenues: Text;
    expenditures: Text;
    note?: string;
}

export interface CreditRatings {
    text?: string;
    'Fitch rating'?: Text;
    "Moody's rating"?: Text;
    'Standard & Poors rating'?: Text;
    note?: string;
}

export interface CurrentAccountBalance {
    'Current account balance 2021'?: Text;
    'Current account balance 2020'?: Text;
    'Current account balance 2019'?: Text;
    'Current account balance 2018'?: Text;
    'Current account balance 2017'?: Text;
    'Current account balance 2016'?: Text;
    'Current account balance 2005'?: Text;
    'Current account balance 2013'?: Text;
    'Current account balance 2011'?: Text;
    'Current account balance 2010'?: Text;
    note?: string;
}

export interface DebtExternal {
    'Debt - external 2019'?: Text;
    'Debt - external 2018'?: Text;
    'Debt - external 31 December 2017'?: Text;
    'Debt - external 31 December 2016'?: Text;
    'Debt - external 31 December 2010'?: Text;
    'Debt - external 31 December 2000'?: Text;
    text?: string;
    'Debt - external 31 December 2014'?: Text;
    note?: string;
    'Debt - external 1996'?: Text;
    'Debt - external 2013'?: Text;
    'Debt - external 2012'?: Text;
    'Debt - external 2016'?: Text;
    'Debt - external 2015'?: Text;
    'Debt - external 31 December 2013'?: Text;
    'Debt - external 2002'?: Text;
    'Debt - external 2004'?: Text;
    'Debt - external 2008'?: Text;
    'Debt - external 31 December 2012'?: Text;
    'Debt - external June 2010'?: Text;
    'Debt - external 1998'?: Text;
    'Debt - external 2010'?: Text;
    'Debt - external 2003'?: Text;
    'Debt - external 31 December 2015'?: Text;
    'Debt - external 2017'?: Text;
    'Debt - external 1997'?: Text;
    'Debt - external 31 December 2009'?: Text;
    'Debt - external 2014'?: Text;
    'Debt - external 31 December 2020'?: Text;
    'Debt - external 31 March 2016'?: Text;
    'Debt - external 31 March 2015'?: Text;
    'Debt - external 2009'?: Text;
    'Debt - external FY10/11'?: Text;
}

export interface EaseOfDoingBusinessIndexScores {
}

export interface ExchangeRates {
    Currency?: Text;
    'Exchange rates 2021'?: Text;
    'Exchange rates 2020'?: Text;
    'Exchange rates 2019'?: Text;
    'Exchange rates 2018'?: Text;
    'Exchange rates 2017'?: Text;
    'Exchange rates 2016'?: Text;
    'Exchange rates 2015'?: Text;
    'Exchange rates 2014'?: Text;
    'Exchange rates 2013'?: Text;
    text?: string;
    note?: string;
    'Exchange rates 2012'?: Text;
    'Exchange rates 2011'?: Text;
}

export interface Exports {
    'Exports 2021'?: Text;
    'Exports 2020'?: Text;
    'Exports 2019'?: Text;
    note?: string;
    'Exports 2018'?: Text;
    'Exports 2017'?: Text;
    'Exports 2016'?: Text;
    'Exports 2004'?: Text;
    'Exports 2014'?: Text;
    'Exports 2013'?: Text;
    'Exports 2015'?: Text;
    'Exports 2011'?: Text;
    'Exports 2010'?: Text;
    text?: string;
    'Exports 2002'?: Text;
    'Exports 2005'?: Text;
}

export interface GDPCompositionByEndUse {
    'household consumption'?: Text;
    'government consumption': Text;
    'investment in fixed capital'?: Text;
    'investment in inventories'?: Text;
    'exports of goods and services'?: Text;
    'imports of goods and services'?: Text;
    note?: string;
}

export interface GDPCompositionBySectorOfOrigin {
    agriculture: Text;
    industry: Text;
    services: Text;
    note?: string;
}

export interface GDPRealGrowthRate {
    note: string;
}

export interface GiniIndexCoefficientDistributionOfFamilyIncome {
    'Gini Index coefficient - distribution of family income 2011'?: Text;
    'Gini Index coefficient - distribution of family income 2018'?: Text;
    'Gini Index coefficient - distribution of family income 2015'?: Text;
    'Gini Index coefficient - distribution of family income 2013'?: Text;
    'Gini Index coefficient - distribution of family income 2012'?: Text;
    'Gini Index coefficient - distribution of family income 2014'?: Text;
    'Gini Index coefficient - distribution of family income 2008'?: Text;
    'Gini Index coefficient - distribution of family income 2017'?: Text;
    'Gini Index coefficient - distribution of family income 2016'?: Text;
    note?: string;
    'Gini Index coefficient - distribution of family income 2019'?: Text;
    'Gini Index coefficient - distribution of family income 2020'?: Text;
    'Gini Index coefficient - distribution of family income 1997'?: Text;
    'Gini Index coefficient - distribution of family income 2010'?: Text;
    'Gini Index coefficient - distribution of family income 1998'?: Text;
    'Gini Index coefficient - distribution of family income 2003'?: Text;
    'Gini Index coefficient - distribution of family income 2021'?: Text;
    'Gini Index coefficient - distribution of family income 2009'?: Text;
    'Gini Index coefficient - distribution of family income 2007'?: Text;
}

export interface HouseholdIncomeOrConsumptionByPercentageShare {
    'lowest 10%': Text;
    'highest 10%': Text;
    note?: string;
}

export interface Imports {
    'Imports 2021'?: Text;
    'Imports 2020'?: Text;
    'Imports 2019'?: Text;
    'Imports 2018'?: Text;
    'Imports 2017'?: Text;
    'Imports 2016'?: Text;
    'Imports 2010'?: Text;
    note?: string;
    'Imports 2015'?: Text;
    text?: string;
    'Imports 2011'?: Text;
    'Imports 2013'?: Text;
    'Imports 2014'?: Text;
    'Imports 2004'?: Text;
    'Imports 2005'?: Text;
}

export interface InflationRateConsumerPrices {
    'Inflation rate (consumer prices) 2021'?: Text;
    'Inflation rate (consumer prices) 2020'?: Text;
    'Inflation rate (consumer prices) 2019'?: Text;
    'Inflation rate (consumer prices) 2017'?: Text;
    'Inflation rate (consumer prices) 2016'?: Text;
    'Inflation rate (consumer prices) 2018'?: Text;
    'Inflation rate (consumer prices) 2012'?: Text;
    note?: string;
    'Inflation rate (consumer prices) 2015'?: Text;
    'Inflation rate (consumer prices) 2014'?: Text;
    'Inflation rate (consumer prices) 2011'?: Text;
    'Inflation rate (consumer prices) 2005'?: Text;
    'Inflation rate (consumer prices) 2009'?: Text;
    'Inflation rate (consumer prices) 2022'?: Text;
    text?: string;
    'Inflation rate (consumer prices) 2013'?: Text;
    'Inflation rate (consumer prices) June 2006'?: Text;
    'Inflation rate (consumer prices) 2006'?: Text;
    'Inflation rate (consumer prices) 2010'?: Text;
    'Inflation rate (consumer prices) January 2017'?: Text;
    'Inflation rate (consumer prices) January 2016'?: Text;
}

export interface LaborForceByOccupation {
    agriculture?: Text;
    industry?: Text;
    services?: Text;
    'industry and services'?: Text;
    note?: string;
    text?: string;
    'agriculture/fishing/forestry/mining'?: Text;
    manufacturing?: Text;
    construction?: Text;
    'transportation and utilities'?: Text;
    commerce?: Text;
    tourism?: Text;
    'transport and communications'?: Text;
    'agriculture, forestry, and fishing'?: Text;
    'gas, electricity, and water'?: Text;
    'wholesale and retail distribution'?: Text;
    'professional and scientific services'?: Text;
    'public administration'?: Text;
    'banking and finance'?: Text;
    'entertainment and catering'?: Text;
    'miscellaneous services'?: Text;
    'farming, forestry, and fishing'?: Text;
    'manufacturing, extraction, transportation, and crafts'?: Text;
    'managerial, professional, and technical'?: Text;
    'sales and office'?: Text;
    'other services'?: Text;
}

export interface PublicDebt {
    'Public debt 2017'?: Text;
    'Public debt 2016'?: Text;
    note?: string;
    'Public debt 2020'?: Text;
    'Public debt 2019'?: Text;
    'Public debt 2018'?: Text;
    'Public debt 2014'?: Text;
    'Public debt 2013'?: Text;
    'Public debt 2015'?: Text;
    'Public debt FY2016'?: Text;
    'Public debt 2004'?: Text;
    'Public debt 2012'?: Text;
    'Public debt 2011'?: Text;
    'Public debt 2008'?: Text;
    'Public debt 2006'?: Text;
    'Public debt FY14/15'?: Text;
}

export interface RealGDPPurchasingPowerParity {
    'Real GDP (purchasing power parity) 2021'?: Text;
    'Real GDP (purchasing power parity) 2020'?: Text;
    'Real GDP (purchasing power parity) 2019'?: Text;
    note?: string;
    'Real GDP (purchasing power parity) 2018'?: Text;
    'Real GDP (purchasing power parity) 2017'?: Text;
    'Real GDP (purchasing power parity) 2016'?: Text;
    'Real GDP (purchasing power parity) 2015'?: Text;
    'Real GDP (purchasing power parity) 2009'?: Text;
    'Real GDP (purchasing power parity) 2014'?: Text;
    text?: string;
    'Real GDP (purchasing power parity) 2003'?: Text;
    'Real GDP (purchasing power parity) 2004'?: Text;
    'Real GDP (purchasing power parity) 2008'?: Text;
    'Real GDP (purchasing power parity) 2011'?: Text;
    'Real GDP (purchasing power parity) 2010'?: Text;
    'Real GDP (purchasing power parity) 2005'?: Text;
    'Real GDP (purchasing power parity) 2013'?: Text;
    'Real GDP (purchasing power parity) 2012'?: Text;
    'Real GDP (purchasing power parity) 2006'?: Text;
}

export interface RealGDPGrowthRate {
    'Real GDP growth rate 2021'?: Text;
    'Real GDP growth rate 2020'?: Text;
    'Real GDP growth rate 2019'?: Text;
    'Real GDP growth rate 2017'?: Text;
    'Real GDP growth rate 2016'?: Text;
    'Real GDP growth rate 2015'?: Text;
    text?: string;
    'Real GDP growth rate 2003'?: Text;
    'Real GDP growth rate 2018'?: Text;
    'Real GDP growth rate 2005'?: Text;
    'Real GDP growth rate 2009'?: Text;
    'Real GDP growth rate 2011'?: Text;
    'Real GDP growth rate 2010'?: Text;
    'Real GDP growth rate 2012'?: Text;
    'Real GDP growth rate 2014'?: Text;
    'Real GDP growth rate 2013'?: Text;
    'Real GDP growth rate 2007'?: Text;
    note?: string;
}

export interface RealGDPPerCapita {
    'Real GDP per capita 2021'?: Text;
    'Real GDP per capita 2020'?: Text;
    'Real GDP per capita 2019'?: Text;
    note?: string;
    'Real GDP per capita 2017'?: Text;
    'Real GDP per capita 2016'?: Text;
    'Real GDP per capita 2015'?: Text;
    'Real GDP per capita FY09/10'?: Text;
    'Real GDP per capita 2014'?: Text;
    'Real GDP per capita 2005'?: Text;
    'Real GDP per capita 2010'?: Text;
    'Real GDP per capita 2012'?: Text;
    'Real GDP per capita 2003'?: Text;
    'Real GDP per capita 2004'?: Text;
    'Real GDP per capita 2008'?: Text;
    'Real GDP per capita 2011'?: Text;
    'Real GDP per capita 2009'?: Text;
    'Real GDP per capita 2018'?: Text;
    'Real GDP per capita 2013'?: Text;
    'Real GDP per capita 2007'?: Text;
    'Real GDP per capita 2006'?: Text;
}

export interface ReservesOfForeignExchangeAndGold {
    'Reserves of foreign exchange and gold 31 December 2021'?: Text;
    'Reserves of foreign exchange and gold 31 December 2020'?: Text;
    'Reserves of foreign exchange and gold 31 December 2019'?: Text;
    'Reserves of foreign exchange and gold 31 December 2017'?: Text;
    'Reserves of foreign exchange and gold 31 December 2016'?: Text;
    'Reserves of foreign exchange and gold 31 December 2018'?: Text;
    'Reserves of foreign exchange and gold 2014'?: Text;
    note?: string;
    'Reserves of foreign exchange and gold 31 December 2010'?: Text;
    'Reserves of foreign exchange and gold 31 December 2015'?: Text;
    'Reserves of foreign exchange and gold 31 December 2014'?: Text;
    'Reserves of foreign exchange and gold 31 December 2013'?: Text;
}

export interface UnemploymentRate {
    'Unemployment rate 2021'?: Text;
    'Unemployment rate 2020'?: Text;
    'Unemployment rate 2019'?: Text;
    note?: string;
    'Unemployment rate 2017'?: Text;
    'Unemployment rate 2016'?: Text;
    'Unemployment rate 1998'?: Text;
    'Unemployment rate 2005'?: Text;
    'Unemployment rate 2011'?: Text;
    'Unemployment rate 2000'?: Text;
    'Unemployment rate 2010'?: Text;
    'Unemployment rate 2001'?: Text;
    'Unemployment rate 2004'?: Text;
    'Unemployment rate 2015'?: Text;
    'Unemployment rate 2012'?: Text;
    'Unemployment rate 2006'?: Text;
    text?: string;
    'Unemployment rate 2013'?: Text;
    'Unemployment rate 2008'?: Text;
    'Unemployment rate 2014'?: Text;
    'Unemployment rate 2002'?: Text;
    'Unemployment rate 1997'?: Text;
    'Unemployment rate 2018'?: Text;
    'Unemployment rate April 2011'?: Text;
}

export interface YouthUnemploymentRateAges1524 {
    total?: Text;
    male: Text;
    female: Text;
    note?: string;
    'total population'?: Text;
    definition?: Text;
}

export interface Energy {
    'Electricity access'?: ElectricityAccess;
    Electricity?: Electricity;
    'Electricity generation sources'?: ElectricityGenerationSources;
    Coal?: Coal;
    Petroleum?: Petroleum;
    'Refined petroleum products - production'?: Text;
    'Refined petroleum products - exports'?: Text;
    'Refined petroleum products - imports'?: Text;
    'Natural gas'?: Coal;
    'Carbon dioxide emissions'?: CarbonDioxideEmissions;
    'Energy consumption per capita'?: EnergyConsumptionPerCapita;
    'Electricity - production'?: Text;
    'Electricity - consumption'?: Text;
    'Electricity - exports'?: Text;
    'Electricity - imports'?: Text;
    'Electricity - installed generating capacity'?: Text;
    'Electricity - from fossil fuels'?: Text;
    'Electricity - from nuclear fuels'?: Text;
    'Electricity - from hydroelectric plants'?: Text;
    'Electricity - from other renewable sources'?: Text;
    'Crude oil - production'?: Text;
    'Crude oil - exports'?: Text;
    'Crude oil - imports'?: Text;
    'Crude oil - proved reserves'?: Text;
    'Refined petroleum products - consumption'?: Text;
    'Natural gas - production'?: Text;
    'Natural gas - consumption'?: Text;
    'Natural gas - exports'?: Text;
    'Natural gas - imports'?: Text;
    'Natural gas - proved reserves'?: Text;
    'Carbon dioxide emissions from consumption of energy'?: Text;
}

export interface CarbonDioxideEmissions {
    'total emissions'?: Text;
    'from coal and metallurgical coke'?: Text;
    'from petroleum and other liquids'?: Text;
    'from consumed natural gas'?: Text;
    text?: string;
}

export interface Coal {
    production: Text;
    consumption: Text;
    exports: Text;
    imports: Text;
    'proven reserves'?: Text;
    note?: string;
}

export interface Electricity {
    'installed generating capacity': Text;
    consumption: Text;
    exports: Text;
    imports: Text;
    'transmission/distribution losses': Text;
}

export interface ElectricityAccess {
    'electrification - total population': Text;
    'electrification - urban areas'?: Text;
    'electrification - rural areas'?: Text;
    note?: string;
    'population without electricity'?: Text;
}

export interface ElectricityGenerationSources {
    'fossil fuels': Text;
    nuclear: Text;
    solar: Text;
    wind: Text;
    hydroelectricity: Text;
    'tide and wave': Text;
    geothermal: Text;
    'biomass and waste': Text;
    note?: string;
}

export interface EnergyConsumptionPerCapita {
    'Total energy consumption per capita 2019': Text;
}

export interface Petroleum {
    'total petroleum production'?: Text;
    'refined petroleum consumption': Text;
    'crude oil and lease condensate exports'?: Text;
    'crude oil and lease condensate imports'?: Text;
    'crude oil estimated reserves'?: Text;
}

export interface Environment {
    'Environment - current issues': TextWithNote;
    'Environment - international agreements'?: EnvironmentInternationalAgreements;
    'Air pollutants'?: AirPollutants;
    Climate: TextWithNote;
    'Land use'?: LandUse;
    Urbanization?: Urbanization;
    'Revenue from forest resources'?: Text;
    'Revenue from coal'?: Text;
    'Waste and recycling'?: WasteAndRecycling;
    'Major watersheds (area sq km)'?: Text;
    'Major aquifers'?: Text;
    'Total water withdrawal'?: TotalWaterWithdrawal;
    'Total renewable water resources'?: TextWithNote;
    'Major rivers (by length in km)'?: Text;
    'Food insecurity'?: FoodInsecurity;
    'Major lakes (area sq km)'?: MajorLakesAreaSqKM;
    'Marine fisheries'?: Text;
}

export interface AirPollutants {
    'particulate matter emissions'?: Text;
    'carbon dioxide emissions'?: Text;
    'methane emissions'?: Text;
    note?: string;
}

export interface EnvironmentInternationalAgreements {
    'party to'?: Text;
    'signed, but not ratified'?: Text;
    text?: string;
}

export interface FoodInsecurity {
    'widespread lack of access'?: Text;
    'severe localized food insecurity'?: Text;
    'exceptional shortfall in aggregate food production/supplies'?: Text;
}

export interface LandUse {
    'agricultural land'?: Text;
    'agricultural land: arable land'?: Text;
    'agricultural land: permanent crops'?: Text;
    'agricultural land: permanent pasture'?: Text;
    forest?: Text;
    other?: Text;
    note?: string;
    'arable land / permanent crops / permanent pasture'?: Text;
}

export interface MajorLakesAreaSqKM {
    'fresh water lake(s)'?: Text;
    'salt water lake(s)'?: Text;
}

export interface TotalWaterWithdrawal {
    municipal: Text;
    industrial?: Text;
    agricultural?: Text;
    note?: string;
}

export interface Urbanization {
    'urban population'?: Text;
    'rate of urbanization': Text;
    note?: string;
}

export interface WasteAndRecycling {
    'municipal solid waste generated annually': Text;
    'municipal solid waste recycled annually'?: Text;
    'percent of municipal solid waste recycled'?: Text;
    note?: string;
}

export interface Geography {
    Location: Text;
    'Geographic coordinates'?: TextWithNote;
    'Map references': Text;
    Area: Area;
    'Area - comparative': Text;
    'Land boundaries'?: LandBoundaries;
    Coastline?: TextWithNote;
    'Maritime claims'?: MaritimeClaims;
    Climate: TextWithNote;
    Terrain?: Text;
    Elevation?: Elevation;
    'Natural resources'?: TextWithNote;
    'Land use'?: LandUse;
    'Irrigated land'?: TextWithNote;
    'Major watersheds (area sq km)'?: Text;
    'Major aquifers'?: Text;
    'Population distribution'?: TextWithNote;
    'Natural hazards'?: Text;
    'Geography - note'?: Text;
    'Major rivers (by length in km)'?: Text;
    'Major lakes (area sq km)'?: MajorLakesAreaSqKM;
    'Environment - current issues'?: Text;
    'Ocean volume'?: OceanVolume;
    'Major ocean currents'?: Text;
    Bathymetry?: Bathymetry;
}

export interface Area {
    total?: Text;
    land?: Text;
    water?: Text;
    note?: string;
    text?: string;
}

export interface Bathymetry {
    'continental shelf': Text;
    'continental slope': Text;
    'abyssal plains': Text;
    'mid-ocean ridge': Text;
    seamounts: Text;
    'ocean trenches': Text;
    atolls: Text;
}

export interface Elevation {
    'highest point': Text;
    'lowest point': Text;
    'mean elevation'?: Text;
    note?: string;
    'mean depth'?: Text;
    'ocean zones'?: Text;
}

export interface LandBoundaries {
    total?: Text;
    'border countries'?: Text;
    note?: string;
    text?: string;
    'regional borders'?: Text;
    'border sovereign base areas'?: Text;
    'metropolitan France - total'?: Text;
    'French Guiana - total'?: Text;
}

export interface MaritimeClaims {
    'territorial sea'?: Text;
    'contiguous zone'?: Text;
    'exclusive fishing zone'?: Text;
    'exclusive economic zone'?: Text;
    text?: string;
    'continental shelf'?: Text;
    note?: string;
    'Environment (Protection and Preservation) Zone'?: Text;
}

export interface OceanVolume {
    'ocean volume': Text;
    'percent of World Ocean total volume': Text;
}

export interface Government {
    'Country name'?: CountryName;
    'Government type'?: TextWithNote;
    Capital?: Capital;
    'Administrative divisions'?: TextWithNote;
    Independence?: TextWithNote;
    'National holiday'?: TextWithNote;
    Constitution?: Constitution;
    'Legal system'?: Text;
    'International law organization participation'?: Text;
    Citizenship?: Citizenship;
    Suffrage?: TextWithNote;
    'Executive branch'?: ExecutiveBranch;
    'Legislative branch'?: LegislativeBranch;
    'Judicial branch'?: JudicialBranch;
    'Political parties and leaders'?: TextWithNote;
    'International organization participation'?: TextWithNote;
    'Diplomatic representation in the US'?: DiplomaticRepresentationInTheUS;
    'Diplomatic representation from the US'?: DiplomaticRepresentationFromTheUS;
    'Flag description'?: TextWithNote;
    'National symbol(s)'?: Text;
    'National anthem'?: NationalAnthem;
    'National heritage'?: NationalHeritage;
    'Dependency status'?: TextWithNote;
    'Government - note'?: Text;
    'Dependent areas'?: TextWithNote;
    'Union name'?: UnionName;
    'Political structure'?: Text;
    'Member states'?: TextWithNote;
}

export interface Capital {
    name?: Text;
    'geographic coordinates'?: Text;
    'time difference': Text;
    etymology?: Text;
    'daylight saving time'?: Text;
    note?: string;
    'time zone note'?: Text;
}

export interface Citizenship {
    'citizenship by birth'?: Text;
    'citizenship by descent only'?: Text;
    'dual citizenship recognized'?: Text;
    'residency requirement for naturalization'?: Text;
    text?: string;
    note?: string;
}

export interface Constitution {
    history: Text;
    amendments?: Text;
    note?: string;
}

export interface CountryName {
    'conventional long form'?: Text;
    'conventional short form'?: Text;
    'local long form'?: Text;
    'local short form'?: Text;
    etymology?: Text;
    former?: Text;
    note?: string;
    abbreviation?: Text;
    'official long form'?: Text;
    'official short form'?: Text;
}

export interface DiplomaticRepresentationFromTheUS {
    'chief of mission'?: Text;
    embassy?: Text;
    'mailing address'?: Text;
    telephone?: Text;
    FAX?: Text;
    'email address and website'?: Text;
    'branch office(s)'?: Text;
    'consulate(s) general'?: Text;
    note?: string;
    text?: string;
    'consulate(s)'?: Text;
    'other offices'?: Text;
}

export interface DiplomaticRepresentationInTheUS {
    'chief of mission'?: Text;
    chancery?: Text;
    telephone?: Text;
    FAX?: Text;
    'email address and website'?: Text;
    'consulate(s) general'?: Text;
    'consulate(s)'?: Text;
    'representative office'?: Text;
    text?: string;
    note?: string;
    embassy?: Text;
    'honorary consulate(s)'?: Text;
    'HKETO offices'?: Text;
    'Taipei Economic and Cultural Offices (branch offices)'?: Text;
    'trade office(s)'?: Text;
}

export interface ExecutiveBranch {
    'chief of state'?: Text;
    'head of government'?: Text;
    cabinet?: Text;
    'elections/appointments'?: Text;
    'election results'?: Text;
    note?: string;
    'state counsellor'?: Text;
    text?: string;
}

export interface JudicialBranch {
    'highest court(s)': Text;
    'judge selection and term of office'?: Text;
    'subordinate courts'?: Text;
    note?: string;
}

export interface LegislativeBranch {
    description: Text;
    elections?: Text;
    'election results'?: Text;
    note?: string;
}

export interface NationalAnthem {
    name?: Text;
    'lyrics/music'?: Text;
    note?: string;
    text?: string;
}

export interface NationalHeritage {
    'total World Heritage Sites': Text;
    'selected World Heritage Site locales': Text;
    note?: string;
}

export interface UnionName {
    'conventional long form': Text;
    abbreviation: Text;
}

export interface Introduction {
    Background: Text;
    'Preliminary statement'?: Text;
}

export interface MilitaryAndSecurity {
    'Military and security forces'?: TextWithNote;
    'Military expenditures'?: MilitaryExpenditures;
    'Military and security service personnel strengths'?: TextWithNote;
    'Military equipment inventories and acquisitions'?: TextWithNote;
    'Military service age and obligation'?: TextWithNote;
    'Military - note'?: Text;
    'Military deployments'?: TextWithNote;
    'Maritime threats'?: Text;
}

export interface MilitaryExpenditures {
    'Military Expenditures 2022'?: Text;
    'Military Expenditures 2021'?: Text;
    'Military Expenditures 2020'?: Text;
    'Military Expenditures 2019'?: Text;
    'Military Expenditures 2018'?: Text;
    'Military Expenditures 2017'?: Text;
    'Military Expenditures 2016'?: Text;
    'Military Expenditures 2015'?: Text;
    text?: string;
    note?: string;
    'Military Expenditures 2023'?: Text;
}

export interface PeopleAndSociety {
    Population?: TextWithNote;
    Nationality?: Nationality;
    'Ethnic groups'?: TextWithNote;
    Languages?: Languages;
    Religions?: TextWithNote;
    'Demographic profile'?: Text;
    'Age structure'?: AgeStructure;
    'Dependency ratios'?: DependencyRatios;
    'Median age'?: YouthUnemploymentRateAges1524;
    'Population growth rate'?: TextWithNote;
    'Birth rate'?: TextWithNote;
    'Death rate'?: TextWithNote;
    'Net migration rate'?: TextWithNote;
    'Population distribution'?: TextWithNote;
    Urbanization?: Urbanization;
    'Major urban areas - population'?: TextWithNote;
    'Sex ratio'?: SexRatio;
    'Maternal mortality ratio'?: TextWithNote;
    'Infant mortality rate'?: YouthUnemploymentRateAges1524;
    'Life expectancy at birth'?: YouthUnemploymentRateAges1524;
    'Total fertility rate'?: TextWithNote;
    'Gross reproduction rate'?: Text;
    'Contraceptive prevalence rate'?: TextWithNote;
    'Drinking water source'?: DrinkingWaterSource;
    'Current health expenditure'?: TextWithNote;
    'Physicians density'?: TextWithNote;
    'Hospital bed density'?: TextWithNote;
    'Sanitation facility access'?: DrinkingWaterSource;
    'Major infectious diseases'?: MajorInfectiousDiseases;
    'Obesity - adult prevalence rate'?: TextWithNote;
    'Alcohol consumption per capita'?: AlcoholConsumptionPerCapita;
    'Tobacco use'?: YouthUnemploymentRateAges1524;
    'Children under the age of 5 years underweight'?: TextWithNote;
    'Currently married women (ages 15-49)'?: TextWithNote;
    'Child marriage'?: ChildMarriage;
    'Education expenditures'?: TextWithNote;
    Literacy?: YouthUnemploymentRateAges1524;
    'Youth unemployment rate (ages 15-24)'?: YouthUnemploymentRateAges1524;
    "Mother's mean age at first birth"?: TextWithNote;
    'School life expectancy (primary to tertiary education)'?: YouthUnemploymentRateAges1524;
    'HIV/AIDS - adult prevalence rate'?: Text;
    'HIV/AIDS - people living with HIV/AIDS'?: Text;
    'HIV/AIDS - deaths'?: Text;
    'People - note'?: Text;
}

export interface AgeStructure {
    '0-14 years': Text;
    '15-64 years'?: Text;
    '65 years and over': Text;
    note?: string;
    '15-24 years'?: Text;
    '25-54 years'?: Text;
    '55-64 years'?: Text;
}

export interface AlcoholConsumptionPerCapita {
    total: Text;
    beer: Text;
    wine: Text;
    spirits: Text;
    'other alcohols': Text;
}

export interface ChildMarriage {
    'women married by age 15'?: Text;
    'women married by age 18': Text;
    'men married by age 18'?: Text;
    note?: string;
}

export interface DependencyRatios {
    'total dependency ratio': Text;
    'youth dependency ratio': Text;
    'elderly dependency ratio': Text;
    'potential support ratio': Text;
    note?: string;
}

export interface DrinkingWaterSource {
    'improved: urban'?: Text;
    'improved: rural'?: Text;
    'improved: total'?: Text;
    'unimproved: urban'?: Text;
    'unimproved: rural'?: Text;
    'unimproved: total'?: Text;
    note?: string;
}

export interface Languages {
    Languages?: Text;
    'major-language sample(s)'?: Text;
    text?: string;
    note?: string;
}

export interface MajorInfectiousDiseases {
    text?: string;
    'degree of risk'?: Text;
    'food or waterborne diseases'?: Text;
    'vectorborne diseases'?: Text;
    'water contact diseases'?: Text;
    'animal contact diseases'?: Text;
    note?: string;
    'respiratory diseases'?: Text;
    'aerosolized dust or soil contact diseases'?: Text;
    'soil contact diseases'?: Text;
}

export interface Nationality {
    noun: Text;
    adjective: Text;
    note?: string;
}

export interface SexRatio {
    'at birth'?: Text;
    '0-14 years'?: Text;
    '15-64 years'?: Text;
    '65 years and over'?: Text;
    'total population'?: Text;
    note?: string;
    '15-24 years'?: Text;
    '25-54 years'?: Text;
    '55-64 years'?: Text;
    text?: string;
}

export interface Terrorism {
    'Terrorist group(s)'?: TextWithNote;
}

export interface TransnationalIssues {
    'Disputes - international'?: TextWithNote;
    'Refugees and internally displaced persons'?: RefugeesAndInternallyDisplacedPersons;
    'Trafficking in persons'?: TraffickingInPersons;
    'Illicit drugs'?: Text;
}

export interface RefugeesAndInternallyDisplacedPersons {
    'refugees (country of origin)'?: Text;
    IDPs?: Text;
    'stateless persons'?: Text;
    note?: string;
}

export interface TraffickingInPersons {
    'tier rating': Text;
    'trafficking profile': Text;
    note?: string;
}

export interface Transportation {
    'National air transport system'?: NationalAirTransportSystem;
    'Civil aircraft registration country code prefix'?: Text;
    Airports?: Airports;
    'Airports - with paved runways'?: AirportsWithPavedRunways;
    'Airports - with unpaved runways'?: AirportsWithUnpavedRunways;
    Heliports?: TextWithNote;
    Pipelines?: Text;
    Railways?: Railways;
    Roadways?: Roadways;
    'Merchant marine'?: MerchantMarine;
    'Ports and terminals'?: PortsAndTerminals;
    Waterways?: Text;
    'Transportation - note'?: Text;
    Icebreakers?: Text;
}

export interface Airports {
    text?: string;
    'Midway Islands'?: Text;
    note?: string;
}

export interface AirportsWithPavedRunways {
    text?: string;
    note?: string;
    total?: Text;
    '2,438 to 3,047 m'?: Text;
}

export interface AirportsWithUnpavedRunways {
    text?: string;
    note?: string;
    total?: Text;
    '1,524 to 2,437 m'?: Text;
    '914 to 1,523 m'?: Text;
    'under 914 m'?: Text;
}

export interface MerchantMarine {
    total: Text;
    'by type': Text;
    note?: string;
}

export interface NationalAirTransportSystem {
    'number of registered air carriers'?: Text;
    'inventory of registered aircraft operated by air carriers'?: Text;
    'annual passenger traffic on registered air carriers'?: Text;
    'annual freight traffic on registered air carriers'?: Text;
}

export interface PortsAndTerminals {
    'major seaport(s)'?: Text;
    'LNG terminal(s) (export)'?: Text;
    'LNG terminal(s) (import)'?: Text;
    'lake port(s)'?: Text;
    'oil terminal(s)'?: Text;
    'river port(s)'?: Text;
    note?: string;
    'river or lake port(s)'?: Text;
    'container port(s) (TEUs)'?: Text;
    text?: string;
    'Saint Helena'?: Text;
    'Ascension Island'?: Text;
    'Tristan da Cunha'?: Text;
    'dry bulk cargo port(s)'?: Text;
    'cruise port(s)'?: Text;
    'bulk cargo port(s)'?: Text;
    'major port(s)'?: Text;
    'cruise/ferry port(s)'?: Text;
    'river and lake port(s)'?: Text;
    'cargo ports'?: Text;
    'cruise departure ports (passengers)'?: Text;
}

export interface Railways {
    total?: Text;
    'narrow gauge'?: Text;
    note?: string;
    'standard gauge'?: Text;
    other?: Text;
    'dual gauge'?: Text;
    'broad gauge'?: Text;
    text?: string;
}

export interface Roadways {
    total?: Text;
    paved?: Text;
    unpaved?: Text;
    note?: string;
    urban?: Text;
    'non-urban'?: Text;
    text?: string;
    'government control'?: Text;
    'Turkish Cypriot control'?: Text;
    highways?: Text;
    'private and forest roads'?: Text;
    'paved/oiled gravel'?: Text;
}
