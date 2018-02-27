import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';

import Slider from 'components/slider';
import img1997 from 'pages/about/section-history/images/1997.jpg';
import img2002 from 'pages/about/section-history/images/2002.jpg';
import img2004 from 'pages/about/section-history/images/2004.jpg';
import img2005 from 'pages/about/section-history/images/2005.jpg';
import img2014 from 'pages/about/section-history/images/2014.jpg';
import img2015 from 'pages/about/section-history/images/2015.jpg';
import img2016 from 'pages/about/section-history/images/2016.jpg';
import img2017 from 'pages/about/section-history/images/2017.jpg';

import './section-history-styles.scss';

const data = [
  {
    img: img1997,
    imgPosition: 'center',
    title: '1997',
    paragraph:
      'The World Resources Institute (WRI) established Global Forest Watch in 1997 as part of the Forest Frontiers Initiative. It started as a network of NGOs producing up-to-date reports about the state of forests in four pilot countries: Cameroon, Canada, Gabon, and Indonesia.'
  },
  {
    img: img2002,
    imgPosition: 'center',
    title: '2002',
    paragraph:
      'By 2002, GFW had expanded its work to Chile, Russia, Venezuela, Indonesia, the Democratic Republic of Congo, and the United States, publishing reports about forest cover and conditions as well as activities affecting forests, like concessions and infrastructure. GFW planned to have its forest monitoring network up and running in 21 countries by 2005.'
  },
  {
    img: img2004,
    imgPosition: 'center',
    title: '2004',
    paragraph:
      "GFW began working with governments in Central Africa to create interactive, online maps of forests and land use called Forestry Atlases. The first map was created for Cameroon in collaboration with the Ministry of Environment and Forests of Cameroon (MINEF). The interactive maps, built on ESRI's ArcGIS Server, were soon expanded to all countries covered by GFW."
  },
  {
    img: img2005,
    imgPosition: 'left',
    title: '2005 - 2011',
    paragraph:
      'For the next six years, GFW continued producing global and regional maps and analyses of forests, while also expanding national mapping projects with governments. In 2006, GFW together with Greenpeace produced the first ever global map of remaining intact forest landscapes.'
  },
  {
    img: img2014,
    imgPosition: 'left',
    title: '2014',
    paragraph:
      'In 2014, WRI launched GFW 2.0, building on nearly two decades of work to create a fully interactive online platform with forest monitoring data for the whole world. The new iteration of GFW was made possible by advances in forest monitoring technology and an expanded group of partners.'
  },
  {
    img: img2015,
    imgPosition: 'right',
    title: '2015',
    paragraph:
      'To address the many challenges related to deforestation, Global Forest Watch began expanding with several new web applications: GFW Commodities to evaluate sustainability in commodity supply chains, GFW Fires to monitor forest and land fires and haze in SE Asia, and GFW Climate to assess the climate impacts of deforestation.'
  },
  {
    img: img2016,
    imgPosition: 'left',
    title: '2016',
    paragraph:
      'With further developments in satellite technology, GFW grew beyond annual data on forests and began providing monthly and weekly deforestation alerts. Email subscriptions brought these alerts directly into the hands of users, increasing their ability to respond to new activity in near real-time.'
  },
  {
    img: img2017,
    imgPosition: 'center',
    title: '2017',
    paragraph:
      'In 2017, GFW launched Forest Watcher, a mobile application that lets users take GFW’s data and tools offline and into the field. The app represents a new step in connecting the people working in forests directly with the information they need to protect them.'
  }
];

class SectionHistory extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <section className="l-section-history">
        <div className="row">
          <div className="column small-12">
            <h3>History</h3>
          </div>
        </div>
        <Slider
          className="timeline"
          settings={{
            slidesToShow: 1
          }}
        >
          {data &&
            data.map(d => (
              <div className="year-card" key={d.title}>
                <div className="row">
                  <div className="columns small-12 medium-6">
                    <img className="image" src={d.img} alt={d.title} />
                  </div>
                  <div className="columns small-12 medium-6">
                    <div className="description">
                      <h4>{d.title}</h4>
                      <p>{d.paragraph}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </section>
    );
  }
}

SectionHistory.propTypes = {};

export default SectionHistory;
