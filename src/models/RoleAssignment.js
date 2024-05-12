import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
// import ... from "./...js";

// define the NavigationItem model
class RoleAssignment extends Model {
    static get tableName() {
        return "role_assignments";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["account_id", "role_id"],
            properties: {
                id: { type: "integer" },
                account_id: { type: "integer" },
                role_id: { type: "integer" },
            },
        };
    }

    static get relationMappings() { }
}

export default RoleAssignment;