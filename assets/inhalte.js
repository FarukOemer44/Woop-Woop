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

/* The long list at the bottom of the page. */
const GRUENDE = {
  titel: "50 reasons why I love you",
  unter: "In no particular order. I could keep going.",
  liste: [
    "I love how honest you are, even when the honest answer is the harder one.",
    "I love how gentle you are with anything smaller than you.",
    "I love that you are funny in a way I did not expect and never got used to.",
    "I love how seriously you take your family.",
    "I love that you still give love on days when you have nothing left over.",
    "I love how passionate you are about the things you care about.",
    "I love your values.",
    "I love your priorities, and that you actually stick to them.",
    "I love your style.",
    "I love your artsy side.",
    "I love how creative you are.",
    "I love that you know what you want and you say it.",
    "I love that you are warm without making a show of it.",
    "I love your smile, obviously.",
    "I love how you turn your head away when you are trying not to smile. I see it every time.",
    "I love how you laugh at your own jokes.",
    "I love your eyes when you have just woken up and have not decided anything about the day yet.",
    "I love your voice when you are telling a story you actually care about.",
    "I love your baby voice.",
    "I love holding your hands.",
    "I love the way you look at me when you think I am being ridiculous.",
    "I love your face when you open something and it is not what you expected.",
    "I love the way you say my name.",
    "I love that you pick the fuzz out of my beard like it is your job.",
    "I love that you take my hand without announcing it.",
    "I love your good morning. Every morning. Even on days you had no reason to.",
    "I love that you make a joke exactly when I need it and never when I do not.",
    "I love that you remember things I mentioned once.",
    "I love that you make every present by hand. I have kept all of them.",
    "I love that you ask about my day and then actually listen to the answer.",
    "I love sharing gum with you that has already been chewed. Disgusting. Would do it again.",
    "I love opening mystery boxes with you more than whatever is inside them.",
    "I love how you narrate stories from work with your whole body.",
    "I love how you explain your BL to me like I am going to be tested on it.",
    "I love the face you make when you are trying to make me angry on purpose.",
    "I love how much you feel a film",
    "I love every walk back to your place with you.",
    "I love that anywhere turns into our place the moment you are there.",
    "I love the way you fall asleep in my arms.",
    "I love when you reach your arms out when you sleepy so I can carry you to bed.",
    "I love how you kick me out of my own bed and how I just let you.",
    "I love when you say Eierkopf.",
    "I love the way we write in brackets.",
    "I love when we randomly switch to English for no reason at all.",
    "I love your sticker game. Unmatched.",
    "I love the random nonsense we send each other that would make no sense to anyone else.",
    "I love that we can also say nothing for a while and it is still fine.",
    "I love when you tell me something and are already laughing before you get to the end.",
    "I love that I can just be myself around you.",
    "I love that I can show my emotions around you.",
  ],
};

/* Only shows up once she has flipped EVERY card. */
const BRIEF = {
  titel: "One more thing",
  text: "Six cards aren't enough. There would be a hundred more questions, and every single answer would point right back at you.",
  signatur: "Always yours, Ömer",
};

const FUSS = "Made for you. Drag the pictures around.";
