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
import * as valid from "../../middleware/validation/index.js";

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
router.get('/users/add-user', roleAuth(["employee"], ["admin"]), ctr.addUserPage);
router.get('/users/:id', roleAuth(["employee", "student"]), studentIdAuth, ctr.userPage);
router.get('/users/:id/edit', roleAuth(["employee"], ["admin"]), ctr.editUserPage);

router.get('/education-programmes', roleAuth(["employee"], ["admin", "teamleader"]), ctr.educationProgrammesPage);
router.get('/education-programmes/add', roleAuth(["employee"], ["admin", "teamleader"]), ctr.addEducationProgrammePage);
router.get('/education-programmes/:id', roleAuth(["employee"], ["admin", "teamleader"]), ctr.educationProgrammePage);

router.get('/student-dashboard/:studentId', roleAuth(["employee", "student"]), studentIdAuth, ctr.studentDashboardPage);
router.get('/student-dashboard/:studentId/attendance', roleAuth(["employee", "student"]), studentIdAuth, ctr.attendancesStudentPage);
router.get('/student-dashboard/:studentId/status', roleAuth(["employee"]), studentIdAuth, (req, res) => { res.json({ message: "Status" }) });
router.get('/student-dashboard/:studentId/course-reports', roleAuth(["employee", "student"]), studentIdAuth, ctr.commentsPage);
router.get('/student-dashboard/:studentId/course-reports/add', roleAuth(["employee"], ["teacher"]), ctr.addCommentPage);
router.get('/student-dashboard/:studentId/course-reports/:reportId', roleAuth(["employee", "student"]), studentIdAuth, ctr.commentPage);
router.get('/student-dashboard/:studentId/personal-reports', roleAuth(["employee", "student"]), studentIdAuth, ctr.commentsPage);
router.get('/student-dashboard/:studentId/personal-reports/add', roleAuth(["employee"], ["teacher"]), ctr.addCommentPage);
router.get('/student-dashboard/:studentId/personal-reports/:reportId', roleAuth(["employee", "student"]), studentIdAuth, ctr.commentPage);
router.get('/student-dashboard/:studentId/coaching-reports', roleAuth(["employee", "student"]), studentIdAuth, ctr.commentsPage);
router.get('/student-dashboard/:studentId/coaching-reports/add', roleAuth(["employee"], ["teacher"]), ctr.addCommentPage);
router.get('/student-dashboard/:studentId/coaching-reports/:reportId', roleAuth(["employee", "student"]), studentIdAuth, ctr.commentPage);

router.get('/search-students', roleAuth(["employee"]), ctr.searchStudentPage);
router.get('/search-employees', roleAuth(["employee"], ["teamleader"]), ctr.searchEmployeesPage);

router.get('/attendances', roleAuth(["employee"], ["teacher", "teamleader"]), /* ctr.addAttendancesPage */);
router.get('/attendances/add', roleAuth(["employee"], ["teacher", "teamleader"]), ctr.addAttendancesPage);

router.get('/student-reports', (req, res) => { res.json({ message: "Participation" }) });
router.get('/coaching-reports', (req, res) => { res.json({ message: "Coaching Reports" }) });



/**
 * ------------------------------
 *       ROUTING — POST
 * ------------------------------
*/

router.post('/users', roleAuth(["employee"], ["admin"]), post.handleUser);
router.post('/education-programmes', roleAuth(["employee"], ["admin", "teamleader"]), post.handleEducationProgramme);

router.post('/student-dashboard/:studentId/attendance', roleAuth(["employee"], ["teacher", "teamleader"]), post.handleAttendance, ctr.attendancesStudentPage);
router.post('/student-dashboard/:studentId/course-reports/:reportId', roleAuth(["employee"], ["teacher", "teamleader"]), valid.CommentValidation, post.handleComment, ctr.handleComment );
router.post('/student-dashboard/:studentId/personal-reports/:reportId', roleAuth(["employee"]), valid.CommentValidation, post.handleComment, ctr.handleComment );
router.post('/student-dashboard/:studentId/coaching-reports/:reportId', roleAuth(["employee"], ["teamleader", "trajectory coach", "learning coach", "diversity coach", "workplace coach"]), valid.CommentValidation, post.handleComment, ctr.handleComment );

router.post('/attendances', roleAuth(["employee"], ["teacher", "teamleader"]), post.handleAttendance, ctr.addAttendancesPage);


export default router;