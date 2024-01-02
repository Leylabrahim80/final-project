let courses = [];

function addCourse() {
    const courseNameInput = document.getElementById("courseName");
    const gradingScaleInput = document.getElementById("gradingScale");

    const course = {
        name: courseNameInput.value,
        gradingScale: gradingScaleInput.value,
        students: [],
    };

    courses.push(course);

    // Update UI to display courses and their details
    displayCourses();

    // Disable the "Add Course" button after clicking
    const addCourseButton = document.getElementById("addCourseButton");
    addCourseButton.disabled = true;
}

// ... (rest of the code remains unchanged)

// Initial display of courses
displayCourses();

function displayCourses() {
    const studentSection = document.getElementById("studentSection");
    studentSection.innerHTML = "";

    for (const course of courses) {
        const courseContainer = document.createElement("div");
        courseContainer.className = "course-container";

        const courseHeader = document.createElement("h2");
        courseHeader.textContent = course.name;
        courseContainer.appendChild(courseHeader);

        const addStudentForm = createStudentForm(course);
        courseContainer.appendChild(addStudentForm);

        const studentTable = createStudentTable(course); // Fix: Adding the missing function
        courseContainer.appendChild(studentTable);

        studentSection.appendChild(courseContainer);
    }
}

function createStudentForm(course) {
    const form = document.createElement("form");
    form.className = "student-form";

    const idInput = createInput("text", "studentID", "Student ID");
    form.appendChild(idInput);

    const nameInput = createInput("text", "studentName", "Name");
    form.appendChild(nameInput);

    const surnameInput = createInput("text", "studentSurname", "Surname");
    form.appendChild(surnameInput);

    const midtermInput = createInput("number", "midtermScore", "Midterm Score");
    form.appendChild(midtermInput);

    const finalInput = createInput("number", "finalScore", "Final Score");
    form.appendChild(finalInput);

    const addButton = document.createElement("button");
    addButton.textContent = "Add Student";
    addButton.type = "button";
    addButton.onclick = function () {
        addStudent(course);
    };

    form.appendChild(addButton);

    return form;
}

function createInput(type, id, placeholder) {
    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.placeholder = placeholder;
    input.className = "input-field";
    return input;
}

function createStudentTable(course) { // Fix: Adding the missing function
    const table = document.createElement("table");
    table.id = `studentTable_${course.name}`;
    table.className = "student-table";

    return table;
}

function addStudent(course) {
    const idInput = document.getElementById("studentID");
    const nameInput = document.getElementById("studentName");
    const surnameInput = document.getElementById("studentSurname");
    const midtermInput = document.getElementById("midtermScore");
    const finalInput = document.getElementById("finalScore");

    const student = {
        id: idInput.value,
        name: nameInput.value,
        surname: surnameInput.value,
        midtermScore: midtermInput.value,
        finalScore: finalInput.value,
    };

    course.students.push(student);

    // Update UI to display students in the course
    displayStudents(course);
}

function displayStudents(course) {
    const studentTable = document.getElementById(`studentTable_${course.name}`);
    studentTable.innerHTML = "";

    const headerRow = document.createElement("tr");
    const headers = ["ID", "Name", "Surname", "Midterm", "Final", "Grade", "Actions"];
    for (const header of headers) {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    }
    studentTable.appendChild(headerRow);

    for (const student of course.students) {
        const row = document.createElement("tr");
        const grade = calculateGrade(student.midtermScore, student.finalScore, course.gradingScale);

        const studentData = [student.id, student.name, student.surname, student.midtermScore, student.finalScore, grade, "Actions"];

        for (const data of studentData) {
            const td = document.createElement("td");
            td.textContent = data;
            row.appendChild(td);
        }

        studentTable.appendChild(row);
    }
}

function calculateGrade(midtermScore, finalScore, gradingScale) {
    // Implement your grade calculation logic here
    // For simplicity, assuming a basic grading scale
    const totalScore = 0.4 * midtermScore + 0.6 * finalScore;
    if (totalScore >= 90) return "A";
    else if (totalScore >= 75) return "B";
    else if (totalScore >= 60) return "C";
    else if (totalScore >= 50) return "D";
    else return "Failed"
}

// Initial display of courses
displayCourses();
