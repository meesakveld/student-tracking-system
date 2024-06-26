const tableName = "workplace_mentors"; //! Change TABLENAME to the name of the table you want to create
 
// Create the table (this is for creating the migration)
export function up(knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.increments("id").primary();
        table.integer("student_id").notNullable();
        table.integer("course_id").notNullable();
        table.integer("mentor_id").notNullable();
        table.timestamps(true, true);

        table.foreign("student_id").references("students.id");
        table.foreign("course_id").references("courses.id");
        table.foreign("mentor_id").references("employees.id");
    });
}

// Drop the table (this is for in case of reverting the migration)
export function down(knex) {
    return knex.schema.dropTable(tableName);
}