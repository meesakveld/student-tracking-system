import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
// import ... from "./...js";

// define the NavigationItem model
class Role extends Model {
    static get tableName() {
        return "roles";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["title"],
            properties: {
                id: { type: "integer" },
                title: { type: "string", maxLength: 255 }
            },
        };
    }

    static get relationMappings() { }
}

export default Role;