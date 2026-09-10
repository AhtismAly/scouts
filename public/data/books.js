/* ------------------------------------------------------------------
   BOOKS & RESOURCES DATA
   ------------------------------------------------------------------
   To add a book:
     1. (optional) put a cover image in  assets/books/  and a PDF in
        assets/books/  too, if you have the right to share it.
     2. Add an entry below. Fields:
        title, author, year, description
        cover: (optional) image path; if omitted a styled cover is generated
        tags: array of short labels, e.g. ["Handbook", "Scouts"]
        links: array of { label, href } buttons (read online / download)
        status: (optional) "available" | "coming-soon"
------------------------------------------------------------------- */
window.BOOKS = [
  {
    title: "Scouting for Boys",
    author: "Robert Baden-Powell",
    year: "1908",
    description: "The book that started it all. Written as a series of 'camp fire yarns', it laid down the Scout Law, the Promise and the patrol method that Ismaili Scouts still follow today.",
    tags: ["Classic", "Foundational"],
    links: [
      { label: "Find on Internet Archive", href: "https://archive.org/search?query=%22Scouting+for+Boys%22+Baden-Powell" },
      { label: "About the book", href: "https://en.wikipedia.org/wiki/Scouting_for_Boys" }
    ],
    status: "available"
  },
  {
    title: "Aids to Scoutmastership",
    author: "Robert Baden-Powell",
    year: "1919",
    description: "A short guide for leaders on the aims of Scouting (character, health, handcraft and service) and how a Scoutmaster brings them out in young people.",
    tags: ["Leaders", "Classic"],
    links: [
      { label: "Find on Internet Archive", href: "https://archive.org/search?query=%22Aids+to+Scoutmastership%22" }
    ],
    status: "available"
  },
  {
    title: "Rovering to Success",
    author: "Robert Baden-Powell",
    year: "1922",
    description: "Baden-Powell's book for Rovers, older Scouts stepping into adult life, on paddling your own canoe past the 'rocks' that lie in the way.",
    tags: ["Rovers", "Classic"],
    links: [
      { label: "Find on Internet Archive", href: "https://archive.org/search?query=%22Rovering+to+Success%22" }
    ],
    status: "available"
  },
  {
    title: "The Wolf Cub's Handbook",
    author: "Robert Baden-Powell",
    year: "1916",
    description: "The original handbook for the youngest section, the Wolf Cubs, known in the Ismaili Scouts as the Shaheen Unit.",
    tags: ["Cubs / Shaheen", "Classic"],
    links: [
      { label: "Find on Internet Archive", href: "https://archive.org/search?query=%22Wolf+Cub%27s+Handbook%22" }
    ],
    status: "available"
  },
  {
    title: "Ismaili Scouts Handbook",
    author: "Ismaili Scouts",
    year: "",
    description: "Our own handbook covering the Scout Promise and Law, uniform and badges, unit structure (Shaheen, Scout, Rover) and the programme of activities. Being prepared for publication here.",
    tags: ["Handbook", "Ismaili Scouts"],
    links: [],
    status: "coming-soon"
  },
  {
    title: "Knots, Pioneering & Camp Craft",
    author: "Ismaili Scouts training team",
    year: "",
    description: "Illustrated quick-reference for the essential knots, lashings and camp gadgets taught at our training camps.",
    tags: ["Training", "Skills"],
    links: [],
    status: "coming-soon"
  }
];
