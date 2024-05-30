import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
import Student from "./Student.js";
import Course from "./Course.js";
import AttendanceType from "./AttendanceType.js";

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
            required: ["student_id", "course_id", "attendance_type_id", "date"],
            properties: {
                id: { type: "integer" },
                student_id: { type: "integer" },
                course_id: { type: "integer" },
                attendance_type_id: { type: "integer" },
                date: { type: "string" },
            },
        };
    }

    static get relationMappings() {
        return {
            students: {
                relation: Model.HasManyRelation,
                modelClass: Student,
                join: {
                    from: "attendances.student_id",
                    to: "students.id",
                },
            },
            course: {
                relation: Model.BelongsToOneRelation,
                modelClass: Course,
                join: {
                    from: "attendances.course_id",
                    to: "courses.id",
                },
            },
            attendance_type: {
                relation: Model.BelongsToOneRelation,
                modelClass: AttendanceType,
                join: {
                    from: "attendances.attendance_type_id",
                    to: "attendance_types.id",
                },
            },
        };
    }
}

export default Attendance;
