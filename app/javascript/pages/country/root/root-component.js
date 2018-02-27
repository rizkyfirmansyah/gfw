import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SCREEN_M } from 'utils/constants';
import upperFirst from 'lodash/upperFirst';

import CountryDataProvider from 'pages/country/providers/country-data-provider';
import WhitelistsProvider from 'pages/country/providers/whitelists-provider';

import Widget from 'pages/country/widget';
import Meta from 'pages/country/meta';
import Header from 'pages/country/header';

import Share from 'components/share';
import Map from 'components/map';
import Sticky from 'components/sticky';
import SubNavMenu from 'components/subnav-menu';
import NoContent from 'components/no-content';
import Loader from 'components/loader';
import Button from 'components/button';
import Icon from 'components/icon';
import ModalMeta from 'components/modal-meta';
import ScrollTo from 'components/scroll-to';

import mapIcon from 'assets/icons/map-button.svg';
import closeIcon from 'assets/icons/close.svg';
import './root-styles.scss';

class Root extends PureComponent {
  render() {
    const {
      showMapMobile,
      handleShowMapMobile,
      links,
      isGeostoreLoading,
      widgets,
      location,
      currentLocation,
      locationOptions,
      locationNames,
      category,
      loading,
      widgetAnchor,
      activeWidget,
      locationGeoJson
    } = this.props;

    return (
      <div className="l-country">
        {showMapMobile && (
          <Button
            theme={`square ${showMapMobile ? 'theme-button-light' : ''}`}
            className={`mobile-map-button ${
              showMapMobile ? 'close-map' : 'open-map'
            }`}
            onClick={handleShowMapMobile}
          >
            <Icon icon={showMapMobile ? closeIcon : mapIcon} />
          </Button>
        )}
        <div className="panels">
          <div className="data-panel">
            <Header
              className="header"
              location={location}
              locationOptions={locationOptions}
              locationNames={locationNames}
            />
            <SubNavMenu
              links={links}
              className="subnav-tabs"
              theme="theme-subnav-dark"
              checkActive
            />
            <div className="widgets">
              {loading && <Loader className="widgets-loader large" />}
              {!loading &&
                widgets &&
                widgets.length > 0 &&
                widgets.map(widget => (
                  <Widget
                    key={widget.name}
                    widget={widget.name}
                    active={activeWidget && activeWidget.name === widget.name}
                  />
                ))}
              {!loading &&
                (!widgets || widgets.length === 0) && (
                  <NoContent
                    className="no-widgets-message large"
                    message={`${upperFirst(
                      category
                    )} data for ${currentLocation} coming soon`}
                    icon
                  />
                )}
            </div>
          </div>
          <div className={`map-panel ${showMapMobile ? '-open-mobile' : ''}`}>
            <Sticky
              className={`map ${showMapMobile ? '-open-mobile' : ''}`}
              limitElement="footerGfw"
              enabled={window.innerWidth >= SCREEN_M}
            >
              <Map
                maxZoom={14}
                minZoom={3}
                mapOptions={{
                  mapTypeId: 'GFWdefault',
                  backgroundColor: '#99b3cc',
                  disableDefaultUI: true,
                  panControl: false,
                  zoomControl: false,
                  mapTypeControl: false,
                  scaleControl: true,
                  streetViewControl: false,
                  overviewMapControl: false,
                  tilt: 0,
                  scrollwheel: false,
                  center: { lat: -34.397, lng: 150.644 },
                  zoom: 8
                }}
                areaHighlight={locationGeoJson}
                isParentLoading={isGeostoreLoading}
                parentLayersKey={
                  activeWidget && `widget${upperFirst(activeWidget.name)}`
                }
              />
            </Sticky>
          </div>
        </div>
        <Share />
        <ModalMeta />
        {widgetAnchor && <ScrollTo target={widgetAnchor} />}
        <CountryDataProvider />
        <WhitelistsProvider />
        <Meta
          page={
            locationNames &&
            locationNames.country &&
            locationNames.country.label
          }
        />
      </div>
    );
  }
}

Root.propTypes = {
  showMapMobile: PropTypes.bool.isRequired,
  handleShowMapMobile: PropTypes.func.isRequired,
  links: PropTypes.array.isRequired,
  isGeostoreLoading: PropTypes.bool,
  widgets: PropTypes.array,
  location: PropTypes.object,
  loading: PropTypes.bool,
  currentLocation: PropTypes.string,
  category: PropTypes.string,
  locationOptions: PropTypes.object,
  locationNames: PropTypes.object,
  widgetAnchor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  locationGeoJson: PropTypes.object,
  activeWidget: PropTypes.object
};

export default Root;
