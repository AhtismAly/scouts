/* ------------------------------------------------------------------
   ACTIVITIES GALLERY DATA
   ------------------------------------------------------------------
   To add a photo:
     1. Copy the image into  assets/activities/
     2. Add an entry below. Fields:
        src: path to the image (or a full https:// URL)
        caption: short title shown on the tile
        date: free text, e.g. "August 2026"
        category: one of: camping | service | ceremony | training | sports | culture
        credit: (optional) photographer / licence note
     3. Commit & push. That's it, no build step.

   The sample entries below use openly-licensed photos from Wikimedia
   Commons so the gallery is not empty on day one. Replace them with
   your own Ismaili Scouts photos as they come in.
------------------------------------------------------------------- */
window.ACTIVITIES = [
  {
    src: "assets/images/scout-campfire.jpg",
    caption: "Campfire evening",
    date: "Sample photo",
    category: "camping",
    credit: "Wiblackburn, CC BY-SA 3.0, via Wikimedia Commons"
  },
  {
    src: "assets/images/scout-camp-night.jpg",
    caption: "Camp under the stars",
    date: "Sample photo",
    category: "camping",
    credit: "Florko97, CC BY-SA 4.0, via Wikimedia Commons"
  },
  {
    src: "assets/images/hunza-eagles-nest.jpg",
    caption: "Hunza Valley from Eagle's Nest",
    date: "Trekking country",
    category: "camping",
    credit: "Alllexxxis, CC BY-SA 4.0, via Wikimedia Commons"
  },
  {
    src: "assets/images/rakaposhi.jpg",
    caption: "Rakaposhi from Domani",
    date: "Trekking country",
    category: "camping",
    credit: "Kinetic84, CC BY-SA 4.0, via Wikimedia Commons"
  },
  {
    src: "assets/images/brownsea-1907.jpg",
    caption: "Baden-Powell with the first Scouts, Brownsea Island, 1907",
    date: "Heritage",
    category: "ceremony",
    credit: "Public domain, via Wikimedia Commons"
  }
  /* Add your own photos below, e.g.
  {
    src: "assets/activities/winter-camp-2026.jpg",
    caption: "Winter camp, Gilgit",
    date: "January 2026",
    category: "camping"
  },
  */
];
