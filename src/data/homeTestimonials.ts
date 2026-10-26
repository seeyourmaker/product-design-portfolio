export type HomeTestimonial = {
  id: string;
  original: string | null;
  unfiltered: string | null;
  author: string | null;
  role: string | null;
};

// The owner will provide approved homepage testimonials. Keep these slots
// visibly labeled until then; never present placeholder copy as an endorsement.
export const homeTestimonials: HomeTestimonial[] = [
  {id: 'testimonial-01', original: null, unfiltered: null, author: null, role: null},
  {id: 'testimonial-02', original: null, unfiltered: null, author: null, role: null},
  {id: 'testimonial-03', original: null, unfiltered: null, author: null, role: null},
];
