const tableName = "comments"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            student_id: 1,
            employee_id: 4,
            education_programme_id: 1,
            comment: "Tristan heeft aanzienlijke vooruitgang geboekt dankzij de individuele coachingssessies, waarbij hij zijn vaardigheden en zelfvertrouwen heeft ontwikkeld. Verdere coaching is niet vereist.",
            tag: "coaching"
        },
        {
            student_id: 1,
            employee_id: 3,
            education_programme_id: 1,
            comment: "Tristan is goed bezig, hij heeft een goede inzet en is altijd op tijd. Vandaag heb ik hem geholpen met een opdracht en hij heeft het goed opgepakt.",
            tag: "personal"
        },
        {
            course_id: 4,
            student_id: 1,
            employee_id: 2,
            education_programme_id: 1,
            comment: "Tristan heeft tijdens de colleges actief deelgenomen en waardevolle inzichten gedeeld met de groep.",
            tag: "course"
        },
    ]);
};

export { seed };