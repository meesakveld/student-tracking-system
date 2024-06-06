/**
 * ------------------------------
 *          USER PAGE
 * ------------------------------
 */


import { getUserById } from "../../services/models/User.js";

export const userPage = async (req, res) => {

    try {

        const id = parseInt(req.params.id);
        const user = await getUserById(id, '[role, contact, student.[labels, courses, education_programmes], employee]');

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
            title: `Gebruiker: ${userData.firstname} ${userData.lastname}`,
            returnUrl: req.query.returnUrl || "/",
            formData: {
                personal: personal,
                labels: labels,
                contact: contact,
                education_programme: education_programme,
            },
            viewOnly: true,
            editUrl: `/users/${id}/edit/${userData.role.title.toLowerCase()}`,
        };

        res.render('user', data);

    } catch (error) {
        console.error(error);
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
