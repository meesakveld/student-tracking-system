import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
// import ... from "./...js";

// define the NavigationItem model
class Deregister extends Model {
    static get tableName() {
        return "deregisters";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["reason", "deregisters_date"],
            properties: {
                id: { type: "integer" },
                reason: { type: "text", minLength: 1, maxLength: 255 },
                deregisters_date: { type: "date" },
            },
        };
    }

    static get relationMappings() { }
}

export default Deregister;