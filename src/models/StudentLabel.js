import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
// import ... from "./...js";

// define the NavigationItem model
class StudentLabel extends Model {
    static get tableName() {
        return "student_labels";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["student_id", "label_id"],
            properties: {
                id: { type: "integer" },
                student_id: { type: "integer" },
                label_id: { type: "integer" },
            },
        };
    }

    static get relationMappings() { }
}

export default StudentLabel;