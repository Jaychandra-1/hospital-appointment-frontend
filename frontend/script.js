// ==========================================================================
// CORE APP STATE MEMORY INTERFACES
// ==========================================================================
// Utility to generate dynamic dates relative to today for persistent demonstration
function getRelativeDate(daysOffset) {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
let APPOINTMENTS_DATA =
JSON.parse(localStorage.getItem("appointments")) || [];
function createAppointment() {

    let newAppointment = {
        id: "APT-" + Date.now(),
        patientName: document.getElementById("patientName")?.value || "",
        age: document.getElementById("age")?.value || "",
        gender: document.getElementById("gender")?.value || "",
        date: document.getElementById("appointmentDate")?.value || "",
        time: document.getElementById("appointmentTime")?.value || "",
        department: document.getElementById("department")?.value || "",
        status: "Pending",
        priority: "Routine",
        complaint: document.getElementById("complaint")?.value || ""
    };

    APPOINTMENTS_DATA.push(newAppointment);
}
document.addEventListener("DOMContentLoaded", () => {
    let doctor =
JSON.parse(localStorage.getItem("loggedInDoctor"));

if(doctor){

document.getElementById("prof-name").value =
doctor.name || "";

document.getElementById("prof-email").value =
doctor.email || "";

document.getElementById("prof-phone").value =
doctor.phone || "";

document.getElementById("prof-dept").value =
doctor.specialization || "";

}
    updateDashboardStats();
    renderTodaysAppointments();

});

let SCHEDULE_DATA = [
    { id: 1, day: "Mondays", time: "09:00 AM - 12:00 PM" },
    { id: 2, day: "Wednesdays", time: "01:00 PM - 04:00 PM" },
    { id: 3, day: "Fridays", time: "05:00 PM - 08:00 PM" }
];

let SELECTED_APPOINTMENT_ID = null;
let CURRENT_DASHBOARD_FILTER = 'today';
let initialProfileData = {};

const departmentQuotes = {
  "Cardiology": "Every heartbeat you protect brings hope to another family.",
  "Neurology": "Your expertise restores clarity and confidence to every patient.",
  "Pediatrics": "Your care shapes healthier futures for the next generation.",
  "Orthopedics": "Every step a patient takes begins with your dedication.",
  "General Medicine": "Compassion and knowledge together create better healing."
};

const departmentIcons = {
  "Cardiology": "bi-heart-pulse-fill",
  "Neurology": "bi-activity",
  "Pediatrics": "bi-emoji-smile-fill",
  "Orthopedics": "bi-person-standing",
  "General Medicine": "bi-hospital-fill"
};

// ==========================================================================
// PORTAL INITIALIZATION & ROUTING ROUTINES
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize responsive sidebar controls
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("sidebar-toggle");
    const closeBtn = document.getElementById("sidebar-close");
    
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener("click", () => sidebar.classList.toggle("open"));
    }
    if (closeBtn && sidebar) {
        closeBtn.addEventListener("click", () => sidebar.classList.remove("open"));
    }

    // 2. Initialize live search engine filters
    const searchInput = document.getElementById("appointmentSearch");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = APPOINTMENTS_DATA.filter(apt => apt.patientName.toLowerCase().includes(term));
            renderAppointmentsTable(filtered);
        });
    }

    const dashboardSearchInput = document.getElementById("dashboardAppointmentSearch");
    if (dashboardSearchInput) {
        dashboardSearchInput.addEventListener("input", (e) => {
            renderTodaysAppointments(e.target.value);
        });
    }

    // 3. Handle closing profile panel when clicking outside
    document.addEventListener('click', (e) => {
        const panel = document.getElementById('profile-dropdown-panel');
        const toggle = document.getElementById('nav-profile-toggle');
        if (panel && !panel.classList.contains('d-none')) {
            if (!panel.contains(e.target) && toggle && !toggle.contains(e.target)) {
                panel.classList.add('d-none');
            }
        }
    });

    // 4. Kickstart functional components
    initNavigationListeners();
    initFormProcessors();
    renderAppointmentsTable(APPOINTMENTS_DATA);
    renderScheduleTable();
    
    // Initial call of dynamic engines
    updateDashboardGreeting();
    updateGlobalProfileUI();
    updateDashboardStats();
    renderTodaysAppointments();
    calculateProfileCompletion();
});

