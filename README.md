## Project README

### Table of Contents
- [General Information](#general-information)
- [Description](#description)
- [Architecture](#architecture)
- [Features](#features)
- [Installation](#installation)
- [Contributors](#contributors)

---

### General Information
This web application is designed to monitor students throughout their education, including lectures, practical sessions, coaching, and workplace learning. The goal is to enable teachers, learning coaches, program coaches, diversity coaches, and team leaders to carry out this monitoring effectively.

### Description
Student monitoring includes, among other things:
- Recording attendance during lectures and practical sessions
- Evaluating participation during classes
- Assessing performance on exercises/assignments
- Documenting information from coaching conversations
- Recording information entered by teachers
- Tracking the status of students in the program, such as illness, inactivity, etc.

Students can also engage in workplace learning during their education across various subjects from @Work 1 to @Work 5.

### Architecture
- **Back-end:**
  - Express.js
  - Templating: Handlebars
  - Database: Production: PostgreSQL | Development: sqlite3
  - Database management: Knex + Objection
  - PDF Generation: PDFKit + PDFKit-Table

- **Front-end:**
  - HTML → Handlebars
  - CSS
  - JavaScript (modular)

### Features
- Common models for the educational program, program components, and courses.
- Different user roles such as Administrator, Teacher, Student, Program Coach, etc.
- Functionalities for coaching, labeling students, and status management.
- Capability to enter and view attendances/absences.
- Monitoring during lectures and practical sessions with comments per student.
- PDF generation for attendances/statuses/reports per student.

---

### Installation

1. Clone the repository
    ```bash
    git clone {{repository_url}}
    ```

2. Install the dependencies
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```bash
    PORT=3000
    NODE_ENV=development # or production if you're deploying.
    
    # Database configuration for production
    DB_HOST=your_db_host
    DB_PORT=your_db_port
    DB_USER=your_db_user
    DB_NAME=your_db_name
    DB_PASSWORD=your_db_password
    DB_SSL=your_db_ssl

    # Database configuration for development
    DB_DEV_NAME=your_dev_db_name.sqlite3

    # TOKEN_SALT for JWT
    TOKEN_SALT=your_token_salt

    # NODEMAILER configuration
    MAIL_USER=your_email
    MAIL_PASS=your_email_password

    ```

4. Run the migrations
    ```bash
    npx knex migrate:latest
    ```

5. Run the seeders
    ```bash
    npx knex seed:run
    ```

6. Start the server
    ```bash
    npm start
    ```

7. Open your browser and navigate to `http://localhost:3000`

8. Login with the following credentials:
    - **admin / teamleader / teacher / trajectorycoach / learningcoach / diversitycoach / workplacecoach:** 
        - Email: {{function}}@svs.be
        - Password: secret123

    - **student**
        - Email: student@student.svs.be
        - Password: secret123


---

### Contributors

- [Mees Akveld](https://github.com/pgm-meesakveld)
- [Bénoît Biraguma Ihimbazwe](https://github.com/pgm-benobira)
- [Tristan De Ridder](https://github.com/pgm-tristanderidder)
- [Ella Jakale](https://github.com/pgm-ella)

---


*© 2024 - This project is developed by Artevelde University of Applied Sciences.*