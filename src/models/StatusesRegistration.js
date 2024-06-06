import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
import Status from "./Status.js";
import Student from "./Student.js";

// define the NavigationItem model
class StatusRegistration extends Model {
    static get tableName() {
        return "statuses_registrations";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["status_id", "student_id", "date"],
            properties: {
                id: { type: "integer" },
                status_id: { type: "integer" },
                student_id: { type: "integer" },
                date: { type: "string" },
                note: { type: "string" },
            },
        };
    }

    static get relationMappings() {
        return {
            status: {
                relation: Model.BelongsToOneRelation,
                modelClass: Status,
                join: {
                    from: "statuses_registrations.status_id",
                    to: "statuses.id",
                },
            },
            student: {
                relation: Model.BelongsToOneRelation,
                modelClass: Student,
                join: {
                    from: "statuses_registrations.student_id",
                    to: "students.id",
                },
            },
        }
    }
}

export default StatusRegistration;