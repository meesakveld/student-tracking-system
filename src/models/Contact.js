import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
import User from "./User.js";

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

    static get relationMappings() {
        return {
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "contacts.user_id",
                    to: "users.id",
                },
            },
        };
    }
}

export default Contact;