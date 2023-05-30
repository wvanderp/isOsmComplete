/* eslint-disable @typescript-eslint/no-empty-interface */
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
    'Broadcast media'?: BroadcastMedia;
    'Internet country code'?: InternetCountryCode;
    'Internet users'?: InternetUsers;
    'Broadband - fixed subscriptions'?: BroadbandFixedSubscriptions;
    'Communications - note'?: BroadcastMedia;
}

export interface BroadbandFixedSubscriptions {
    total: BroadcastMedia;
    'subscriptions per 100 inhabitants'?: BroadcastMedia;
    note?: string;
}

export interface BroadcastMedia {
    text: string;
}

export interface InternetCountryCode {
    text: string;
    note?: string;
}

export interface InternetUsers {
    total: BroadcastMedia;
    'percent of population': BroadcastMedia;
    note?: string;
}

export interface TelecommunicationSystems {
    'general assessment'?: BroadcastMedia;
    domestic?: BroadcastMedia;
    international?: BroadcastMedia;
    note?: string;
    text?: string;
    'overseas departments'?: BroadcastMedia;
}

export interface Telephones {
    'total subscriptions': BroadcastMedia;
    'subscriptions per 100 inhabitants': BroadcastMedia;
    note?: string;
}

export interface Economy {
    'Economic overview'?: BroadcastMedia;
    'Real GDP (purchasing power parity)'?: RealGDPPurchasingPowerParity;
    'Real GDP growth rate'?: RealGDPGrowthRate;
    'Real GDP per capita'?: RealGDPPerCapita;
    'GDP (official exchange rate)'?: InternetCountryCode;
    'Inflation rate (consumer prices)'?: InflationRateConsumerPrices;
    'Credit ratings'?: CreditRatings;
    'GDP - composition, by sector of origin'?: GDPCompositionBySectorOfOrigin;
    'GDP - composition, by end use'?: GDPCompositionByEndUse;
    'Agricultural products'?: InternetCountryCode;
    Industries?: InternetCountryCode;
    'Industrial production growth rate'?: InternetCountryCode;
    'Labor force'?: InternetCountryCode;
    'Labor force - by occupation'?: LaborForceByOccupation;
    'Unemployment rate'?: UnemploymentRate;
    'Youth unemployment rate (ages 15-24)'?: YouthUnemploymentRateAges1524;
    'Population below poverty line'?: InternetCountryCode;
    'Gini Index coefficient - distribution of family income'?: GiniIndexCoefficientDistributionOfFamilyIncome;
    'Average household expenditures'?: AverageHouseholdExpenditures;
    'Household income or consumption by percentage share'?: HouseholdIncomeOrConsumptionByPercentageShare;
    Budget?: Budget;
    'Budget surplus (+) or deficit (-)'?: BroadcastMedia;
    'Public debt'?: PublicDebt;
    'Taxes and other revenues'?: InternetCountryCode;
    'Fiscal year'?: InternetCountryCode;
    'Current account balance'?: CurrentAccountBalance;
    Exports?: Exports;
    'Exports - partners'?: BroadcastMedia;
    'Exports - commodities'?: InternetCountryCode;
    Imports?: Imports;
    'Imports - partners'?: BroadcastMedia;
    'Imports - commodities'?: BroadcastMedia;
    'Reserves of foreign exchange and gold'?: ReservesOfForeignExchangeAndGold;
    'Debt - external'?: DebtExternal;
    'Exchange rates'?: ExchangeRates;
    'GDP real growth rate'?: GDPRealGrowthRate;
    'GDP (purchasing power parity) - real'?: BroadcastMedia;
    'GDP - per capita (PPP)'?: BroadcastMedia;
    'Ease of Doing Business Index scores'?: EaseOfDoingBusinessIndexScores;
    'Agriculture - products'?: BroadcastMedia;
    'Economy of the area administered by Turkish Cypriots'?: BroadcastMedia;
}

export interface AverageHouseholdExpenditures {
    'on food': BroadcastMedia;
    'on alcohol and tobacco': BroadcastMedia;
}

export interface Budget {
    revenues: BroadcastMedia;
    expenditures: BroadcastMedia;
    note?: string;
}

export interface CreditRatings {
    text?: string;
    'Fitch rating'?: BroadcastMedia;
    "Moody's rating"?: BroadcastMedia;
    'Standard & Poors rating'?: BroadcastMedia;
    note?: string;
}

export interface CurrentAccountBalance {
    'Current account balance 2021'?: BroadcastMedia;
    'Current account balance 2020'?: BroadcastMedia;
    'Current account balance 2019'?: BroadcastMedia;
    'Current account balance 2018'?: BroadcastMedia;
    'Current account balance 2017'?: BroadcastMedia;
    'Current account balance 2016'?: BroadcastMedia;
    'Current account balance 2005'?: BroadcastMedia;
    'Current account balance 2013'?: BroadcastMedia;
    'Current account balance 2011'?: BroadcastMedia;
    'Current account balance 2010'?: BroadcastMedia;
    note?: string;
}

export interface DebtExternal {
    'Debt - external 2019'?: BroadcastMedia;
    'Debt - external 2018'?: BroadcastMedia;
    'Debt - external 31 December 2017'?: BroadcastMedia;
    'Debt - external 31 December 2016'?: BroadcastMedia;
    'Debt - external 31 December 2010'?: BroadcastMedia;
    'Debt - external 31 December 2000'?: BroadcastMedia;
    text?: string;
    'Debt - external 31 December 2014'?: BroadcastMedia;
    note?: string;
    'Debt - external 1996'?: BroadcastMedia;
    'Debt - external 2013'?: BroadcastMedia;
    'Debt - external 2012'?: BroadcastMedia;
    'Debt - external 2016'?: BroadcastMedia;
    'Debt - external 2015'?: BroadcastMedia;
    'Debt - external 31 December 2013'?: BroadcastMedia;
    'Debt - external 2002'?: BroadcastMedia;
    'Debt - external 2004'?: BroadcastMedia;
    'Debt - external 2008'?: BroadcastMedia;
    'Debt - external 31 December 2012'?: BroadcastMedia;
    'Debt - external June 2010'?: BroadcastMedia;
    'Debt - external 1998'?: BroadcastMedia;
    'Debt - external 2010'?: BroadcastMedia;
    'Debt - external 2003'?: BroadcastMedia;
    'Debt - external 31 December 2015'?: BroadcastMedia;
    'Debt - external 2017'?: BroadcastMedia;
    'Debt - external 1997'?: BroadcastMedia;
    'Debt - external 31 December 2009'?: BroadcastMedia;
    'Debt - external 2014'?: BroadcastMedia;
    'Debt - external 31 December 2020'?: BroadcastMedia;
    'Debt - external 31 March 2016'?: BroadcastMedia;
    'Debt - external 31 March 2015'?: BroadcastMedia;
    'Debt - external 2009'?: BroadcastMedia;
    'Debt - external FY10/11'?: BroadcastMedia;
}

