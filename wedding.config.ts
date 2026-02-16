export const weddingConfig = {
  couple: {
    person1: { firstName: "Natalie", lastName: "Sikora" },
    person2: { firstName: "Piotr", lastName: "Szaran" },
  },
  date: "2026-07-18T14:30:00",
  tagline: "We're getting married!",
  venue: {
    ceremony: {
      name: "St. Maximilian Kolbe Catholic Church",
      address: "4260 Cawthra Rd, Mississauga, ON L4Z 1V8",
    },
    reception: {
      name: "Millenium Gardens Banquet Centre",
      address: "20 Polonia Ave, Brampton, ON L6Y 5W8",
    },
  },
  rsvpDeadline: "2026-09-01T23:59:59",
  theme: {
    primaryColor: "#8B7355",
    accentColor: "#D4C5A9",
    fontFamily: "Playfair Display",
  },
  schedule: [
    { time: "2:30 PM", event: "Ceremony" },
    { time: "6:00 PM", event: "Cocktail Hour" },
    { time: "7:00 PM", event: "Reception" },
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
  ourStory: {
    title: "Our Story",
    intro:
      "From a chance meeting to a lifetime together — here's how it all began.",
    milestones: [
      {
        year: "2019",
        title: "How We Met",
        description:
          "We met through mutual friends at a summer barbecue and hit it off immediately.",
      },
      {
        year: "2020",
        title: "First Date",
        description:
          "A walk along the waterfront turned into hours of conversation and laughter.",
      },
      {
        year: "2022",
        title: "Moved In Together",
        description:
          "We took the leap and got our first apartment together in Toronto.",
      },
      {
        year: "2025",
        title: "The Proposal",
        description:
          "A surprise trip to the mountains ended with the most important question.",
      },
    ],
  },
  bridalParty: [
    {
      name: "Jacob Chmura",
      role: "Best Man",
      image: "",
      bio: "",
    },
    {
      name: "Madison Coehlo",
      role: "Maid of Honor",
      image: "",
      bio: "",
    },
    {
      name: "Alex Johne",
      role: "Groomsman",
      image: "",
      bio: "",
    },
    {
      name: "Liliana",
      role: "Bridesmaid",
      image: "",
      bio: "",
    },
    {
      name: "Peter Lewy",
      role: "Groomsman",
      image: "",
      bio: "",
    },
    {
      name: "Madison Terrataca",
      role: "Bridesmaid",
      image: "",
      bio: "",
    },
    {
      name: "Jakub Szaran",
      role: "Groomsman",
      image: "",
      bio: "",
    },
    {
      name: "Viki Baniak",
      role: "Bridesmaid",
      image: "",
      bio: "",
    },
    {
      name: "Jacob Sikora",
      role: "Groomsman",
      image: "",
      bio: "",
    },
    {
      name: "Julia Szaran",
      role: "Bridesmaid",
      image: "",
      bio: "",
    },
  ],
} as const;
