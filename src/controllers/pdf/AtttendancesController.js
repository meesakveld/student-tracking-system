import { getStudentById } from '../../services/models/Student.js';
import { generatePdf } from '../../utils/gerenatePDF.js';

export const renderAttendancePdf = async (req, res, next) => {
    try {
        // Fetch attendance data for the student
        const studentId = req.params.studentId;
        const student = await getStudentById(studentId, '[user, attendances.[course, attendance_type]]');

        // If the student has no attendances, redirect to url without the pdf extension
        if (student.attendances.length === 0) {
            return res.redirect(`/student-dashboard/${studentId}/attendance`);
        }

        student.attendances.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });

        // Prepare the data for the PDF
        const data = {
            title: `Aanwezigheden van ${student.user.firstname} ${student.user.lastname}`,
            headers: ['Date', 'Course', 'Type'],
            rows: student.attendances.map(att => [att.date, att.course.name, att.attendance_type.title]),
            columnSize: [80, 210, 210]
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