export const campusCards = [
  {
    id: 'early-childhood',
    title: 'Aurobana Indian School',
    subtitle: 'Preschool & Early Childhood',
    details: 'Playgroup – Grade III',
    image: {
      src: '/new/AIS-%20Photos/photo_5_2026-03-06_11-46-24.jpg',
      position: 'center',
      alt: 'Students learning together in a school classroom',
    },
  },
  {
    id: 'boarding-beyond',
    title: 'Aurobana Indian School',
    subtitle: 'Boarding & Beyond',
    details: 'Grade IV – Grade XII',
    image: {
      src: '/new/AIS-%20Photos/Gemini_Generated_Image_nsx9yqnsx9yqnsx9.png',
      position: 'center',
      alt: 'A student taking part in a school sports activity',
    },
  },
];

const statisticLabels = [
  'Academic Excellence',
  'Inclusive Learning',
  'Nurturing Talents',
  'Values & Discipline',
  'Safe & Caring Environment',
  'Holistic Development',
];

export const campusStatistics = statisticLabels.map((label, index) => ({
  id: `statistic-${index + 1}`,
  label,
  value: '—',
  description: '',
}));
