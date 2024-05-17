import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
// import ... from "./...js";

// define the NavigationItem model
class Status extends Model {
    static get tableName() {
        return "statuses";
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
                title: { type: "string", maxLength: 255 },
            },
        };
    }

    static get relationMappings() {
        return {
            status: {
                relation: Model.BelongsToOneRelation,
                modelClass: Status,
                join: {
                    from: "statuses.id",
                    to: "statuses_registrations.status_id",
                },
            },
        }
    }
}

export default Status;