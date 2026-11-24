import mediaCoverageJson from './media_coverage.json';
import accoladesJson from './accolades.json';

const mediaImages = import.meta.glob('../assets/media/*.{png,jpg,jpeg}', { eager: true, import: 'default' });

export const MEDIA_COVERAGES = [
  {
    id: 'media-01',
    year: '2026',
    publisher: 'TradeFlock Leadership Magazine',
    title: 'The Telecom Titan Who Measures Empire in Lives, Not Ledgers',
    headline: 'Cover Feature: Most Influential Leaders in India 2026',
    description: 'An exhaustive retrospective examining 25+ years of Savitri Telecom, the zero-dismissal human capital covenant, and mentoring 500+ independent entrepreneurs.',
    imageName: 'Media-coverage-2.jpg',
    category: 'Executive Cover Story',
    featured: true,
    link: 'https://savitritelecom.com/ravi-shankar-rai-a-telecom-leader-driven-by-purpose-and-people/',
  },
  {
    id: 'media-02',
    year: '2024',
    publisher: 'The Economic Times',
    title: 'STS Conferred ET’s Business Leaders Award 2024, Delhi',
    headline: 'Pioneering Optical Infrastructure in ICT Segment',
    description: 'Honoured in New Delhi for steering nationwide telecom calibration, test gear integration, and standardizing quality benchmarks for 5G deployment.',
    imageName: 'STS-ET-Business-Leaders-Award-2024.jpg',
    category: 'National Business Press',
    featured: false,
  },
  {
    id: 'media-02b',
    year: '2022',
    publisher: 'The Economic Times',
    title: 'Dr. Ravi Shankar Rai Conferred ET Inspiring Leaders North 2022 Award',
    headline: 'Conferred on Stage by Sonam Kapoor for Best Telecom Solution Provider',
    description: 'Recognized by The Economic Times at the Grand Hyatt in New Delhi for steering Savitri Telecom Services to preeminence as India’s leading optical testing and infrastructure solutions provider.',
    imageName: '1-STS-Best-Telecom-Technology-Solution-Providers-Inspiring-Leaders-Award-North-2022-Award-by-Economic-Times-1.jpg',
    category: 'National Conclave & Honors',
    featured: true,
  },
  {
    id: 'media-03',
    year: '2023',
    publisher: 'Voice & Data / Industry Press',
    title: 'Telecom Manufacturing in India: As Industry Brings in 5G',
    headline: 'Atmanirbhar Bharat & Optical Infrastructure Roadmap',
    description: 'Dr. Rai on domestic test instrumentation, self-reliance in telecom electronics, and skilling thousands of field engineers for high-speed fiber backbones.',
    imageName: 'telecomManufacturingInIndia.png',
    category: 'Industry Analysis',
    featured: false,
  },
  {
    id: 'media-04',
    year: '2023',
    publisher: 'The Times of India',
    title: 'Times Achievers Award 2023: Conferred upon Dr. Ravi Shankar Rai',
    headline: 'Innovation and Technological Advancement in Telecom',
    description: 'Celebrated at the prestigious state forum in Uttarakhand for quarter-century contributions to ICT infrastructure and human enterprise.',
    imageName: '2023.jpg',
    category: 'National Press Feature',
    featured: false,
  },
  {
    id: 'media-05',
    year: '2021',
    publisher: 'Rashtriya Hindi Media',
    title: 'सावित्री समूह बना वट वृक्ष: उद्यम, रोजगार और आत्मनिर्भरता का संकल्प',
    headline: 'A Banyan Tree of Employment & Empowerment',
    description: 'Special coverage of Savitri Telecom’s human-centric growth from a modest Bhikaji Cama Place office into a nationwide technology powerhouse.',
    imageName: 'savitriSamuhVatVraksh.png',
    category: 'National Print Profile',
    featured: false,
  },
  {
    id: 'media-06',
    year: '2021',
    publisher: 'Corporate Sphere Publications',
    title: 'Survival is the Biggest Success: New Business Approaches for a New Era',
    headline: 'Resilience During Global Supply Chain Disruptions',
    description: 'Executive perspective on maintaining uninterrupted telecom network services and zero workforce dismissals through turbulent economic cycles.',
    imageName: 'survivalBiggestService.png',
    category: 'Executive Perspective',
    featured: false,
  },
  {
    id: 'media-07',
    year: '2021',
    publisher: 'Social Development Journal',
    title: 'हमारे समाज-जीवन का सशक्त आधार स्तंभ हैं महिलाएं',
    headline: 'Women in Engineering & Enterprise Leadership',
    description: 'Highlighting female leadership within Savitri Group verticals, including STIL under Director Ms. Poonam Rai, recipient of Times Women Achievers Award.',
    imageName: 'smaj-jivan.png',
    category: 'Social Leadership',
    featured: false,
  },
  {
    id: 'media-08',
    year: '2017',
    publisher: 'CII National Conclave & Digital India Mission',
    title: 'CII Conclave: Security & Privacy in the Digital World — A Digital India Mission',
    headline: 'Keynote Address on Optical Calibration, Network Privacy, and Telecom Skilling',
    description: 'Dr. Rai addressing national leaders at the Confederation of Indian Industry (CII) National Conclave on standardizing optical infrastructure, domestic testing, and data privacy.',
    imageName: 'convergence2017.png',
    category: 'Keynote Address',
    featured: false,
  },
].map((item) => {
  const imageKey = `../assets/media/${item.imageName}`;
  return {
    ...item,
    resolvedImage: mediaImages[imageKey] || '',
  };
});

