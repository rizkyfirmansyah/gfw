import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import actions from './widget-primary-tree-cover-actions';
import reducers, { initialState } from './widget-primary-tree-cover-reducers';
import {
  getPrimaryTreeCoverData,
  getSentence
} from './widget-primary-tree-cover-selectors';
import WidgetPrimaryTreeCoverComponent from './widget-primary-tree-cover-component';

const mapStateToProps = (
  { widgetPrimaryTreeCover, countryData, whitelists },
  ownProps
) => {
  const { isCountriesLoading, isRegionsLoading, regions } = countryData;
  const { settings, loading, data } = widgetPrimaryTreeCover;
  const { colors, locationNames, activeIndicator } = ownProps;
  const selectorData = {
    data,
    settings,
    whitelist: whitelists.countryWhitelist,
    locationNames,
    activeIndicator,
    colors
  };

  return {
    loading: loading || isCountriesLoading || isRegionsLoading,
    regions,
    data,
    parsedData: getPrimaryTreeCoverData(selectorData),
    sentence: getSentence(selectorData)
  };
};

class WidgetPrimaryTreeCoverContainer extends PureComponent {
  componentDidMount() {
    const { location, settings, getPrimaryTreeCover } = this.props;
    getPrimaryTreeCover({
      ...location,
      ...settings
    });
  }

  componentWillReceiveProps(nextProps) {
    const { settings, getPrimaryTreeCover, location } = nextProps;

    if (
      !isEqual(location, this.props.location) ||
      !isEqual(settings, this.props.settings)
    ) {
      getPrimaryTreeCover({
        ...location,
        ...settings
      });
    }
  }

  render() {
    return createElement(WidgetPrimaryTreeCoverComponent, {
      ...this.props
    });
  }
}

WidgetPrimaryTreeCoverContainer.propTypes = {
  settings: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  getPrimaryTreeCover: PropTypes.func.isRequired
};

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(
  WidgetPrimaryTreeCoverContainer
);
