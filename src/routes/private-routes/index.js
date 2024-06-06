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
import * as auth from "../../middleware/authentication/index.js";
import * as valid from "../../middleware/validation/index.js";
import * as cvt from "../../middleware/converting/index.js";

/**
 * ------------------------------
 *        CONFIGURATION
 * ------------------------------
*/

const router = Express.Router();

router.use(auth.jwtAuth);

/**
 * ------------------------------
 *        ROUTING — GET
 * ------------------------------
*/

router.get('/', ctr.dashboardPage);

router.get('/users', auth.roleAuth(["employee"], ["admin"]), ctr.usersPage);
router.get('/users/add-user', auth.roleAuth(["employee"], ["admin"]), ctr.addUserPage);
router.get('/users/:id', auth.roleAuth(["employee", "student"]), auth.studentIdAuth, ctr.userPage);
router.get('/users/:id/edit', auth.roleAuth(["employee"], ["admin"]), ctr.editUserPage);

router.get('/education-programmes', auth.roleAuth(["employee"], ["admin", "teamleader"]), ctr.educationProgrammesPage);
router.get('/education-programmes/add', auth.roleAuth(["employee"], ["admin", "teamleader"]), ctr.addEducationProgrammePage);
router.get('/education-programmes/:id', auth.roleAuth(["employee"], ["admin", "teamleader"]), ctr.educationProgrammePage);
router.get('/education-programmes/:id/edit', auth.roleAuth(["employee"], ["admin", "teamleader"]), ctr.educationProgrammeEditPage);

router.get('/student-dashboard/:studentId', auth.roleAuth(["employee", "student"]), auth.studentIdAuth, ctr.studentDashboardPage);
router.get('/student-dashboard/:studentId/attendance', auth.roleAuth(["employee", "student"]), auth.studentIdAuth, ctr.attendancesStudentPage);
router.get('/student-dashboard/:studentId/status', auth.roleAuth(["employee"]), auth.studentIdAuth, ctr.statusStudentPage);
router.get('/student-dashboard/:studentId/course-reports', auth.roleAuth(["employee", "student"]), auth.studentIdAuth, ctr.commentsPage);
router.get('/student-dashboard/:studentId/course-reports/add', auth.roleAuth(["employee"], ["teacher"]), ctr.addCommentPage);
router.get('/student-dashboard/:studentId/course-reports/:reportId', auth.roleAuth(["employee", "student"]), auth.studentIdAuth, ctr.commentPage);
router.get('/student-dashboard/:studentId/personal-reports', auth.roleAuth(["employee", "student"]), auth.studentIdAuth, ctr.commentsPage);
router.get('/student-dashboard/:studentId/personal-reports/add', auth.roleAuth(["employee"], ["teacher"]), ctr.addCommentPage);
router.get('/student-dashboard/:studentId/personal-reports/:reportId', auth.roleAuth(["employee", "student"]), auth.studentIdAuth, ctr.commentPage);
router.get('/student-dashboard/:studentId/coaching-reports', auth.roleAuth(["employee", "student"]), auth.studentIdAuth, ctr.commentsPage);
router.get('/student-dashboard/:studentId/coaching-reports/add', auth.roleAuth(["employee"], ["teacher"]), ctr.addCommentPage);
router.get('/student-dashboard/:studentId/coaching-reports/:reportId', auth.roleAuth(["employee", "student"]), auth.studentIdAuth, ctr.commentPage);

router.get('/search-students', auth.roleAuth(["employee"]), ctr.searchStudentPage);
router.get('/search-employees', auth.roleAuth(["employee"], ["teamleader"]), ctr.searchEmployeesPage);

router.get('/attendances', auth.roleAuth(["employee"], ["teacher", "teamleader"]), /* ctr.addAttendancesPage */);
router.get('/attendances/add', auth.roleAuth(["employee"], ["teacher", "teamleader"]), ctr.addAttendancesPage);

router.get('/student-reports', (req, res) => { res.json({ message: "Participation" }) });
router.get('/coaching-reports', (req, res) => { res.json({ message: "Coaching Reports" }) });



/**
 * ------------------------------
 *       ROUTING — POST
 * ------------------------------
*/

router.post('/users', auth.roleAuth(["employee"], ["admin"]), post.handleUser);
router.post('/education-programmes/add', auth.roleAuth(["employee"], ["admin", "teamleader"]), cvt.convertEducationProgramme, valid.EducationProgrammeValidation, post.handleEducationProgramme, ctr.addEducationProgrammePage);
router.post('/education-programmes/:id/edit', auth.roleAuth(["employee"], ["admin", "teamleader"]), cvt.convertEducationProgramme, valid.EducationProgrammeValidation, post.handleEducationProgramme, ctr.addEducationProgrammePage);
router.post('/student-dashboard/:studentId/attendance', auth.roleAuth(["employee"], ["teacher", "teamleader"]), post.handleAttendance, ctr.attendancesStudentPage);
router.post('/student-dashboard/:studentId/status', auth.roleAuth(["employee"], ["teamleader", "trajectory coach", "learning coach", "diversity coach", "workplace coach"]), post.handleStatus, ctr.statusStudentPage);
router.post('/student-dashboard/:studentId/course-reports/:reportId', auth.roleAuth(["employee"], ["teacher", "teamleader"]), valid.CommentValidation, post.handleComment, ctr.handleComment );
router.post('/student-dashboard/:studentId/personal-reports/:reportId', auth.roleAuth(["employee"]), valid.CommentValidation, post.handleComment, ctr.handleComment );
router.post('/student-dashboard/:studentId/coaching-reports/:reportId', auth.roleAuth(["employee"], ["teamleader", "trajectory coach", "learning coach", "diversity coach", "workplace coach"]), valid.CommentValidation, post.handleComment, ctr.handleComment );

router.post('/attendances', auth.roleAuth(["employee"], ["teacher", "teamleader"]), post.handleAttendance, ctr.addAttendancesPage);


export default router;