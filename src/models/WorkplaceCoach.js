import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
// import ... from "./...js";

// define the NavigationItem model
class WorkplaceCoach extends Model {
    static get tableName() {
        return "workplace_coaches";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["student_id", "course_id", "employee_id"],
            properties: {
                id: { type: "integer" },
                student_id: { type: "integer" },
                course_id: { type: "integer" },
                employee_id: { type: "integer"}
            },
        };
    }

    static get relationMappings() { }
}

export default WorkplaceCoach;