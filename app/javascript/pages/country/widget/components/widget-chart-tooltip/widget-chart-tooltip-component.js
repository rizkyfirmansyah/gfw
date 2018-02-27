import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './widget-chart-tooltip-styles.scss';

class WidgetChartTooltip extends PureComponent {
  render() {
    const { payload, settings, hideZeros } = this.props;
    const values = payload && payload.length > 0 && payload[0].payload;

    return (
      <div>
        {settings &&
          settings.length && (
            <div className="c-widget-chart-tooltip">
              {settings.map(
                d =>
                  (hideZeros && !values[d.key] ? null : (
                    <div key={d.key} className="data-line">
                      {d.label && (
                        <div className="data-label">
                          {d.color && (
                            <div
                              className="data-color"
                              style={{ backgroundColor: d.color }}
                            />
                          )}
                          {<span>{values[d.label] || d.label}</span>}
                        </div>
                      )}
                      {d.unit && d.unitFormat
                        ? `${d.unitFormat(values[d.key])}${d.unit}`
                        : values[d.key]}
                    </div>
                  ))
              )}
            </div>
          )}
      </div>
    );
  }
}

WidgetChartTooltip.propTypes = {
  payload: PropTypes.array,
  settings: PropTypes.array,
  hideZeros: PropTypes.bool
};

export default WidgetChartTooltip;
