/* ==========================================
   MEDCARE ADMIN DASHBOARD
========================================== */

let DOCTORS =
JSON.parse(localStorage.getItem("doctors")) || [];

let PATIENTS =
JSON.parse(localStorage.getItem("patients")) || [];

let APPOINTMENTS =
JSON.parse(localStorage.getItem("appointments")) || [];

let STAFF =
JSON.parse(localStorage.getItem("staff")) || [];

let BILLS =
JSON.parse(localStorage.getItem("bills")) || [];

let NOTIFICATIONS =
JSON.parse(localStorage.getItem("notifications")) || [];

document.addEventListener("DOMContentLoaded", () => {

    initNavigation();

    renderDoctors();

    renderPatients();

    renderDashboard();

    renderNotifications();

    loadSettings();

    createReportChart();
    
    renderAppointments();

});

/* ==========================================
   NAVIGATION
========================================== */

function initNavigation() {

    document
    .querySelectorAll("[data-view]")
    .forEach(link => {

        link.addEventListener("click", e => {

            e.preventDefault();

            switchView(
                link.getAttribute("data-view")
            );

        });

    });

}

function switchView(viewId){

    document
    .querySelectorAll(".app-view")
    .forEach(view => {

        view.classList.add("d-none");

    });

    document
    .getElementById(`view-${viewId}`)
    .classList.remove("d-none");

    document
    .querySelectorAll(".nav-link")
    .forEach(link =>
        link.classList.remove("active")
    );

    document
    .querySelector(`[data-view="${viewId}"]`)
    .classList.add("active");

}

/* ==========================================
   DASHBOARD
========================================== */

function renderDashboard(){

    document.getElementById("doctorCount").innerText =
    DOCTORS.length;

    document.getElementById("patientCount").innerText =
    PATIENTS.length;

    document.getElementById("staffCount").innerText =
    STAFF.length;

}

/* ==========================================
   DOCTOR CRUD
========================================== */

function openDoctorModal(){

    let name =
    prompt("Doctor Name");

    if(!name) return;

    let specialization =
    prompt("Specialization");

    let email =
    prompt("Email");

    let doctor = {

        id:"DOC-"+Date.now(),

        name,

        specialization,

        email

    };

    DOCTORS.push(doctor);

    saveDoctors();

    renderDoctors();

    addNotification(
        "Doctor Added",
        name + " added successfully"
    );

}

function renderDoctors(){

    let tbody =
    document.getElementById(
        "doctorTableBody"
    );

    if(!tbody) return;

    tbody.innerHTML = "";

    DOCTORS.forEach(doc => {

        tbody.innerHTML += `
        <tr>

            <td>${doc.id}</td>

            <td>${doc.name}</td>

            <td>${doc.specialization}</td>

            <td>${doc.email}</td>

            <td>

                <button
                class="btn btn-warning btn-sm"
                onclick="editDoctor('${doc.id}')">

                Edit

                </button>

                <button
                class="btn btn-danger btn-sm"
                onclick="deleteDoctor('${doc.id}')">

                Delete

                </button>

            </td>

        </tr>
        `;

    });

}

function editDoctor(id){

    let doctor =
    DOCTORS.find(d => d.id === id);

    let newName =
    prompt("Edit Name",doctor.name);

    if(newName){

        doctor.name = newName;

        saveDoctors();

        renderDoctors();

    }

}

function deleteDoctor(id){

    if(!confirm("Delete Doctor?"))
    return;

    DOCTORS =
    DOCTORS.filter(d => d.id !== id);

    saveDoctors();

    renderDoctors();

}

function saveDoctors(){

    localStorage.setItem(
        "doctors",
        JSON.stringify(DOCTORS)
    );

    renderDashboard();

}

/* ==========================================
   PATIENTS
========================================== */

function renderPatients(){

    let tbody =
    document.getElementById(
        "patientTableBody"
    );

    if(!tbody) return;

    tbody.innerHTML = "";

    PATIENTS.forEach(patient => {

        tbody.innerHTML += `
        <tr>

            <td>${patient.id}</td>

            <td>${patient.name}</td>

            <td>${patient.age}</td>

            <td>${patient.gender}</td>

            <td>

                <button
                class="btn btn-danger btn-sm"
                onclick="deletePatient('${patient.id}')">

                Delete

                </button>

            </td>

        </tr>
        `;

    });

}

function deletePatient(id){

    PATIENTS =
    PATIENTS.filter(
        p => p.id !== id
    );

    localStorage.setItem(
        "patients",
        JSON.stringify(PATIENTS)
    );

    renderPatients();

    renderDashboard();

}

/* ==========================================
   STAFF
========================================== */

function addStaff(){

    let name =
    prompt("Staff Name");

    let role =
    prompt("Role");

    STAFF.push({

        id:"STF-"+Date.now(),

        name,

        role

    });

    localStorage.setItem(
        "staff",
        JSON.stringify(STAFF)
    );

    renderDashboard();

}

