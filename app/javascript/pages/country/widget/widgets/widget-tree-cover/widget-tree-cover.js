import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import actions from './widget-tree-cover-actions';
import reducers, { initialState } from './widget-tree-cover-reducers';
import { getTreeCoverData, getSentence } from './widget-tree-cover-selectors';
import WidgetTreeCoverComponent from './widget-tree-cover-component';

const mapStateToProps = (
  { widgetTreeCover, countryData, whitelists },
  ownProps
) => {
  const { isCountriesLoading, isRegionsLoading, regions } = countryData;
  const { settings, loading, data } = widgetTreeCover;
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
    parsedData: getTreeCoverData(selectorData),
    sentence: getSentence(selectorData)
  };
};

class WidgetTreeCoverContainer extends PureComponent {
  componentDidMount() {
    const { location, settings, getTreeCover } = this.props;
    getTreeCover({
      ...location,
      ...settings
    });
  }

  componentWillReceiveProps(nextProps) {
    const { settings, getTreeCover, location } = nextProps;

    if (
      !isEqual(location, this.props.location) ||
      !isEqual(settings, this.props.settings)
    ) {
      getTreeCover({
        ...location,
        ...settings
      });
    }
  }

  render() {
    return createElement(WidgetTreeCoverComponent, {
      ...this.props
    });
  }
}

WidgetTreeCoverContainer.propTypes = {
  settings: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  getTreeCover: PropTypes.func.isRequired
};

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(WidgetTreeCoverContainer);
