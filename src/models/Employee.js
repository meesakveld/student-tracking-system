import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
// import ... from "./...js";

// define the NavigationItem model
class Employee extends Model {
    static get tableName() {
        return "employees";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["user_id", "role_id"],
            properties: {
                id: { type: "integer" },
                user_id: { type: "integer" },
                role_id: { type: "integer" },
            },
        };
    }

    static get relationMappings() { }
}

export default Employee;