export interface EaseOfDoingBusinessIndexScores {
}

export interface ExchangeRates {
    Currency?: BroadcastMedia;
    'Exchange rates 2021'?: BroadcastMedia;
    'Exchange rates 2020'?: BroadcastMedia;
    'Exchange rates 2019'?: BroadcastMedia;
    'Exchange rates 2018'?: BroadcastMedia;
    'Exchange rates 2017'?: BroadcastMedia;
    'Exchange rates 2016'?: BroadcastMedia;
    'Exchange rates 2015'?: BroadcastMedia;
    'Exchange rates 2014'?: BroadcastMedia;
    'Exchange rates 2013'?: BroadcastMedia;
    text?: string;
    note?: string;
    'Exchange rates 2012'?: BroadcastMedia;
    'Exchange rates 2011'?: BroadcastMedia;
}

export interface Exports {
    'Exports 2021'?: BroadcastMedia;
    'Exports 2020'?: BroadcastMedia;
    'Exports 2019'?: BroadcastMedia;
    note?: string;
    'Exports 2018'?: BroadcastMedia;
    'Exports 2017'?: BroadcastMedia;
    'Exports 2016'?: BroadcastMedia;
    'Exports 2004'?: BroadcastMedia;
    'Exports 2014'?: BroadcastMedia;
    'Exports 2013'?: BroadcastMedia;
    'Exports 2015'?: BroadcastMedia;
    'Exports 2011'?: BroadcastMedia;
    'Exports 2010'?: BroadcastMedia;
    text?: string;
    'Exports 2002'?: BroadcastMedia;
    'Exports 2005'?: BroadcastMedia;
}

export interface GDPCompositionByEndUse {
    'household consumption'?: BroadcastMedia;
    'government consumption': BroadcastMedia;
    'investment in fixed capital'?: BroadcastMedia;
    'investment in inventories'?: BroadcastMedia;
    'exports of goods and services'?: BroadcastMedia;
    'imports of goods and services'?: BroadcastMedia;
    note?: string;
}

export interface GDPCompositionBySectorOfOrigin {
    agriculture: BroadcastMedia;
    industry: BroadcastMedia;
    services: BroadcastMedia;
    note?: string;
}

export interface GDPRealGrowthRate {
    note: string;
}

export interface GiniIndexCoefficientDistributionOfFamilyIncome {
    'Gini Index coefficient - distribution of family income 2011'?: BroadcastMedia;
    'Gini Index coefficient - distribution of family income 2018'?: BroadcastMedia;
    'Gini Index coefficient - distribution of family income 2015'?: BroadcastMedia;
    'Gini Index coefficient - distribution of family income 2013'?: BroadcastMedia;
    'Gini Index coefficient - distribution of family income 2012'?: BroadcastMedia;
    'Gini Index coefficient - distribution of family income 2014'?: BroadcastMedia;
    'Gini Index coefficient - distribution of family income 2008'?: BroadcastMedia;
    'Gini Index coefficient - distribution of family income 2017'?: BroadcastMedia;
    'Gini Index coefficient - distribution of family income 2016'?: BroadcastMedia;
    note?: string;
    'Gini Index coefficient - distribution of family income 2019'?: BroadcastMedia;
    'Gini Index coefficient - distribution of family income 2020'?: BroadcastMedia;
    'Gini Index coefficient - distribution of family income 1997'?: BroadcastMedia;
    'Gini Index coefficient - distribution of family income 2010'?: BroadcastMedia;
    'Gini Index coefficient - distribution of family income 1998'?: BroadcastMedia;
    'Gini Index coefficient - distribution of family income 2003'?: BroadcastMedia;
    'Gini Index coefficient - distribution of family income 2021'?: BroadcastMedia;
    'Gini Index coefficient - distribution of family income 2009'?: BroadcastMedia;
    'Gini Index coefficient - distribution of family income 2007'?: BroadcastMedia;
}

export interface HouseholdIncomeOrConsumptionByPercentageShare {
    'lowest 10%': BroadcastMedia;
    'highest 10%': BroadcastMedia;
    note?: string;
}

export interface Imports {
    'Imports 2021'?: BroadcastMedia;
    'Imports 2020'?: BroadcastMedia;
    'Imports 2019'?: BroadcastMedia;
    'Imports 2018'?: BroadcastMedia;
    'Imports 2017'?: BroadcastMedia;
    'Imports 2016'?: BroadcastMedia;
    'Imports 2010'?: BroadcastMedia;
    note?: string;
    'Imports 2015'?: BroadcastMedia;
    text?: string;
    'Imports 2011'?: BroadcastMedia;
    'Imports 2013'?: BroadcastMedia;
    'Imports 2014'?: BroadcastMedia;
    'Imports 2004'?: BroadcastMedia;
    'Imports 2005'?: BroadcastMedia;
}

