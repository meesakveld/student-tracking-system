import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
import Attendance from "./Attendance.js";
import Label from "./Label.js";
import User from "./User.js";
import Employee from "./Employee.js";
import WorkplaceMentor from "./WorkplaceMentor.js";
import Deregister from "./Deregister.js";
import Course from "./Course.js";
import StatusRegistration from "./StatusesRegistration.js";
import Comment from "./Comment.js";
import EducationProgramme from "./EducationProgramme.js";
import Class from "./Class.js";
import WorkplaceCoach from "./WorkplaceCoach.js";

// define the NavigationItem model
class Student extends Model {
    static get tableName() {
        return "students";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["user_id", "class_id"],
            properties: {
                id: { type: "integer" },
                user_id: { type: "integer" },
                class_id: { type: "integer" },
                trajectory_coach_id : { type: "integer" },
                learning_coach_id: { type: "integer" },
                diversity_coach_id: { type: "integer" },
            },
        };
    }

    static get relationMappings() {
        return {
            attendances: {
                relation: Model.HasManyRelation,
                modelClass: Attendance,
                join: {
                    from: "students.id",
                    to: "attendances.student_id",
                },
            },
            class: {
                relation: Model.BelongsToOneRelation,
                modelClass: Class,
                join: {
                    from: "students.class_id",
                    to: "classes.id",
                },
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "students.user_id",
                    to: "users.id",
                },
            },
            trajectory_coach: {
                relation: Model.BelongsToOneRelation,
                modelClass: Employee,
                join: {
                    from: "students.trajectory_coach_id",
                    to: "employees.id",
                },
            },
            learning_coach: {
                relation: Model.BelongsToOneRelation,
                modelClass: Employee,
                join: {
                    from: "students.learning_coach_id",
                    to: "employees.id",
                },
            },
            diversity_coach: {
                relation: Model.BelongsToOneRelation,
                modelClass: Employee,
                join: {
                    from: "students.diversity_coach_id",
                    to: "employees.id",
                },
            },
            workplace_mentor: {
                relation: Model.HasOneRelation,
                modelClass: WorkplaceMentor,
                join: {
                    from: "students.id",
                    to: "workplace_mentors.student_id",
                },
            },
            workplace_coach: {
                relation: Model.HasOneRelation,
                modelClass: WorkplaceCoach,
                join: {
                    from: "students.id",
                    to: "workplace_coaches.student_id",
                },
            },
            deregistrer: {
                relation: Model.HasManyRelation,
                modelClass: Deregister,
                join: {
                    from: "students.id",
                    to: "deregisters.student_id",
                },
            },
            comments: {
                relation: Model.HasManyRelation,
                modelClass: Comment,
                join: {
                    from: "students.id",
                    to: "comments.student_id",
                },
            },
            status_registrations: {
                relation: Model.HasManyRelation,
                modelClass: StatusRegistration,
                join: {
                    from: "students.id",
                    to: "statuses_registrations.student_id",
                },
            }, 
            labels: {
                relation: Model.ManyToManyRelation,
                modelClass: Label,
                join: {
                    from: "students.id",
                    through: {
                        from: "student_labels.student_id",
                        to: "student_labels.label_id",
                    },
                    to: "labels.id",
                },
            },
            courses: {
                relation: Model.ManyToManyRelation,
                modelClass: Course,
                join: {
                    from: "students.id",
                    through: {
                        from: "course_registrations.student_id",
                        to: "course_registrations.course_id",
                    },
                    to: "courses.id",
                },
            },
            education_programmes: {
                relation: Model.ManyToManyRelation,
                modelClass: EducationProgramme,
                join: {
                    from: "students.id",
                    through: {
                        from: "education_programmes_students.student_id",
                        to: "education_programmes_students.education_programme_id",
                    },
                    to: "education_programmes.id",
                },
            },
        }
    }
}

export default Student;