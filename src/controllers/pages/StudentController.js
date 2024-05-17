/**
 * ------------------------------
 *          STUDENT PAGE
 * ------------------------------
 */

export const studentPage = (req, res) => {
    const cards = [
        {
            "link": "student-detail.html",
            "title": "Aanwezigheid hoor- en werkcolleges",
            "description": "Mees heeft alle colleges en workshops regelmatig bijgewoond. Hij heeft grote toewijding getoond en actief deelgenomen aan de lessen."
        },
        {
            "link": "student-detail.html",
            "title": "Participatie tijdens colleges",
            "description": "Mees heeft tijdens de colleges actief deelgenomen en waardevolle inzichten gedeeld met de groep.",
            "stars": [
                { "filled": true },
                { "filled": true },
                { "filled": true },
                { "filled": false },
                { "filled": false }
            ]
        },
        {
            "link": "student-detail.html",
            "title": "Prestatie oefeningen/opdrachten",
            "description": "Mees heeft consistent sterke prestaties geleverd bij het uitvoeren van opdrachten en oefeningen, waarbij hij complexe problemen effectief heeft aangepakt."
        },
        {
            "link": "student-detail.html",
            "title": "Vak gerelateerde informatie",
            "description": "Mees heeft waardevolle inzichten gedeeld tijdens de lessen en heeft blijk gegeven van diepgaand begrip van de vakinhoud."
        },
        {
            "link": "student-detail.html",
            "title": "Status student",
            "description": "Mees heeft een uitstekende academische status behouden gedurende het semester, met consistente inzet en uitmuntende resultaten."
        },
        {
            "link": "student-detail.html",
            "title": "Coaching",
            "description": "Mees heeft aanzienlijke vooruitgang geboekt dankzij de individuele coachingssessies, waarbij hij zijn vaardigheden en zelfvertrouwen heeft ontwikkeld. Verdere coaching is niet vereist."
        },
        {
            "title": "Werkplekleren",
            "description": "Informatie nog niet van toepassing/niet beschikbaar.",
            "locked": true
        }
    ];

    res.render('student', { cards });
};

export default studentPage;
