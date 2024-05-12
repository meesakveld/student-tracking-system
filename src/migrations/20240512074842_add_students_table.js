const tableName = "students"; //! Change TABLENAME to the name of the table you want to create
 
// Create the table (this is for creating the migration)
export function up(knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.increments("id").primary();
        table.integer("user_id").notNullable().references("id").inTable("users");
        table.integer("class_id").notNullable();
        table.integer("role_id").notNullable();
        table.integer("trajectory_coach_id").references("id").inTable("employees");
        table.integer("learning_coach_id").references("id").inTable("employees");
        table.integer("diversity_coach_id").references("id").inTable("employees");
        table.integer("status_id");
        table.integer("deregister_id");
        table.timestamps(true, true);
    });
}

// id integer[primary key]
//   user_id integer[ref: - "users"."id", not null]
//   class_id integer[not null]
//   role_id integer[not null]
//   trajectory_coach_id integer[ref: - "employees"."id"]
//   learning_coach_id integer[ref: - "employees"."id"]
//   diversity_coach_id integer[ref: - "employees"."id"]
//   status_id integer
//   deregister_id integer
//   created_at timestamp
//   updated_at timestamp
 
// Drop the table (this is for in case of reverting the migration)
export function down(knex) {
    return knex.schema.dropTable(tableName);
}