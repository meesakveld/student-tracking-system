const tableName = "comments"; //! Change TABLENAME to the name of the table you want to create
 
// Create the table (this is for creating the migration)
export function up(knex) {
    return knex.schema.table(tableName, function (table) {
        table.foreign("course_id").references("courses.id");
        table.foreign("student_id").references("students.id");
        table.foreign("employee_id").references("employees.id");
        table.foreign("education_programme_id").references("education_programmes.id"); 
    });
}
 
// Drop the table (this is for in case of reverting the migration)
export function down(knex) {
    return knex.schema.table(tableName, function (table) {
        table.dropForeign("course_id");
        table.dropForeign("student_id");
        table.dropForeign("employee_id");
        table.dropForeign("education_programme_id");
    });
}