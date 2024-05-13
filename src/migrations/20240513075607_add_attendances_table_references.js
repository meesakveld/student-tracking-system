const tableName = "attendances"; //! Change TABLENAME to the name of the table you want to create
 
// Create the table (this is for creating the migration)
export function up(knex) {
    return knex.schema.table(tableName, function (table) {
        table.foreign("student_id").references("students.id");
        table.foreign("course_id").references("courses.id");
        table.foreign("attendance_type_id").references("attendance_types.id");
    });
}
 
// Drop the table (this is for in case of reverting the migration)
export function down(knex) {
    return knex.schema.table(tableName, function (table) {
        table.dropForeign("student_id");
        table.dropForeign("course_id");
        table.dropForeign("attendances_type_id");
    });
}