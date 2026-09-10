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
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Cole_Canoe_Base_Boy_Scout_Campfire.JPG/1280px-Cole_Canoe_Base_Boy_Scout_Campfire.JPG",
    caption: "Campfire evening",
    date: "Sample photo",
    category: "camping",
    credit: "Wiblackburn, CC BY-SA 3.0, via Wikimedia Commons"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pfadi_Arbor_Felix_Nachtaufnahme.jpg/1280px-Pfadi_Arbor_Felix_Nachtaufnahme.jpg",
    caption: "Camp under the stars",
    date: "Sample photo",
    category: "camping",
    credit: "Florko97, CC BY-SA 4.0, via Wikimedia Commons"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Hunza_Valley%2C_view_from_Eagle%27s_Nest.jpg/1280px-Hunza_Valley%2C_view_from_Eagle%27s_Nest.jpg",
    caption: "Hunza Valley from Eagle's Nest",
    date: "Trekking country",
    category: "camping",
    credit: "Alllexxxis, CC BY-SA 4.0, via Wikimedia Commons"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Rakaposhi_%28Domani%29.jpg/1280px-Rakaposhi_%28Domani%29.jpg",
    caption: "Rakaposhi from Domani",
    date: "Trekking country",
    category: "camping",
    credit: "Kinetic84, CC BY-SA 4.0, via Wikimedia Commons"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/a/ac/BP_and_future_Scouts_at_Brownsea.jpg",
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