function initNavigationListeners() {
    document.querySelectorAll("[data-view]").forEach(anchor => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault();
            const targetedViewId = anchor.getAttribute("data-view");
            switchView(targetedViewId);
            
            const sidebar = document.getElementById("sidebar");
            if (sidebar) sidebar.classList.remove("open"); 
        });
    });
}

function switchView(viewId) {
    document.querySelectorAll(".app-view").forEach(view => view.classList.add("d-none"));
    
    const activeSection = document.getElementById(`view-${viewId}`);
    if (activeSection) activeSection.classList.remove("d-none");

    document.querySelectorAll("[data-view]").forEach(anchor => {
        if(anchor.getAttribute("data-view") === viewId) {
            anchor.classList.add("active");
        } else {
            anchor.classList.remove("active");
        }
    });

    if (viewId === "dashboard") {
        updateDashboardGreeting();
        updateDashboardStats();
        renderTodaysAppointments();
    }
}

// ==========================================================================
// DYNAMIC GREETING & DASHBOARD STATS LOGIC ENGINE
// ==========================================================================
function updateDashboardGreeting() {
    const greetingEl = document.getElementById("dashboard-greeting");
    const quoteEl = document.getElementById("dashboard-quote");
    const summaryEl = document.getElementById("dashboard-summary");
    const dateEl = document.getElementById("dashboard-date");
    const iconEl = document.getElementById("department-icon");

    if (!greetingEl) return;

    const currentHour = new Date().getHours();
    let timeGreeting = "Good Evening";
    let emoji = "🌙";

    if (currentHour >= 5 && currentHour < 12) {
        timeGreeting = "Good Morning";
        emoji = "👋";
    } else if (currentHour >= 12 && currentHour < 17) {
        timeGreeting = "Good Afternoon";
        emoji = "☀️";
    } 

    const nameInput = document.getElementById("prof-name");
    const deptInput = document.getElementById("prof-dept");

    const doctorName = nameInput && nameInput.value.trim() !== "" ? nameInput.value.trim() : "Doctor";
    const department = deptInput && deptInput.value.trim() !== "" ? deptInput.value.trim() : "General Medicine";

    greetingEl.innerHTML = `${timeGreeting}, ${doctorName} ${emoji}`;
    
    if (quoteEl) {
        let matchedKey = Object.keys(departmentQuotes).find(key => department.toLowerCase().includes(key.toLowerCase()));
        quoteEl.textContent = matchedKey ? departmentQuotes[matchedKey] : "Your expertise and compassion make a difference every day.";
    }

    if (iconEl) {
        let matchedIconKey = Object.keys(departmentIcons).find(key => department.toLowerCase().includes(key.toLowerCase()));
        const iconClass = matchedIconKey ? departmentIcons[matchedIconKey] : "bi-hospital-fill";
        iconEl.className = `bi ${iconClass}`;
    }

    const today = new Date();
    if (dateEl) {
        dateEl.textContent = today.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    }

    if (summaryEl) {
        const todayStr = getRelativeDate(0);
        const todaysApts = APPOINTMENTS_DATA.filter(apt => apt.date === todayStr);
        const followUps = todaysApts.filter(apt => apt.priority === "Follow-up").length;
        summaryEl.textContent = `You have ${todaysApts.length} appointments scheduled today, including ${followUps} follow-up consultations.`;
    }
}

