import ReactGA from 'react-ga';
import { ANALYTICS_EVENTS } from 'pages/country/data/analytics';

const { ANALYTICS_PROPERTY_ID } = process.env;
let gaInitialized = false;

const initGA = () => {
  if (ANALYTICS_PROPERTY_ID) {
    if (!gaInitialized) {
      ReactGA.initialize(ANALYTICS_PROPERTY_ID);
      gaInitialized = true;
    }
  }
};

export const handlePageTrack = location => {
  initGA();
  if (gaInitialized) {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(window.location.href);
  }
};

export const handleActionTrack = state => nextDispatch => action => {
  initGA();
  if (gaInitialized) {
    // get all events that match action key
    const GAEvents = ANALYTICS_EVENTS.filter(
      g => g.name && g.name === action.type
    );

    // get the payload of the action
    const payload = {
      ...state.getState().location.payload,
      ...action.payload,
      ...action.query,
      ...action.meta
    };

    // use condition to find correct action
    let event = GAEvents.find(e => !e.condition);
    GAEvents.forEach(e => {
      if (e.condition && e.condition(payload)) {
        event = e;
      }
    });

    // process event if available
    if (event) {
      const evalProp = prop =>
        (typeof prop === 'string' ? prop : prop(payload));
      const eventPayload = {
        ...['category', 'action', 'label'].reduce(
          (val, prop) => ({ ...val, [prop]: evalProp(event[prop]) }),
          {}
        ),
        ...(!!event.value && { value: evalProp(event.value) })
      };
      if (eventPayload.label) {
        ReactGA.event(eventPayload);
      }
    }
  }
  nextDispatch(action);
};
