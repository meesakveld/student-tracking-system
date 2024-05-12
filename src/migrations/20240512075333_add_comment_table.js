const tableName = "comments"; //! Change TABLENAME to the name of the table you want to create
 
// Create the table (this is for creating the migration)
export function up(knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.increments("id").primary();
        table.integer("course_id").notNullable();
        table.integer("student_id").notNullable();
        table.integer("employee_id").notNullable();
        table.integer("education_programme_id").notNullable();
        table.text("comment").notNullable();
        table.timestamps(true, true);

        table.foreign("course_id").references("courses.id");
        table.foreign("student_id").references("students.id");
        table.foreign("employee_id").references("employees.id");
        table.foreign("education_programme_id").references("education_programmes.id");
    });
}
 
// Drop the table (this is for in case of reverting the migration)
export function down(knex) {
    return knex.schema.dropTable(tableName);
}