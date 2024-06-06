import { componentsPage } from './ComponentsController.js';

import { welcomePage } from './WelcomeController.js';
import { dashboardPage } from './DashboardController.js';

import { addAttendancesPage, attendancesStudentPage } from './AttendancesController.js';
import { searchStudentPage } from './SearchStudentController.js';
import { searchEmployeesPage } from './SearchEmployeesController.js'
import { studentDashboardPage } from './StudentDashboardController.js';


import { userPage } from './UserController.js';
import { usersPage } from './UsersController.js';
import { userEditStudentPage } from './UserStudentEditController.js';
import { userStudentAddPage } from './UserStudentAddController.js';

import  { commentsPage, commentPage, addCommentPage, handleComment } from './CommentsController.js';
import { educationProgrammesPage } from './EducationProgrammesController.js';
import { educationProgrammePage } from './EducationProgrammeController.js';
import { educationProgrammeEditPage } from './EducationProgrammeEditController.js';
import { addEducationProgrammePage } from './AddEducationProgrammeController.js';
import { reportsPage } from './ReportsController.js';

import { errorPage } from './ErrorController.js';

export {
    componentsPage,
    dashboardPage,
    addAttendancesPage,
    attendancesStudentPage,
    educationProgrammeEditPage,
    searchStudentPage,
    studentDashboardPage,
    searchEmployeesPage,
    errorPage,
    userPage,
    usersPage,
    welcomePage,
    commentsPage,
    addCommentPage,
    handleComment,
    commentPage,
    educationProgrammePage,
    educationProgrammesPage,
    addEducationProgrammePage,
    userStudentAddPage,
    userEditStudentPage,
    reportsPage
}