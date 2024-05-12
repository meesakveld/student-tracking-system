import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
// import ... from "./...js";

// define the NavigationItem model
class Comment extends Model {
    static get tableName() {
        return "course_links";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["employee_id", "course_id"],
            properties: {
                id: { type: "integer" },
                employee_id: { type: "integer" },
                course_id: { type: "integer" },
            },
        };
    }

    static get relationMappings() { }
}

export default Comment;