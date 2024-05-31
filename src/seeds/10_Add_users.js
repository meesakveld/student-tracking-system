const tableName = "users"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            firstname: "John",
            lastname: "Doe",
            email: "admin@arteveldehs.be",
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
            email: "teacher@arteveldehs.be",
            password: "$2b$10$Dz1QP6X2aty4He993qqVjuImsjlCcQbn6LopTlKysJpLF5E8DDxrK",
            username: "evelienrutsaert",
            role_id: 2
        },
        {
            firstname: "Philippe",
            lastname: "De Pauw - Waterschoot",
            email: "teamleader@arteveldehs.be",
            password: "$2b$10$Dz1QP6X2aty4He993qqVjuImsjlCcQbn6LopTlKysJpLF5E8DDxrK",
            username: "philippedepauw-waterschoot",
            role_id: 2
        },
        {
            firstname: "Inge",
            lastname: "Sintobin",
            email: "trajectorycoach@arteveldehs.be",
            password: "$2b$10$Dz1QP6X2aty4He993qqVjuImsjlCcQbn6LopTlKysJpLF5E8DDxrK",
            username: "ingesintobin",
            role_id: 2
        },
        {
            firstname: "Isabelle",
            lastname: "Volckaert",
            email: "learningcoach@arteveldehs.be",
            password: "$2b$10$Dz1QP6X2aty4He993qqVjuImsjlCcQbn6LopTlKysJpLF5E8DDxrK",
            username: "isabellevolckaert",
            role_id: 2
        },
        {
            firstname: "Jane",
            lastname: "Doe",
            email: "diversitycoach@arteveldehs.be",
            password: "$2b$10$Dz1QP6X2aty4He993qqVjuImsjlCcQbn6LopTlKysJpLF5E8DDxrK",
            username: "janedoe",
            role_id: 2
        },
        {
            firstname: "Inge",
            lastname: "De Canck",
            email: "workplacecoach@arteveldehs.be",
            password: "$2b$10$Dz1QP6X2aty4He993qqVjuImsjlCcQbn6LopTlKysJpLF5E8DDxrK",
            username: "ingedecanck",
            role_id: 2
        },
        
    ]);
};

export { seed };
