/*
* ------------------------------
*        ADD USER PAGE
* ------------------------------
*/

import EducationProgramme from "../../models/EducationProgramme.js";
import Label from "../../models/Label.js";

export const userStudentAddPage = async (req, res) => {

    const labelsData = await Label.query()
    const labelsDropdown = labelsData.map(label => { return { type: "checkbox", value: label.id, label: label.title } });

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
    }

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
            value: req.data?.contact?.github || "",
            name: "contact-github",
        },
    }

    // ** Label data **
    let labels = {
        label: {
            name: "labels",
        },
        dropdown: {
            labels: [...labelsDropdown],
        }
    }

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
        education_programmes: req.data?.education_programmes.map((education_programme, index) => {
            return {
                id: `education_programme_${index}`,
                education_programme_id: {
                    value: education_programme.education_programme_id,
                    name: `education_programme_${index}-id`,
                },
                title: {
                    value: education_programme.title,
                    name: `education_programme_${index}-title`,
                },
                courses: education_programme.courses.map((course, courseIndex) => {
                    return {
                        id: `courses-${index}-${courseIndex}`,
                        name: `courses-${index}`,
                        value: course.id,
                        label: course.title,
                        selected: course.selected,
                    }
                }),
                notLastInArray: index !== education_programmes.length - 1,
            }
        }),
        // [
            // {
            //     id: 'education_programme_0',
            //     education_programme_id: {
            //         value: 1,
            //         name: 'education_programme_0-id'
            //     },
            //     title: {
            //         value: req.data?.educationProgramme?.title || "Graduaat in het programmeren — 2023-24",
            //         name: "education_programme_0-title",
            //     },
            //     courses: [
            //         {
            //             id: "courses-0-0", // education_programme_id - course index
            //             name: "courses-0", // education_programme_id
            //             value: 1, // course id
            //             label: "IT Communication", // course title
            //             selected: true
            //         },
            //     ],
            //     notLastInArray: false,
            // },
        // ]
    }

    const data = {
        user: req.user,
        title: "Student toevoegen",
        returnUrl: "/users",
        cancelUrl: "/users",
        formOptions: {
            action: "/users/add-user",
            method: "POST",
        },
        formData: {
            personal: personal,
            labels: labels,
            contact: contact,
            education_programme: education_programme,
        },
        pageError: req.pageError,
    };

    res.render('user', data);

}