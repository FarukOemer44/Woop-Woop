/* Die Mechanik. Zum Anpassen der Texte reicht assets/inhalte.js. */

(function () {
  "use strict";

  var SPEICHER = "karten-geoeffnet-v1";

  var gitter    = document.getElementById("gitter");
  var brief     = document.getElementById("brief");
  var balken    = document.getElementById("balken");
  var zaehler   = document.getElementById("zaehler");
  var gesamt    = document.getElementById("gesamt");
  var konfetti  = document.getElementById("konfetti");

  var offen = ladeStand();
  var freigeschaltet = false;

  /* ── Kopf, Brief und Fuß mit den Inhalten füllen ── */

  document.getElementById("kopf-gruss").textContent = KOPF.gruss;
  document.getElementById("kopf-titel").textContent = KOPF.titel;
  document.getElementById("kopf-unter").innerHTML   = KOPF.unter;
  document.getElementById("brief-titel").textContent     = BRIEF.titel;
  document.getElementById("brief-text").innerHTML        = BRIEF.text;
  document.getElementById("brief-signatur").textContent  = BRIEF.signatur;
  document.getElementById("fuss-notiz").textContent      = FUSS;
  document.title = "Für " + NAMEN.fuerSie;
  gesamt.textContent = KARTEN.length;

  /* ── Karten bauen ── */

  KARTEN.forEach(function (karte, i) {
    var knopf = document.createElement("button");
    knopf.type = "button";
    knopf.className = "karte";
    knopf.style.setProperty("--i", i);
    knopf.setAttribute("aria-expanded", "false");

    knopf.innerHTML =
      '<span class="karte__innen">' +
        '<span class="karte__seite karte__seite--vorn">' +
          '<span class="karte__nummer">' + roemisch(i + 1) + "</span>" +
          '<span class="karte__frage">' + karte.frage + "</span>" +
          '<span class="karte__hinweis">Umdrehen <span>&rarr;</span></span>' +
        "</span>" +
        '<span class="karte__seite karte__seite--hinten" aria-hidden="true">' +
          '<span class="karte__antwort">' + karte.antwort + "</span>" +
          '<span class="karte__zu">Nochmal umdrehen</span>' +
        "</span>" +
      "</span>";

    knopf.addEventListener("click", function () {
      umdrehen(knopf, i);
    });

    gitter.appendChild(knopf);

    if (offen.indexOf(i) !== -1) setOffen(knopf, true);
  });

  aktualisiere(false);

  /* ── Umdrehen ── */

  function umdrehen(knopf, i) {
    var jetztOffen = !knopf.classList.contains("ist-offen");
    setOffen(knopf, jetztOffen);

    var pos = offen.indexOf(i);
    if (jetztOffen && pos === -1) offen.push(i);
    if (!jetztOffen && pos !== -1) offen.splice(pos, 1);

    speichereStand();
    aktualisiere(true);
  }

  function setOffen(knopf, ja) {
    knopf.classList.toggle("ist-offen", ja);
    knopf.setAttribute("aria-expanded", ja ? "true" : "false");
    var vorn   = knopf.querySelector(".karte__seite--vorn");
    var hinten = knopf.querySelector(".karte__seite--hinten");
    vorn.setAttribute("aria-hidden", ja ? "true" : "false");
    hinten.setAttribute("aria-hidden", ja ? "false" : "true");
  }

  /* ── Fortschritt und Freischaltung ── */

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

  /* ── Blütenregen ── */

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

    setTimeout(function () {
      konfetti.innerHTML = "";
    }, 15000);
  }

  /* ── Zurücksetzen ── */

  document.getElementById("reset").addEventListener("click", function () {
    offen = [];
    speichereStand();
    Array.prototype.forEach.call(gitter.children, function (knopf) {
      setOffen(knopf, false);
    });
    aktualisiere(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ── Hilfsmittel ── */

  function roemisch(n) {
    var werte = [10, 9, 5, 4, 1];
    var zeichen = ["X", "IX", "V", "IV", "I"];
    var aus = "";
    for (var i = 0; i < werte.length; i++) {
      while (n >= werte[i]) { aus += zeichen[i]; n -= werte[i]; }
    }
    return aus;
  }

  function ladeStand() {
    try {
      var roh = window.localStorage.getItem(SPEICHER);
      var liste = roh ? JSON.parse(roh) : [];
      return Array.isArray(liste)
        ? liste.filter(function (n) { return typeof n === "number" && n < KARTEN.length; })
        : [];
    } catch (e) {
      return [];
    }
  }

  function speichereStand() {
    try {
      window.localStorage.setItem(SPEICHER, JSON.stringify(offen));
    } catch (e) { /* Privater Modus — dann eben ohne Merken. */ }
  }
})();
