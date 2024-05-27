/**
 * ------------------------------
 *      STUDENT DETAIL PAGE
 * ------------------------------
 */

export const studentDetailPage = (req, res) => {

    const section = {
        title: "Aanwezigheid hoor- en werkcolleges",
        content: "Mees heeft alle colleges en workshops regelmatig bijgewoond. Hij heeft grote toewijding getoond en actief deelgenomen aan de lessen."
    };

    const data = {
        user: req.user,
        pageTitle: `Studentenfiche van: ${req.user.firstname} ${req.user.lastname}`,
        section,
    };

    res.render('student-detail', data);
}

export default studentDetailPage;