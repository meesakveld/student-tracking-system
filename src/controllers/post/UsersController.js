export const createUser = async (req, res, next) => {

    console.log(req.data)

    next();

}

export const updateUser = async (req, res, next) => {

}

export const softDeleteUser = async (req, res, next) => {

}

export const deleteUser = async (req, res, next) => {

}

export const handleUser = async (req, res, next) => {
    const method = req.body.method;
    
    if (method === "POST") {
        createUser(req, res, next);
    }

    if (method === "PATCH") {
        updateUser(req, res, next);
    }

    if (method === "DELETE") {
        softDeleteUser(req, res, next);
    }

    if (method === "DESTROY") {
        deleteUser(req, res, next);
    }

}