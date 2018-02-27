import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Slider from 'components/slider';
import Card from 'components/card';

import './section-impacts-styles.scss';

class SectionImpacts extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { data, awards } = this.props;
    return (
      <section className="l-section-impacts">
        <div className="row">
          <div className="column small-12">
            <h3>Impacts</h3>
          </div>
        </div>
        <Slider>
          {data &&
            data.map(c => (
              <div key={c.id}>
                <Card key={c.title} data={c} />
              </div>
            ))}
        </Slider>
        <div className="row awards">
          <div className="column small-12">
            <h3>Awards</h3>
          </div>
          {awards.map(l => (
            <a
              key={l.title}
              className="columns small-6 medium-4 large-3"
              href={l.link}
              target="_blank"
            >
              <img alt={l.title} src={l.img} />
            </a>
          ))}
        </div>
      </section>
    );
  }
}

SectionImpacts.propTypes = {
  data: PropTypes.array.isRequired,
  awards: PropTypes.array.isRequired
};

export default SectionImpacts;
