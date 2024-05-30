/**
 * ------------------------------
 *            IMPORTS
 * ------------------------------
*/

import Express from "express";

// Controllers
import * as ctr from "../../controllers/pages/index.js";
import * as post from "../../controllers/post/index.js";

// Middleware
import jwtAuth from "../../middleware/authentication/jwtAuth.js";
import roleAuth from "../../middleware/authentication/roleAuth.js";
import studentIdAuth from "../../middleware/authentication/studentIdAuth.js";


/**
 * ------------------------------
 *        CONFIGURATION
 * ------------------------------
*/

const router = Express.Router();

router.use(jwtAuth);

/**
 * ------------------------------
 *        ROUTING — GET
 * ------------------------------
*/

router.get('/', ctr.dashboardPage);

router.get('/users', roleAuth(["employee"], ["admin"]), ctr.usersPage);
router.get('/users/:id', roleAuth(["employee", "student"]), studentIdAuth, ctr.userPage);

router.get('/education-programmes', roleAuth(["employee"], ["admin", "teamleader"]), (req, res) => { res.json({ message: "Education Programs" }) });
router.get('/education-programmes/:id', roleAuth(["employee"], ["admin", "teamleader"]), (req, res) => { res.json({ message: "Education Program" }) });

router.get('/student-dashboard/:studentId', roleAuth(["employee", "student"]), studentIdAuth, ctr.studentDashboardPage);
router.get('/student-dashboard/:studentId/attendance', roleAuth(["employee", "student"]), studentIdAuth, (req, res) => { res.json({ message: "Attendance" }) });
router.get('/student-dashboard/:studentId/course-reports', roleAuth(["employee", "student"]), studentIdAuth, ctr.commentsPage);
router.get('/student-dashboard/:studentId/course-reports/add', roleAuth(["employee"], ["teacher"]), ctr.addCommentPage);
router.get('/student-dashboard/:studentId/course-reports/:reportId', roleAuth(["employee", "student"]), studentIdAuth, (req, res) => { res.json({ message: "Report | ctr.studentDetailPage" }) });
router.get('/student-dashboard/:studentId/personal-reports', roleAuth(["employee", "student"]), studentIdAuth, (req, res) => { res.json({ message: "Personal Reports | ctr.commentsPage" }) });
router.get('/student-dashboard/:studentId/personal-reports/:reportId', roleAuth(["employee", "student"]), studentIdAuth, (req, res) => { res.json({ message: "Personal Report | ctr.studentDetailPage" }) });
router.get('/student-dashboard/:studentId/status', roleAuth(["employee"]), studentIdAuth, (req, res) => { res.json({ message: "Status" }) });
router.get('/student-dashboard/:studentId/coaching-reports', roleAuth(["employee", "student"]), studentIdAuth, (req, res) => { res.json({ message: "Coaching Reports | ctr.commentsPage" }) });
router.get('/student-dashboard/:studentId/coaching-reports/:reportId', roleAuth(["employee", "student"]), studentIdAuth, (req, res) => { res.json({ message: "Coaching Report | ctr.studentDetailPage" }) });

router.get('/search-students', roleAuth(["employee"]), ctr.searchStudentPage);
router.get('/search-employees', roleAuth(["employee"], ["teamleader"]), ctr.teachersPage);

router.get('/attendances', roleAuth(["employee"], ["teacher", "teamleader"]), /* ctr.addAttendancesPage */);
router.get('/attendances/add', roleAuth(["employee"], ["teacher", "teamleader"]), ctr.addAttendancesPage );

router.get('/student-reports', (req, res) => { res.json({ message: "Participation" }) });
router.get('/coaching-reports', (req, res) => { res.json({ message: "Coaching Reports" }) });


/**
 * ------------------------------
 *       ROUTING — POST
 * ------------------------------
*/

router.post('/users', roleAuth(["employee"], ["admin"]), post.handleUser );
router.post('/education-programmes', roleAuth(["employee"], ["admin", "teamleader"]), post.handleEducationProgramme );

router.post('/student-dashboard/:studentId/course-reports', roleAuth(["employee"], ["teacher"]), post.handleComment );
router.post('/student-dashboard/:studentId/personal-reports', roleAuth(["employee"]), post.handleComment );
router.post('/student-dashboard/:studentId/coaching-reports', roleAuth(["employee"], ["trajectory coach", "learning coach", "diversity coach", "workplace coach"]), post.handleComment );

router.post('/attendances', roleAuth(["employee"], ["teacher", "teamleader"]), post.handleAttendance, ctr.addAttendancesPage );


export default router;