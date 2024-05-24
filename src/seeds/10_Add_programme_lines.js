const tableName = "programme_lines"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            "name": "Business & Communication",
            "slug": "business-communication",
            "description": "Je ontdekt hoe bedrijven georganiseerd zijn, je leert handleidingen schrijven en je krijgt een dieper inzicht in marketing en bedrijfscommunicatie. Je leert pitchen voor klanten en samenwerken in team. In het laatste semester geven we je bovendien alle kennis mee die je nodig hebt om als zelfstandige IT’er aan de slag te gaan.",
            "study_points": 15,
            "education_programme_id": 14
        },
        {
            "name": "Applied Information Technology",
            "slug": "applied-information-technology",
            "description": "Je verdiept je in de geschiedenis en de werking van het internet en ontdekt de logica achter programmeren. Daarnaast duik je in de informatie rond hardware, software en netwerken. Later staan onder meer databases, security en blockchain op het programma.",
            "study_points": 12,
            "education_programme_id": 14
        },
        {
            "name": "Creative Design & Development",
            "slug": "creative-design-development",
            "description": "In de vakken van deze programmalijn verdiep je je in de codeertalen HTML en CSS. Je leert werken met grafische software en gaat design thinking toepassen. Ook ga je aan de slag met CMS-systemen zoals WordPress.",
            "study_points": 30,
            "education_programme_id": 14
        },
        {
            "name": "Computer Programming",
            "slug": "computer-programming",
            "description": "Bereid je voor om een expert te worden in front-end web development. Je wordt expert in JavaScript en leert werken met React, Node.js, TypeScript, PHP en SQL. Om je optimaal klaar te stomen voor een job als programmeur, krijg je diverse gastcolleges van experten uit het werkveld en werk je aan authentieke cases. ",
            "study_points": 32,
            "education_programme_id": 14
        },
        {
            "name": "Workplace Learning",
            "slug": "workplace-learning",
            "description": "Om je toekomstige job echt te leren kennen, moet je het werkveld intrekken. Dat doe je in de programmalijn @Work. In het eerste jaar bezoek je een aantal digital agencies en voer je opdrachten voor hen uit. Je presenteert het resultaat vervolgens voor een interne en externe jury. In je tweede jaar ga je 10 weken lang werkplekleren in een digitaal bedrijf. Zo doe je praktische kennis op en ervaar je hoe het voelt om echt in team te werken. Tijdens een individueel afsluitend project dat je op de werkvloer uitvoert, verdiep je je bovendien in een onderwerp naar keuze.",
            "study_points": 48,
            "education_programme_id": 14
        }
    ]
);
};

export { seed };