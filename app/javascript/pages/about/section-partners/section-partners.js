import { connect } from 'react-redux';

import Component from './section-partners-component';

const foundingPartners = [
  {
    img: '/assets/logos/bobolinkfundation.png',
    link: 'http://bobolinkfoundation.org',
    title: 'Bobo link Fundation'
  },
  {
    img: '/assets/logos/bluerasterhover.png',
    link: 'https://www.blueraster.com/',
    title: 'Blueraster'
  },
  {
    img: '/assets/logos/cartodbhover.png',
    link: 'https://carto.com/',
    title: 'Carto'
  },
  {
    img: '/assets/logos/centerforglobaldevelopmenthover.png',
    link: 'https://www.cgdev.org/',
    title: 'Center for Global Development'
  },
  {
    img: '/assets/logos/danidahover.png',
    link: 'http://um.dk/en/danida-en/',
    title: 'Danida'
  },
  {
    img: '/assets/logos/esrihover.png',
    link:
      'http://www.esri.com/landing-pages/fight-against-deforestation/global-forest-watch',
    title: 'ESRI'
  },
  {
    img: '/assets/logos/gefhover.png',
    link: 'http://www.thegef.org/',
    title: 'gef'
  },
  {
    img: '/assets/logos/globalforestwatchcanadahover.png',
    link: 'http://globalforestwatch.ca/',
    title: 'Global Forest Watch Canada'
  },
  {
    img: '/assets/logos/googlehover.png',
    link: 'https://earthengine.google.com/',
    title: 'Google'
  },
  {
    img: '/assets/logos/imazonhover.png',
    link: 'http://imazon.org.br/pagina-inicial-en?set_language=en&cl=en',
    title: 'Imazon'
  },
  {
    img: '/assets/logos/ministryofforeignaffairshover.png',
    link: 'https://www.government.nl/ministries/ministry-of-foreign-affairs',
    title: 'Ministry of Foreign Affairs'
  },
  {
    img: '/assets/logos/norwegianministrihover.png',
    link:
      'https://www.regjeringen.no/en/topics/climate-and-environment/climate/climate-and-forest-initiative/id2000712/',
    title: 'Norwegian Ministry'
  },
  {
    img: '/assets/logos/osfachover.png',
    link: 'https://osfac.net/index.php?lang=en',
    title: 'OSFA'
  },
  {
    img: '/assets/logos/scannexhover.png',
    link: 'http://www.scanex.ru/en/',
    title: 'Scannex'
  },
  {
    img: '/assets/logos/sidahover.png',
    link: 'http://www.sida.se/english/',
    title: 'SIDA'
  },
  {
    img: '/assets/logos/thejanegoodallinstitutehover.png',
    link: 'http://www.janegoodall.org/',
    title: 'The Jane Good all Institute'
  },
  {
    img: '/assets/logos/thetiliafundhover.png',
    link: 'http://www.tiliafund.org/',
    title: 'The Tila Fundation'
  },
  {
    img: '/assets/logos/tiposhover.png',
    link: 'http://www.transparentworld.ru/',
    title: 'TIPOS'
  },
  {
    img: '/assets/logos/unephover.png',
    link: 'http://www.unep.org/',
    title: 'UNEP'
  },
  {
    img: '/assets/logos/universityofmarylandhover.png',
    link: 'https://geog.umd.edu/',
    title: 'University of Maryland'
  },
  {
    img: '/assets/logos/ukaidhover.png',
    link:
      'https://www.gov.uk/government/organisations/department-for-international-development',
    title: 'UKAID'
  },
  {
    img: '/assets/logos/usaidhover.png',
    link: 'https://www.usaid.gov/',
    title: 'USAID'
  },
  {
    img: '/assets/logos/vizzualityhover.png',
    link: 'http://www.vizzuality.com/',
    title: 'Vizzuality'
  },
  {
    img: '/assets/logos/wrihover.png',
    link: 'http://www.wri.org/',
    title: 'World Resources Institute'
  }
];

