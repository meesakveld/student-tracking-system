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
            value: "",
            name: "education_programme-title",
        },
        academic_year: {
            value: "",
            name: "education_programme-academic_year",
        },
        code: {
            value: "",
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
                value: NaN, // Is a number
                name: "programme_line_0-study_points",
            },
            isNotLastInArray: true,
        },
    ]

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
                value: NaN, // Is a number
                name: "course_0-study_points",
            },
            contact_hours: {
                value: NaN, // Is a number
                name: "course_0-contact_hours",
            },
            period: {
                value: NaN, // Is a number
                name: "course_0-period",
            },
            isNotLastInArray: true,
            dropdown: {
                periods: periods,
            },
        },
    ]

    // ** Classes data **
    let classes = [
        {
            id: `class_0`,
            name: {
                value: "",
                name: "class_0-name",
            },
            isNotLastInArray: true,
        },
    ]

    // ——— RENDER DATA ———
    const data = {
        user: req.user,
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
    };

    res.render('add-education-programme', data);
};