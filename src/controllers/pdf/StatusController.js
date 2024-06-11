import { getStudentById } from '../../services/models/Student.js';
import { generatePdf } from '../../utils/gerenatePDF.js';
import { formatDate } from '../../utils/formatDate.js';

export const renderStatusPdf = async (req, res, next) => {
    try {
        // Fetch attendance data for the student
        const studentId = req.params.studentId;
        const student = await getStudentById(studentId, '[user, status_registrations.[status]]');

        // If the student has no attendances, redirect to url without the pdf extension
        if (student.status_registrations.length === 0) {
            return res.redirect(`/student-dashboard/${studentId}/status`);
        }

        student.status_registrations.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });

        // Prepare the data for the PDF
        const data = {
            title: `Status van ${student.user.firstname} ${student.user.lastname}`,
            headers: ['Date', 'Status', 'Annotatie'],
            rows: student.status_registrations.map(att => [formatDate(att.date), att.status.title, (att.note || '')]),
            columnSize: [80, 100, 320]
        };

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