const partnersCollaborators = [
  {
    img: '/assets/logos/afchover.png',
    link: 'http://www.afd.fr/home',
    title: 'Agence Française Développement'
  },
  {
    img: '/assets/logos/agrosatelitehover.png',
    link: 'http://agrosatelite.com.br/',
    title: 'agrosatelite'
  },
  {
    img: '/assets/logos/airbushover.png',
    link: 'http://www.airbus.com/',
    title: 'Airbus'
  },
  {
    img: '/assets/logos/astrodigitalhover.png',
    link: 'https://astrodigital.com/',
    title: 'Astro Digital'
  },
  {
    img: '/assets/logos/bnpbhover.png',
    link: 'https://bnpb.go.id/',
    title: 'Badan Nasional Penanggulangan Bencana'
  },
  {
    img: '/assets/logos/beihover.png',
    link:
      'http://www.cisl.cam.ac.uk/business-action/sustainable-finance/banking-environment-initiative',
    title: 'Banking Environment Initiative'
  },
  {
    img: '/assets/logos/cambridgehover.png',
    link: 'http://www.cisl.cam.ac.uk/',
    title: 'University of Cambridge'
  },
  {
    img: '/assets/logos/cargillhover.png',
    link: 'https://www.cargill.com/',
    title: 'Cargill'
  },
  {
    img: '/assets/logos/cgiarhover.png',
    link: 'http://foreststreesagroforestry.org/',
    title: 'Forest, Trees and Agroforestry'
  },
  {
    img: '/assets/logos/ciathover.png',
    link: 'http://ciat.cgiar.org/',
    title: 'CIAT'
  },
  {
    img: '/assets/logos/cluahover.png',
    link: 'http://www.climateandlandusealliance.org/',
    title: 'Climate and Land Use Alliance'
  },
  {
    img: '/assets/logos/conaforhover.png',
    link: 'http://www.conafor.gob.mx/',
    title: 'Conafor'
  },
  {
    img: '/assets/logos/conservationinternationalhover.png',
    link: 'http://www.conservation.org/Pages/default.aspx',
    title: 'Conservation International'
  },
  {
    img: '/assets/logos/digitalglobehover.png',
    link: 'https://www.digitalglobe.com/',
    title: 'DigitalGlobe'
  },
  {
    img: '/assets/logos/ejnhover.png',
    link: 'http://earthjournalism.net/',
    title: 'Earth Journalism Network'
  },
  {
    img: '/assets/logos/ewmihover.png',
    link: 'http://www.ewmi.org/',
    title: 'East West Management Institute'
  },
  {
    img: '/assets/logos/hakahover.png',
    link: 'http://www.haka.or.id/',
    title: 'Haka'
  },
  {
    img: '/assets/logos/icfhover.png',
    link: 'http://www.icf.gob.hn/',
    title: 'ICF'
  },
  {
    img: '/assets/logos/inabhover.png',
    link: 'http://www.inab.gob.gt/',
    title: 'inab'
  },
  {
    img: '/assets/logos/ioihover.png',
    link: 'http://europe.ioiloders.com/taking-responsibility',
    title: 'IOI Loders Croklaan'
  },
  {
    img: '/assets/logos/lapighover.png',
    link: 'https://www.lapig.iesa.ufg.br/lapig/',
    title: 'LAPIG'
  },
  {
    img: '/assets/logos/minepathover.png',
    link: 'http://www.minepat.gov.cm/index.php/en/?lang=en',
    title: 'Minepat'
  },
  {
    img: '/assets/logos/ministierehover.png',
    link: '#',
    title: 'minfof'
  },
  {
    img: '/assets/logos/moiseshover.png',
    link: 'http://aidev.in/fmb/',
    title: 'Fundation Moises Bertoni'
  },
  {
    img: '/assets/logos/mongabayhover.png',
    link: 'https://www.mongabay.com/',
    title: 'Mongabay'
  },
  {
    img: '/assets/logos/muyissihover.png',
    link: '#',
    title: 'Muyissi'
  },
  {
    img: '/assets/logos/opendevcamhover.png',
    link: 'https://opendevelopmentcambodia.net/',
    title: 'Open Development Cambodia'
  },
  {
    img: '/assets/logos/orbitalhover.png',
    link: 'https://orbitalinsight.com/',
    title: 'Orbital Insight'
  },
  {
    img: '/assets/logos/osinforhover.png',
    link: 'http://www.osinfor.gob.pe/',
    title: 'Osinfor'
  },
  {
    img: '/assets/logos/rfukhover.png',
    link: 'http://www.rainforestfoundationuk.org/',
    title: 'Rainforest Foundation UK'
  },
  {
    img: '/assets/logos/raisghover.png',
    link: 'https://raisg.socioambiental.org/',
    title: 'RAISG'
  },
  {
    img: '/assets/logos/reddhover.png',
    link: 'http://www.redd-indonesia.org/',
    title: 'REDD Indonesia'
  },
  {
    img: '/assets/logos/rmhover.png',
    link: 'https://www.reforestamosmexico.org/',
    title: 'Refores@amos Mexico'
  },
  {
    img: '/assets/logos/resolvehover.png',
    link: 'http://www.resolv.org/site-BiodiversityWildlifeSolutions/',
    title: 'Resolve'
  },
  {
    img: '/assets/logos/rspohover.png',
    link: 'http://www.rspo.org/',
    title: 'RSPO'
  },
  {
    img: '/assets/logos/rtrshover.png',
    link: 'http://www.responsiblesoy.org/?lang=en',
    title: 'RTRS'
  },
  {
    img: '/assets/logos/unepwcmchover.png',
    link: 'http://www.unep-wcmc.org/',
    title: 'UNEP & WCMC'
  },
  {
    img: '/assets/logos/unileverhover.png',
    link: 'https://www.unilever.com/',
    title: 'Unilever'
  },
  {
    img: '/assets/logos/urthecasthover1.png',
    link: 'https://www.urthecast.com/',
    title: 'Urthecast'
  },
  {
    img: '/assets/logos/whrchover.png',
    link: 'http://whrc.org/',
    title: 'Woods Hole Research Center'
  }
];

