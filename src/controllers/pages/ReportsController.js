import Comment from "../../models/Comment.js";
import { formatDate } from "../../utils/formatDate.js";

export const reportsPage = async (req, res, next) => {
    try {
        const employeeId = req.user.employee.id;

        // Extract the specific word (e.g., 'course') from the URL
        const url = req.originalUrl; // get the full URL
        const pathSegments = url.split('/'); // split the URL into segments
        const reportType = pathSegments[1].split('-')[0]; // assuming the word is in the second segment and split by '-'

        // Initialize the query with the logged-in employee's ID and the extracted word
        let comments = await Comment.query()
            .withGraphFetched('[employee.[user, functions], course, student.[user]]')
            .where('employee_id', employeeId)
            .where('tag', reportType)
            .orderBy('created_at', 'desc');

        // Format comments for rendering
        const formattedComments = comments.map((comment) => {
            return {
                title: `${formatDate(comment.created_at)}${comment.course ? ` — ${comment.course.name}` : ''} — ${comment.student.user.firstname} ${comment.student.user.lastname}`,
                text: comment.comment,
                returnUrl: `${reportType === "course" ? '/course-reports' : reportType === "personal" ? '/personal-reports' : '/coaching-reports'}/`,
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
