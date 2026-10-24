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

export const campusStatistics = Array.from({ length: 6 }, (_, index) => ({
  id: `statistic-${index + 1}`,
  label: `Statistic ${String(index + 1).padStart(2, '0')}`,
  value: '—',
  description: 'Aurobana data to be added',
}));
