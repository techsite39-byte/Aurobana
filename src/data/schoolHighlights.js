const unsplash = (photoId, position = 'center') => ({
  src: `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1200&q=85`,
  position,
});

export const schoolHighlights = [
  {
    id: 'school-life',
    title: 'School Life',
    image: {
      ...unsplash('photo-1509062522246-3755977927d7', 'center 45%'),
      alt: 'Students sharing a lively moment in their classroom',
    },
    description: 'Experience a vibrant school life filled with learning, friendships, creativity, and discovery. Every day brings new experiences, meaningful connections, and opportunities to grow. We create an environment where students feel confident, valued, and inspired. Discover a school life that goes beyond the classroom.',
  },
  {
    id: 'academics',
    title: 'Academics',
    image: {
      ...unsplash('photo-1427504494785-3a9ca7044f45', 'center 42%'),
      alt: 'Students learning and collaborating in a classroom',
    },
    description: 'Build strong foundations. Think beyond boundaries. Our academic approach encourages curiosity, critical thinking, and a love for learning. Students are guided to understand, explore, question, and apply their knowledge. Learn today. Think tomorrow. Lead the future.',
  },
  {
    id: 'sports',
    title: 'Sports',
    image: {
      ...unsplash('photo-1461896836934-ffe607ba8211', 'center'),
      alt: 'A student taking part in a school sports activity',
    },
    description: 'Move with confidence. Play with purpose. Sports build discipline, teamwork, resilience, and the courage to challenge yourself. From participation to performance, every student gets the opportunity to discover their potential. Play hard. Grow strong. Rise together.',
  },
];

export const schoolPhilosophy = {
  quote: 'True knowledge is not attained by thinking, it is what you are, what you become',
  attribution: 'Sri Aurobindo',
  paragraphs: [
    'Sri Aurobindo and Mother Mira have advocated a new way of life — a turning point for the thinking minds. True education should not stop with acquisition of knowledge, it should involve transformation of minds and thoughts. It should be a process of cultivating the four aspects of life — love, beauty, power and knowledge.',
    'To bring out the real man in oneself should be the primary function of education. This education should be spiritual in nature that dispels the darkness of the soul and enhances the nobility in each individual.',
    'The Mother proposed a philosophy of Integral education which involves a progressive system which is guided by the soul. This progression is not subject to ideas or habits and does not depend on preconceived ideas.',
    'These words have highly impacted us and hence the name SRI AUROBINDO MIRA.',
  ],
};

export const schoolFeatures = [
  'Premier ICSE institution located in the heart of the city',
  'Smart digital classrooms with hybrid learning modules',
  'Advanced Robotics, STEAM & Research Labs',
  'Unique iCube System of Education',
  'Strong focus on holistic development (academics & co-scholastics)',
  'Spacious electronic digital library',
  'School Cinema – structured life-skill learning program',
  'Multifaceted sports complex with double squash courts',
  'Air-conditioned transport with live GPS tracking',
  'Real-time parent communication app',
  'Global exposure through AFS Intercultural Programs',
  'Competitive exam training with exclusive tie-up with Vedantu',
];
