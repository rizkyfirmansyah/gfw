import { createElement } from 'react';
import { connect } from 'react-redux';

import WidgetAreasMostCoverGainComponent from './widget-areas-most-cover-gain-component';
import actions from './widget-areas-most-cover-gain-actions';

export { initialState } from './widget-areas-most-cover-gain-reducers';
export { default as reducers } from './widget-areas-most-cover-gain-reducers';
export { default as actions } from './widget-areas-most-cover-gain-actions';

const mapStateToProps = state => ({
  isLoading: state.widgetAreasMostCoverGain.isLoading,
  iso: state.root.iso,
  countryRegions: state.root.countryRegions,
  countryData: state.root.countryData,
  areaData: state.widgetAreasMostCoverGain.areaData,
  areaChartData: state.widgetAreasMostCoverGain.areaChartData,
  paginate: state.widgetAreasMostCoverGain.paginate,
  locations: state.widgetAreasMostCoverGain.locations,
  units: state.widgetAreasMostCoverGain.units,
  settings: state.widgetAreasMostCoverGain.settings
});

import {
  getTreeCoverGainRegion,
  getTotalCountriesTreeCoverGain
} from '../../../../services/tree-gain';

const colors = ['#110f74', '#2422a2', '#4c49d1', '#6f6de9', '#a3a1ff', '#cdcdfe', '#ddddfc', '#e7e5a4', '#dad781', '#cecb65', '#d1d1d1'];

const WidgetAreasMostCoverGainContainer = (props) => {

  const updateData = (props) => {
    props.setAreasMostCoverIsLoading(true);
    setWidgetData(props);
  };

  const setInitialData = (props) => {
    setWidgetData(props);
  };

  const setWidgetData = (props) => {
    getTotalCountriesTreeCoverGain({minYear: props.settings.startYear, maxYear: props.settings.endYear}, props.settings.canopy)
      .then((totalCoverGain) => {
        getTreeCoverGainRegion(
          props.iso,
          {minYear: props.settings.startYear, maxYear: props.settings.endYear},
          props.settings.canopy
        )
          .then((treeCoverGainByRegion) => {
            const regionsCoverGain = [];
            const regionCoverGainChart = [];

            let indexColors = 0;
            let othersValue = 0;
            treeCoverGainByRegion.data.data.forEach(function(item, index){
              const numberRegion = _.findIndex(
                props.countryRegions,
                (x) => x.id === item.adm1
              );

              regionsCoverGain.push({
                name: props.countryRegions[numberRegion].name,
                value: item.value,
                color: colors[indexColors],
                position: index + 1,
              });

              if (indexColors < props.paginate.limit) {
                regionCoverGainChart.push({
                  name: props.countryRegions[numberRegion].name,
                  color: colors[indexColors],
                  value: props.settings.unit === 'Ha' ? item.value : (item.value / totalCoverGain.data.data[0].value) * 100,
                });
                indexColors += 1;
              } else if (index === treeCoverGainByRegion.data.data.length - 1) {
                regionCoverGainChart.push({
                  name: 'others',
                  color: colors[indexColors],
                  value: props.settings.unit === 'Ha' ? othersValue : (othersValue / totalCoverGain.data.data[0].value) * 100
                });
              } else {
                othersValue += item.value;
              }
            });

            props.setAreasMostCoverGainValues({
              data: regionsCoverGain,
              charData: regionCoverGainChart
            });
          });
      });
  };

  const nextPage = () => {
    props.setAreasMostCoverGainPage(props.paginate.page + 1);
  };

  const previousPage = () => {
    props.setAreasMostCoverGainPage(props.paginate.page - 1);
  };

  return createElement(WidgetAreasMostCoverGainComponent, {
    ...props,
    setInitialData,
    updateData,
    nextPage,
    previousPage
  });
};

export default connect(mapStateToProps, actions)(WidgetAreasMostCoverGainContainer);
