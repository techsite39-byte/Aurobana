import { schoolHighlights } from './schoolHighlights.js';

const schoolImages = Object.fromEntries(
  schoolHighlights.map(({ id, image }) => [id, image]),
);

export const campusCards = [
  {
    id: 'early-childhood',
    title: 'Aurobana Indian School',
    subtitle: 'Preschool & Early Childhood',
    details: 'Playgroup – Grade III',
    image: {
      ...schoolImages['school-life'],
      alt: 'Students learning together in a school classroom',
    },
  },
  {
    id: 'boarding-beyond',
    title: 'Aurobana Indian School',
    subtitle: 'Boarding & Beyond',
    details: 'Grade IV – Grade XII',
    image: {
      ...schoolImages.sports,
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
