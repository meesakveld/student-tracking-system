const tableName = "students"; //! Change TABLENAME to the name of the table you want to create
 
// Create the table (this is for creating the migration)
export function up(knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.increments("id").primary();
        table.integer("user_id").notNullable()
        table.integer("class_id")
        table.integer("trajectory_coach_id")
        table.integer("learning_coach_id")
        table.integer("diversity_coach_id")
        table.timestamps(true, true);
    });
}
 
// Drop the table (this is for in case of reverting the migration)
export function down(knex) {
    return knex.schema.dropTable(tableName);
}