export interface InflationRateConsumerPrices {
    'Inflation rate (consumer prices) 2021'?: BroadcastMedia;
    'Inflation rate (consumer prices) 2020'?: BroadcastMedia;
    'Inflation rate (consumer prices) 2019'?: BroadcastMedia;
    'Inflation rate (consumer prices) 2017'?: BroadcastMedia;
    'Inflation rate (consumer prices) 2016'?: BroadcastMedia;
    'Inflation rate (consumer prices) 2018'?: BroadcastMedia;
    'Inflation rate (consumer prices) 2012'?: BroadcastMedia;
    note?: string;
    'Inflation rate (consumer prices) 2015'?: BroadcastMedia;
    'Inflation rate (consumer prices) 2014'?: BroadcastMedia;
    'Inflation rate (consumer prices) 2011'?: BroadcastMedia;
    'Inflation rate (consumer prices) 2005'?: BroadcastMedia;
    'Inflation rate (consumer prices) 2009'?: BroadcastMedia;
    'Inflation rate (consumer prices) 2022'?: BroadcastMedia;
    text?: string;
    'Inflation rate (consumer prices) 2013'?: BroadcastMedia;
    'Inflation rate (consumer prices) June 2006'?: BroadcastMedia;
    'Inflation rate (consumer prices) 2006'?: BroadcastMedia;
    'Inflation rate (consumer prices) 2010'?: BroadcastMedia;
    'Inflation rate (consumer prices) January 2017'?: BroadcastMedia;
    'Inflation rate (consumer prices) January 2016'?: BroadcastMedia;
}

export interface LaborForceByOccupation {
    agriculture?: BroadcastMedia;
    industry?: BroadcastMedia;
    services?: BroadcastMedia;
    'industry and services'?: BroadcastMedia;
    note?: string;
    text?: string;
    'agriculture/fishing/forestry/mining'?: BroadcastMedia;
    manufacturing?: BroadcastMedia;
    construction?: BroadcastMedia;
    'transportation and utilities'?: BroadcastMedia;
    commerce?: BroadcastMedia;
    tourism?: BroadcastMedia;
    'transport and communications'?: BroadcastMedia;
    'agriculture, forestry, and fishing'?: BroadcastMedia;
    'gas, electricity, and water'?: BroadcastMedia;
    'wholesale and retail distribution'?: BroadcastMedia;
    'professional and scientific services'?: BroadcastMedia;
    'public administration'?: BroadcastMedia;
    'banking and finance'?: BroadcastMedia;
    'entertainment and catering'?: BroadcastMedia;
    'miscellaneous services'?: BroadcastMedia;
    'farming, forestry, and fishing'?: BroadcastMedia;
    'manufacturing, extraction, transportation, and crafts'?: BroadcastMedia;
    'managerial, professional, and technical'?: BroadcastMedia;
    'sales and office'?: BroadcastMedia;
    'other services'?: BroadcastMedia;
}

export interface PublicDebt {
    'Public debt 2017'?: BroadcastMedia;
    'Public debt 2016'?: BroadcastMedia;
    note?: string;
    'Public debt 2020'?: BroadcastMedia;
    'Public debt 2019'?: BroadcastMedia;
    'Public debt 2018'?: BroadcastMedia;
    'Public debt 2014'?: BroadcastMedia;
    'Public debt 2013'?: BroadcastMedia;
    'Public debt 2015'?: BroadcastMedia;
    'Public debt FY2016'?: BroadcastMedia;
    'Public debt 2004'?: BroadcastMedia;
    'Public debt 2012'?: BroadcastMedia;
    'Public debt 2011'?: BroadcastMedia;
    'Public debt 2008'?: BroadcastMedia;
    'Public debt 2006'?: BroadcastMedia;
    'Public debt FY14/15'?: BroadcastMedia;
}

export interface RealGDPPurchasingPowerParity {
    'Real GDP (purchasing power parity) 2021'?: BroadcastMedia;
    'Real GDP (purchasing power parity) 2020'?: BroadcastMedia;
    'Real GDP (purchasing power parity) 2019'?: BroadcastMedia;
    note?: string;
    'Real GDP (purchasing power parity) 2018'?: BroadcastMedia;
    'Real GDP (purchasing power parity) 2017'?: BroadcastMedia;
    'Real GDP (purchasing power parity) 2016'?: BroadcastMedia;
    'Real GDP (purchasing power parity) 2015'?: BroadcastMedia;
    'Real GDP (purchasing power parity) 2009'?: BroadcastMedia;
    'Real GDP (purchasing power parity) 2014'?: BroadcastMedia;
    text?: string;
    'Real GDP (purchasing power parity) 2003'?: BroadcastMedia;
    'Real GDP (purchasing power parity) 2004'?: BroadcastMedia;
    'Real GDP (purchasing power parity) 2008'?: BroadcastMedia;
    'Real GDP (purchasing power parity) 2011'?: BroadcastMedia;
    'Real GDP (purchasing power parity) 2010'?: BroadcastMedia;
    'Real GDP (purchasing power parity) 2005'?: BroadcastMedia;
    'Real GDP (purchasing power parity) 2013'?: BroadcastMedia;
    'Real GDP (purchasing power parity) 2012'?: BroadcastMedia;
    'Real GDP (purchasing power parity) 2006'?: BroadcastMedia;
}

export interface RealGDPGrowthRate {
    'Real GDP growth rate 2021'?: BroadcastMedia;
    'Real GDP growth rate 2020'?: BroadcastMedia;
    'Real GDP growth rate 2019'?: BroadcastMedia;
    'Real GDP growth rate 2017'?: BroadcastMedia;
    'Real GDP growth rate 2016'?: BroadcastMedia;
    'Real GDP growth rate 2015'?: BroadcastMedia;
    text?: string;
    'Real GDP growth rate 2003'?: BroadcastMedia;
    'Real GDP growth rate 2018'?: BroadcastMedia;
    'Real GDP growth rate 2005'?: BroadcastMedia;
    'Real GDP growth rate 2009'?: BroadcastMedia;
    'Real GDP growth rate 2011'?: BroadcastMedia;
    'Real GDP growth rate 2010'?: BroadcastMedia;
    'Real GDP growth rate 2012'?: BroadcastMedia;
    'Real GDP growth rate 2014'?: BroadcastMedia;
    'Real GDP growth rate 2013'?: BroadcastMedia;
    'Real GDP growth rate 2007'?: BroadcastMedia;
    note?: string;
}

