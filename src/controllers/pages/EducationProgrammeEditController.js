import { getEducationProgrammeById } from "../../services/models/EducationProgramme.js";

export const educationProgrammeEditPage = async (req, res) => {

    const data = await getEducationProgrammeById(req.params.id, '[classes, programme_lines, courses]');

    const periods = [
        { value: "1-1", label: "Periode 1" },
        { value: "2-1", label: "Periode 2" },
        { value: "3-2", label: "Periode 3" },
        { value: "4-2", label: "Periode 4" },
        { value: "5-1", label: "Periode 5" },
        { value: "6-1", label: "Periode 6" },
        { value: "7-2", label: "Periode 7" },
        { value: "8-2", label: "Periode 8" },
    ];

    // ** Education programme data **
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

    // ** Programme lines data **
    const programme_lines = data.programme_lines.map((programme_line, index) => {
        return {
            id: `programme_line_${index}`,
            programme_line_id: {
                value: programme_line.id,
                name: `programme_line_${index}-id`,
            },
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

    // ** Courses data **
    const courses = data.courses.map((course, index) => {
        return {
            id: `course_${index}`,
            course_id: {
                value: course.id,
                name: `course_${index}-id`,
            },
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
            dropdown: {
                periods: periods.map(period => {
                    return {
                        ...period,
                        selected: period.value === course.period + "-" + course.semester,
                    }
                }),
            },
            isNotLastInArray: index !== data.courses.length - 1,
        }
    });

    // ** Classes data **
    const classes = data.classes.map((classItem, index) => {
        return {
            id: `class_${index}`,
            class_id: {
                value: classItem.id,
                name: `class_${index}-id`,
            },
            name: {
                value: classItem.name,
                name: `class_${index}-name`,
            },
            isNotLastInArray: index !== data.classes.length - 1,
        }
    });

    // ——— RENDER DATA ———
    const renderData = {
        user: req.user,
        title: `${data.title} - Bewerken`,
        method: "PATCH",
        formAction: `/education-programmes/${req.params.id}/edit`,
        cancelUrl: `/education-programmes/${req.params.id}`,
        education_programme: {
            data: education_programme,
            error: req.education_programme?.error,
        },
        programme_lines: {
            data: programme_lines,
            error: req.programme_lines?.error,
        },
        courses: {
            data: courses,
            error: req.courses?.error,
        },
        classes: {
            data: classes,
            error: req.classes?.error,
        },
        pageError: req.pageError,
    }

    res.render("education-programme", renderData);

}