import { connectRoutes } from 'redux-first-router';
import createHistory from 'history/createBrowserHistory';
import queryString from 'query-string';
import { setWidgetSettingsStore } from 'pages/country/widget/widget-actions';
import { handlePageTrack } from 'utils/analytics';

const history = createHistory();

export const COUNTRY = 'location/COUNTRY';
export const EMBED = 'location/EMBED';

const routeChangeThunk = (dispatch, getState) => {
  // sync store with widget settings
  const { query } = getState().location;
  if (query) {
    dispatch(setWidgetSettingsStore(query));
  }

  // track page with GA
  handlePageTrack(getState().location);
};

export const routes = {
  [EMBED]: {
    path: '/country/embed/:widget/:country/:region?/:subRegion?'
  },
  [COUNTRY]: {
    path: '/country/:country/:region?/:subRegion?'
  }
};

export default connectRoutes(history, routes, {
  querySerializer: queryString,
  onAfterChange: routeChangeThunk
});
