/*
* ------------------------------
*        COMPONENTS PAGE
* ------------------------------
*/

const dataComments = [
    {
        index: 0,
        link: "/student/1/aanwezigheid-hoor-en-werkcolleges/edit",
        viewLink: "/student-dashboard/:studentId/course-reports/view-comment",
        canView: true,
        title: "Workshop Presentatievaardigheden",
        text: "De workshop over presentatievaardigheden was ontzettend informatief. Het bood praktische tips en strategieën voor effectief spreken in het openbaar. Ik heb vooral genoten van de interactieve activiteiten die hebben geholpen bij het versterken van de behandelde concepten.",
        author: "John Doe",
        dateOfPublication: "20-05-2024",
        course: "Presentatievaardigheden"
    },
    {
        index: 1,
        link: "/student/1/aanwezigheid-hoor-en-werkcolleges/edit",
        viewLink: "/student/1/aanwezigheid-hoor-en-werkcolleges/view-comment",
        viewLink: "/student-dashboard/:studentId/course-reports/view-comment",
        canView: true,
        title: "Softwareontwikkelingsproject",
        text: "Ons softwareontwikkelingsproject was uitdagend maar lonend. Het samenwerken met mijn teamleden stelde ons in staat om elkaars sterke punten te benutten en hoogwaardige code te produceren. Ondanks enkele obstakels slaagden we erin om op tijd een functioneel product af te leveren.",
        author: "Jane Smith",
        dateOfPublication: "21-05-2024",
        course: "Softwareontwikkeling"
    },
    {
        index: 2,
        link: "/student/1/aanwezigheid-hoor-en-werkcolleges/edit",
        viewLink: "/student-dashboard/:studentId/course-reports/view-comment",
        canView: true,
        title: "Literatuuronderzoek",
        text: "Het uitvoeren van het literatuuronderzoek voor mijn onderzoeksproject was een waardevolle leerervaring. Het betrof het kritisch analyseren van verschillende wetenschappelijke artikelen en het synthetiseren van de bevindingen tot een samenhangend verhaal. Dit proces heeft mij een dieper inzicht gegeven in het onderzoeksveld.",
        author: "Alice Johnson",
        dateOfPublication: "22-05-2024",
        course: "Onderzoeksmethoden"
    },
    {
        index: 3,
        link: "/student/1/aanwezigheid-hoor-en-werkcolleges/edit",
        viewLink: "/student-dashboard/:studentId/course-reports/view-comment",
        canView: true,
        title: "Stage-ervaring",
        text: "Mijn stage-ervaring bij bedrijf XYZ heeft me praktische inzichten in de industrie gegeven. Ik kreeg de kans om te werken aan echte projecten en samen te werken met ervaren professionals. Deze ervaring heeft niet alleen mijn technische vaardigheden verbeterd, maar heeft me ook blootgesteld aan de nuances van de bedrijfscultuur.",
        author: "Michael Brown",
        dateOfPublication: "20-05-2024",
        course: "Stage"
    },
    {
        index: 4,
        link: "/student/1/aanwezigheid-hoor-en-werkcolleges/edit",
        viewLink: "/student-dashboard/:studentId/course-reports/view-comment",
        canView: true,
        title: "Cursus Data-analyse",
        text: "Het volgen van de cursus data-analyse was essentieel voor het uitbreiden van mijn analytische vaardigheden. De cursus behandelde een breed scala aan onderwerpen, van basisstatistische concepten tot geavanceerde technieken voor gegevensvisualisatie. Ik waardeerde de praktische benadering en het vermogen van de instructeur om complexe concepten op een duidelijke manier uit te leggen.",
        author: "Laura White",
        dateOfPublication: "28-05-2024",
        course: "Data-analyse"
    },
    {
        index: 5,
        link: "/student/1/aanwezigheid-hoor-en-werkcolleges/edit",
        viewLink: "/student-dashboard/:studentId/course-reports/view-comment",
        canView: true,
        title: "Netwerkevenement",
        text: "Het bijwonen van het netwerkevenement was een waardevolle kans om in contact te komen met professionals in mijn vakgebied. Ik had zinvolle gesprekken met experts uit de industrie en kreeg inzicht in de huidige trends en mogelijkheden. Het was inspirerend om te zien hoe gepassioneerd en deskundig de sprekers waren.",
        author: "David Green",
        dateOfPublication: "9-05-2024",
        course: "Professionele Ontwikkeling"
    },
    {
        index: 6,
        link: "/student/1/aanwezigheid-hoor-en-werkcolleges/edit",
        viewLink: "/student-dashboard/:studentId/course-reports/view-comment",
        canView: true,
        title: "Werkcollege CV",
        text: "Mees heeft een goed gevulde CV. De opmaak is professioneel en overzichtelijk. De relevante ervaring en vaardigheden zijn duidelijk beschreven. Bovendien toont de CV een goede balans.",
        author: "Emma Clark",
        dateOfPublication: "30-05-2024",
        course: "Carrièrevoorbereiding"
    }
];

export const commentsPage = (req, res) => {
    const data = {
        user: req.user,
        dataComments,
    };
    res.render('comments', data);
};

export const viewCommentPage = (req, res) => {
    const comment = "sdfgkjsdfjds sdfds sdkf sdf sdfj sdfsd"

    const data = {
        user: req.user,
        comment,
    };
    res.render('comment', data);
};