export interface RealGDPPerCapita {
    'Real GDP per capita 2021'?: BroadcastMedia;
    'Real GDP per capita 2020'?: BroadcastMedia;
    'Real GDP per capita 2019'?: BroadcastMedia;
    note?: string;
    'Real GDP per capita 2017'?: BroadcastMedia;
    'Real GDP per capita 2016'?: BroadcastMedia;
    'Real GDP per capita 2015'?: BroadcastMedia;
    'Real GDP per capita FY09/10'?: BroadcastMedia;
    'Real GDP per capita 2014'?: BroadcastMedia;
    'Real GDP per capita 2005'?: BroadcastMedia;
    'Real GDP per capita 2010'?: BroadcastMedia;
    'Real GDP per capita 2012'?: BroadcastMedia;
    'Real GDP per capita 2003'?: BroadcastMedia;
    'Real GDP per capita 2004'?: BroadcastMedia;
    'Real GDP per capita 2008'?: BroadcastMedia;
    'Real GDP per capita 2011'?: BroadcastMedia;
    'Real GDP per capita 2009'?: BroadcastMedia;
    'Real GDP per capita 2018'?: BroadcastMedia;
    'Real GDP per capita 2013'?: BroadcastMedia;
    'Real GDP per capita 2007'?: BroadcastMedia;
    'Real GDP per capita 2006'?: BroadcastMedia;
}

export interface ReservesOfForeignExchangeAndGold {
    'Reserves of foreign exchange and gold 31 December 2021'?: BroadcastMedia;
    'Reserves of foreign exchange and gold 31 December 2020'?: BroadcastMedia;
    'Reserves of foreign exchange and gold 31 December 2019'?: BroadcastMedia;
    'Reserves of foreign exchange and gold 31 December 2017'?: BroadcastMedia;
    'Reserves of foreign exchange and gold 31 December 2016'?: BroadcastMedia;
    'Reserves of foreign exchange and gold 31 December 2018'?: BroadcastMedia;
    'Reserves of foreign exchange and gold 2014'?: BroadcastMedia;
    note?: string;
    'Reserves of foreign exchange and gold 31 December 2010'?: BroadcastMedia;
    'Reserves of foreign exchange and gold 31 December 2015'?: BroadcastMedia;
    'Reserves of foreign exchange and gold 31 December 2014'?: BroadcastMedia;
    'Reserves of foreign exchange and gold 31 December 2013'?: BroadcastMedia;
}

export interface UnemploymentRate {
    'Unemployment rate 2021'?: BroadcastMedia;
    'Unemployment rate 2020'?: BroadcastMedia;
    'Unemployment rate 2019'?: BroadcastMedia;
    note?: string;
    'Unemployment rate 2017'?: BroadcastMedia;
    'Unemployment rate 2016'?: BroadcastMedia;
    'Unemployment rate 1998'?: BroadcastMedia;
    'Unemployment rate 2005'?: BroadcastMedia;
    'Unemployment rate 2011'?: BroadcastMedia;
    'Unemployment rate 2000'?: BroadcastMedia;
    'Unemployment rate 2010'?: BroadcastMedia;
    'Unemployment rate 2001'?: BroadcastMedia;
    'Unemployment rate 2004'?: BroadcastMedia;
    'Unemployment rate 2015'?: BroadcastMedia;
    'Unemployment rate 2012'?: BroadcastMedia;
    'Unemployment rate 2006'?: BroadcastMedia;
    text?: string;
    'Unemployment rate 2013'?: BroadcastMedia;
    'Unemployment rate 2008'?: BroadcastMedia;
    'Unemployment rate 2014'?: BroadcastMedia;
    'Unemployment rate 2002'?: BroadcastMedia;
    'Unemployment rate 1997'?: BroadcastMedia;
    'Unemployment rate 2018'?: BroadcastMedia;
    'Unemployment rate April 2011'?: BroadcastMedia;
}

export interface YouthUnemploymentRateAges1524 {
    total?: BroadcastMedia;
    male: BroadcastMedia;
    female: BroadcastMedia;
    note?: string;
    'total population'?: BroadcastMedia;
    definition?: BroadcastMedia;
}

export interface Energy {
    'Electricity access'?: ElectricityAccess;
    Electricity?: Electricity;
    'Electricity generation sources'?: ElectricityGenerationSources;
    Coal?: Coal;
    Petroleum?: Petroleum;
    'Refined petroleum products - production'?: BroadcastMedia;
    'Refined petroleum products - exports'?: BroadcastMedia;
    'Refined petroleum products - imports'?: BroadcastMedia;
    'Natural gas'?: Coal;
    'Carbon dioxide emissions'?: CarbonDioxideEmissions;
    'Energy consumption per capita'?: EnergyConsumptionPerCapita;
    'Electricity - production'?: BroadcastMedia;
    'Electricity - consumption'?: BroadcastMedia;
    'Electricity - exports'?: BroadcastMedia;
    'Electricity - imports'?: BroadcastMedia;
    'Electricity - installed generating capacity'?: BroadcastMedia;
    'Electricity - from fossil fuels'?: BroadcastMedia;
    'Electricity - from nuclear fuels'?: BroadcastMedia;
    'Electricity - from hydroelectric plants'?: BroadcastMedia;
    'Electricity - from other renewable sources'?: BroadcastMedia;
    'Crude oil - production'?: BroadcastMedia;
    'Crude oil - exports'?: BroadcastMedia;
    'Crude oil - imports'?: BroadcastMedia;
    'Crude oil - proved reserves'?: BroadcastMedia;
    'Refined petroleum products - consumption'?: BroadcastMedia;
    'Natural gas - production'?: BroadcastMedia;
    'Natural gas - consumption'?: BroadcastMedia;
    'Natural gas - exports'?: BroadcastMedia;
    'Natural gas - imports'?: BroadcastMedia;
    'Natural gas - proved reserves'?: BroadcastMedia;
    'Carbon dioxide emissions from consumption of energy'?: BroadcastMedia;
}

