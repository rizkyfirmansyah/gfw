import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isTouch } from 'utils/browser';

import { Tooltip } from 'react-tippy';
import Dropdown from 'components/dropdown';
import Loader from 'components/loader';
import Icon from 'components/icon';
import Button from 'components/button';
import Tip from 'components/tip';

import arrowDownIcon from 'assets/icons/arrow-down.svg';
import shareIcon from 'assets/icons/share.svg';
import downloadIcon from 'assets/icons/download.svg';
import './header-styles.scss';

class Header extends PureComponent {
  render() {
    const {
      className,
      locationOptions,
      locationNames,
      handleCountryChange,
      handleRegionChange,
      handleSubRegionChange,
      getHeaderDescription,
      loading,
      error,
      setShareModal,
      shareData,
      location,
      forestAtlasLink
    } = this.props;
    const isDeviceTouch = isTouch();

    return (
      <div className={`${className} c-header`}>
        {loading && <Loader className="loader" theme="theme-loader-light" />}
        <div className="share-buttons">
          <Button
            className="theme-button-small theme-button-grey square"
            extLink={`http://gfw2-data.s3.amazonaws.com/country/umd_country_stats/iso/tree_cover_stats_2016_${
              location.country
            }.xlsx`}
            trackingData={{
              title: 'download',
              ...location
            }}
            tooltip={{
              theme: 'tip',
              position: 'bottom',
              arrow: true,
              disabled: isDeviceTouch,
              html: (
                <Tip
                  text={`Download the country data${
                    locationNames.country
                      ? ` for ${locationNames.country.label}`
                      : ''
                  }`}
                />
              )
            }}
          >
            <Icon icon={downloadIcon} />
          </Button>
          <Button
            className="theme-button-small theme-button-grey square"
            onClick={() => setShareModal(shareData)}
            tooltip={{
              theme: 'tip',
              position: 'bottom',
              arrow: true,
              disabled: isDeviceTouch,
              html: <Tip text="Share this page" />
            }}
          >
            <Icon icon={shareIcon} />
          </Button>
        </div>
        <div className="row">
          <div className="columns small-12 large-6">
            <Tooltip
              theme="tip"
              position="top"
              arrow
              disabled={isDeviceTouch}
              html={
                <Tip text="Choose the country and region you want to explore" />
              }
            >
              <div className="select-container">
                <div className="select">
                  <Icon icon={arrowDownIcon} className="icon" />
                  <Dropdown
                    theme="theme-select-dark"
                    placeholder="Country"
                    noItemsFound="No country found"
                    value={locationNames.country}
                    options={locationOptions.countries}
                    onChange={handleCountryChange}
                    searchable
                    disabled={loading}
                  />
                </div>
                {locationOptions.regions &&
                  locationOptions.regions.length > 1 && (
                    <div className="select">
                      <Icon icon={arrowDownIcon} className="icon" />
                      <Dropdown
                        theme="theme-select-dark"
                        placeholder="Region"
                        noItemsFound="No region found"
                        value={locationNames.region}
                        options={locationOptions.regions}
                        onChange={region =>
                          handleRegionChange(locationNames.country, region)
                        }
                        searchable
                        disabled={loading}
                      />
                    </div>
                  )}
                {locationNames.region &&
                  locationNames.region.value &&
                  locationOptions.subRegions &&
                  locationOptions.subRegions.length > 1 && (
                    <div className="select">
                      <Icon
                        icon={arrowDownIcon}
                        className="icon c-header__select-arrow"
                      />
                      <Dropdown
                        theme="theme-select-dark"
                        placeholder="Region"
                        noItemsFound="No region found"
                        value={locationNames.subRegion}
                        options={locationOptions.subRegions}
                        onChange={subRegion =>
                          handleSubRegionChange(
                            locationNames.country,
                            locationNames.region,
                            subRegion
                          )
                        }
                        searchable
                        disabled={loading}
                      />
                    </div>
                  )}
              </div>
            </Tooltip>
          </div>
          <div className="columns large-6 medium-12 small-12">
            <div className="description text -title-xs">
              {!loading && (
                <div>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: error
                        ? 'An error occured while fetching data. Please try again later.'
                        : getHeaderDescription()
                    }}
                  />
                  {forestAtlasLink && (
                    <Button
                      className="forest-atlas-btn"
                      extLink={forestAtlasLink.url}
                    >
                      EXPLORE FOREST ATLAS
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  locationNames: PropTypes.object.isRequired,
  locationOptions: PropTypes.object.isRequired,
  handleCountryChange: PropTypes.func.isRequired,
  handleRegionChange: PropTypes.func.isRequired,
  handleSubRegionChange: PropTypes.func.isRequired,
  getHeaderDescription: PropTypes.func.isRequired,
  setShareModal: PropTypes.func.isRequired,
  shareData: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  forestAtlasLink: PropTypes.object
};

export default Header;
