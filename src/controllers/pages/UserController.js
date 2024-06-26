/**
 * ------------------------------
 *          USER PAGE
 * ------------------------------
 */


import { getUserById } from "../../services/models/User.js";
import { employeeFunctionAuth } from "../../utils/employeeFunctionAuth.js";

export const userPage = async (req, res) => {

    try {

        let passwordResetFlash = null;
        if (req.query.token) {
            const token = req.query.token;
            const baseUrl = `${req.protocol}://${req.get('host')}`;
            passwordResetFlash = `De gebruiker kan het wachtwoord updaten via deze link: <a href="${`${baseUrl}/update-password/${token}`}">${baseUrl}/update-password/${token}</a>`;
        }

        const id = parseInt(req.params.id);
        const user = await getUserById(id, '[role, contact, student.[labels, courses, education_programmes], employee.[functions, courses, education_programmes]]');

        let userData = user;
        if (user.student) userData.account = user.student; delete userData.student
        if (user.employee) userData.account = user.employee; delete userData.employee

        // ——— PERSONAL DATA ———
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
                value: userData.role.id,
                label: userData.role.title,
                name: "personal-role",
            },
            is_active: {
                name: "personal-is_active",
                dropdown: {
                    options: [
                        { value: 1, label: "Actief", selected: userData.is_active},
                        { value: 0, label: "Inactief", selected: !userData.is_active},
                    ],
                },
            }
        }

        // ——— CONTACT DATA ———
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

        // ——— LABEL DATA ———
        let labels = {
            label: {
                name: "labels",
            },
            dropdown: {
                labels: !userData.account?.labels ? [] : userData.account.labels.map(label => ({ type: "checkbox", value: label.id, label: label.title, selected: true })),
            }
        }

        // ——— FUNCTIONS DATA ———
        let functions = {
            functions: {
                name: "functions",
            },
            dropdown: {
                functions: !userData.account?.functions ? [] : userData.account.functions.map(func => ({ type: "checkbox", value: func.id, label: func.title, selected: true })),
            }
        }

        // ——— EDUCATION PROGRAMME DATA ———
        let education_programme = {}
        if (userData.account.education_programmes) {
            education_programme = {
                education_programmes: userData.account.education_programmes.map((education_programme, index) => {
                    return {
                        id: `education_programme_${index}`,
                        education_programme_id: {
                            value: education_programme.id,
                            name: `education_programme_${index}_id`,
                        },
                        title: {
                            value: education_programme.title,
                            name: `education_programme_${index}_title`,
                        },
                        courses: userData.account.courses.filter((course) => course.education_programme_id === education_programme.id).map((course, indexCourse) => {
                            return {
                                id: `education_programme_${index}-${indexCourse}`,
                                name: `courses-${index}`,
                                value: course.id,
                                label: course.name,
                                selected: true,
                            }
                        })
                    }
                })
            }
        }

        const data = {
            user: req.user,
            title: `${userData.firstname} ${userData.lastname}`,
            returnUrl: req.query.returnUrl || "/",
            formData: {
                personal: personal,
                labels: labels,
                functions: functions,
                contact: contact,
                education_programme: education_programme,
            },
            viewOnly: true,
            mayEdit: req.user.employee?.functions ? employeeFunctionAuth(req.user.employee?.functions, ['admin', 'teamleader']) : false,
            editUrl: `/users/${id}/edit-${userData.role.title.toLowerCase()}`,
            studentFicheUrl: personal.role.value === 1 ? `/student-dashboard/${userData.account.id}` : null,
            passwordResetFlash: passwordResetFlash,
        };

        res.render('user', data);

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
};
