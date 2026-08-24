/* The mechanics. To change any text, picture or position, edit assets/inhalte.js. */

(function () {
  "use strict";

  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);

  var gitter   = document.getElementById("gitter");
  var streu    = document.getElementById("streu");
  var brief    = document.getElementById("brief");
  var balken   = document.getElementById("balken");
  var zaehler  = document.getElementById("zaehler");
  var gesamt   = document.getElementById("gesamt");
  var konfetti = document.getElementById("konfetti");

  /* Cards always start face down — nothing is remembered between visits. */
  var offen = [];
  var freigeschaltet = false;

  /* ── texts ── */

  document.getElementById("kopf-gruss").textContent = KOPF.gruss;
  document.getElementById("kopf-titel").textContent = KOPF.titel;
  document.getElementById("kopf-unter").innerHTML   = KOPF.unter;
  document.getElementById("brief-titel").textContent    = BRIEF.titel;
  document.getElementById("brief-text").innerHTML       = BRIEF.text;
  document.getElementById("brief-signatur").textContent = BRIEF.signatur;
  document.getElementById("fuss-notiz").textContent     = FUSS;
  document.title = "For " + NAMEN.fuerSie;
  gesamt.textContent = KARTEN.length;

  /* ── the memes floating around the page ── */

  (typeof STREUUNG === "undefined" ? [] : STREUUNG).forEach(function (st, i) {
    var el = document.createElement("figure");
    el.className = "streu__stueck streu__stueck--" + (st.seite || "links");
    el.style.setProperty("--oben", st.oben + "%");
    el.style.setProperty("--breite", st.breite + "px");
    el.style.setProperty("--drehung", st.drehung + "deg");
    el.style.setProperty("--schweb", (i % 4) * 0.9 + "s");
    el.innerHTML = '<img src="assets/media/' + st.datei +
                   '" alt="" loading="lazy" decoding="async">';
    streu.appendChild(el);
  });

  /* ── the cards ── */

  KARTEN.forEach(function (karte, i) {
    var knopf = document.createElement("button");
    knopf.type = "button";
    knopf.className = "karte";
    knopf.style.setProperty("--i", i);
    knopf.setAttribute("aria-expanded", "false");

    var bild = karte.bild
      ? '<span class="karte__bild"><img src="assets/media/' + karte.bild +
        '" alt="" loading="lazy" decoding="async"></span>'
      : "";

    knopf.innerHTML =
      '<span class="karte__innen">' +
        '<span class="karte__seite karte__seite--vorn">' +
          '<span class="karte__nummer">' + roemisch(i + 1) + "</span>" +
          '<span class="karte__frage">' + karte.frage + "</span>" +
          '<span class="karte__hinweis">Flip <span>&rarr;</span></span>' +
        "</span>" +
        '<span class="karte__seite karte__seite--hinten' +
          (karte.bild ? " hat-bild" : "") + '" aria-hidden="true">' +
          bild +
          '<span class="karte__antwort">' + karte.antwort + "</span>" +
          '<span class="karte__zu">Flip back</span>' +
        "</span>" +
      "</span>";

    knopf.addEventListener("click", function () { umdrehen(knopf, i); });
    gitter.appendChild(knopf);
  });

  aktualisiere(false);

  function umdrehen(knopf, i) {
    var jetztOffen = !knopf.classList.contains("ist-offen");
    setOffen(knopf, jetztOffen);

    var pos = offen.indexOf(i);
    if (jetztOffen && pos === -1) offen.push(i);
    if (!jetztOffen && pos !== -1) offen.splice(pos, 1);

    aktualisiere(true);
  }

  function setOffen(knopf, ja) {
    knopf.classList.toggle("ist-offen", ja);
    knopf.setAttribute("aria-expanded", ja ? "true" : "false");
    knopf.querySelector(".karte__seite--vorn").setAttribute("aria-hidden", ja ? "true" : "false");
    knopf.querySelector(".karte__seite--hinten").setAttribute("aria-hidden", ja ? "false" : "true");
  }

  /* ── progress and the final letter ── */

  function aktualisiere(livegeklickt) {
    var anzahl = offen.length;
    zaehler.textContent = anzahl;
    balken.style.setProperty("--p", KARTEN.length ? anzahl / KARTEN.length : 0);

    var alle = anzahl === KARTEN.length && KARTEN.length > 0;

    if (alle && !freigeschaltet) {
      freigeschaltet = true;
      brief.hidden = false;
      if (livegeklickt) {
        bluetenregen();
        setTimeout(function () {
          brief.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 700);
      }
    } else if (!alle && freigeschaltet) {
      freigeschaltet = false;
      brief.hidden = true;
    }
  }

  function bluetenregen() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var zeichen = ["❥", "✿", "❤", "❀"];

    for (var i = 0; i < 22; i++) {
      var b = document.createElement("span");
      b.className = "blatt";
      b.textContent = zeichen[i % zeichen.length];
      b.style.left = (Math.random() * 100).toFixed(2) + "vw";
      b.style.setProperty("--gr", (11 + Math.random() * 16).toFixed(0) + "px");
      b.style.setProperty("--dauer", (7 + Math.random() * 5).toFixed(1) + "s");
      b.style.setProperty("--verzug", (Math.random() * 2.5).toFixed(1) + "s");
      b.style.setProperty("--drehung", (180 + Math.random() * 420).toFixed(0) + "deg");
      konfetti.appendChild(b);
    }
    setTimeout(function () { konfetti.innerHTML = ""; }, 15000);
  }

  /* ── intro + music ────────────────────────────────────────────────
     The track runs the whole time, on repeat, from the very top.
     Browsers block sound before the first gesture, so if autoplay is
     refused we simply start on whatever she touches first — no button. */

  var audio   = document.getElementById("musik-quelle");
  var startEl = document.getElementById("start");
  var video   = document.getElementById("start-video");

  var abSekunde = MUSIK.start || 0;
  var bereit    = false;   // Metadaten da? Vorher kann man nicht spulen.
  var gewollt   = false;   // Darf laufen (Autoplay erlaubt oder Geste passiert)?

  audio.src = MUSIK.datei;
  audio.loop = false;      // wir schleifen selbst, sonst faengt es bei 0 an
  audio.volume = MUSIK.lautstaerke;

  audio.addEventListener("loadedmetadata", function () {
    bereit = true;
    zumStart();
    if (gewollt) spiele();
  });

  audio.addEventListener("ended", function () {
    zumStart();
    spiele();
  });

  function zumStart() {
    try {
      if (abSekunde > 0 && abSekunde < (audio.duration || Infinity)) {
        audio.currentTime = abSekunde;
      }
    } catch (e) { /* Browser mag noch nicht spulen */ }
  }

  function spiele() {
    var p = audio.play();
    if (p && p.catch) p.catch(function () { /* wartet auf eine Geste */ });
  }

  /* Erst versuchen wir es direkt — die meisten Browser lehnen ab.
     Dann reicht die erste Beruehrung irgendwo auf der Seite. */
  function versucheMusik() {
    gewollt = true;
    if (!bereit) return;      // loadedmetadata uebernimmt gleich
    if (!audio.paused) return;
    spiele();
  }

  versucheMusik();

  var gesten = ["pointerdown", "touchstart", "keydown", "wheel", "scroll"];
  gesten.forEach(function (ev) {
    document.addEventListener(ev, ersteGeste, { capture: true, passive: true });
  });

  function ersteGeste() {
    versucheMusik();
    if (!audio.paused) {
      gesten.forEach(function (ev) {
        document.removeEventListener(ev, ersteGeste, { capture: true });
      });
    }
  }

  /* the intro animation */

  if (START.video) {
    document.body.classList.add("start-offen");
    document.getElementById("start-hinweis").textContent = START.hinweis;
    video.src = START.video;

    var vp = video.play();
    if (vp && vp.catch) vp.catch(function () { /* poster stays, tap continues */ });

    video.addEventListener("ended", introZu);
    startEl.addEventListener("click", introZu);
  } else {
    startEl.remove();
  }

  var introFertig = false;

  function introZu() {
    if (introFertig) return;
    introFertig = true;
    versucheMusik();
    startEl.classList.add("start--weg");
    document.body.classList.remove("start-offen");
    window.scrollTo(0, 0);
    setTimeout(function () { startEl.remove(); }, 900);
  }

  /* ── helper ── */

  function roemisch(n) {
    var werte = [10, 9, 5, 4, 1];
    var zeichen = ["X", "IX", "V", "IV", "I"];
    var aus = "";
    for (var i = 0; i < werte.length; i++) {
      while (n >= werte[i]) { aus += zeichen[i]; n -= werte[i]; }
    }
    return aus;
  }
})();
