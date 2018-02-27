import axios from 'axios';

const DATASET = process.env.COUNTRIES_PAGE_DATASET;
const REQUEST_URL = `${process.env.GFW_API_HOST_PROD}/query/${DATASET}?sql=`;
const CARTO_REQUEST_URL = `${process.env.CARTO_API_URL}/sql?q=`;

const SQL_QUERIES = {
  getCountryWhitelist:
    "SELECT polyname, SUM(area_extent_2000) as total_extent_2000, SUM(area_extent) as total_extent_2010, SUM(area_gain) as total_gain, SUM(year_data.area_loss) as total_loss FROM data WHERE thresh = 0 AND iso = '{iso}' GROUP BY polyname",
  getRegionWhitelist:
    'SELECT polyname, SUM(area_extent_2000) as total_extent_2000, SUM(area_extent) as total_extent_2010, SUM(area_gain) as total_gain, SUM(year_data.area_loss) as total_loss FROM data WHERE thresh = 0 AND {location} GROUP BY polyname',
  getWaterBodiesWhitelist: 'SELECT iso, adm1, adm2 from water_bodies_gadm28'
};

const getLocationQuery = (country, region, subRegion) =>
  `iso = '${country}'${region ? ` AND adm1 = ${region}` : ''}${
    subRegion ? ` AND adm2 = ${subRegion}` : ''
  }`;

export const getCountryWhitelistProvider = admin0 => {
  const url = `${REQUEST_URL}${SQL_QUERIES.getCountryWhitelist}`.replace(
    '{iso}',
    admin0
  );
  return axios.get(url);
};

export const getRegionWhitelistProvider = (admin0, admin1, admin2) => {
  const url = `${REQUEST_URL}${SQL_QUERIES.getRegionWhitelist}`.replace(
    '{location}',
    getLocationQuery(admin0, admin1, admin2)
  );
  return axios.get(url);
};

export const getWaterBodiesBlacklistProvider = () => {
  const url = `${CARTO_REQUEST_URL}${SQL_QUERIES.getWaterBodiesWhitelist}`;
  return axios.get(url);
};
