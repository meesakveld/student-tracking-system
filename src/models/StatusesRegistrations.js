import knex from "../lib/Knex.js";
import { Model } from "objection";
import Status from "./Status.js";
import Student from "./Student.js";

// instantiate the model
Model.knex(knex);

// related models
// import ... from "./...js";

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
                date: { type: "date"}
            },
        };
    }

    static get relationMappings() {
        return{
            statuses_registrations: {
                relation: Model.BelongsToOneRelation,
                modelClass: Status,
                join: {
                    from: "statuses.id",
                    to: "statuses_registrations.status_id",
                },
            },
            student: {
                relation: Model.BelongsToOneRelation,
                modelClass: Student,
                join: {
                    from: "students.id",
                    to: "statuses_registrations.student_id",
                },
            },
        }
    }
    }

export default StatusRegistration;