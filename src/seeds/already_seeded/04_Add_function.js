const tableName = "functions"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            title: "Administrator"
        },
        {
            title: "Docent"
        },
        {
            title: "Trajectcoach"
        },
        {
            title: "Leercoach"
        },
        {
            title: "Diversiteitscoach"
        },
        {
            title: "Werkplekcoach"
        },
        {
            title: "Werkplekmentor"
        },
        {
            title: "Teamleider"
        },
    ]);
};

export { seed };