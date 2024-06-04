/*
* ------------------------------
*        ADD USER PAGE
* ------------------------------
*/

import Label from "../../models/Label.js";

export const userStudentAddPage = async (req, res) => {

    const labelsData = await Label.query()
    const labelsDropdown = labelsData.map(label => { return { type: "checkbox", value: label.id, label: label.title } });

    // ——— INITIAL DATA ———
    // ** Personal data **
    let personal = {
        firstname: {
            value: req.data?.user?.firstname || "",
            name: "personal-firstname",
        },
        lastname: {
            value: req.data?.user?.lastname || "",
            name: "personal-lastname",
        },
        email: {
            value: req.data?.user?.email || "",
            name: "personal-email",
        },
    }
    
    // ** Contact data **
    let contact = {
        website: {
            value: req.data?.user?.website || "",
            name: "contact-website",
        },
        linkedin: {
            value: req.data?.user?.linkedin || "",
            name: "contact-linkedin",
        },
        facebook: {
            value: req.data?.user?.github || "",
            name: "contact-github",
        },
    }

    // ** Label data **
    let labels = {
        label: {
            value: null, // Is a number
            name: "labels-label",
        },
        dropdown: {
            labels: [...labelsDropdown],
        }
    }

    const data = {
        user: req.user,
        title: "Student toevoegen",
        returnUrl: "/users",
        cancelUrl: "/users",
        form: {
            action: "/users/add-user",
            method: "POST",
        },
        data: {
            personal: personal,
            labels: labels,
            contact: contact,
        },
        pageError: req.pageError,
    };

    res.render('user', data);

}