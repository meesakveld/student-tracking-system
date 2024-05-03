## Project README

### Table of Contents
- [Algemene informatie](#algemene-informatie)
- [Omschrijving](#omschrijving)
- [Architectuur](#architectuur)
- [Features](#features)
- [Nice to haves](#nice-to-haves)

---

### Algemene informatie
Deze webapplicatie is ontworpen om studenten te volgen tijdens hun opleiding, inclusief hoor- en werkcolleges, gesprekken (coaching- en trajectgesprekken), en werkplekleren. Het doel is om docenten, leercoaches, trajectcoaches, diversiteitscoaches en teamleiders in staat te stellen deze opvolging uit te voeren.

### Omschrijving
De opvolging van studenten omvat onder andere:
- Registratie van aanwezigheid tijdens hoor- en werkcolleges
- Evaluatie van participatie tijdens colleges
- Beoordeling van prestaties op oefeningen/opdrachten
- Documentatie van informatie uit wisselgesprekken door coaches
- Vastleggen van informatie ingevoerd door docenten
- Bijhouden van de status van studenten in de opleiding, zoals ziekte, inactief, etc.

Studenten kunnen ook werkplekleren tijdens de opleiding en dit in verschillende vakken van @Work 1 t.e.m. @Work 5.

### Architectuur
- **Back-end:**
  - Express.js
  - Templating: Handlebars
  - Database: PostgreSQL
  - Database management: Knex + Objection

- **Front-end:**
  - HTML
  - CSS (+tailwindcss)
  - JavaScript (modulair)

Front-end kan eventueel met het React-framework worden ontwikkeld. 

### Features
- Courante modellen voor onderwijsprogramma, programmaonderdeel, en vak.
- Verschillende gebruikersrollen zoals Administrator, Docent, Student, Trajectcoach, etc.
- Functionaliteiten voor coaching, labelling van studenten, en statusbeheer.
- Mogelijkheid tot het invoeren en bekijken van aanwezigheden/afwezigheden.
- Opvolging tijdens hoor- en werkcolleges met opmerkingen per student.

---

### Nice to haves
- Ontvangen van meldingen bij wijzigingen gelinkt aan specifieke personen.
- PDF-generatie voor aanwezigheden per vak en per week (globaal).
- Beheren van externe contacten:
  - Organisaties met details zoals naam, omschrijving, contactgegevens, etc.
  - Mogelijkheid tot screening en plaatsen op zwarte lijst.
  - Werkplekmentoren met persoonlijke informatie en functie.
- Toevoegen van vormen van werkplekleren:
  - Verschillende typen werkplekleren zoals realistische case, gastcollege, etc.
  - Details zoals titel, omschrijving, takenpakket, etc.
- Opvolging tijdens werkplekleren:
  - Toevoegen van leerdoelen per opleiding met bijbehorend gewicht.
  - Evaluatie van leerdoelen door werkplekmentor.
  - Wekelijkse reflecties en actiepunten door studenten.
  - Beheer van projecten en evaluaties door werkplekmentor.
- Extra functies:
  - Meldingen bij aanpassingen gelinkt aan specifieke personen.
  - PDF-generatie van opvolgrooster, reflecties, en projectoverzicht.

---

*© 2024 - Dit project is ontwikkeld door Arteveldehogeschool.*