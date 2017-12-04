import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

import Loader from 'components/loader/loader';
import WidgetHeader from 'pages/country/widgets/widget-header';
import WidgetPaginate from 'pages/country/widgets/widget-paginate';
import WidgetTreeLocatedSettings from './widget-tree-located-settings-component';
import './widget-tree-located-styles.scss';

class WidgetTreeLocated extends PureComponent {
  componentWillMount() {
    this.props.setInitialData(this.props);
  }

  componentWillUpdate(nextProps) {
    const { isMetaLoading, settings, updateData, setInitialData } = this.props;

    if (!nextProps.isMetaLoading && isMetaLoading) {
      setInitialData(nextProps);
    }

    if (JSON.stringify(settings) !== JSON.stringify(nextProps.settings)) {
      updateData(nextProps);
    }
  }

  render() {
    const {
      locationNames,
      isLoading,
      topRegions,
      dataSources,
      units,
      canopies,
      settings,
      paginate,
      nextPage,
      previousPage,
      setTreeLocatedSettingsDataSource,
      setTreeLocatedSettingsUnit,
      setTreeLocatedSettingsCanopy
    } = this.props;

    const paginateFrom = paginate.page * paginate.limit - paginate.limit;
    const paginateTo = paginateFrom + paginate.limit;

    return (
      <div className="c-widget c-widget-tree-located">
        <WidgetHeader
          title={`Where are the forest located in ${locationNames.country &&
            locationNames.country.label}`}
          noMap
          shareAnchor={'tree-located'}
        >
          <WidgetTreeLocatedSettings
            type="settings"
            dataSources={dataSources}
            units={units}
            canopies={canopies}
            settings={settings}
            onDataSourceChange={setTreeLocatedSettingsDataSource}
            onUnitChange={setTreeLocatedSettingsUnit}
            onCanopyChange={setTreeLocatedSettingsCanopy}
          />
        </WidgetHeader>
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <ul className="c-widget-tree-located__regions">
              {topRegions.slice(paginateFrom, paginateTo).map(item => (
                <li key={item.value}>
                  <div className="c-widget-tree-located__region-bubble">
                    {item.position}
                  </div>
                  <div className="c-widget-tree-located__region-name">
                    {item.name}
                  </div>
                  <div className="c-widget-tree-located__region-value">
                    {settings.unit === 'ha'
                      ? `${numeral(Math.round(item.value / 1000)).format(
                        '0,0'
                      )} ha`
                      : `${Math.round(item.value)} %`}
                  </div>
                </li>
              ))}
            </ul>
            <WidgetPaginate
              paginate={paginate}
              count={topRegions.length}
              onClickNextPage={nextPage}
              onClickPreviousPage={previousPage}
            />
          </div>
        )}
      </div>
    );
  }
}

WidgetTreeLocated.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isMetaLoading: PropTypes.bool.isRequired,
  locationNames: PropTypes.object,
  topRegions: PropTypes.array.isRequired,
  dataSources: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  units: PropTypes.array.isRequired,
  canopies: PropTypes.array.isRequired,
  paginate: PropTypes.object.isRequired,
  setInitialData: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
  setTreeLocatedSettingsDataSource: PropTypes.func.isRequired,
  setTreeLocatedSettingsUnit: PropTypes.func.isRequired,
  setTreeLocatedSettingsCanopy: PropTypes.func.isRequired
};

export default WidgetTreeLocated;
