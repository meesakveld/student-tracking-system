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
        

        // Prepare the data for the PDF
        const data = {
            title: `Verslagen van ${comments[0].student.user.firstname} ${comments[0].student.user.lastname}`,
            headers: ['Date', 'Verslag', 'Auteur'],
            rows: comments.map(com => [formatDate(com.created_at), com.comment, (com.employee.user.firstname + ' ' + com.employee.user.lastname)] ),
            columnSize: [80, 320, 100]
        };

        console.log(data.rows[0])

        // Generate the PDF
        const filePath = await generatePdf(data.title, data.headers, data.rows, data.columnSize);

        // Send the PDF file as a response
        res.sendFile(filePath, (err) => {
            if (err) {
                next(err);
            } else {
                console.log('Sent:', filePath);
            }
        });
    } catch (err) {
        next(err);
    }
};