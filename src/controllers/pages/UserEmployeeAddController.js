/*
* ------------------------------
*        ADD USER PAGE
* ------------------------------
*/

import EducationProgramme from "../../models/EducationProgramme.js";
import Function from "../../models/Function.js";

export const userEmployeeAddPage = async (req, res) => {
    try {
        const functionsData = await Function.query();
        const functionDropdown = functionsData.map(item => ({ type: "checkbox", value: item.id, label: item.title, selected: req.data?.functions?.some(functionItem => item.id === functionItem.id)}));

        const academicYearsQuery = await EducationProgramme.query().distinct('academic_year').select('academic_year');
        const academicYears = academicYearsQuery.map(academicYear => academicYear.academic_year);
        const academicYearsOptions = academicYears.map(academicYear => ({ value: academicYear, label: academicYear }));

        // ——— INITIAL DATA ———
        // ** Personal data **
        let personal = {
            firstname: {
                value: req.data?.firstname || "",
                name: "personal-firstname",
            },
            lastname: {
                value: req.data?.lastname || "",
                name: "personal-lastname",
            },
            email: {
                value: req.data?.email || "",
                name: "personal-email",
            },
            role: {
                value: 2,
                label: "employee",
                name: "personal-role",
            }
        };

        // ** Contact data **
        let contact = {
            website: {
                value: req.data?.contact?.website || "",
                name: "contact-website",
            },
            linkedin: {
                value: req.data?.contact?.linkedin || "",
                name: "contact-linkedin",
            },
            facebook: {
                value: req.data?.contact?.facebook || "",
                name: "contact-facebook",
            },
        };

        // ** Label data **
        let functions = {
            label: {
                name: "functions",
            },
            dropdown: {
                functions: [...functionDropdown],
            }
        };

        // ** Education programme data **
        let education_programme = {
            education_programme_filters: [
                {
                    id: "filterAcademicYear",
                    name: "filterAcademicYear",
                    form: "selectEducationProgramme",
                    labelText: "Kies een academisch jaar:",
                    options: [
                        { value: "", label: "Kies academisch jaar" },
                        ...academicYearsOptions
                    ]
                },
                {
                    id: "filterProgram",
                    name: "filterProgramme",
                    labelText: "Kies een opleiding:",
                    form: "selectEducationProgramme",
                    options: [
                        { value: "", label: "Kies opleiding" },
                    ],
                    disabled: true,
                    data: [
                        { title: "employee-id", value: req.user.employee.id }
                    ]
                }
            ],
            education_programmes: !req.data?.education_programmes ? [] : await Promise.all(req.data?.education_programmes.map(async (education_programme, index) => {
                const education_programme_data = await EducationProgramme.query().findById(education_programme.id).withGraphFetched('courses');
                const formattedCourses = education_programme_data.courses.map((course, indexCourse) => {
                    return {
                        id: `courses-${index}-${indexCourse}`,
                        name: `courses-${index}`,
                        value: course.id,
                        label: course.name,
                        selected: req.data?.courses?.some(item => item.id === course.id),
                    };
                });

                const data = {
                    id: `education_programme_${index}`,
                    education_programme_id: {
                        value: education_programme_data.id,
                        name: `education_programme_${index}-id`,
                    },
                    title: {
                        value: education_programme_data.title + "—" + education_programme_data.academic_year,
                        name: `education_programme_${index}-title`,
                    },
                    courses: formattedCourses,
                    notLastInArray: index !== req.data.education_programmes.length - 1,
                };

                return data;
            })),
        };

        const data = {
            user: req.user,
            title: "Medewerker toevoegen",
            returnUrl: "/users",
            cancelUrl: "/users",
            formOptions: {
                action: "/users/add-employee",
                method: "POST-EMPLOYEE",
            },
            formData: {
                personal: personal,
                functions: functions,
                contact: contact,
                education_programme: education_programme,
            },
            pageError: req.pageError,
        };

        res.render('user', data);

    } catch (error) {
        console.error(error);
    }
};
