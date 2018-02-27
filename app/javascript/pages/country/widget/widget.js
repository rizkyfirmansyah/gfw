import { connect } from 'react-redux';
import upperFirst from 'lodash/upperFirst';
import COLORS from 'pages/country/data/colors.json';

import * as widgetSelectors from 'pages/country/widget/widget-selectors';
import Component from './widget-component';
import actions from './widget-actions';

const mapStateToProps = (state, ownProps) => {
  const { location, countryData, whitelists } = state;
  const { title, config, settings, loading, data, error } = state[
    `widget${upperFirst(ownProps.widget)}`
  ];
  const {
    isCountriesLoading,
    isRegionsLoading,
    isSubRegionsLoading,
    isGeostoreLoading
  } = countryData;
  const {
    countryWhitelistLoading,
    regionWhitelistLoading,
    waterBodiesLoading
  } = whitelists;
  const adminData = {
    location: location.payload,
    countries: countryData.countries,
    regions: countryData.regions,
    subRegions: countryData.subRegions
  };
  const options = {};
  if (config.selectors) {
    config.selectors.forEach(selector => {
      const selectorFunc = widgetSelectors[`get${upperFirst(selector)}`];
      switch (selector) {
        case 'indicators':
          options[selector] = selectorFunc({
            config,
            location: location.payload,
            ...countryData,
            ...whitelists
          });
          break;
        case 'years':
        case 'units':
          options[selector] = selectorFunc({
            config,
            ...settings
          });
          break;
        case 'startYears':
        case 'endYears':
          options[selector] = selectorFunc({
            config,
            data: data.loss || (data.regions && data.regions[0].loss),
            ...settings
          });
          break;
        default:
          options[selector] = selectorFunc();
      }
    });
  }

  return {
    isMetaLoading:
      isCountriesLoading ||
      isRegionsLoading ||
      isSubRegionsLoading ||
      countryWhitelistLoading ||
      regionWhitelistLoading ||
      waterBodiesLoading,
    isGeostoreLoading,
    locationNames: widgetSelectors.getAdminsSelected(adminData),
    activeLocation: widgetSelectors.getActiveAdmin({
      location: location.payload
    }),
    activeIndicator:
      settings &&
      settings.indicator &&
      widgetSelectors.getActiveIndicator(settings.indicator),
    location: location.payload,
    query: location.query,
    whitelist: location.payload.region
      ? whitelists.regionWhitelist
      : whitelists.countryWhitelist,
    title,
    loading,
    error,
    data,
    colors: COLORS[config.colors || config.type] || COLORS,
    settingsConfig: {
      config,
      settings,
      options,
      loading
    }
  };
};

export default connect(mapStateToProps, actions)(Component);
