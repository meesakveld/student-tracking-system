import { generatePdf } from '../../utils/gerenatePDF.js';
import Comment from '../../models/Comment.js';
import { formatDate } from '../../utils/formatDate.js';

export const renderPersonalReportsPdf = async (req, res, next) => {
    try {

        // Fetch attendance data for the student
        const studentId = req.params.studentId;
        const comments = await Comment.query()
            .withGraphFetched('[employee.[user], course, student.[user]]')
            .where('student_id', studentId)
            .where('tag', 'personal')
            .orderBy('created_at', 'desc');

        // If the student has no attendances, redirect to url without the pdf extension
        if (comments.length === 0) {
            return res.redirect(`/student-dashboard/${studentId}/personal-reports?type=personal`);
        }


        // Prepare the data for the PDF
        const data = {
            title: `Persoonlijke verslagen van ${comments[0].student.user.firstname} ${comments[0].student.user.lastname}`,
            headers: ['Date', 'Verslag', 'Auteur'],
            rows: comments.map(com => [formatDate(com.created_at), com.comment, (com.employee.user.firstname + ' ' + com.employee.user.lastname)]),
            columnSize: [80, 320, 100]
        };

        console.log(data.rows[0])

        // Generate the PDF
        const filePath = await generatePdf(data.title, data.headers, data.rows, data.columnSize);

        // Send the PDF file as a response
        res.sendFile(filePath, (err) => {
            if (err) {
                throw err;
            } else {
                console.log('Sent:', filePath);
            }
        });

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
    };
};