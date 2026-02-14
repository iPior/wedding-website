export const weddingConfig = {
  couple: {
    person1: { firstName: "Natalie", lastName: "Sikora" },
    person2: { firstName: "Piotr", lastName: "Szaran" },
  },
  date: "2026-07-18T14:30:00",
  tagline: "We're getting married!",
  venue: {
    ceremony: {
      name: "St. Mary's Chapel",
      address: "123 Main St, Toronto, ON",
    },
    reception: {
      name: "The Grand Hall",
      address: "456 Oak Ave, Toronto, ON",
    },
  },
  rsvpDeadline: "2026-09-01T23:59:59",
  theme: {
    primaryColor: "#8B7355",
    accentColor: "#D4C5A9",
    fontFamily: "Playfair Display",
  },
  schedule: [
    { time: "4:00 PM", event: "Ceremony" },
    { time: "5:00 PM", event: "Cocktail Hour" },
    { time: "6:00 PM", event: "Reception" },
    { time: "10:00 PM", event: "Last Dance" },
  ],
  faq: [
    {
      question: "What is the dress code?",
      answer: "Semi-formal / cocktail attire.",
    },
    {
      question: "Is there parking?",
      answer: "Yes, free parking is available at the venue.",
    },
    {
      question: "Can I bring a plus one?",
      answer:
        "Plus ones have been pre-assigned. Please check your RSVP for details.",
    },
    {
      question: "Are children welcome?",
      answer:
        "We love your little ones! However, this will be an adults-only celebration.",
    },
    {
      question: "What if I have dietary restrictions?",
      answer:
        "You can note any dietary restrictions when you RSVP and we'll make sure you're taken care of.",
    },
  ],
  accommodations: {
    hotel: "The Grand Hotel",
    address: "789 Elm St, Toronto, ON",
    bookingUrl: "https://example.com/booking",
    note: "Block rate available under 'Smith-Rivera Wedding'.",
  },
  registry: {
    url: "https://example.com/registry",
    label: "View Our Registry",
  },
  bridalParty: [
    {
      name: "Sam Taylor",
      role: "Best Man",
      image: "/images/bridal-party/sam.jpg",
      bio: "Friend from college.",
    },
    {
      name: "Jamie Lee",
      role: "Maid of Honor",
      image: "/images/bridal-party/jamie.jpg",
      bio: "Childhood best friend.",
    },
    {
      name: "Chris Park",
      role: "Groomsman",
      image: "",
      bio: "College roommate and adventure buddy.",
    },
    {
      name: "Taylor Kim",
      role: "Bridesmaid",
      image: "",
      bio: "Met through work and became instant friends.",
    },
  ],
} as const;