export interface CarbonDioxideEmissions {
    'total emissions'?: BroadcastMedia;
    'from coal and metallurgical coke'?: BroadcastMedia;
    'from petroleum and other liquids'?: BroadcastMedia;
    'from consumed natural gas'?: BroadcastMedia;
    text?: string;
}

export interface Coal {
    production: BroadcastMedia;
    consumption: BroadcastMedia;
    exports: BroadcastMedia;
    imports: BroadcastMedia;
    'proven reserves'?: BroadcastMedia;
    note?: string;
}

export interface Electricity {
    'installed generating capacity': BroadcastMedia;
    consumption: BroadcastMedia;
    exports: BroadcastMedia;
    imports: BroadcastMedia;
    'transmission/distribution losses': BroadcastMedia;
}

export interface ElectricityAccess {
    'electrification - total population': BroadcastMedia;
    'electrification - urban areas'?: BroadcastMedia;
    'electrification - rural areas'?: BroadcastMedia;
    note?: string;
    'population without electricity'?: BroadcastMedia;
}

export interface ElectricityGenerationSources {
    'fossil fuels': BroadcastMedia;
    nuclear: BroadcastMedia;
    solar: BroadcastMedia;
    wind: BroadcastMedia;
    hydroelectricity: BroadcastMedia;
    'tide and wave': BroadcastMedia;
    geothermal: BroadcastMedia;
    'biomass and waste': BroadcastMedia;
    note?: string;
}

export interface EnergyConsumptionPerCapita {
    'Total energy consumption per capita 2019': BroadcastMedia;
}

export interface Petroleum {
    'total petroleum production'?: BroadcastMedia;
    'refined petroleum consumption': BroadcastMedia;
    'crude oil and lease condensate exports'?: BroadcastMedia;
    'crude oil and lease condensate imports'?: BroadcastMedia;
    'crude oil estimated reserves'?: BroadcastMedia;
}

export interface Environment {
    'Environment - current issues': InternetCountryCode;
    'Environment - international agreements'?: EnvironmentInternationalAgreements;
    'Air pollutants'?: AirPollutants;
    Climate: InternetCountryCode;
    'Land use'?: LandUse;
    Urbanization?: Urbanization;
    'Revenue from forest resources'?: BroadcastMedia;
    'Revenue from coal'?: BroadcastMedia;
    'Waste and recycling'?: WasteAndRecycling;
    'Major watersheds (area sq km)'?: BroadcastMedia;
    'Major aquifers'?: BroadcastMedia;
    'Total water withdrawal'?: TotalWaterWithdrawal;
    'Total renewable water resources'?: InternetCountryCode;
    'Major rivers (by length in km)'?: BroadcastMedia;
    'Food insecurity'?: FoodInsecurity;
    'Major lakes (area sq km)'?: MajorLakesAreaSqKM;
    'Marine fisheries'?: BroadcastMedia;
}

export interface AirPollutants {
    'particulate matter emissions'?: BroadcastMedia;
    'carbon dioxide emissions'?: BroadcastMedia;
    'methane emissions'?: BroadcastMedia;
    note?: string;
}

export interface EnvironmentInternationalAgreements {
    'party to'?: BroadcastMedia;
    'signed, but not ratified'?: BroadcastMedia;
    text?: string;
}

export interface FoodInsecurity {
    'widespread lack of access'?: BroadcastMedia;
    'severe localized food insecurity'?: BroadcastMedia;
    'exceptional shortfall in aggregate food production/supplies'?: BroadcastMedia;
}

export interface LandUse {
    'agricultural land'?: BroadcastMedia;
    'agricultural land: arable land'?: BroadcastMedia;
    'agricultural land: permanent crops'?: BroadcastMedia;
    'agricultural land: permanent pasture'?: BroadcastMedia;
    forest?: BroadcastMedia;
    other?: BroadcastMedia;
    note?: string;
    'arable land / permanent crops / permanent pasture'?: BroadcastMedia;
}

export interface MajorLakesAreaSqKM {
    'fresh water lake(s)'?: BroadcastMedia;
    'salt water lake(s)'?: BroadcastMedia;
}

export interface TotalWaterWithdrawal {
    municipal: BroadcastMedia;
    industrial?: BroadcastMedia;
    agricultural?: BroadcastMedia;
    note?: string;
}

export interface Urbanization {
    'urban population'?: BroadcastMedia;
    'rate of urbanization': BroadcastMedia;
    note?: string;
}

export interface WasteAndRecycling {
    'municipal solid waste generated annually': BroadcastMedia;
    'municipal solid waste recycled annually'?: BroadcastMedia;
    'percent of municipal solid waste recycled'?: BroadcastMedia;
    note?: string;
}

export interface Geography {
    Location: BroadcastMedia;
    'Geographic coordinates'?: InternetCountryCode;
    'Map references': BroadcastMedia;
    Area: Area;
    'Area - comparative': BroadcastMedia;
    'Land boundaries'?: LandBoundaries;
    Coastline?: InternetCountryCode;
    'Maritime claims'?: MaritimeClaims;
    Climate: InternetCountryCode;
    Terrain?: BroadcastMedia;
    Elevation?: Elevation;
    'Natural resources'?: InternetCountryCode;
    'Land use'?: LandUse;
    'Irrigated land'?: InternetCountryCode;
    'Major watersheds (area sq km)'?: BroadcastMedia;
    'Major aquifers'?: BroadcastMedia;
    'Population distribution'?: InternetCountryCode;
    'Natural hazards'?: BroadcastMedia;
    'Geography - note'?: BroadcastMedia;
    'Major rivers (by length in km)'?: BroadcastMedia;
    'Major lakes (area sq km)'?: MajorLakesAreaSqKM;
    'Environment - current issues'?: BroadcastMedia;
    'Ocean volume'?: OceanVolume;
    'Major ocean currents'?: BroadcastMedia;
    Bathymetry?: Bathymetry;
}

