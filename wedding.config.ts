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
      question: "What is the deadline to RSVP?",
      answer: "We kindly ask guests to respond no later than June 1, 2026.",
    },
    {
      question: "What is the dress code?",
      answer: "We invite our guests to dress in formal attire for the day.",
    },
    {
      question: "What time should I arrive?",
      answer:
        "The ceremony will begin promptly at 2:30pm. We suggest arriving 15 minutes early. Cocktail hour will begin at 6:00pm and guests are welcome to arrive anytime after.",
    },
    {
      question: "What happens between the ceremony and reception?",
      answer:
        "The bridal team will be using the 2.5 hour block to take photos and soak in that \"just married\" feeling. Feel free to head back home to relax, refresh, and prepare for a full evening of celebrating.",
    },
    {
      question: "Can I bring a plus one?",
      answer:
        "Plus-ones have been pre-assigned. Your plus one will pop-up when you RSVP.",
    },
    {
      question: "Is there parking?",
      answer:
        "Yes. There is free parking at both the ceremony and reception.",
    },
    {
      question: "What if I have dietary restrictions?",
      answer:
        "You can note any dietary restrictions when you RSVP and we will make sure you are taken care of.",
    },
  ],
  ourStory: {
    title: "Our Story",
    // intro:
      // "From a chance meeting to a lifetime together — here's how it all began.",
    milestones: [
      {
        year: "1999",
        title: "Where it all began",
        description:
          "Long before we’d ever meet, we were baptized at the same mass, in the same church where we’ll soon be getting married.",
        image: "/images/our-story/1999.jpg",
      },
      {
        year: "2022",
        title: "The night we first met",
        description:
          "We met at a mutual friend’s party. A few casual conversations, nothing too striking.",
        image: "",
      },
      {
        year: "2023",
        title: "Our First Date",
        description:
          "What was supposed to be a casual first date turned into hours of conversation. Right before Natalie left the country for a whole year.",
        image: "",
      },
      {
        year: "2024",
        title: "The End of Long Distance",
        description:
          "After a year of endless facetime calls and Piotr’s trip to visit Natalie in New Zealand, we were finally reunited and ready to start our lives together.",
        image: "",
      },
      {
        year: "2025",
        title: "The Proposal",
        description:
          "An exciting trip to Europe started off with an unforgettable proposal on a beautiful island in Greece during sunset.",
        image: "/images/our-story/2025.JPG",
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
      name: "Madison Coelho",
      role: "Maid of Honor",
      image: "/images/bridal-party/madison.jpeg",
      bio: "",
    },
    {
      name: "Peter Lewy",
      role: "Groomsman",
      image: "",
      bio: "",
    },
    {
      name: "Lilianna Mikuljan",
      role: "Bridesmaid",
      image: "/images/bridal-party/lilianna.JPG",
      bio: "",
    },
    {
      name: "Alex Johne",
      role: "Groomsman",
      image: "/images/bridal-party/alex.jpeg",
      bio: "",
    },
    {
      name: "Madison Terrataca",
      role: "Bridesmaid",
      image: "/images/bridal-party/maddiet.jpeg",
      bio: "",
    },
    {
      name: "Jacob Sikora",
      role: "Groomsman",
      image: "",
      bio: "",
    },
    {
      name: "Viki Baniak",
      role: "Bridesmaid",
      image: "/images/bridal-party/viki.jpeg",
      bio: "loves to crochet",
    },
    {
      name: "Jakub Szaran",
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