function updateDashboardStats() {
    const todayCountEl = document.getElementById("stats-today-count");
    const pendingCountEl = document.getElementById("stats-pending-count");
    const completedCountEl = document.getElementById("stats-completed-count");
    const cancelledCountEl = document.getElementById("stats-cancelled-count");

    const todayStr = getRelativeDate(0);

    if (todayCountEl) todayCountEl.textContent = APPOINTMENTS_DATA.filter(apt => apt.date === todayStr).length;
    if (pendingCountEl) pendingCountEl.textContent = APPOINTMENTS_DATA.filter(apt => apt.status === "Pending").length;
    if (completedCountEl) completedCountEl.textContent = APPOINTMENTS_DATA.filter(apt => apt.status === "Completed").length;
    if (cancelledCountEl) cancelledCountEl.textContent = APPOINTMENTS_DATA.filter(apt => apt.status === "Cancelled").length;
}

function filterAppointments(filterType) {
    CURRENT_DASHBOARD_FILTER = filterType;

    document.querySelectorAll('.dashboard-stat-card').forEach(card => {
        if(card.getAttribute('data-filter') === filterType) card.classList.add('active-stat-card');
        else card.classList.remove('active-stat-card');
    });

    const titleEl = document.getElementById('dashboard-table-title');
    if (titleEl) {
        if(filterType === 'today') titleEl.innerText = "Today's Appointments";
        else if(filterType === 'Pending') titleEl.innerText = "Pending Appointments";
        else if(filterType === 'Completed') titleEl.innerText = "Completed Appointments";
        else if(filterType === 'Cancelled') titleEl.innerText = "Cancelled Appointments";
    }

    renderTodaysAppointments();
}

function renderTodaysAppointments(searchTerm = '') {
    const tbody = document.getElementById("dashboardAppointmentTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";

    const todayStr = getRelativeDate(0);
    let filtered = APPOINTMENTS_DATA;
    const doctor =
    JSON.parse(localStorage.getItem("loggedInDoctor"));
    
    if (doctor) {
        filtered = filtered.filter(
            app => app.doctorEmail === doctor.email
        );
    }
    if (CURRENT_DASHBOARD_FILTER === 'today') {
        filtered = filtered.filter(apt => apt.date === todayStr);
    } else {
        filtered = filtered.filter(apt => apt.status === CURRENT_DASHBOARD_FILTER);
    }

    if (searchTerm.trim() !== "") {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(apt => apt.patientName.toLowerCase().includes(term));
    }

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">No appointments found matching targeted schedule queries.</td></tr>`;
        return;
    }

    filtered.forEach(apt => {
        let priorityBadge = apt.priority === "Urgent" ? "🔴 Urgent" : apt.priority === "Follow-up" ? "🟡 Follow-up" : "🟢 Routine";
        let statusBadge = "";
        switch (apt.status) {
            case "Pending": statusBadge = `<span class="badge bg-warning-subtle text-warning border border-warning border-opacity-25 px-2 py-1 rounded">Pending</span>`; break;
            case "Confirmed": statusBadge = `<span class="badge bg-primary-subtle text-primary border border-primary border-opacity-25 px-2 py-1 rounded">Confirmed</span>`; break;
            case "Completed": statusBadge = `<span class="badge bg-success-subtle text-success border border-success border-opacity-25 px-2 py-1 rounded">Completed</span>`; break;
            case "Cancelled": statusBadge = `<span class="badge bg-danger-subtle text-danger border border-danger border-opacity-25 px-2 py-1 rounded">Cancelled</span>`; break;
        }

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="fw-bold text-dark">${apt.patientName}</td>
            <td>${apt.age}</td>
            <td>${apt.time}</td>
            <td class="fw-medium">${priorityBadge}</td>
            <td>${statusBadge}</td>
            <td class="text-end">
                <div class="btn-group gap-1">
                    <button class="btn btn-sm btn-outline-primary rounded" onclick="loadPatientDetails('${apt.id}')"><i class="bi bi-folder2-open"></i> EHR</button>
                    <button class="btn btn-sm btn-outline-secondary rounded" onclick="loadStatusUpdater('${apt.id}')"><i class="bi bi-sliders"></i> Status</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// ==========================================================================
// USER LOGIC HANDLERS (LOGIN / VALIDATION / FORMS)
// ==========================================================================
function initFormProcessors() {
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        // Auto-fill credentials so you don't get stuck!
        const idInput = document.getElementById("login-id");
        const pwInput = document.getElementById("login-password");
        if(idInput) idInput.value = "DOC1024";
        if(pwInput) pwInput.value = "admin123";

        loginForm.addEventListener("submit", (e) => {
            e.preventDefault(); 
            
            if (!loginForm.checkValidity()) {
                e.stopPropagation();
                loginForm.classList.add("was-validated");
            } else {

    let email =
    document.getElementById("login-email").value;

    let password =
    document.getElementById("login-password").value;

    let doctors =
    JSON.parse(localStorage.getItem("doctors")) || [];

    let doctor = doctors.find(d =>
        d.email === email &&
        d.password === password
    );

    if(!doctor){

        alert("Invalid Email or Password");
        return;
    }

    localStorage.setItem(
        "loggedInDoctor",
        JSON.stringify(doctor)
    );

    document.getElementById("login-page").classList.add("d-none");
    document.getElementById("app-container").classList.remove("d-none");

    updateDashboardGreeting();
    updateDashboardStats();
    renderTodaysAppointments();
    switchView("dashboard");
}
        });
    }

    const logoutBtn = document.getElementById("btn-logout");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            document.getElementById("app-container").classList.add("d-none");
            document.getElementById("login-page").classList.remove("d-none");
            if (loginForm) {
                loginForm.classList.remove("was-validated");
                loginForm.reset();
            }
        });
    }

    const scheduleForm = document.getElementById("schedule-form");
    if (scheduleForm) {
        scheduleForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!scheduleForm.checkValidity()) {
                e.stopPropagation();
                scheduleForm.classList.add("was-validated");
            } else {
                SCHEDULE_DATA.push({
                    id: Date.now(),
                    day: document.getElementById("schedule-day").value,
                    time: document.getElementById("schedule-time").value
                });
                renderScheduleTable();
                scheduleForm.reset();
                scheduleForm.classList.remove("was-validated");
                showToast("New operational hours added.");
            }
        });
    }
}