/* ==========================================
   BILLING
========================================== */

function generateBill(){

    let patient =
    prompt("Patient Name");

    let amount =
    prompt("Amount");

    let bill = {

        id:"BILL-"+Date.now(),

        patient,

        amount,

        status:"Paid"

    };

    BILLS.push(bill);

    localStorage.setItem(
        "bills",
        JSON.stringify(BILLS)
    );

    addNotification(
        "Bill Generated",
        patient
    );

}

/* ==========================================
   NOTIFICATIONS
========================================== */

function addNotification(
title,
message
){

    NOTIFICATIONS.unshift({

        title,
        message,
        date:new Date()
        .toLocaleString()

    });

    localStorage.setItem(
        "notifications",
        JSON.stringify(
            NOTIFICATIONS
        )
    );

    renderNotifications();

}

function renderNotifications(){

    let list =
    document.getElementById(
        "notificationList"
    );

    if(!list) return;

    list.innerHTML = "";

    NOTIFICATIONS.forEach(n => {

        list.innerHTML += `
        <div class="notification-item">

            <h6>${n.title}</h6>

            <p>${n.message}</p>

            <small>${n.date}</small>

        </div>
        `;

    });

}

/* ==========================================
   SETTINGS
========================================== */

function saveSettings(){

    let settings = {

        hospitalName:
        document.getElementById(
            "hospitalName"
        ).value

    };

    localStorage.setItem(
        "hospitalSettings",
        JSON.stringify(settings)
    );

    alert("Settings Saved");

}

function loadSettings(){

    let settings =
    JSON.parse(
        localStorage.getItem(
            "hospitalSettings"
        )
    ) || {};

    if(document.getElementById(
        "hospitalName"
    )){
        document.getElementById(
            "hospitalName"
        ).value =
        settings.hospitalName || "";
    }

}

/* ==========================================
   DARK MODE
========================================== */

function toggleDarkMode(){

    document.body
    .classList.toggle("dark-mode");

}

/* ==========================================
   REPORT CHART
========================================== */

function createReportChart(){

    let canvas =
    document.getElementById(
        "reportChart"
    );

    if(!canvas) return;

    new Chart(canvas,{

        type:"bar",

        data:{

            labels:[
                "Doctors",
                "Patients",
                "Staff"
            ],

            datasets:[{

                label:"Hospital Data",

                data:[
                    DOCTORS.length,
                    PATIENTS.length,
                    STAFF.length
                ]

            }]

        }

    });

}

/* ==========================================
   SEARCH DOCTORS
========================================== */

let doctorSearch =
document.getElementById(
    "doctorSearch"
);

if(doctorSearch){

doctorSearch.addEventListener(
"input",
function(){

let value =
this.value.toLowerCase();

let rows =
document.querySelectorAll(
"#doctorTableBody tr"
);

rows.forEach(row=>{

row.style.display =
row.innerText
.toLowerCase()
.includes(value)
? ""
: "none";

});

});

}

/* ==========================================
   LOGOUT
========================================== */

let logoutBtn =
document.getElementById(
    "btn-logout"
);

if(logoutBtn){

logoutBtn.addEventListener(
"click",
function(){

localStorage.removeItem(
"loggedInAdmin"
);

window.location.href =
"landing.html";

});

}
function renderAppointments(){

    let appointments =
    JSON.parse(localStorage.getItem("appointments")) || [];

    let tbody =
    document.getElementById("appointmentTableBody");

    if(!tbody) return;

    tbody.innerHTML = "";

    appointments.forEach(app=>{

        tbody.innerHTML += `
        <tr>

            <td>${app.patientName}</td>
            <td>${app.doctor}</td>
            <td>${app.date}</td>
            <td>${app.time}</td>
            <td>${app.status}</td>

            <td>

                <button
                class="btn btn-success btn-sm"
                onclick="approveAppointment(${app.id})">

                Approve

                </button>

                <button
                class="btn btn-danger btn-sm"
                onclick="cancelAppointment(${app.id})">

                Cancel

                </button>

            </td>

        </tr>
        `;
    });
}

function approveAppointment(id){

    let appointments =
    JSON.parse(localStorage.getItem("appointments")) || [];

    let appointment =
    appointments.find(a=>a.id==id);

    if(appointment){

        appointment.status = "Approved";

        localStorage.setItem(
            "appointments",
            JSON.stringify(appointments)
        );

        renderAppointments();
    }
}
function cancelAppointment(id){

    let appointments =
    JSON.parse(localStorage.getItem("appointments")) || [];

    let appointment =
    appointments.find(a=>a.id==id);

    if(appointment){

        appointment.status = "Cancelled";

        localStorage.setItem(
            "appointments",
            JSON.stringify(appointments)
        );

        renderAppointments();
    }
}