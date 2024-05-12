import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
// import ... from "./...js";

// define the NavigationItem model
class Attendance extends Model {
    static get tableName() {
        return "attendances";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["student_id", "course_id", "attendances_type_id", "date"],
            properties: {
                id: { type: "integer" },
                student_id: { type: "integer" },
                course_id: { type: "integer" },
                attendances_type_id: { type: "integer" },
                date: { type: "date" },
            },
        };
    }

    static get relationMappings() {}
}

export default Attendance;