// ==========================================================================
// CLINICAL MODULE VIEW ENGINE SUBROUTINES
// ==========================================================================
function renderAppointmentsTable(dataset) {
    const tbody = document.getElementById("appointmentTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";

    if(dataset.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">No patient matches found.</td></tr>`;
        return;
    }

    dataset.forEach(apt => {
        let priorityBadge = apt.priority === "Urgent" ? "🔴 Urgent" : apt.priority === "Follow-up" ? "🟡 Follow-up" : "🟢 Routine";
        let statusBadge = "";
        switch (apt.status) {
            case "Pending": statusBadge = `<span class="badge bg-warning-subtle text-warning border border-warning border-opacity-25 px-2 py-1 rounded">Pending</span>`; break;
            case "Confirmed": statusBadge = `<span class="badge bg-primary-subtle text-primary border border-primary border-opacity-25 px-2 py-1 rounded">Confirmed</span>`; break;
            case "Completed": statusBadge = `<span class="badge bg-success-subtle text-success border border-success border-opacity-25 px-2 py-1 rounded">Completed</span>`; break;
            case "Cancelled": statusBadge = `<span class="badge bg-danger-subtle text-danger border border-danger border-opacity-25 px-2 py-1 rounded">Cancelled</span>`; break;
        }

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="fw-bold text-dark">${apt.patientName}</td>
            <td>${apt.date}</td>
            <td>${apt.time}</td>
            <td class="fw-medium">${priorityBadge}</td>
            <td>${statusBadge}</td>
            <td class="text-end">
                <div class="btn-group gap-1">
                    <button class="btn btn-sm btn-outline-primary rounded" onclick="loadPatientDetails('${apt.id}')"><i class="bi bi-folder2-open"></i> EHR File</button>
                    <button class="btn btn-sm btn-outline-secondary rounded" onclick="loadStatusUpdater('${apt.id}')"><i class="bi bi-sliders"></i> Status</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function loadPatientDetails(aptId) {
    const apt = APPOINTMENTS_DATA.find(a => a.id === aptId);
    if(apt) {
        SELECTED_APPOINTMENT_ID = aptId;
        document.getElementById("detail-pt-name").innerText = apt.patientName;
        document.getElementById("detail-pt-id").innerText = `#${apt.id}`;
        document.getElementById("detail-pt-agesex").innerText = `${apt.age} Yrs / ${apt.gender}`;
        document.getElementById("detail-pt-complaint").innerText = apt.complaint;
        switchView("patient-details");
    }
}

function loadConsultationNotes() {
    document.getElementById("note-symptoms").value = "";
    document.getElementById("note-diagnosis").value = "";
    document.getElementById("note-prescription").value = "";
    document.getElementById("note-advice").value = "";
    switchView("consultation-notes");
}

function saveConsultationNotes() {

    console.log("Selected Appointment:", SELECTED_APPOINTMENT_ID);

    let apt = APPOINTMENTS_DATA.find(
        a => a.id === SELECTED_APPOINTMENT_ID
    );

    let medicalRecords =
    JSON.parse(localStorage.getItem("medicalRecords")) || [];

    let record = {

        appointmentId: apt.id,

        patientName: apt.patientName,

        patientEmail: apt.patientEmail,

        doctor: apt.doctor,

        date: new Date().toLocaleDateString(),

        symptoms:
        document.getElementById("note-symptoms").value,

        diagnosis:
        document.getElementById("note-diagnosis").value,

        prescription:
        document.getElementById("note-prescription").value,

        advice:
        document.getElementById("note-advice").value

    };

    medicalRecords.push(record);
    let notifications =
    JSON.parse(
        localStorage.getItem(
            record.patientEmail + "_notifications"
            )
            ) || [];
            notifications.push({
                title:"Medical Record Added",
                message:
                "Dr. " + record.doctor +
                " added diagnosis and prescription.",
                status:"Unread"
            });
            localStorage.setItem(
                record.patientEmail + "_notifications",
                JSON.stringify(notifications)
                );
                localStorage.setItem(
        "medicalRecords",
        JSON.stringify(medicalRecords)
    );

    apt.status = "Completed";

    localStorage.setItem(
        "appointments",
        JSON.stringify(APPOINTMENTS_DATA)
    );

    updateDashboardStats();

    showToast("Medical Record Saved Successfully");

    switchView("appointments");
}
function loadStatusUpdater(aptId) {
    const apt = APPOINTMENTS_DATA.find(a => a.id === aptId);
    if(apt) {
        SELECTED_APPOINTMENT_ID = aptId;
        document.getElementById("status-pt-name").innerText = apt.patientName;
        document.getElementById("status-pt-meta").innerText = `Target Slot Window: ${apt.date} @ ${apt.time}`;
        switchView("status");
    }
}

function updateStatusState(newStatus) {
    const apt = APPOINTMENTS_DATA.find(a => a.id === SELECTED_APPOINTMENT_ID);
    if(apt) {
        apt.status = newStatus;
        apt.status = newStatus;
        let notifications =
        JSON.parse(
            localStorage.getItem(
                apt.patientEmail + "_notifications"
                )
                ) || [];
                notifications.push({
                    
                    title:"Appointment " + newStatus,
                    message:
                    "Your appointment with " +
                    apt.doctor +
                    " is now " +
                    newStatus,
                    date:new Date().toLocaleString()
                });
                localStorage.setItem(
                    apt.patientEmail + "_notifications",
                    JSON.stringify(notifications)
                    );
        
        renderAppointmentsTable(APPOINTMENTS_DATA);
        updateDashboardStats();
        localStorage.setItem(
            "appointments",
            JSON.stringify(APPOINTMENTS_DATA)
        );
        renderTodaysAppointments();
        showToast(`Appointment state moved to [${newStatus}].`);
        switchView("appointments");
    }
}

function renderScheduleTable() {
    const tbody = document.getElementById("scheduleTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";

    SCHEDULE_DATA.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="fw-semibold">${item.day}</td>
            <td class="font-monospace text-muted">${item.time}</td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-danger p-1 border-0" onclick="deleteScheduleBlock(${item.id})">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function deleteScheduleBlock(id) {
    SCHEDULE_DATA = SCHEDULE_DATA.filter(item => item.id !== id);
    renderScheduleTable();
}

// ==========================================================================
// NEW DOCTOR PROFILE LOGIC & VALIDATION ENGINE
// ==========================================================================
function updateGlobalProfileUI() {
    const name = document.getElementById('prof-name') ? document.getElementById('prof-name').value :JSON.parse(localStorage.getItem("loggedInDoctor"))?.name || 'Doctor';;
    const dept = document.getElementById('prof-dept') ? document.getElementById('prof-dept').value : JSON.parse(localStorage.getItem("loggedInDoctor"))?.specialization || 'General Medicine';;
    const navName = document.getElementById('nav-doc-name');
    const navDept = document.getElementById('nav-doc-dept');
    
    if(navName) navName.innerText = name;
    if(navDept) navDept.innerText = dept;
}

function toggleDoctorProfilePanel(e) {
    e.stopPropagation();
    const panel = document.getElementById('profile-dropdown-panel');
    
    if (panel.classList.contains('d-none')) {
        document.getElementById('drop-name').innerText = document.getElementById('prof-name') ? document.getElementById('prof-name').value : JSON.parse(localStorage.getItem("loggedInDoctor"))?.name || 'Doctor';;
        document.getElementById('drop-dept').innerText = document.getElementById('prof-dept') ? document.getElementById('prof-dept').value : JSON.parse(localStorage.getItem("loggedInDoctor"))?.specialization || 'General Medicine';;
        const doctor =
        JSON.parse(localStorage.getItem("loggedInDoctor")) || {};
        
        document.getElementById('drop-exp').innerText =
        document.getElementById('prof-exp')?.value ||
        doctor.experience ||
        '';
        
        document.getElementById('drop-email').innerText =
        document.getElementById('prof-email')?.value ||
        doctor.email ||
        '';
        
        document.getElementById('drop-phone').innerText =
        document.getElementById('prof-phone')?.value ||
        doctor.phone ||
        '';
        panel.classList.remove('d-none');
    } else {
        panel.classList.add('d-none');
    }
}

function toggleAvailability() {
    const toggle = document.getElementById('availability-toggle');
    const badge = document.getElementById('availability-badge');
    
    if (toggle.checked) {
        badge.className = 'badge bg-success';
        badge.innerText = 'Available Today';
    } else {
        badge.className = 'badge bg-danger';
        badge.innerText = 'Unavailable';
    }
}

function previewProfileImage(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            if(document.getElementById('profile-image-preview')) document.getElementById('profile-image-preview').src = e.target.result;
            if(document.getElementById('nav-profile-img')) document.getElementById('nav-profile-img').src = e.target.result;
            if(document.getElementById('drop-profile-img')) document.getElementById('drop-profile-img').src = e.target.result;
            showToast('Profile photo updated successfully.');
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function enableProfileEdit() {
    const inputs = document.querySelectorAll('.profile-input');
    inputs.forEach(input => {
        if (input.id !== 'prof-id') { 
            initialProfileData[input.id] = input.value; 
            input.disabled = false;
        }
    });

    document.getElementById('btn-edit-profile').classList.add('d-none');
    document.getElementById('btn-save-profile').classList.remove('d-none');
    document.getElementById('btn-cancel-profile').classList.remove('d-none');
}

function cancelProfileEdit() {
    const inputs = document.querySelectorAll('.profile-input');
    inputs.forEach(input => {
        if (input.id !== 'prof-id') {
            input.value = initialProfileData[input.id] || '';
            input.disabled = true;
        }
    });

    resetProfileButtons();
}

function saveProfileEdit() {
    const inputs = document.querySelectorAll('.profile-input');
    inputs.forEach(input => input.disabled = true);

    document.getElementById('display-name').innerText = document.getElementById('prof-name').value || 'Doctor';
    document.getElementById('display-specialization').innerText = document.getElementById('prof-dept').value || 'Specialization';

    resetProfileButtons();
    calculateProfileCompletion();
    updateGlobalProfileUI(); 
    updateDashboardGreeting(); 
    let doctor =
JSON.parse(localStorage.getItem("loggedInDoctor")) || {};

doctor.name =
document.getElementById("prof-name").value;

doctor.email =
document.getElementById("prof-email").value;

doctor.phone =
document.getElementById("prof-phone").value;

doctor.specialization =
document.getElementById("prof-dept").value;

localStorage.setItem(
"loggedInDoctor",
JSON.stringify(doctor)
);

localStorage.setItem(
doctor.email,
JSON.stringify(doctor)
);
    showToast('Profile information saved successfully.');
}

function resetProfileButtons() {
    document.getElementById('btn-edit-profile').classList.remove('d-none');
    document.getElementById('btn-save-profile').classList.add('d-none');
    document.getElementById('btn-cancel-profile').classList.add('d-none');
}

function calculateProfileCompletion() {
    const fields = ['prof-name', 'prof-phone', 'prof-email', 'prof-gender', 'prof-dob', 'prof-address', 'prof-id', 'prof-dept', 'prof-qual', 'prof-exp', 'prof-fee'];
    
    let filled = 0;
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.value && el.value.trim() !== '') filled++;
    });

    const percentage = Math.round((filled / fields.length) * 100);
    const bar = document.getElementById('profile-progress-bar');
    const text = document.getElementById('profile-progress-text');
    
    if (bar) {
        bar.style.width = percentage + '%';
        bar.setAttribute('aria-valuenow', percentage);
        if(percentage < 50) bar.className = 'progress-bar bg-danger progress-bar-striped progress-bar-animated';
        else if(percentage < 100) bar.className = 'progress-bar bg-warning progress-bar-striped progress-bar-animated';
        else bar.className = 'progress-bar bg-success progress-bar-striped progress-bar-animated';
    }
    if (text) text.innerText = percentage + '% Complete';
}

function submitChangePassword() {
    const newPw = document.getElementById('cp-new');
    const confirmPw = document.getElementById('cp-confirm');
    
    if (newPw.value === '' || confirmPw.value === '') return; 
    
    if (newPw.value !== confirmPw.value) {
        confirmPw.classList.add('is-invalid');
        return;
    }
    
    confirmPw.classList.remove('is-invalid');
    
    const modalEl = document.getElementById('changePasswordModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if(modal) modal.hide();
    
    document.getElementById('change-password-form').reset();
    showToast('Account password updated securely.');
}

function showToast(message) {
    const toastEl = document.getElementById('profileToast');
    const msgEl = document.getElementById('toastMessage');
    if (toastEl && msgEl) {
        msgEl.innerText = message;
        const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
        toast.show();
    }
}
function saveProfile() {

    let user = {
        fullname: document.getElementById("fullname").value
    };

    localStorage.setItem("patientData", JSON.stringify(user));

    console.log("Saved:", user);

    alert("Profile Saved");
}
document.addEventListener("DOMContentLoaded", function () {

    const logoutBtn = document.getElementById("btn-logout");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", function () {

            localStorage.removeItem("loggedInDoctor");
            
            window.location.href = "landing.html";
        });

    }

});
function renderDoctorAppointments(){

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
            <td>${app.date}</td>
            <td>${app.time}</td>
            <td>${app.status}</td>

        </tr>
        `;
    });
}

renderDoctorAppointments();
if (!localStorage.getItem("admin")) {

    localStorage.setItem(
        "admin",
        JSON.stringify({
            email: "admin@hospital.com",
            password: "admin123",
            role: "Admin"
        })
    );

}