import { getStudentById } from '../../services/models/Student.js';
import { generatePdf } from '../../utils/gerenatePDF.js';

export const renderStatusTemplate = async (req, res, next) => {
    try {
        // Fetch attendance data for the student
        const studentId = req.params.studentId;
        const student = await getStudentById(studentId, '[user, status_registrations.[status]]');

        // Prepare the data for the PDF
        const data = {
            title: `Status van ${student.user.firstname} ${student.user.lastname}`,
            headers: ['Date', 'Status', 'Annotatie'],
            rows: student.status_registrations.map(att => [att.date, att.status.title, att.note]),
        };

        // Generate the PDF
        const filePath = await generatePdf(data.title, data.headers, data.rows);

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