/**
 * ------------------------------
 *       EDIT USER PAGE
 * ------------------------------
 */

import EducationProgramme from "../../models/EducationProgramme.js";
import Label from "../../models/Label.js";
import { getUserById } from "../../services/models/User.js"

export const userEditStudentPage = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = await getUserById(id, '[role, contact, student.[labels, courses, education_programmes], employee]');

        let userData = user;
        if (user.student) userData.account = user.student; delete userData.student
        if (user.employee) userData.account = user.employee; delete userData.employee

        const labelsData = await Label.query();
        const labelsDropdown = labelsData.map(label => ({ type: "checkbox", value: label.id, label: label.title, selected: userData.account?.labels?.some(item => item.id === label.id) }));

        const academicYearsQuery = await EducationProgramme.query().distinct('academic_year').select('academic_year');
        const academicYears = academicYearsQuery.map(academicYear => academicYear.academic_year);
        const academicYearsOptions = academicYears.map(academicYear => ({ value: academicYear, label: academicYear }));


        // ——— INITIAL DATA ———
        // ** Personal data **
        let personal = {
            firstname: {
                value: userData.firstname,
                name: "personal-firstname",
            },
            lastname: {
                value: userData.lastname,
                name: "personal-lastname",
            },
            email: {
                value: userData.email,
                name: "personal-email",
            },
            role: {
                value: 1,
                label: "student",
                name: "personal-role",
            },
            student_id: {
                value: userData.account.id,
                name: "personal-student_id",
            },
        }

        // ** Contact data **
        let contact = {
            website: {
                value: userData.contact?.website || "",
                name: "contact-website",
            },
            linkedin: {
                value: userData.contact?.linkedin || "",
                name: "contact-linkedin",
            },
            facebook: {
                value: userData.contact?.facebook || "",
                name: "contact-facebook",
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
            education_programmes: await Promise.all(userData.account.education_programmes.map(async (education_programme, index) => {
                const education_programme_data = await EducationProgramme.query().findById(education_programme.id).withGraphFetched('courses');
                const formattedCourses = education_programme_data.courses.map((course, indexCourse) => {
                    return {
                        id: `courses-${index}-${indexCourse}`,
                        name: `courses-${index}`,
                        value: course.id,
                        label: course.name,
                        selected: userData.account?.courses?.some(item => item.id === course.id),
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
                    notLastInArray: index !== userData.account?.education_programmes.length - 1,
                };

                return data;
            })),
        };

        const data = {
            user: req.user,
            title: `${userData.firstname} ${userData.lastname} — Bewerken`,
            returnUrl: `/users/${id}`,
            cancelUrl: `/users/${id}`,
            formOptions: {
                action: `/users/${id}/edit/student`,
                method: "PATCH-STUDENT",
            },
            formData: {
                personal: personal,
                labels: labels,
                contact: contact,
                education_programme: education_programme,
            },
            pageError: req.pageError,
        }

        res.render('user', data);

    } catch (error) {
        const data = {
            user: req.user,
            error: {
                message: error.message,
                code: 500
            }
        }
        res.status(500).render('error', data);
    }
};
