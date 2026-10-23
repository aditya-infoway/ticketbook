import { Country, State, City } from "country-state-city";

export const businessTypes = [
  { id: "Manufacturing", label: "Manufacturing" },
  { id: "Retail", label: "Retail" },
  { id: "Wholesale", label: "Wholesale" },
  { id: "Service", label: "Service" },
  { id: "Other", label: "Other" },
];

export const employeeSizes = [
  { id: "1-10", label: "1-10 Employees" },
  { id: "11-50", label: "11-50 Employees" },
  { id: "51-100", label: "51-100 Employees" },
  { id: "101-500", label: "101-500 Employees" },
  { id: "500+", label: "500+ Employees" },
];

export const countries = Country.getAllCountries().map((c) => ({
  id: c.isoCode,
  label: c.name,
}));

export function getStatesByCountry(countryIsoCode: string) {
  return State.getStatesOfCountry(countryIsoCode).map((s) => ({
    id: s.isoCode,
    label: s.name,
  }));
}

// District dropdown — dynamic, library ke City data se
export function getDistrictsByState(countryIsoCode: string, stateIsoCode: string) {
  return City.getCitiesOfState(countryIsoCode, stateIsoCode).map((c) => ({
    id: c.name.toLowerCase().replace(/\s+/g, "-"),
    label: c.name,
  }));
}

// Taluka — library me data nahi hai, isliye same city list reuse kar rahe hain
// (district-level granularity se aage library kuch nahi deti)
export function getTalukasByDistrict(countryIsoCode: string, stateIsoCode: string) {
  return getDistrictsByState(countryIsoCode, stateIsoCode);
}