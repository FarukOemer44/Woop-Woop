/* ═══════════════════════════════════════════════════════════════════
   EVERYTHING YOU EDIT IS IN THIS FILE.  Leave the others alone.

   - names, headline, cards, final letter
   - add or remove cards freely, the count doesn't matter
   - STREUUNG = the memes floating around the page
   - a card can also carry its own picture with  bild: "file.webp"
   ═══════════════════════════════════════════════════════════════════ */

const NAMEN = {
  fuerSie: "Mali",
  vonMir: "Ömer",
};

const KOPF = {
  gruss: "For Mali",
  titel: "I wish I could be next to you",
  // the <em> part is highlighted in red italics:
  unter: "…to baby you and hold your hands. <em>Tap a card</em> — the answer is on the back.",
};

/* Runs from the very top, on repeat, the whole time. */
const MUSIK = {
  datei: "assets/media/musik.mp3",
  start: 40,           // seconds — where the track begins, every single loop
  lautstaerke: 0.35,   // 0 = silent, 1 = full blast
};

/* The intro she sees first: the animation plays, then the cards appear.
   A tap anywhere skips it. */
const START = {
  video: "assets/media/intro.mp4",
  hinweis: "sound on 🔊 — tap to continue",
};

/* The memes floating around the page — same scatter on phone and desktop.
   oben = percent down the page, seite = which edge, breite = px, drehung = deg. */
const STREUUNG = [
  { datei: "hot-gf.webp",     oben:  3, seite: "links",  breite: 247, drehung: -6 },
  { datei: "nice-guy.gif",    oben: 11, seite: "rechts", breite: 214, drehung:  6 },
  { datei: "finn.gif",        oben: 21, seite: "links",  breite: 205, drehung: -7 },
  { datei: "drachenlord.gif", oben: 31, seite: "rechts", breite: 266, drehung: -4 },
  { datei: "crying.webp",     oben: 42, seite: "links",  breite: 201, drehung:  5 },
  { datei: "huh-cat.gif",     oben: 52, seite: "rechts", breite: 232, drehung:  3 },
  { datei: "cat.webp",        oben: 62, seite: "links",  breite: 195, drehung:  4 },
  { datei: "boy-love.webp",   oben: 71, seite: "rechts", breite: 253, drehung: -5 },
  { datei: "drachenlord.gif", oben: 82, seite: "links",  breite: 221, drehung: -9 },
  { datei: "hot-gf.webp",     oben: 90, seite: "rechts", breite: 208, drehung:  8 },
];

const KARTEN = [
  {
    frage: "What I love about you",
    antwort: "Well — everything. Your eyes, your funny side, your loving side, your crafty side. Legitimately everything. You make me feel like I can forget all the stress when I'm with you.",
  },
  {
    frage: "What I think about when you're not here",
    antwort: "I'm crying because I miss you 😢 peace out. …Spaß. But really: I miss you.",
  },
  {
    frage: "What I never thanked you enough for",
    antwort: "For making me feel like I can relax for once and just enjoy the time.",
  },
  {
    frage: "The first thing I noticed about you",
    antwort: "Your bright smile and your eyes. How well-spoken you are, and how extremely funny you were. I had butterflies in my stomach the whole time.",
  },
  {
    frage: "Everything I still want to do with you",
    antwort: "I WANT TO SEE EVERYTHING WITH YOU. I want to go on vacation with you, laugh with you. I want to see everything with you.",
  },
  {
    frage: "What I've learned from you",
    antwort: "I learned a lot from you — I don't think I could ever list it all. You make me a better person, and I learn something from you every single time. I'm grateful for that.",
  },
];

/* Only shows up once she has flipped EVERY card. */
const BRIEF = {
  titel: "One more thing",
  text: "Six cards aren't enough. There would be a hundred more questions, and every single answer would point right back at you.",
  signatur: "Always yours, Ömer",
};

const FUSS = "Made for you. Drag the pictures around.";
