/**
 * ------------------------------
 *          STUDENT PAGE
 * ------------------------------
 */

export const studentPage = (req, res) => {
    const student = {
        firstName: "Mees",
        lastName: "Akveld",
        email: "mees.ak@student.arteveldehs.be",
        class: "PGM1-C",
        studyYear: "2023-2024",
        status: "Werkstudent",
        role: "Ambassadeur",
        coach: "Isabelle Volckaert",
        workCoach: "Viktor Verhaeghe",
        workMentor: "Lander De Vos",
        labels: ["Ambassadeur", "Stuver"]
    };

    const cards = [
        {
            "link": "/student/1/aanwezigheid-hoor-en-werkcolleges",
            "title": "Aanwezigheid hoor- en werkcolleges",
            "description": "Mees heeft alle colleges en workshops regelmatig bijgewoond. Hij heeft grote toewijding getoond en actief deelgenomen aan de lessen."
        },
        {
            "link": "/student/1/aanwezigheid-hoor-en-werkcolleges",
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
            "link": "/student/1/aanwezigheid-hoor-en-werkcolleges",
            "title": "Prestatie oefeningen/opdrachten",
            "description": "Mees heeft consistent sterke prestaties geleverd bij het uitvoeren van opdrachten en oefeningen, waarbij hij complexe problemen effectief heeft aangepakt."
        },
        {
            "link": "/student/1/aanwezigheid-hoor-en-werkcolleges",
            "title": "Vak gerelateerde informatie",
            "description": "Mees heeft waardevolle inzichten gedeeld tijdens de lessen en heeft blijk gegeven van diepgaand begrip van de vakinhoud."
        },
        {
            "link": "/student/1/aanwezigheid-hoor-en-werkcolleges",
            "title": "Status student",
            "description": "Mees heeft een uitstekende academische status behouden gedurende het semester, met consistente inzet en uitmuntende resultaten."
        },
        {
            "link": "/student/1/aanwezigheid-hoor-en-werkcolleges",
            "title": "Coaching",
            "description": "Mees heeft aanzienlijke vooruitgang geboekt dankzij de individuele coachingssessies, waarbij hij zijn vaardigheden en zelfvertrouwen heeft ontwikkeld. Verdere coaching is niet vereist."
        },
        {
            "title": "Werkplekleren",
            "description": "Informatie nog niet van toepassing/niet beschikbaar.",
            "locked": true
        }
    ];

    const data = {
        user: req.user,
        student,
        cards,
    };

    res.render('student', data);
};

export default studentPage;
