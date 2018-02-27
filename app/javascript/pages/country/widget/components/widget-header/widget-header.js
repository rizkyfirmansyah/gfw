import { connect } from 'react-redux';
import compact from 'lodash/compact';
import moment from 'moment';

import shareActions from 'components/share/share-actions';
import modalMetaActions from 'components/modal-meta/modal-meta-actions';
import countryRootActions from 'pages/country/root/root-actions';
import mapActions from 'components/map/map-actions';
import WidgetHeaderComponent from './widget-header-component';

const actions = {
  ...shareActions,
  ...modalMetaActions,
  ...mapActions,
  ...countryRootActions
};

const mapStateToProps = ({ location, modalMeta }, ownProps) => {
  const { locationNames, widget, title, settingsConfig } = ownProps;
  const locationUrl = compact(
    Object.keys(location.payload).map(key => location.payload[key])
  ).join('/');
  const embedUrl = `${
    window.location.origin
  }/country/embed/${widget}/${locationUrl}${
    location.query && location.query[widget]
      ? `?${widget}=${location.query[widget]}`
      : ''
  }`;

  return {
    location,
    modalOpen: modalMeta.open,
    modalClosing: modalMeta.closing,
    citation: `Global Forest Watch. “${title} in ${locationNames &&
      locationNames.current &&
      locationNames.current.label}”. Accessed on ${moment().format(
      'MMMM Do YYYY'
    )} from www.globalforestwatch.org.`,
    shareData: {
      title: 'Share this widget',
      subtitle: `${title} in ${
        locationNames.current ? locationNames.current.label : ''
      }`,
      shareUrl: `http://${window.location.host}${window.location.pathname}?${
        location && location.category && location.query.category
          ? `category=${location.query.category}&`
          : ''
      }${`widget=${widget}`}#${widget}`,
      embedUrl,
      embedSettings:
        settingsConfig.config.size === 'small'
          ? { width: 315, height: 460 }
          : { width: 670, height: 490 },
      socialText: `${title} in ${
        locationNames.current ? locationNames.current.label : ''
      }`
    }
  };
};

export default connect(mapStateToProps, actions)(WidgetHeaderComponent);
