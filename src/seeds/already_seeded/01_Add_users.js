const tableName = "users"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            firstname: "John",
            lastname: "Doe",
            is_active: true,
            email: "john.doe@arteveldehs.be",
            password: "secret123",
            username: "johndoe",
            role_id: 2,
        },
        {
            firstname: "Tristan",
            lastname: "De Ridder",
            is_active: true,
            email: "tristan.deridder@arteveldehs.be",
            password: "secret123",
            username: "tristanderidder",
            role_id: 1,
        },
        {
            firstname: "Mees",
            lastname: "Akveld",
            is_active: true,
            email: "mees.akveld@arteveldehs.be",
            password: "secret123",
            username: "meesakveld",  
            role_id: 1,
        },
    ]);
};

export { seed };