// Clean list of unique accolades without repeating ET award
export const ACCOLADES = [
  {
    title: 'Best MDF Programme Usage Winner',
    subtitle: 'Viavi Solutions Global Partner Excellence',
    category: 'Partner Programme Winner',
    imageName: 'BestMDF.png',
    year: 'FY19',
    description: 'Recognized by Viavi Solutions alongside international partner delegations for premier market development, optical certification workshops, and nationwide network testing adoption.',
  },
  {
    title: 'Viavi APS Partners Summit — Metro Business Unit Award',
    subtitle: 'Viavi Solutions Asia-Pacific South Partners Summit',
    category: 'Global Optical Excellence',
    imageName: '2024.jpg',
    year: 'FY24',
    description: 'Conferred on stage at the Viavi APS Partners Summit celebrating premier optical calibration, network testing excellence, and nationwide deployment support.',
  },
  {
    title: 'Business Sphere Award of Excellence',
    subtitle: 'Amongst Toppers in Mfg. Quality Fiber Optics Cable Assembly',
    category: 'Manufacturing Quality',
    imageName: 'BusinessSphere.png',
    year: '2012–13',
    description: 'Certificate of Excellence presented by Business Sphere celebrating high-precision fiber optic patch cords and optical assembly standards.',
  },
  {
    title: 'Fiber Optic Biggest BU Award',
    subtitle: 'JDSU / Viavi Global Business Unit Honor',
    category: 'Business Unit Milestone',
    imageName: 'FiberOptic.png',
    year: '2019',
    description: 'Honoring the largest optical instrumentation business unit volume across the South Asia Pacific territory.',
  },
  {
    title: 'Decade of Technology Demonstrations',
    subtitle: 'Convergence India & Pragati Maidan Conclaves',
    category: 'Exhibition Leadership',
    imageName: 'convergence2012.png',
    year: '2012–2020',
    description: 'Over a decade of high-level optical technology demonstrations, fiber labs, and technical skilling forums.',
  },
].map((item, index) => {
  const imageKey = `../assets/media/${item.imageName}`;
  return {
    ...item,
    resolvedImage: mediaImages[imageKey] || '',
    index: String(index + 1).padStart(2, '0'),
  };
});
