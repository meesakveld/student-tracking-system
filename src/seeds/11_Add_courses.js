const tableName = "courses"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            "name": "IT Professional",
            "description": null,
            "study_points": 2,
            "contact_hours": 5,
            "period": 1,
            "semester": 1,
            "education_programme_id": 14,
            "programme_line_id": 1
        },
        {
            "name": "IT Professional",
            "description": null,
            "study_points": 2,
            "contact_hours": 5,
            "period": 2,
            "semester": 1,
            "education_programme_id": 14,
            "programme_line_id": 1
        },
        {
            "name": "IT Portfolio",
            "description": null,
            "study_points": 2,
            "contact_hours": 4,
            "period": 3,
            "semester": 2,
            "education_programme_id": 14,
            "programme_line_id": 1
        },
        {
            "name": "IT Portfolio",
            "description": null,
            "study_points": 3,
            "contact_hours": 4,
            "period": 4,
            "semester": 2,
            "education_programme_id": 14,
            "programme_line_id": 1
        },
        {
            "name": "IT Exploration",
            "description": null,
            "study_points": 3,
            "contact_hours": 4,
            "period": 5,
            "semester": 3,
            "education_programme_id": 14,
            "programme_line_id": 1
        },
        {
            "name": "IT Exploration",
            "description": null,
            "study_points": 3,
            "contact_hours": 4,
            "period": 6,
            "semester": 3,
            "education_programme_id": 14,
            "programme_line_id": 1
        },
        {
            "name": "Data Management 1",
            "description": null,
            "study_points": 3,
            "contact_hours": 5,
            "period": 1,
            "semester": 1,
            "education_programme_id": 14,
            "programme_line_id": 2
        },
        {
            "name": "Data Management 2",
            "description": null,
            "study_points": 3,
            "contact_hours": 5,
            "period": 3,
            "semester": 2,
            "education_programme_id": 14,
            "programme_line_id": 2
        },
        {
            "name": "Data Management 3",
            "description": null,
            "study_points": 3,
            "contact_hours": 5,
            "period": 5,
            "semester": 3,
            "education_programme_id": 14,
            "programme_line_id": 2
        },
        {
            "name": "Web 1: Essentials",
            "description": null,
            "study_points": 4,
            "contact_hours": 6,
            "period": 1,
            "semester": 1,
            "education_programme_id": 14,
            "programme_line_id": 3
        },
        {
            "name": "Web 2: Intermediate",
            "description": null,
            "study_points": 4,
            "contact_hours": 6,
            "period": 2,
            "semester": 1,
            "education_programme_id": 14,
            "programme_line_id": 3
        },
        {
            "name": "Web 3: Advanced",
            "description": null,
            "study_points": 4,
            "contact_hours": 6,
            "period": 3,
            "semester": 2,
            "education_programme_id": 14,
            "programme_line_id": 3
        },
        {
            "name": "Web 4: Web Anumations & Interactions",
            "description": null,
            "study_points": 6,
            "contact_hours": 8,
            "period": 4,
            "semester": 2,
            "education_programme_id": 14,
            "programme_line_id": 3
        },
        {
            "name": "Web 5: Web Frameworks",
            "description": null,
            "study_points": 6,
            "contact_hours": 8,
            "period": 5,
            "semester": 3,
            "education_programme_id": 14,
            "programme_line_id": 3
        },
        {
            "name": "Web 6: Creative Coding",
            "description": null,
            "study_points": 6,
            "contact_hours": 8,
            "period": 6,
            "semester": 3,
            "education_programme_id": 14,
            "programme_line_id": 3
        },
        {
            "name": "Programming 1: Essentials",
            "description": null,
            "study_points": 5,
            "contact_hours": 8,
            "period": 1,
            "semester": 1,
            "education_programme_id": 14,
            "programme_line_id": 4
        },
        {
            "name": "Programming 2: Intermediate",
            "description": null,
            "study_points": 5,
            "contact_hours": 6,
            "period": 2,
            "semester": 1,
            "education_programme_id": 14,
            "programme_line_id": 4
        },
        {
            "name": "Programming 3: Advanced",
            "description": null,
            "study_points": 5,
            "contact_hours": 8,
            "period": 3,
            "semester": 2,
            "education_programme_id": 14,
            "programme_line_id": 4
        },
        {
            "name": "Programming 4: JAMStack",
            "description": null,
            "study_points": 5,
            "contact_hours": 8,
            "period": 4,
            "semester": 2,
            "education_programme_id": 14,
            "programme_line_id": 4
        },
        {
            "name": "Programming 5: Full-stack",
            "description": null,
            "study_points": 5,
            "contact_hours": 8,
            "period": 5,
            "semester": 3,
            "education_programme_id": 14,
            "programme_line_id": 4
        },
        {
            "name": "Programming 6: Mobile",
            "description": null,
            "study_points": 5,
            "contact_hours": 8,
            "period": 6,
            "semester": 3,
            "education_programme_id": 14,
            "programme_line_id": 4
        },
        {
            "name": "@Work 1: Static Web Projects",
            "description": null,
            "study_points": 6,
            "contact_hours": 10,
            "period": 2,
            "semester": 1,
            "education_programme_id": 14,
            "programme_line_id": 5
        },
        {
            "name": "@Work 2: Dynamic Web Projects",
            "description": null,
            "study_points": 6,
            "contact_hours": 12,
            "period": 4,
            "semester": 2,
            "education_programme_id": 14,
            "programme_line_id": 5
        },
        {
            "name": "@Work 3: Multidiciplinary Web Projects",
            "description": null,
            "study_points": 9,
            "contact_hours": 14,
            "period": 6,
            "semester": 3,
            "education_programme_id": 14,
            "programme_line_id": 5
        },
        {
            "name": "@Work 4: Graduation Project",
            "description": null,
            "study_points": 9,
            "contact_hours": 38,
            "period": 7,
            "semester": 4,
            "education_programme_id": 14,
            "programme_line_id": 5
        },
        {
            "name": "@Work 5: Internship",
            "description": null,
            "study_points": 18,
            "contact_hours": 38,
            "period": 8,
            "semester": 4,
            "education_programme_id": 14,
            "programme_line_id": 5
        },
    ]);
};

export { seed };