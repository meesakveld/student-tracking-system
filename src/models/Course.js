import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
import EducationProgramme from "./EducationProgramme.js";
import Attendance from "./Attendance.js";
import WorkplaceMentor from "./WorkplaceMentor.js";
import WorkplaceCoach from "./WorkplaceCoach.js";
import Comment from "./Comment.js";
import Employee from "./Employee.js";
import Student from "./Student.js";

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
            required: ["name", "education_programme_id"],
            properties: {
                id: { type: "integer" },
                name: { type: "string", maxLength: 255 },
                description: { type: "string"},
                study_points: { type: "integer" },
                contact_hours: { type: "integer" },
                period: { type: "integer", maxLength: 255 },
                semester: { type: "integer", maxLength: 255 },
                education_programme_id: { type: "integer" },
            },
        };
    }

    static get relationMappings() {
        return {
            education_programme: {
                relation: Model.BelongsToOneRelation,
                modelClass: EducationProgramme,
                join: {
                    from: "courses.education_programme_id",
                    to: "education_programmes.id",
                },
            },
            attendances: {
                relation: Model.HasManyRelation,
                modelClass: Attendance,
                join: {
                    from: "courses.id",
                    to: "attendances.course_id",
                },
            },
            workplace_mentor: {
                relation: Model.HasManyRelation,
                modelClass: WorkplaceMentor,
                join: {
                    from: "courses.id",
                    to: "workplace_mentor.course_id",
                },
            },
            workplace_coach: {
                relation: Model.HasManyRelation,
                modelClass: WorkplaceCoach,
                join: {
                    from: "courses.id",
                    to: "workplace_coach.course_id",
                },
            },
            comment: {
                relation: Model.HasManyRelation,
                modelClass: Comment,
                join: {
                    from: "courses.id",
                    to: "comments.course_id",
                },
            },
            employees: {
                relation: Model.ManyToManyRelation,
                modelClass: Employee,
                join: {
                    from: "courses.id",
                    through: {
                        from: "course_links.course_id",
                        to: "course_links.employee_id",
                    },
                    to: "employees.id",
                },
            },
            students: {
                relation: Model.ManyToManyRelation,
                modelClass: Student,
                join: {
                    from: "courses.id",
                    through: {
                        from: "course_registrations.course_id",
                        to: "course_registrations.student_id",
                    },
                    to: "students.id",
                },
            },
        };
    }
}

export default Course;