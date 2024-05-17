import knex from "../lib/Knex.js";
import { Model } from "objection";
import Student from "./Student.js";

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
            courses: {
                relation: Model.HasManyRelation,
                modelClass: Course,
                join: {
                    from: "attendances.course_idcourses.id",
                    to: "courses.id",
                },
            },
            attendance_types: {
                relation: Model.HasManyRelation,
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