export interface Area {
    total?: BroadcastMedia;
    land?: BroadcastMedia;
    water?: BroadcastMedia;
    note?: string;
    text?: string;
}

export interface Bathymetry {
    'continental shelf': BroadcastMedia;
    'continental slope': BroadcastMedia;
    'abyssal plains': BroadcastMedia;
    'mid-ocean ridge': BroadcastMedia;
    seamounts: BroadcastMedia;
    'ocean trenches': BroadcastMedia;
    atolls: BroadcastMedia;
}

export interface Elevation {
    'highest point': BroadcastMedia;
    'lowest point': BroadcastMedia;
    'mean elevation'?: BroadcastMedia;
    note?: string;
    'mean depth'?: BroadcastMedia;
    'ocean zones'?: BroadcastMedia;
}

export interface LandBoundaries {
    total?: BroadcastMedia;
    'border countries'?: BroadcastMedia;
    note?: string;
    text?: string;
    'regional borders'?: BroadcastMedia;
    'border sovereign base areas'?: BroadcastMedia;
    'metropolitan France - total'?: BroadcastMedia;
    'French Guiana - total'?: BroadcastMedia;
}

export interface MaritimeClaims {
    'territorial sea'?: BroadcastMedia;
    'contiguous zone'?: BroadcastMedia;
    'exclusive fishing zone'?: BroadcastMedia;
    'exclusive economic zone'?: BroadcastMedia;
    text?: string;
    'continental shelf'?: BroadcastMedia;
    note?: string;
    'Environment (Protection and Preservation) Zone'?: BroadcastMedia;
}

export interface OceanVolume {
    'ocean volume': BroadcastMedia;
    'percent of World Ocean total volume': BroadcastMedia;
}

export interface Government {
    'Country name'?: CountryName;
    'Government type'?: InternetCountryCode;
    Capital?: Capital;
    'Administrative divisions'?: InternetCountryCode;
    Independence?: InternetCountryCode;
    'National holiday'?: InternetCountryCode;
    Constitution?: Constitution;
    'Legal system'?: BroadcastMedia;
    'International law organization participation'?: BroadcastMedia;
    Citizenship?: Citizenship;
    Suffrage?: InternetCountryCode;
    'Executive branch'?: ExecutiveBranch;
    'Legislative branch'?: LegislativeBranch;
    'Judicial branch'?: JudicialBranch;
    'Political parties and leaders'?: InternetCountryCode;
    'International organization participation'?: InternetCountryCode;
    'Diplomatic representation in the US'?: DiplomaticRepresentationInTheUS;
    'Diplomatic representation from the US'?: DiplomaticRepresentationFromTheUS;
    'Flag description'?: InternetCountryCode;
    'National symbol(s)'?: BroadcastMedia;
    'National anthem'?: NationalAnthem;
    'National heritage'?: NationalHeritage;
    'Dependency status'?: InternetCountryCode;
    'Government - note'?: BroadcastMedia;
    'Dependent areas'?: InternetCountryCode;
    'Union name'?: UnionName;
    'Political structure'?: BroadcastMedia;
    'Member states'?: InternetCountryCode;
}

export interface Capital {
    name?: BroadcastMedia;
    'geographic coordinates'?: BroadcastMedia;
    'time difference': BroadcastMedia;
    etymology?: BroadcastMedia;
    'daylight saving time'?: BroadcastMedia;
    note?: string;
    'time zone note'?: BroadcastMedia;
}

export interface Citizenship {
    'citizenship by birth'?: BroadcastMedia;
    'citizenship by descent only'?: BroadcastMedia;
    'dual citizenship recognized'?: BroadcastMedia;
    'residency requirement for naturalization'?: BroadcastMedia;
    text?: string;
    note?: string;
}

export interface Constitution {
    history: BroadcastMedia;
    amendments?: BroadcastMedia;
    note?: string;
}

export interface CountryName {
    'conventional long form'?: BroadcastMedia;
    'conventional short form'?: BroadcastMedia;
    'local long form'?: BroadcastMedia;
    'local short form'?: BroadcastMedia;
    etymology?: BroadcastMedia;
    former?: BroadcastMedia;
    note?: string;
    abbreviation?: BroadcastMedia;
    'official long form'?: BroadcastMedia;
    'official short form'?: BroadcastMedia;
}

export interface DiplomaticRepresentationFromTheUS {
    'chief of mission'?: BroadcastMedia;
    embassy?: BroadcastMedia;
    'mailing address'?: BroadcastMedia;
    telephone?: BroadcastMedia;
    FAX?: BroadcastMedia;
    'email address and website'?: BroadcastMedia;
    'branch office(s)'?: BroadcastMedia;
    'consulate(s) general'?: BroadcastMedia;
    note?: string;
    text?: string;
    'consulate(s)'?: BroadcastMedia;
    'other offices'?: BroadcastMedia;
}

export interface DiplomaticRepresentationInTheUS {
    'chief of mission'?: BroadcastMedia;
    chancery?: BroadcastMedia;
    telephone?: BroadcastMedia;
    FAX?: BroadcastMedia;
    'email address and website'?: BroadcastMedia;
    'consulate(s) general'?: BroadcastMedia;
    'consulate(s)'?: BroadcastMedia;
    'representative office'?: BroadcastMedia;
    text?: string;
    note?: string;
    embassy?: BroadcastMedia;
    'honorary consulate(s)'?: BroadcastMedia;
    'HKETO offices'?: BroadcastMedia;
    'Taipei Economic and Cultural Offices (branch offices)'?: BroadcastMedia;
    'trade office(s)'?: BroadcastMedia;
}

export interface ExecutiveBranch {
    'chief of state'?: BroadcastMedia;
    'head of government'?: BroadcastMedia;
    cabinet?: BroadcastMedia;
    'elections/appointments'?: BroadcastMedia;
    'election results'?: BroadcastMedia;
    note?: string;
    'state counsellor'?: BroadcastMedia;
    text?: string;
}

