import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { format } from 'd3-format';

import './widget-pie-chart-legend-styles.scss';

class WidgetPieChartLegend extends PureComponent {
  render() {
    const { data, config, className } = this.props;
    let sizeClass = '';
    if (data.length > 5) {
      sizeClass = 'x-small';
    } else if (data.length > 3) {
      sizeClass = 'small';
    }

    return (
      <ul className={`c-pie-chart-legend ${className} ${sizeClass}`}>
        {data.map((item, index) => {
          const value = `${format(config.format)(item[config.key])}${
            config.unit
          }`;
          return (
            <li className="legend-item" key={index.toString()}>
              <div className="legend-title">
                <span style={{ backgroundColor: item.color }}>{}</span>
                <p>
                  {item.label}
                  {data.length > 5 && ` - ${value}`}
                </p>
              </div>
              <div className="legend-value" style={{ color: item.color }}>
                {value}
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

WidgetPieChartLegend.propTypes = {
  data: PropTypes.array,
  config: PropTypes.object,
  className: PropTypes.string
};

WidgetPieChartLegend.defaultProps = {
  config: {
    unit: '',
    key: 'value',
    format: '.3s'
  }
};

export default WidgetPieChartLegend;
