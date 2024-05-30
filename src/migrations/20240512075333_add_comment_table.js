const tableName = "comments"; //! Change TABLENAME to the name of the table you want to create
 
// Create the table (this is for creating the migration)
export function up(knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.increments("id").primary();
        table.integer("course_id");
        table.integer("student_id").notNullable();
        table.integer("employee_id").notNullable();
        table.integer("education_programme_id").notNullable();
        table.text("comment").notNullable();
        table.boolean("visible_to_student").notNullable().defaultTo(false);
        table.string("tag");
        table.timestamps(true, true);
    });
}
 
// Drop the table (this is for in case of reverting the migration)
export function down(knex) {
    return knex.schema.dropTable(tableName);
}