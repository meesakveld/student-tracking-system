export default [
    {
        title: "Gebruikers",
        url: "/users",
        roles: [
            "employee"
        ],
        functions: [
            "admin"
        ]
    },
    {
        title: "Opleidingsprogramma's",
        url: "/education-programmes",
        roles: [
            "employee"
        ],
        functions: [
            "admin",
            "teamleader"
        ]
    },
    {
        title: "Aanwezigheden opnemen",
        url: "/add-attendances",
        roles: [
            "employee"
        ],
        functions: [
            "teacher"
        ]
    },
    {
        title: "Vak Verslagen",
        url: "/course-reports",
        roles: [
            "employee"
        ],
        functions: [
            "teacher"
        ]
    },
    {
        title: "Coaching verslagen",
        url: "/coaching-reports",
        roles: [
            "employee"
        ],
        functions: [
            "trajectory coach",
            "learning coach",
            "diversity coach",
            "workplace coach"
        ]
    },
    {
        title: "Zoek studenten",
        url: "/search-students",
        roles: [
            "employee"
        ],
        functions: [
            "teacher",
            "trajectory coach",
            "learning coach",
            "diversity coach",
            "workplace coach",
            "teamleader"
        ]
    },
    {
        title: "Zoek medewerkers",
        url: "/search-employees",
        roles: [
            "employee"
        ],
        functions: [
            "teamleader"
        ]
    },
    {
        title: "Student dashboard",
        url: "/student-dashboard/{student_id}",
        roles: [
            "student"
        ]
    },
    {
        title: "Mijn gegevens",
        url: "/users/{id}",
        roles: [
            "student"
        ],
        functions: []
    }
]