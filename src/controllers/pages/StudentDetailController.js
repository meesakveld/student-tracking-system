/**
 * ------------------------------
 *      STUDENT DETAIL PAGE
 * ------------------------------
 */

export const studentDetailPage = (req, res) => {
    {
        const user = {
            name: "Philippe De Pauw",
            role: "Admin"
        };
    
        const student = {
            name: "Mees Akveld",
            class: "PGM1-C"
        };
    
        const section = {
            title: "Aanwezigheid hoor- en werkcolleges",
            content: "Mees heeft alle colleges en workshops regelmatig bijgewoond. Hij heeft grote toewijding getoond en actief deelgenomen aan de lessen."
        };
    
        res.render('student-detail', { user, student, section });
    };
}

export default studentDetailPage;