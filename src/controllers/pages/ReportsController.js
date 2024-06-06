import Comment from "../../models/Comment.js";
import { formatDate } from "../../utils/formatDate.js";

export const reportsPage = async (req, res, next) => {
    try {
        // Get the id of the logged-in employee and get the comment type -> possibilities: course OR coaching
        const employeeId = req.user.employee.id;
        // Extract the specific word (e.g., 'course') from the URL
        const url = req.originalUrl; // get the full URL
        const pathSegments = url.split('/'); // split the URL into segments
        const reportType = pathSegments[1].split('-')[0]; // assuming the word is in the second segment and split by '-'

        // Initialize the query with the logged-in employee's ID and the extracted word
        let comments = await Comment.query()
            .withGraphFetched('[employee.[user, functions], course]')
            .where('employee_id', employeeId)
            .where('tag', reportType)
            .orderBy('created_at', 'desc');

        // Format comments for rendering
        const formattedComments = comments.map((comment) => {
            return {
                title: `${formatDate(comment.created_at)}${comment.course ? ` — ${comment.course.name}` : ''} — ${comment.employee.user.firstname} ${comment.employee.user.lastname}`,
                text: comment.comment,
                ...comment
            };
        });

        const title = reportType === "course" ? "Vak verslagen" : reportType === "personal" ? "Persoonlijke verslagen" : "Coaching verslagen";

        // Data to be passed to the template
        const data = {
            user: req.user,
            title: title,
            addUrl: '/search-students',
            dataComments: formattedComments,
            returnUrl: "/"
        };

        // Render page
        res.render('reports', data);
    } catch (error) {
        next(error);
    }
};
