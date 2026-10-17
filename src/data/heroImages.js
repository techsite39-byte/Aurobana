const unsplash = (photoId, position = 'center') => ({
  src: `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=2200&q=88`,
  position,
});

export const heroImages = {
  intro: {
    ...unsplash('photo-1509062522246-3755977927d7', 'center 44%'),
    alt: 'Students learning together in a bright classroom',
  },
  school: {
    ...unsplash('photo-1503676260728-1c00da094a0b', 'center 42%'),
    alt: 'A student reading in a welcoming school environment',
  },
  community: {
    ...unsplash('photo-1427504494785-3a9ca7044f45', 'center 46%'),
    alt: 'Students collaborating around a classroom table',
  },
  motto: {
    ...unsplash('photo-1529390079861-591de354faf5', 'center 40%'),
    alt: 'Students sharing a moment of discovery in class',
  },
  vision: {
    ...unsplash('photo-1577896851231-70ef18881754', 'center 42%'),
    alt: 'A teacher guiding students in a modern classroom',
  },
};
