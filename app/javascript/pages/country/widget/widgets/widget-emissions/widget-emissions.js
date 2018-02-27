import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import actions from './widget-emissions-actions';
import reducers, { initialState } from './widget-emissions-reducers';
import {
  getChartData,
  chartConfig,
  getSentence
} from './widget-emissions-selectors';
import WidgetEmissionsComponent from './widget-emissions-component';

const mapStateToProps = ({ widgetEmissions }, ownProps) => {
  const { settings, data } = widgetEmissions;
  const { locationNames, colors } = ownProps;
  const selectorData = {
    data,
    settings,
    locationNames,
    colors
  };
  return {
    chartData: getChartData(selectorData),
    chartConfig: chartConfig(selectorData),
    sentence: getSentence(selectorData)
  };
};

class WidgetEmissionsContainer extends PureComponent {
  componentWillMount() {
    const { location, getEmissions } = this.props;
    getEmissions({ ...location });
  }

  componentWillReceiveProps(nextProps) {
    const { location, getEmissions } = nextProps;

    if (!isEqual(location.country, this.props.location.country)) {
      getEmissions({ ...location });
    }
  }

  render() {
    return createElement(WidgetEmissionsComponent, {
      ...this.props
    });
  }
}

WidgetEmissionsContainer.propTypes = {
  location: PropTypes.object.isRequired,
  getEmissions: PropTypes.func.isRequired
};

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(WidgetEmissionsContainer);
