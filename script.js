const form = document.getElementById("registrationForm");
const tableBody = document.getElementById("studentTableBody");

let studentRecords = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = null;

renderTable();

form.addEventListener("submit", function (event) {
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

function renderTable() {
  tableBody.innerHTML = "";

  studentRecords.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td>
        <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

function editStudent(index) {
  const student = studentRecords[index];

  studentName.value = student.name;
  studentId.value = student.id;
  studentEmail.value = student.email;
  studentContact.value = student.contact;

  editIndex = index;
}

function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    studentRecords.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(studentRecords));
    renderTable();
  }
}
