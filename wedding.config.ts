export const weddingConfig = {
  couple: {
    person1: { firstName: "Jordan", lastName: "Smith" },
    person2: { firstName: "Alex", lastName: "Rivera" },
  },
  date: "2026-10-10T16:00:00",
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
  faq: [
    {
      question: "What is the dress code?",
      answer: "Semi-formal / cocktail attire.",
    },
    {
      question: "Is there parking?",
      answer: "Yes, free parking is available at the venue.",
    },
  ],
  bridalParty: [
    {
      name: "Sam Taylor",
      role: "Best Man",
      image: "/images/bridal-party/sam.jpg",
      bio: "Friend from college.",
    },
  ],
  mealOptions: ["Chicken", "Fish", "Vegetarian", "Vegan"],
} as const;
