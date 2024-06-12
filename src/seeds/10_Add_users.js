const tableName = "users"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            firstname: "John",
            lastname: "Doe",
            email: "admin@svs.be",
            password: "$2b$10$Dz1QP6X2aty4He993qqVjuImsjlCcQbn6LopTlKysJpLF5E8DDxrK",
            role_id: 2,
        },
        {
            firstname: "Tristan",
            lastname: "De Ridder",
            email: "tristan.deridder@student.svs.be",
            password: "$2b$10$Dz1QP6X2aty4He993qqVjuImsjlCcQbn6LopTlKysJpLF5E8DDxrK",
            role_id: 1,
        },
        {
            firstname: "Mees",
            lastname: "Akveld",
            email: "mees.akveld@student.svs.be",
            password: "$2b$10$Dz1QP6X2aty4He993qqVjuImsjlCcQbn6LopTlKysJpLF5E8DDxrK",
            role_id: 1,
        },
        {
            firstname: "Bryan",
            lastname: "Portillo",
            email: "teacher@svs.be",
            password: "$2b$10$Dz1QP6X2aty4He993qqVjuImsjlCcQbn6LopTlKysJpLF5E8DDxrK",
            role_id: 2
        },
        {
            firstname: "Michelle",
            lastname: "Guerra",
            email: "teamleader@svs.be",
            password: "$2b$10$Dz1QP6X2aty4He993qqVjuImsjlCcQbn6LopTlKysJpLF5E8DDxrK",
            role_id: 2
        },
        {
            firstname: "Emma",
            lastname: "Buchanan",
            email: "trajectorycoach@svs.be",
            password: "$2b$10$Dz1QP6X2aty4He993qqVjuImsjlCcQbn6LopTlKysJpLF5E8DDxrK",
            role_id: 2
        },
        {
            firstname: "Leon",
            lastname: "Haynes",
            email: "learningcoach@svs.be",
            password: "$2b$10$Dz1QP6X2aty4He993qqVjuImsjlCcQbn6LopTlKysJpLF5E8DDxrK",
            role_id: 2
        },
        {
            firstname: "Ira",
            lastname: "Mata",
            email: "diversitycoach@svs.be",
            password: "$2b$10$Dz1QP6X2aty4He993qqVjuImsjlCcQbn6LopTlKysJpLF5E8DDxrK",
            role_id: 2
        },
        {
            firstname: "Lexi",
            lastname: "Blake",
            email: "workplacecoach@svs.be",
            password: "$2b$10$Dz1QP6X2aty4He993qqVjuImsjlCcQbn6LopTlKysJpLF5E8DDxrK",
            role_id: 2
        },
        {
            firstname: "Ella",
            lastname: "Jakale",
            email: "ella.jakale@student.svs.be",
            password: "$2b$10$Dz1QP6X2aty4He993qqVjuImsjlCcQbn6LopTlKysJpLF5E8DDxrK",
            role_id: 1,
        },
        {
            firstname: "Bénoît",
            lastname: "Biraguma Lhimbazwe",
            email: "benoit.biragumalhimbazwe@student.svs.be",
            password: "$2b$10$Dz1QP6X2aty4He993qqVjuImsjlCcQbn6LopTlKysJpLF5E8DDxrK",
            role_id: 1,
        },
        {
            firstname: "Kai",
            lastname: "Davis",
            email: "student@student.svs.be",
            password: "$2b$10$Dz1QP6X2aty4He993qqVjuImsjlCcQbn6LopTlKysJpLF5E8DDxrK",
            role_id: 1,
        }
    ]);
};

export { seed };
