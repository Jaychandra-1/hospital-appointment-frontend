

/* ==========================
   Doctor Modal
========================== */

const doctorModal = document.getElementById("doctorModal");

const addDoctorBtn = document.getElementById("addDoctorBtn");

const closeModal = document.getElementById("closeModal");

const cancelDoctorBtn = document.getElementById("cancelDoctorBtn");

const saveDoctorBtn = document.getElementById("saveDoctorBtn");
const doctorTableBody = document.getElementById("doctorTableBody");

saveDoctorBtn.addEventListener("click", function () {

    const name = document.getElementById("doctorName").value;

const specialization =
document.getElementById("doctorSpecialization").value;

const experience =
document.getElementById("doctorExperience").value;

const phone =
document.getElementById("doctorPhone").value;

const email =
document.getElementById("doctorEmail").value;

const row = document.createElement("tr");

row.innerHTML = `
    <td>${doctorTableBody.rows.length + 1}</td>
    <td>${name}</td>
    <td>${specialization}</td>
    <td>${experience}</td>
    <td>Active</td>
    <td>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    </td>
`;

doctorTableBody.appendChild(row);

doctorModal.style.display = "none";

document.getElementById("doctorName").value = "";
document.getElementById("doctorSpecialization").value = "";
document.getElementById("doctorExperience").value = "";
document.getElementById("doctorPhone").value = "";
document.getElementById("doctorEmail").value = "";

});

addDoctorBtn.addEventListener("click", function(){

    doctorModal.style.display = "flex";

});

cancelDoctorBtn.addEventListener("click", function(){

    doctorModal.style.display = "none";

});

closeModal.addEventListener("click", function(){

    doctorModal.style.display = "none";

});

window.addEventListener("click", function(e){

    if(e.target === doctorModal){

        doctorModal.style.display = "none";

    }

});



/* ==========================
   Notification Toggle
========================== */

const notificationBtn =
document.getElementById("notificationBtn");

const notificationDropdown =
document.getElementById("notificationDropdown");

notificationBtn.addEventListener("click", function(){

    profileDropdown.style.display = "none";

    if(notificationDropdown.style.display === "block"){

        notificationDropdown.style.display = "none";

    }else{

        notificationDropdown.style.display = "block";

    }

});

/* ==========================
   Close Notification
========================== */

document.addEventListener("click", function(e){

    if(
        !notificationBtn.contains(e.target) &&
        !notificationDropdown.contains(e.target)
    ){

        notificationDropdown.style.display = "none";

    }

});

/* ==========================
   Profile Dropdown
========================== */

const profileBtn =
document.getElementById("profileBtn");

const profileDropdown =
document.getElementById("profileDropdown");

profileBtn.addEventListener("click", function(e){

    e.stopPropagation();

    if(profileDropdown.style.display === "block"){

        profileDropdown.style.display = "none";

    }else{

        profileDropdown.style.display = "block";

        // Close notification if open
        notificationDropdown.style.display = "none";

    }

});

document.addEventListener("click", function(e){

    if(
        !profileBtn.contains(e.target) &&
        !profileDropdown.contains(e.target)
    ){

        profileDropdown.style.display = "none";

    }

});


/* ==========================
   Profile Menu Navigation
========================== */

const myProfileBtn =
document.getElementById("myProfileBtn");

const changePasswordBtn =
document.getElementById("changePasswordBtn");

const settingsProfileBtn =
document.getElementById("settingsProfileBtn");

myProfileBtn.addEventListener("click", function(e){

    e.preventDefault();

    showPage("settings");

    profileDropdown.style.display = "none";

    setActive(settingsBtn);

});

settingsProfileBtn.addEventListener("click", function(e){

    e.preventDefault();

    showPage("settings");

    profileDropdown.style.display = "none";

    setActive(settingsBtn);

});

changePasswordBtn.addEventListener("click", function(e){

    e.preventDefault();

    showPage("settings");

    profileDropdown.style.display = "none";

    setActive(settingsBtn);

    

});



/* ==========================
   Footer Navigation
========================== */

/* ==========================
   Footer Navigation
========================== */

const footerDashboard = document.getElementById("footerDashboard");
const footerDoctors = document.getElementById("footerDoctors");
const footerPatients = document.getElementById("footerPatients");
const footerAppointments = document.getElementById("footerAppointments");
const footerReports = document.getElementById("footerReports");
const footerSettings = document.getElementById("footerSettings");

if (footerDashboard) {
    footerDashboard.addEventListener("click", function (e) {
        e.preventDefault();
        dashboardBtn.click();
    });
}

if (footerDoctors) {
    footerDoctors.addEventListener("click", function (e) {
        e.preventDefault();
        doctorsBtn.click();
    });
}

if (footerPatients) {
    footerPatients.addEventListener("click", function (e) {
        e.preventDefault();
        patientsBtn.click();
    });
}

if (footerAppointments) {
    footerAppointments.addEventListener("click", function (e) {
        e.preventDefault();
        appointmentsBtn.click();
    });
}

if (footerReports) {
    footerReports.addEventListener("click", function (e) {
        e.preventDefault();
        reportsBtn.click();
    });
}

if (footerSettings) {
    footerSettings.addEventListener("click", function (e) {
        e.preventDefault();
        settingsBtn.click();
    });
}