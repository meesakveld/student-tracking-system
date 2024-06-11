import { getEducationProgrammeById } from '../../services/models/EducationProgramme.js';

export const educationProgrammePage = async (req, res) => {

    try {

        const data = await getEducationProgrammeById(req.params.id, '[classes, programme_lines, courses]');

        const education_programme = {
            title: {
                value: data.title,
                name: "education_programme-title",
            },
            academic_year: {
                value: data.academic_year,
                name: "education_programme-academic_year",
            },
            code: {
                value: data.code,
                name: "education_programme-code",
            },
        }

        const programme_lines = data.programme_lines.map((programme_line, index) => {
            return {
                id: `programme_line_${index}`,
                name: {
                    value: programme_line.name,
                    name: `programme_line_${index}-name`,
                },
                description: {
                    value: programme_line.description,
                    name: `programme_line_${index}-description`,
                },
                study_points: {
                    value: programme_line.study_points,
                    name: `programme_line_${index}-study_points`,
                },
                isNotLastInArray: index !== data.programme_lines.length - 1,
            }
        });

        const courses = data.courses.map((course, index) => {
            return {
                id: `course_${index}`,
                name: {
                    value: course.name,
                    name: `course_${index}-name`,
                },
                description: {
                    value: course.description,
                    name: `course_${index}-description`,
                },
                study_points: {
                    value: course.study_points,
                    name: `course_${index}-study_points`,
                },
                contact_hours: {
                    value: course.contact_hours,
                    name: `course_${index}-contact_hours`,
                },
                period: {
                    value: course.period,
                    name: `course_${index}-period`,
                },
                isNotLastInArray: index !== data.courses.length - 1,
                dropdown: {
                    periods: [{ value: course.period + '-' + course.semester, label: `Periode ${course.period}` }],
                }
            }
        });

        const classes = data.classes.map((classItem, index) => {
            return {
                id: `class_${index}`,
                name: {
                    value: classItem.name,
                    name: `class_${index}-name`,
                },
                isNotLastInArray: index !== data.classes.length - 1,
            }
        });

        const renderData = {
            user: req.user,
            title: education_programme.title.value,
            method: "GET",
            viewOnly: true,
            editUrl: `/education-programmes/${req.params.id}/edit`,
            education_programme: {
                data: education_programme,
            },
            programme_lines: {
                data: programme_lines.map(programme_line => {
                    return {
                        ...programme_line,
                        viewOnly: true,
                    }
                }),
            },
            courses: {
                data: courses.map(course => {
                    return {
                        ...course,
                        viewOnly: true,
                    }
                }),
            },
            classes: {
                data: classes.map(classItem => {
                    return {
                        ...classItem,
                        viewOnly: true,
                    }
                }),
            },
        }

        res.render("education-programme", renderData)

    } catch (error) {
        console.log(error);
        const data = {
            user: req.user,
            error: {
                message: error.message,
                code: 500,
            },
        };
        res.status(data.error.code).render("error", data);
    }
}