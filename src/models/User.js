import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
// import ... from "./...js";

// define the NavigationItem model
class User extends Model {
    static get tableName() {
        return "users";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["firstname", "lastname", "email", "password", "username"],
            properties: {
                id: { type: "integer" },
                firstname: { type: "string" },
                lastname: { type: "string" },
                is_active: { type: "boolean" },
                email: { type: "string" },
                password: { type: "string" },
                username: { type: "string" },
            },
        };
    }

    static get relationMappings() { }
}

export default User;