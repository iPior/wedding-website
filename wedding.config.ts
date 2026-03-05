export const weddingConfig = {
  locales: ["en", "pl"],
  defaultLocale: "en",
  couple: {
    person1: { firstName: "Natalie", lastName: "Sikora" },
    person2: { firstName: "Piotr", lastName: "Szaran" },
  },
  date: "2026-07-18T14:30:00",
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
  rsvpDeadline: "2026-06-01T23:59:59",
  theme: {
    primaryColor: "#8B7355",
    accentColor: "#D4C5A9",
    fontFamily: "Playfair Display",
  },
  schedule: [
    { time: "2:30 PM" },
    { time: "6:00 PM" },
    { time: "7:00 PM" },
  ],
  ourStory: {
    milestones: [
      {
        year: "June 1999",
        image: "/images/our-story/1999.jpg",
      },
      {
        year: "September 2022",
        image: "",
      },
      {
        year: "January 2023",
        image: "",
      },
      {
        year: "February 2023",
        image: "",
      },
      {
        year: "June 2023",
        image: "",
      },
      {
        year: "October 2023",
        // image: "/images/our-story/2023.JPEG",
        image: "",
      },
      {
        year: "January 2024",
        image: "",
      },
      {
        year: "July 2025",
        image: "/images/our-story/2025.JPG",
      },
    ],
  },
  bridalParty: [
    {
      name: "Jacob Chmura",
      role: "Best Man",
      image: "/images/bridal-party/jacob.jpeg",
    },
    {
      name: "Madison Coelho",
      role: "Maid of Honor",
      image: "/images/bridal-party/madison.jpeg",
    },
    {
      name: "Peter Lewy",
      role: "Groomsman",
      image: "",
    },
    {
      name: "Lilianna Mikuljan",
      role: "Bridesmaid",
      image: "/images/bridal-party/lilianna.JPG",
    },
    {
      name: "Alex Johne",
      role: "Groomsman",
      image: "/images/bridal-party/alex.jpeg",
    },
    {
      name: "Madison Terrataca",
      role: "Bridesmaid",
      image: "/images/bridal-party/maddiet.jpeg",
    },
    {
      name: "Jacob Sikora",
      role: "Groomsman",
      image: "",
    },
    {
      name: "Viki Baniak",
      role: "Bridesmaid",
      image: "/images/bridal-party/viki.jpeg",
    },
    {
      name: "Jakub Szaran",
      role: "Groomsman",
      image: "/images/bridal-party/cuba.JPG",
    },
    {
      name: "Julia Szaran",
      role: "Bridesmaid",
      image: "",
    },
  ],
} as const;
