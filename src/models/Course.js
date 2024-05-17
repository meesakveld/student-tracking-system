import knex from "../lib/Knex.js";
import { Model } from "objection";
import EducationProgramme from "./EducationProgramme.js";
import ProgrammeLine from "./ProgrammeLine.js";
import Attendance from "./Attendance.js";
import User from "./User.js";
import WorkplaceMentor from "./WorkplaceMentor.js";

// instantiate the model
Model.knex(knex);

// related models
// import ... from "./...js";

// define the NavigationItem model
class Course extends Model {
    static get tableName() {
        return "courses";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name", "education_programme_id", "programme_line_id"],
            properties: {
                id: { type: "integer" },
                name: { type: "string", maxLength: 255 },
                description: { type: "text"},
                study_points: { type: "integer" },
                contact_hours: { type: "integer" },
                period: { type: "string", maxLength: 255 },
                semester: { type: "string", maxLength: 255 },
                education_programme_id: { type: "integer" },
                programme_line_id: { type: "integer"}
            },
        };
    }

    static get relationMappings() {
        return {
            attendances: {
                relation: Model.BelongsToOneRelation,
                modelClass: Attendance,
                join: {
                    from: "attendances.course_id",
                    to: "courses.id",
                },
            },
            users: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: "courses.id",
                    through: {
                        from: "course_registration.courses_id",
                        to: "course_registration.account_id",
                    },
                    to: "employees.id",
                },
            },
            education_programme: {
                relation: Model.BelongsToOneRelation,
                modelClass: EducationProgramme,
                join: {
                    from: "courses.education_programme_id",
                    to: "education_programmes.id",
                },
            },
            programme_lines: {
                relation: Model.BelongsToOneRelation,
                modelClass: ProgrammeLine,
                join: {
                    from: "courses.programme_line_id",
                    to: "programme_lines.id",
                },
            },
            workplace_mentor: {
                relation: Model.HasManyRelation,
                modelClass: WorkplaceMentor,
                join: {
                    from: "courses.id",
                    to: "workplace_mentors.course_id",
                },
            },
        };
    }
}

export default Course;