import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
// import ... from "./...js";

// define the NavigationItem model
class Contact extends Model {
    static get tableName() {
        return "contacts";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["user_id"],
            properties: {
                id: { type: "integer" },
                user_id: { type: "integer" },
                website: { type: "string", maxLength: 255 },
                linkedin: { type: "string", maxLength: 255 },
                facebook: { type: "string", maxLength: 255 }
            },
        };
    }

    static get relationMappings() { }
}

export default Contact;