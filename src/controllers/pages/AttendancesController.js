/**
 * ------------------------------
 *        PRESENCES PAGE
 * ------------------------------
 */

import { employeeFunctionAuth } from "../../utils/employeeFunctionAuth.js";
import Attendance from "../../models/Attendance.js";
import AttendanceType from "../../models/AttendanceType.js";
import Course from "../../models/Course.js";
import Student from "../../models/Student.js";
import EducationProgramme from "../../models/EducationProgramme.js";
import { getStudentById } from "../../services/models/Student.js";

export const attendancesStudentPage = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await getStudentById(studentId, "[user]");

    const filterCourse = req.query.filterCourse;
    const filterAttendanceType = req.query.filterAttendanceType;

    // ** Courses **
    const courseQuery = await Course.query()
      .joinRelated("students")
      .where("students.id", parseInt(studentId));
    const courseOptions = courseQuery.map((course) => {
      return {
        value: course.id,
        label: course.name,
        selected: course.id === parseInt(filterCourse),
      };
    });

    // ** Attendance Types **
    const attendanceTypesQuery = await AttendanceType.query();
    const attendanceOptions = attendanceTypesQuery.map((attendanceType) => {
      return {
        value: attendanceType.id,
        label: attendanceType.title,
        selected: attendanceType.id === parseInt(filterAttendanceType),
      };
    });

    const userFilters = [
      {
        id: "filterCourse",
        name: "filterCourse",
        labelText: "Filter op vak:",
        options: [{ value: "", label: "Alle vakken" }, ...courseOptions],
      },
      {
        id: "filterAttendanceType",
        name: "filterAttendanceType",
        labelText: "Filter op aanwezigheid type:",
        options: [
          { value: "", label: "Alle aanwezigheid types" },
          ...attendanceOptions,
        ],
      },
    ];

    // ——— TABLE DATA ———
    let attendances = [];

    attendances = await Attendance.query()
      .withGraphFetched("[attendance_type, course]")
      .where("student_id", studentId)
      .joinRelated("attendance_type")
      .where((builder) => {
        if (filterCourse) {
          builder.where("course_id", filterCourse);
        }
        if (filterAttendanceType) {
          builder.where("attendance_type_id", filterAttendanceType);
        }
      })
      .orderBy("date", "desc");

    const rows = attendances.map((attendance) => {
      return {
        isActive: true,
        cols: [
          attendance.date,
          attendance.course.name,
          attendance.attendance_type.title,
        ],
        delete: {
          delete: req.user.employee ? true : false,
          actionUrl: "",
          infoInputs: [
            `<input type="hidden" name="attendanceId" value="${attendance.id}">`,
          ],
        },
      };
    });

    const attendancesTable = {
      headers: ["Datum", "Vak", "Aanwezigheid type"],
      rows: rows,
    };

    const data = {
      user: req.user,
      userFilters,
      usersTable: attendancesTable,
      pageError: req.pageError,
      flash: req.flash,
      title: `Aanwezigheden van ${student.user.firstname} ${student.user.lastname}`,
      returnUrl: `/student-dashboard/${studentId}`,
    };

    res.render("student-attendances", data);
  } catch (error) {
    console.log(error);
    const data = {
      user: req.user,
      error: {
        message: error.message,
        code: 500,
      },
    };
    res.status(500).render("error", data);
  }
};

