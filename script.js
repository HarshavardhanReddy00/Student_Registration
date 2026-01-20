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
    
}