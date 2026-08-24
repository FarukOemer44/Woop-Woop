/* ═══════════════════════════════════════════════════════════════════
   EVERYTHING YOU EDIT IS IN THIS FILE.  Leave the others alone.

   - names, headline, cards, final letter
   - "bild" is optional: a file inside assets/media/  (webp, gif, jpg, png)
   - add or remove cards freely, the count doesn't matter
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

const MUSIK = {
  datei: "assets/media/musik.mp3",
  titel: "Drachenlord singt Adel Tawil",
  lautstaerke: 0.35,   // 0 = silent, 1 = full blast
};

const KARTEN = [
  {
    frage: "What I love about you",
    antwort: "Well — everything. Your eyes, your funny side, your loving side, your crafty side. Legitimately everything. You make me feel like I can forget all the stress when I'm with you.",
    bild: "hot-gf.webp",
  },
  {
    frage: "What I think about when you're not here",
    antwort: "I'm crying because I miss you 😢 peace out. …Spaß. But really: I miss you.",
    bild: "cat.webp",
  },
  {
    frage: "What I never thanked you enough for",
    antwort: "For making me feel like I can relax for once and just enjoy the time.",
  },
  {
    frage: "The first thing I noticed about you",
    antwort: "Your bright smile and your eyes. How well-spoken you are, and how extremely funny you were. I had butterflies in my stomach the whole time.",
    bild: "boy-love.webp",
  },
  {
    frage: "Everything I still want to do with you",
    antwort: "I WANT TO SEE EVERYTHING WITH YOU. I want to go on vacation with you, laugh with you. I want to see everything with you.",
    bild: "nice-guy.gif",
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

const FUSS = "Made for you.";