export const addAttendancesPage = async (req, res) => {
  const hasFullAccess = employeeFunctionAuth(req.user.employee.functions, [
    "admin",
  ]);
  const isTeamLeader = employeeFunctionAuth(req.user.employee.functions, [
    "teamleader",
  ]);

  // ——— FILTERS DATA ———
  const filterProgramme = req.query.filterProgramme;
  const filterAcademicYear = req.query.filterAcademicYear;
  const filterCourse = req.query.filterCourse;

  // ——— FILTERS OPTIONS ———
  const academicYearsQuery = await EducationProgramme.query()
    .distinct("academic_year")
    .select("academic_year");
  const academicYears = academicYearsQuery.map(
    (academicYear) => academicYear.academic_year
  );
  const academicYearsOptions = academicYears.map((academicYear) => ({
    value: academicYear,
    label: academicYear,
    selected: academicYear === filterAcademicYear,
  }));

  try {
    // ** Education Programme **
    const educationProgrammesQuery = !filterAcademicYear
      ? []
      : await EducationProgramme.query()
          .joinRelated(!hasFullAccess && "employees")
          .where((builder) => {
            if (!hasFullAccess) {
              builder.where("employees.id", req.user.employee.id);
            }
          })
          .where((builder) => {
            if (filterAcademicYear) {
              builder.where("academic_year", filterAcademicYear);
            }
          });
    const educationProgrammesOptions = educationProgrammesQuery.map(
      (programme) => ({
        value: programme.code,
        label: `${programme.title} - ${programme.code}`,
        selected: programme.code === filterProgramme,
        data: [{ title: "id", value: programme.id }],
      })
    );

    // ** Courses **
    const courseQuery = !filterProgramme
      ? []
      : await Course.query()
          .joinRelated(!hasFullAccess && !isTeamLeader && "employees")
          .where((builder) => {
            if (!hasFullAccess && !isTeamLeader) {
              builder.where("employees.id", req.user.employee.id);
            }
          })
          .joinRelated("education_programme")
          .where((builder) => {
            if (filterProgramme) {
              builder.where("education_programme.code", filterProgramme);
            }
          });
    const courseOptions = courseQuery.map((course) => ({
      value: course.id,
      label: course.name,
      selected: course.id === parseInt(filterCourse),
    }));

    const userFilters = [
      {
        id: "filterAcademicYear",
        name: "filterAcademicYear",
        labelText: "Filter op academiejaar:",
        options: [
          { value: "", label: "Selecteer een academisch jaar" },
          ...academicYearsOptions,
        ],
      },
      {
        id: "filterProgram",
        name: "filterProgramme",
        labelText: "Kies een opleiding:",
        options: [
          { value: "", label: "Alle opleidingen" },
          ...educationProgrammesOptions,
        ],
        disabled: !filterAcademicYear,
        data: [{ title: "employee-id", value: req.user.employee.id }],
      },
      {
        id: "filterCourse",
        name: "filterCourse",
        labelText: "Filter op vak:",
        options: [{ value: "", label: "Alle vakken" }, ...courseOptions],
        disabled: !filterProgramme || !courseOptions.length > 0,
      },
    ];

    // ** Attendances **
    const attendanceTypesQuery = await AttendanceType.query();
    const attendanceOptions = attendanceTypesQuery.map((item) => {
      return {
        value: item.id,
        label: item.title,
      };
    });

    // ——— TABLE DATA ———
    let students = [];
    let hasSearched = false;
    if (filterProgramme && filterCourse) {
      hasSearched = true;
      students = await Student.query()
        .withGraphFetched(
          "[user.role, education_programmes, courses, attendances]"
        )
        .joinRelated(filterProgramme && "[education_programmes]")
        .where((builder) => {
          if (filterProgramme) {
            builder.where("education_programmes.code", filterProgramme);
          }
        })
        .joinRelated(filterCourse && "courses")
        .where((builder) => {
          if (filterCourse) {
            builder.where("courses.id", filterCourse);
          }
        });
    }

    const rows = students.map((student, index) => {
      return {
        isActive: true,
        cols: [{
            value: `${student.user.firstname} ${student.user.lastname}`,
            data: [{
              title: `name-${index}`,
              value: student.id,
            }, ],
        }],
        dropdown: {
          attendanceTypes: {
            name: `attendance-${index}`,
            options: attendanceOptions,
          },
        },
      };
    });

    const addAttendanceTable = {
      headers: ["Naam", "Aanwezigheid type"],
      rows: rows,
      hasSearched: hasSearched,
    };

    const data = {
      user: req.user,
      userFilters,
      addAttendanceTable,
      attendanceOptions,
      pageError: req.pageError,
      flash: req.flash,
      courseId: 1,
      date: new Date(),
      totalStudents: rows.length,
    };

    res.render("add-attendances", data);
  } catch (error) {
    const data = {
      user: req.user,
      error: {
        message: error.message,
        code: 500,
      },
    };
    res.status(500).render("error", data);
  }
};
