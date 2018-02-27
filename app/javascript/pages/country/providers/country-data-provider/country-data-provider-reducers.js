export const initialState = {
  isCountriesLoading: false,
  isRegionsLoading: false,
  isSubRegionsLoading: false,
  isGeostoreLoading: false,
  countries: [],
  gadmCountries: [],
  faoCountries: [],
  regions: [],
  subRegions: [],
  countryLinks: {},
  geostore: {
    hash: '',
    areaHa: 0,
    bounds: []
  }
};

const mapLocations = locations => {
  const locationsMapped = [];
  locations.forEach(location => {
    if (location.iso || location.id > 0) {
      locationsMapped.push({
        label: location.name,
        value: location.iso || location.id
      });
    }
  });
  return locationsMapped;
};

const setCountriesLoading = (state, { payload }) => ({
  ...state,
  isCountriesLoading: payload
});

const setRegionsLoading = (state, { payload }) => ({
  ...state,
  isRegionsLoading: payload
});

const setSubRegionsLoading = (state, { payload }) => ({
  ...state,
  isSubRegionsLoading: payload
});

const setGeostoreLoading = (state, { payload }) => ({
  ...state,
  isGeostoreLoading: payload
});

const setCountries = (state, { payload }) => ({
  ...state,
  countries: mapLocations(payload)
});

const setGadmCountries = (state, { payload }) => ({
  ...state,
  gadmCountries: mapLocations(payload)
});

const setFAOCountries = (state, { payload }) => ({
  ...state,
  faoCountries: mapLocations(payload)
});

const setRegions = (state, { payload }) => ({
  ...state,
  regions: mapLocations(payload)
});

const setSubRegions = (state, { payload }) => ({
  ...state,
  subRegions: mapLocations(payload)
});

const setCountryLinks = (state, { payload }) => ({
  ...state,
  isCountryLinksLoading: false,
  countryLinks: payload
});

const setGeostore = (state, { payload }) => ({
  ...state,
  geostore: {
    ...payload
  }
});

export default {
  setCountriesLoading,
  setRegionsLoading,
  setSubRegionsLoading,
  setGeostoreLoading,
  setCountries,
  setFAOCountries,
  setGadmCountries,
  setRegions,
  setSubRegions,
  setGeostore,
  setCountryLinks
};