export interface JudicialBranch {
    'highest court(s)': BroadcastMedia;
    'judge selection and term of office'?: BroadcastMedia;
    'subordinate courts'?: BroadcastMedia;
    note?: string;
}

export interface LegislativeBranch {
    description: BroadcastMedia;
    elections?: BroadcastMedia;
    'election results'?: BroadcastMedia;
    note?: string;
}

export interface NationalAnthem {
    name?: BroadcastMedia;
    'lyrics/music'?: BroadcastMedia;
    note?: string;
    text?: string;
}

export interface NationalHeritage {
    'total World Heritage Sites': BroadcastMedia;
    'selected World Heritage Site locales': BroadcastMedia;
    note?: string;
}

export interface UnionName {
    'conventional long form': BroadcastMedia;
    abbreviation: BroadcastMedia;
}

export interface Introduction {
    Background: BroadcastMedia;
    'Preliminary statement'?: BroadcastMedia;
}

export interface MilitaryAndSecurity {
    'Military and security forces'?: InternetCountryCode;
    'Military expenditures'?: MilitaryExpenditures;
    'Military and security service personnel strengths'?: InternetCountryCode;
    'Military equipment inventories and acquisitions'?: InternetCountryCode;
    'Military service age and obligation'?: InternetCountryCode;
    'Military - note'?: BroadcastMedia;
    'Military deployments'?: InternetCountryCode;
    'Maritime threats'?: BroadcastMedia;
}

export interface MilitaryExpenditures {
    'Military Expenditures 2022'?: BroadcastMedia;
    'Military Expenditures 2021'?: BroadcastMedia;
    'Military Expenditures 2020'?: BroadcastMedia;
    'Military Expenditures 2019'?: BroadcastMedia;
    'Military Expenditures 2018'?: BroadcastMedia;
    'Military Expenditures 2017'?: BroadcastMedia;
    'Military Expenditures 2016'?: BroadcastMedia;
    'Military Expenditures 2015'?: BroadcastMedia;
    text?: string;
    note?: string;
    'Military Expenditures 2023'?: BroadcastMedia;
}

export interface PeopleAndSociety {
    Population?: InternetCountryCode;
    Nationality?: Nationality;
    'Ethnic groups'?: InternetCountryCode;
    Languages?: Languages;
    Religions?: InternetCountryCode;
    'Demographic profile'?: BroadcastMedia;
    'Age structure'?: AgeStructure;
    'Dependency ratios'?: DependencyRatios;
    'Median age'?: YouthUnemploymentRateAges1524;
    'Population growth rate'?: InternetCountryCode;
    'Birth rate'?: InternetCountryCode;
    'Death rate'?: InternetCountryCode;
    'Net migration rate'?: InternetCountryCode;
    'Population distribution'?: InternetCountryCode;
    Urbanization?: Urbanization;
    'Major urban areas - population'?: InternetCountryCode;
    'Sex ratio'?: SexRatio;
    'Maternal mortality ratio'?: InternetCountryCode;
    'Infant mortality rate'?: YouthUnemploymentRateAges1524;
    'Life expectancy at birth'?: YouthUnemploymentRateAges1524;
    'Total fertility rate'?: InternetCountryCode;
    'Gross reproduction rate'?: BroadcastMedia;
    'Contraceptive prevalence rate'?: InternetCountryCode;
    'Drinking water source'?: DrinkingWaterSource;
    'Current health expenditure'?: InternetCountryCode;
    'Physicians density'?: InternetCountryCode;
    'Hospital bed density'?: InternetCountryCode;
    'Sanitation facility access'?: DrinkingWaterSource;
    'Major infectious diseases'?: MajorInfectiousDiseases;
    'Obesity - adult prevalence rate'?: InternetCountryCode;
    'Alcohol consumption per capita'?: AlcoholConsumptionPerCapita;
    'Tobacco use'?: YouthUnemploymentRateAges1524;
    'Children under the age of 5 years underweight'?: InternetCountryCode;
    'Currently married women (ages 15-49)'?: InternetCountryCode;
    'Child marriage'?: ChildMarriage;
    'Education expenditures'?: InternetCountryCode;
    Literacy?: YouthUnemploymentRateAges1524;
    'Youth unemployment rate (ages 15-24)'?: YouthUnemploymentRateAges1524;
    "Mother's mean age at first birth"?: InternetCountryCode;
    'School life expectancy (primary to tertiary education)'?: YouthUnemploymentRateAges1524;
    'HIV/AIDS - adult prevalence rate'?: BroadcastMedia;
    'HIV/AIDS - people living with HIV/AIDS'?: BroadcastMedia;
    'HIV/AIDS - deaths'?: BroadcastMedia;
    'People - note'?: BroadcastMedia;
}

export interface AgeStructure {
    '0-14 years': BroadcastMedia;
    '15-64 years'?: BroadcastMedia;
    '65 years and over': BroadcastMedia;
    note?: string;
    '15-24 years'?: BroadcastMedia;
    '25-54 years'?: BroadcastMedia;
    '55-64 years'?: BroadcastMedia;
}

export interface AlcoholConsumptionPerCapita {
    total: BroadcastMedia;
    beer: BroadcastMedia;
    wine: BroadcastMedia;
    spirits: BroadcastMedia;
    'other alcohols': BroadcastMedia;
}

export interface ChildMarriage {
    'women married by age 15'?: BroadcastMedia;
    'women married by age 18': BroadcastMedia;
    'men married by age 18'?: BroadcastMedia;
    note?: string;
}

export interface DependencyRatios {
    'total dependency ratio': BroadcastMedia;
    'youth dependency ratio': BroadcastMedia;
    'elderly dependency ratio': BroadcastMedia;
    'potential support ratio': BroadcastMedia;
    note?: string;
}

export interface DrinkingWaterSource {
    'improved: urban'?: BroadcastMedia;
    'improved: rural'?: BroadcastMedia;
    'improved: total'?: BroadcastMedia;
    'unimproved: urban'?: BroadcastMedia;
    'unimproved: rural'?: BroadcastMedia;
    'unimproved: total'?: BroadcastMedia;
    note?: string;
}

