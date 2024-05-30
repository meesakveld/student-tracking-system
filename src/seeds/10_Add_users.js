const tableName = "users"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@arteveldehs.be",
            password: "$2b$10$Dz1QP6X2aty4He993qqVjuImsjlCcQbn6LopTlKysJpLF5E8DDxrK",
            username: "johndoe",
            role_id: 2,
        },
        {
            firstname: "Tristan",
            lastname: "De Ridder",
            email: "tristan.deridder@arteveldehs.be",
            password: "$2b$10$Dz1QP6X2aty4He993qqVjuImsjlCcQbn6LopTlKysJpLF5E8DDxrK",
            username: "tristanderidder",
            role_id: 1,
        },
        {
            firstname: "Mees",
            lastname: "Akveld",
            email: "mees.akveld@arteveldehs.be",
            password: "$2b$10$Dz1QP6X2aty4He993qqVjuImsjlCcQbn6LopTlKysJpLF5E8DDxrK",
            username: "meesakveld",  
            role_id: 1,
        },
        {
            firstname: "Evelien",
            lastname: "Rutsaert",
            email: "evelien.rutsaert@arteveldehs.be",
            password: "$2b$10$Dz1QP6X2aty4He993qqVjuImsjlCcQbn6LopTlKysJpLF5E8DDxrK",
            username: "evelienrutsaert",
            role_id: 2
        }
    ]);
};

export { seed };