const funders = [
  {
    img: '/assets/logos/cargillhover.png',
    link: 'https://www.cargill.com/',
    title: 'Cargill'
  },
  {
    img: '/assets/logos/gefhover.png',
    link: 'http://www.thegef.org/',
    title: 'gef'
  },
  {
    img: '/assets/logos/generationhover.png',
    link: 'https://www.genfound.org/',
    title: 'Generation Foundation'
  },
  {
    img: '/assets/logos/idbhover.png',
    link: 'http://www.iadb.org/en/inter-american-development-bank,2837.html',
    title: 'IDB'
  },
  {
    img: '/assets/logos/idbinvesthover.png',
    link: 'http://www.idbinvest.org/',
    title: 'IDB | Invest'
  },
  {
    img: '/assets/logos/macarthurhover.png',
    link: 'https://www.macfound.org/',
    title: 'MacArthur Foundation'
  },
  {
    img: '/assets/logos/norwegianministrihover.png',
    link:
      'https://www.regjeringen.no/en/topics/climate-and-environment/climate/climate-and-forest-initiative/id2000712/',
    title: 'Norwegian Ministry'
  },
  {
    img: '/assets/logos/ukaidhover.png',
    link:
      'https://www.gov.uk/government/organisations/department-for-international-development',
    title: 'UKAID'
  },
  {
    img: '/assets/logos/usaidhover.png',
    link: 'https://www.usaid.gov/',
    title: 'USAID'
  }
];

const mapStateToProps = () => ({
  foundingPartners,
  partnersCollaborators,
  funders
});

export default connect(mapStateToProps, null)(Component);
