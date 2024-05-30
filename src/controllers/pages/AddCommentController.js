/*
* ------------------------------
*        ADD COMMENT PAGE
* ------------------------------
*/

export const addCommentPage = (req, res) => {

    const dataLink = [{
        "url": `/student-dashboard/${req.user.id}/course-reports/add`
    }];
    const allowedRoles = ['admin', 'employee'];
    const canAddComment = req.user && allowedRoles;

    const data = {
        user: req.user,
        dataLink,
        canAddComment
    };

    res.render('add-comment', data);
};