import axios from 'axios';

const REQUEST_URL = `${process.env.CLIMATE_WATCH_API_URL}/emissions`;

const QUERIES = {
  meta: '/meta',
  gas: '?gas={gas}&location={adm0}&source={source}'
};

export const getMeta = () => {
  const url = REQUEST_URL + QUERIES.meta;
  return axios.get(url);
};

export const getGas = ({ country, gas, source }) => {
  const url =
    REQUEST_URL +
    QUERIES.gas
      .replace('{adm0}', country)
      .replace('{gas}', gas)
      .replace('{source}', source);
  return axios.get(url);
};
