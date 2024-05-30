export const createComment = async (req, res, next) => {


    
}

export const updateComment = async (req, res, next) => {

}

export const deleteComment = async (req, res, next) => {

}

export const handleComment = async (req, res, next) => {
    const method = req.body.method;

    if (method === "POST") {
        createComment(req, res, next);
    }

    if (method === "PATCH") {
        updateComment(req, res, next);
    }

    if (method === "DELETE") {
        deleteComment(req, res, next);
    }

}