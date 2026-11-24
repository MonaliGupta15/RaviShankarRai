import awardsJson from './awards.json';

// Import all 39 award photos dynamically
const awardImages = import.meta.glob('../assets/awards/*.jpg', { eager: true, import: 'default' });

export const ALL_AWARDS = awardsJson.map((award, index) => {
  const imageKey = `../assets/awards/${award.image}`;
  const resolvedImg = awardImages[imageKey] || '';

  // Clean category tag
  let category = 'ICT & TELECOM EXCELLENCE';
  const t = award.title.toLowerCase();
  if (t.includes('leadership') || t.includes('leaders')) {
    category = 'LEADERSHIP EXCELLENCE';
  } else if (t.includes('partner') || t.includes('distributor')) {
    category = 'STRATEGIC PARTNERSHIP';
  } else if (t.includes('fiber') || t.includes('metro') || t.includes('bu award')) {
    category = 'OPTICAL & INFRASTRUCTURE';
  } else if (t.includes('women')) {
    category = 'WOMEN IN ENGINEERING';
  } else if (t.includes('achievers') || t.includes('achievement') || t.includes('excellence')) {
    category = 'INDUSTRY ACHIEVEMENT';
  }

  // Clean awarding body
  let awardingBody = award.awardBy || 'Industry Citation';
  if (!awardingBody || awardingBody.trim() === '') {
    if (t.includes('economic times') || t.includes('et ')) awardingBody = 'The Economic Times';
    else if (t.includes('viavi')) awardingBody = 'Viavi Solutions Global';
    else if (t.includes('jdsu')) awardingBody = 'JDSU Global';
    else if (t.includes('3m')) awardingBody = '3M';
    else if (t.includes('times of india')) awardingBody = 'The Times of India';
    else if (t.includes('spirent')) awardingBody = 'Spirent Communications';
    else if (t.includes('microchip')) awardingBody = 'Microchip Technology';
    else if (t.includes('nexus')) awardingBody = 'Nexus Telecom';
    else if (t.includes('business sphere')) awardingBody = 'Business Sphere';
    else awardingBody = 'Telecom & ICT Council';
  }

  return {
    ...award,
    category,
    awardBy: awardingBody,
    resolvedImage: resolvedImg,
    index: String(index + 1).padStart(2, '0'),
  };
});