export interface Languages {
    Languages?: BroadcastMedia;
    'major-language sample(s)'?: BroadcastMedia;
    text?: string;
    note?: string;
}

export interface MajorInfectiousDiseases {
    text?: string;
    'degree of risk'?: BroadcastMedia;
    'food or waterborne diseases'?: BroadcastMedia;
    'vectorborne diseases'?: BroadcastMedia;
    'water contact diseases'?: BroadcastMedia;
    'animal contact diseases'?: BroadcastMedia;
    note?: string;
    'respiratory diseases'?: BroadcastMedia;
    'aerosolized dust or soil contact diseases'?: BroadcastMedia;
    'soil contact diseases'?: BroadcastMedia;
}

export interface Nationality {
    noun: BroadcastMedia;
    adjective: BroadcastMedia;
    note?: string;
}

export interface SexRatio {
    'at birth'?: BroadcastMedia;
    '0-14 years'?: BroadcastMedia;
    '15-64 years'?: BroadcastMedia;
    '65 years and over'?: BroadcastMedia;
    'total population'?: BroadcastMedia;
    note?: string;
    '15-24 years'?: BroadcastMedia;
    '25-54 years'?: BroadcastMedia;
    '55-64 years'?: BroadcastMedia;
    text?: string;
}

export interface Terrorism {
    'Terrorist group(s)'?: InternetCountryCode;
}

export interface TransnationalIssues {
    'Disputes - international'?: InternetCountryCode;
    'Refugees and internally displaced persons'?: RefugeesAndInternallyDisplacedPersons;
    'Trafficking in persons'?: TraffickingInPersons;
    'Illicit drugs'?: BroadcastMedia;
}

export interface RefugeesAndInternallyDisplacedPersons {
    'refugees (country of origin)'?: BroadcastMedia;
    IDPs?: BroadcastMedia;
    'stateless persons'?: BroadcastMedia;
    note?: string;
}

export interface TraffickingInPersons {
    'tier rating': BroadcastMedia;
    'trafficking profile': BroadcastMedia;
    note?: string;
}

export interface Transportation {
    'National air transport system'?: NationalAirTransportSystem;
    'Civil aircraft registration country code prefix'?: BroadcastMedia;
    Airports?: Airports;
    'Airports - with paved runways'?: AirportsWithPavedRunways;
    'Airports - with unpaved runways'?: AirportsWithUnpavedRunways;
    Heliports?: InternetCountryCode;
    Pipelines?: BroadcastMedia;
    Railways?: Railways;
    Roadways?: Roadways;
    'Merchant marine'?: MerchantMarine;
    'Ports and terminals'?: PortsAndTerminals;
    Waterways?: BroadcastMedia;
    'Transportation - note'?: BroadcastMedia;
    Icebreakers?: BroadcastMedia;
}

export interface Airports {
    text?: string;
    'Midway Islands'?: BroadcastMedia;
    note?: string;
}

export interface AirportsWithPavedRunways {
    text?: string;
    note?: string;
    total?: BroadcastMedia;
    '2,438 to 3,047 m'?: BroadcastMedia;
}

export interface AirportsWithUnpavedRunways {
    text?: string;
    note?: string;
    total?: BroadcastMedia;
    '1,524 to 2,437 m'?: BroadcastMedia;
    '914 to 1,523 m'?: BroadcastMedia;
    'under 914 m'?: BroadcastMedia;
}

export interface MerchantMarine {
    total: BroadcastMedia;
    'by type': BroadcastMedia;
    note?: string;
}

export interface NationalAirTransportSystem {
    'number of registered air carriers'?: BroadcastMedia;
    'inventory of registered aircraft operated by air carriers'?: BroadcastMedia;
    'annual passenger traffic on registered air carriers'?: BroadcastMedia;
    'annual freight traffic on registered air carriers'?: BroadcastMedia;
}

export interface PortsAndTerminals {
    'major seaport(s)'?: BroadcastMedia;
    'LNG terminal(s) (export)'?: BroadcastMedia;
    'LNG terminal(s) (import)'?: BroadcastMedia;
    'lake port(s)'?: BroadcastMedia;
    'oil terminal(s)'?: BroadcastMedia;
    'river port(s)'?: BroadcastMedia;
    note?: string;
    'river or lake port(s)'?: BroadcastMedia;
    'container port(s) (TEUs)'?: BroadcastMedia;
    text?: string;
    'Saint Helena'?: BroadcastMedia;
    'Ascension Island'?: BroadcastMedia;
    'Tristan da Cunha'?: BroadcastMedia;
    'dry bulk cargo port(s)'?: BroadcastMedia;
    'cruise port(s)'?: BroadcastMedia;
    'bulk cargo port(s)'?: BroadcastMedia;
    'major port(s)'?: BroadcastMedia;
    'cruise/ferry port(s)'?: BroadcastMedia;
    'river and lake port(s)'?: BroadcastMedia;
    'cargo ports'?: BroadcastMedia;
    'cruise departure ports (passengers)'?: BroadcastMedia;
}

export interface Railways {
    total?: BroadcastMedia;
    'narrow gauge'?: BroadcastMedia;
    note?: string;
    'standard gauge'?: BroadcastMedia;
    other?: BroadcastMedia;
    'dual gauge'?: BroadcastMedia;
    'broad gauge'?: BroadcastMedia;
    text?: string;
}

export interface Roadways {
    total?: BroadcastMedia;
    paved?: BroadcastMedia;
    unpaved?: BroadcastMedia;
    note?: string;
    urban?: BroadcastMedia;
    'non-urban'?: BroadcastMedia;
    text?: string;
    'government control'?: BroadcastMedia;
    'Turkish Cypriot control'?: BroadcastMedia;
    highways?: BroadcastMedia;
    'private and forest roads'?: BroadcastMedia;
    'paved/oiled gravel'?: BroadcastMedia;
}
