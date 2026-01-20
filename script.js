const form = document.getElementById("registrationForm");
const tableBoby = document.getElementById("studentTableBody");

let studentRecords = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = null;

renderTable();

form.addEventListener("submit", function(event)) {
    event.preventDefault();

    const name = studentName.value.trim();
    const id = studentId.value.trim();
    const email = studentEmail.value.trim();
    const contact = studentContact.value.trim();
    
    if (!name || !id || !email || !contact) {
    alert("All fields are required");
    return;
    }

    if (!/^[A-Za-z ]+$/.test(name)) {
    alert("Name should contain only letters");
    return;
    }
    
    if (!/^\d+$/.test(id)) {
        alert("Student ID should contain only numbers");
        return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
    alert("Enter a valid email address");
    return;
    }

    if (!/^\d{10,}$/.test(contact)) {
    alert("Contact number must be at least 10 digits");
    return;
    }

    const student = { name, id, email, contact };

    if (editIndex === null) {
     studentRecords.push(student);
    } else {
     studentRecords[editIndex] = student;
     editIndex = null;
    }

     localStorage.setItem("students", JSON.stringify(studentRecords));
     form.reset();
     renderTable();
});