import { connectRoutes } from 'redux-first-router';
import createHistory from 'history/createBrowserHistory';
import History from 'pages/about/section-history';
import Impacts from 'pages/about/section-impacts';
import Partners from 'pages/about/section-partners';
import How from 'pages/about/section-how';
import Contact from 'pages/about/section-contact';

import { fetchImpactProjects } from 'pages/about/section-impacts/section-impacts-actions';
import { fetchProjects } from 'pages/about/section-projects/section-projects-actions';

const history = createHistory();

const fetchData = dispatch => {
  dispatch(fetchProjects());
  dispatch(fetchImpactProjects());
};

export const ABOUT = 'location/ABOUT';

export const routes = {
  [ABOUT]: {
    path: '/about',
    thunk: fetchData,
    sections: [
      {
        label: 'GFW in Action',
        anchor: 'gfw-in-action',
        component: How
      },
      {
        label: 'Impacts',
        anchor: 'impacts',
        component: Impacts
      },
      {
        label: 'History',
        anchor: 'history',
        component: History
      },
      {
        label: 'Contact Us',
        anchor: 'contact',
        component: Contact
      },
      {
        label: 'Partnership',
        anchor: 'partnership',
        component: Partners
      }
    ]
  }
};

export default connectRoutes(history, routes);
