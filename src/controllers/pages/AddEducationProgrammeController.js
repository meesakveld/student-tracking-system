/**
 * ------------------------------
 *  ADD EDUCATION PROGRAMME PAGE
 * ------------------------------
*/

export const addEducationProgrammePage = async (req, res) => {
    

    // ——— PERIODS ———
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

    // ——— INITIAL DATA ———
    // ** Education programme data **
    let education_programme = {
        title: {
            value: req.data?.educationProgramme?.title || "",
            name: "education_programme-title",
        },
        academic_year: {
            value: req.data?.educationProgramme?.academic_year || "",
            name: "education_programme-academic_year",
        },
        code: {
            value: req.data?.educationProgramme?.code || "",
            name: "education_programme-code",
        },
    }

    // ** Programme lines data **
    let programme_lines = [
        {
            id: `programme_line_0`,
            name: {
                value: "",
                name: "programme_line_0-name",
            },
            description: {
                value: "",
                name: "programme_line_0-description",
            },
            study_points: {
                value: null, // Is a number
                name: "programme_line_0-study_points",
            },
            isNotLastInArray: false,
        },
    ]
    if (req.data?.programmaLines) {
        programme_lines = req.data.programmaLines.map((programme_line, index) => {
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
                isNotLastInArray: index !== req.data.programmaLines.length - 1,
            }
        });
    }


    // ** Courses data **
    let courses = [
        {
            id: `course_0`,
            name: {
                value: "",
                name: "course_0-name",
            },
            description: {
                value: "",
                name: "course_0-description",
            },
            study_points: {
                value: null, // Is a number
                name: "course_0-study_points",
            },
            contact_hours: {
                value: null, // Is a number
                name: "course_0-contact_hours",
            },
            period: {
                value: null, // Is a number
                name: "course_0-period",
            },
            isNotLastInArray: false,
            dropdown: {
                periods: periods,
            },
        },
    ]
    if (req.data?.courses) {
        courses = req.data.courses.map((course, index) => {
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
                    value: course.studyPoints,
                    name: `course_${index}-study_points`,
                },
                contact_hours: {
                    value: course.contactHours,
                    name: `course_${index}-contact_hours`,
                },
                period: {
                    value: course.period + "-" + course.semester,
                    name: `course_${index}-period`,
                },
                isNotLastInArray: index !== req.data.courses.length - 1,
                dropdown: {
                    periods: periods.map(period => {
                        return {
                            ...period,
                            selected: period.value === course.period + "-" + course.semester,
                        }
                    }),
                },
            }
        });
    }

    // ** Classes data **
    let classes = [
        {
            id: `class_0`,
            name: {
                value: "",
                name: "class_0-name",
            },
            isNotLastInArray: false,
        },
    ]
    if (req.data?.classes) {
        classes = req.data.classes.map((classData, index) => {
            return {
                id: `class_${index}`,
                name: {
                    value: classData.name,
                    name: `class_${index}-name`,
                },
                isNotLastInArray: index !== req.data.classes.length - 1,
            }
        });
    }

    // ——— RENDER DATA ———
    const data = {
        user: req.user,
        title: 'Voeg een opleiding toe',
        method: 'POST',
        formAction: '/education-programmes/add',
        cancelUrl: '/education-programmes',
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
    };

    res.render('education-programme', data);
};