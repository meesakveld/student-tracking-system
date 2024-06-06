export const userAuthication = async (req, res, next) => {
    try {
        const data = req.data;

        // ** ——— User ——— **
        // Firstname
        if (!data.firstname) {
            throw new Error("Voornaam is verplicht.");
        }

        // Lastname
        if (!data.lastname) {
            throw new Error("Achternaam is verplicht.");
        }

        // Email
        if (!data.email) {
            throw new Error("E-mail is verplicht.");
        }

        // Role id
        if (!data.role_id) {
            throw new Error("Rol is verplicht.");
        }

        // Functions
        if (data.role_id === 2) { // Teacher
            if (!data.functions || data.functions.length === 0) {
                throw new Error("Minimaal één functie is verplicht.");
            }
        }

        next();
    } catch (error) {
        req.pageError = error.message;
        next();
    }
};
