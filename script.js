// ============================================
// VIEW APPOINTMENT DETAILS (Backend Ready)
// ============================================
function viewAppointmentDetails(appointmentId) {
    // FRONTEND DEMO MODE - Remove this when connecting to backend
    const card = document.querySelector(`.appointment-card[data-id="${appointmentId}"]`);
    if (card) {
        const doctor = card.querySelector('.appointment-doctor')?.textContent?.trim() || 'Unknown Doctor';
        const time = card.querySelector('.appointment-time')?.textContent?.trim() || 'Unknown Time';
        const status = card.querySelector('.status-badge')?.textContent?.trim() || 'Unknown Status';
        
        // DEMO: Show alert (REMOVE THIS WHEN CONNECTING TO BACKEND)
        const details = `
📋 Appointment Details
━━━━━━━━━━━━━━━━━━━━━
🩺 Doctor: ${doctor}
📅 Date & Time: ${time}
📌 Status: ${status}
💳 Fee: ₹${document.getElementById('modalAppointmentFee')?.textContent || '800'}
━━━━━━━━━━━━━━━━━━━━━
📌 Note: This is a demo appointment. 
For real appointments, full details would be shown here.
        `;
        alert(details);
        showToast('Viewing appointment details', 'success');
        return;
    }
    
    // BACKEND INTEGRATION - Uncomment when connecting to backend
    /*
    try {
        // Show loading state
        showToast('Loading appointment details...', 'info');
        
        // Fetch from backend API
        const response = await fetch(`/api/appointments/${appointmentId}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken(),
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch appointment details');
        }
        
        const data = await response.json();
        
        // Open appointment details in a modal or new page
        openAppointmentDetailsModal(data);
        
    } catch (error) {
        showToast('Error loading appointment details', 'error');
        console.error('Error:', error);
    }
    */
}

// ============================================
// VIEW REPORT (Backend Ready)
// ============================================
function viewReport(reportName, doctor, date) {
    // FRONTEND DEMO MODE - Remove this when connecting to backend
    const details = `
📄 Report Details
━━━━━━━━━━━━━━━━━━━━━
📋 Report: ${reportName}
👨‍⚕️ Doctor: ${doctor}
📅 Date: ${date}
📌 Status: Available for viewing
━━━━━━━━━━━━━━━━━━━━━
📌 This is a demo report view. 
In production, the full report would be displayed here.
    `;
    alert(details);
    showToast(`Viewing ${reportName}`, 'success');
    
    // BACKEND INTEGRATION - Uncomment when connecting to backend
    /*
    try {
        // Show loading state
        showToast('Loading report...', 'info');
        
        // Fetch report from backend
        const response = await fetch(`/api/reports/${encodeURIComponent(reportName)}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken(),
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch report');
        }
        
        const data = await response.json();
        
        // Open report in new window, modal, or PDF viewer
        if (data.url) {
            window.open(data.url, '_blank');
        } else {
            // Display in modal
            openReportModal(data);
        }
        
    } catch (error) {
        showToast('Error loading report', 'error');
        console.error('Error:', error);
    }
    */
}

// ============================================
// VIEW APPOINTMENT DETAILS MODAL (For Backend)
// ============================================
function openAppointmentDetailsModal(data) {
    // Create a modal to show real appointment details
    // This would replace the alert() with a proper UI
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <h2><i class="fas fa-calendar-check text-teal"></i> Appointment Details</h2>
            <div style="margin: 20px 0;">
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                    <div><strong>Appointment ID:</strong> ${data.id}</div>
                    <div><strong>Doctor:</strong> ${data.doctorName}</div>
                    <div><strong>Specialization:</strong> ${data.specialization}</div>
                    <div><strong>Patient:</strong> ${data.patientName}</div>
                    <div><strong>Date:</strong> ${data.date}</div>
                    <div><strong>Time:</strong> ${data.time}</div>
                    <div><strong>Status:</strong> <span class="status-badge ${data.status}">${data.status}</span></div>
                    <div><strong>Fee:</strong> ₹${data.fee}</div>
                    <div style="grid-column: span 2;"><strong>Symptoms:</strong> ${data.symptoms || 'Not specified'}</div>
                    <div style="grid-column: span 2;"><strong>Notes:</strong> ${data.notes || 'No additional notes'}</div>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn-cancel" onclick="this.closest('.modal-overlay').remove()">Close</button>
                <button class="btn-primary" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-print"></i> Print
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// ==========================================================================
// DOCTOR REVIEWS RENDERER ENGINE
// ==========================================================================
function renderDoctorReviews() {
    const reviewsContainer = document.getElementById("reviews-list-container");
    const avgRatingVal = document.getElementById("avg-rating-value");
    const totalReviewsVal = document.getElementById("total-reviews-value");
    const satisfactionBar = document.getElementById("satisfaction-bar");
    const satisfactionPercent = document.getElementById("satisfaction-percent");

    if (!reviewsContainer) return;

    const data = DOCTOR_REVIEWS[CURRENT_DOCTOR.email] || { avgRating: "5.0/5", totalCount: "0 reviews", satisfaction: "100%", list: [] };
    
    if (avgRatingVal) avgRatingVal.innerText = `⭐ ${data.avgRating}`;
    if (totalReviewsVal) totalReviewsVal.innerText = `(${data.totalCount})`;
    if (satisfactionBar) satisfactionBar.style.width = data.satisfaction;
    if (satisfactionPercent) satisfactionPercent.innerText = `${data.satisfaction} Patient Satisfaction`;

    reviewsContainer.innerHTML = "";
    if (data.list.length === 0) {
        reviewsContainer.innerHTML = `<div class="col-12 text-center py-3 text-muted">No reviews recorded yet for this provider.</div>`;
        return;
    }

    data.list.forEach(rev => {
        let stars = "";
        for(let i=1; i<=5; i++) {
            if(i <= rev.rating) stars += '<i class="bi bi-star-fill text-warning me-1" style="font-size: 0.85rem;"></i>';
            else stars += '<i class="bi bi-star text-muted me-1" style="font-size: 0.85rem;"></i>';
        }

        const initials = rev.name.split(" ").map(n => n[0]).join("");

        const div = document.createElement("div");
        div.className = "col-12 col-md-6";
        div.innerHTML = `
            <div class="card p-3 rounded-3 review-card border h-100 shadow-xs">
                <div class="d-flex align-items-center justify-content-between mb-2">
                    <div class="d-flex align-items-center gap-2">
                        <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style="width: 34px; height: 34px; font-size: 0.8rem;">
                            ${initials}
                        </div>
                        <div>
                            <h6 class="m-0 fw-bold text-dark" style="font-size: 0.85rem;">${rev.name}</h6>
                            <small class="text-muted" style="font-size: 0.7rem;">${rev.date}</small>
                        </div>
                    </div>
                    <div>
                        ${stars}
                    </div>
                </div>
                <p class="m-0 text-muted small text-dark" style="line-height: 1.45; font-size: 0.8rem;">"${rev.text}"</p>
            </div>
        `;
        reviewsContainer.appendChild(div);
    });
}

// ==========================================================================
// PRACTICE PERFORMANCE ANALYTICS ENGINE
// ==========================================================================
function renderAnalyticsCharts() {
    const doctorAppointments = APPOINTMENTS_DATA.filter(apt => apt.department.toLowerCase() === CURRENT_DOCTOR.department.toLowerCase());

    // 1. Status Chart
    const statusCounts = { Pending: 0, Confirmed: 0, Completed: 0, Cancelled: 0 };
    doctorAppointments.forEach(apt => {
        if (statusCounts[apt.status] !== undefined) {
            statusCounts[apt.status]++;
        }
    });

    const statusCtx = document.getElementById('statusChart');
    if (statusCtx) {
        if (statusChartInstance) statusChartInstance.destroy();
        statusChartInstance = new Chart(statusCtx, {
            type: 'doughnut',
            data: {
                labels: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
                datasets: [{
                    data: [statusCounts.Pending, statusCounts.Confirmed, statusCounts.Completed, statusCounts.Cancelled],
                    backgroundColor: ['#f59e0b', '#2366A4', '#2CB9B6', '#ef4444'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 10 } } }
                }
            }
        });
    }

    // 2. Weekly Chart
    const weeklyLabels = [];
    const weeklyData = [];
    const daysName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        const dStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        const dayLabel = i === 0 ? "Today" : daysName[d.getDay()];
        weeklyLabels.push(dayLabel);
        
        const count = doctorAppointments.filter(apt => apt.date === dStr).length;
        weeklyData.push(count);
    }

    const weeklyCtx = document.getElementById('weeklyChart');
    if (weeklyCtx) {
        if (weeklyChartInstance) weeklyChartInstance.destroy();
        weeklyChartInstance = new Chart(weeklyCtx, {
            type: 'bar',
            data: {
                labels: weeklyLabels,
                datasets: [{
                    label: 'Appointments',
                    data: weeklyData,
                    backgroundColor: 'rgba(35, 102, 164, 0.75)',
                    borderColor: '#2366A4',
                    borderWidth: 1,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { stepSize: 1, color: '#587089' },
                        grid: { borderDash: [4, 4] }
                    },
                    x: {
                        ticks: { color: '#587089' }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // 3. Department Chart
    const deptCounts = { Cardiology: 0, Neurology: 0, Orthopedics: 0, Ophthalmology: 0, Pediatrics: 0, Dentistry: 0 };
    APPOINTMENTS_DATA.forEach(apt => {
        if (deptCounts[apt.department] !== undefined) {
            deptCounts[apt.department]++;
        }
    });

    const deptCtx = document.getElementById('departmentChart');
    if (deptCtx) {
        if (departmentChartInstance) departmentChartInstance.destroy();
        departmentChartInstance = new Chart(deptCtx, {
            type: 'bar',
            data: {
                labels: Object.keys(deptCounts),
                datasets: [{
                    label: 'Total Active Patient Load',
                    data: Object.values(deptCounts),
                    backgroundColor: 'rgba(44, 185, 182, 0.75)',
                    borderColor: '#2CB9B6',
                    borderWidth: 1,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { stepSize: 1, color: '#587089' },
                        grid: { borderDash: [4, 4] }
                    },
                    x: {
                        ticks: { color: '#587089' }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }
}

function renderAnalytics() {
    const doctorAppointments = APPOINTMENTS_DATA.filter(apt => apt.department.toLowerCase() === CURRENT_DOCTOR.department.toLowerCase());
    const todayStr = getRelativeDate(0);

    const todayCount = doctorAppointments.filter(apt => apt.date === todayStr).length;
    const pendingCount = doctorAppointments.filter(apt => apt.status === "Pending").length;
    const completedCount = doctorAppointments.filter(apt => apt.status === "Completed").length;
    const cancelledCount = doctorAppointments.filter(apt => apt.status === "Cancelled").length;

    // Set stats
    document.getElementById("analytics-today-count").innerText = todayCount;
    document.getElementById("analytics-pending-count").innerText = pendingCount;
    document.getElementById("analytics-completed-count").innerText = completedCount;
    document.getElementById("analytics-cancelled-count").innerText = cancelledCount;

    // Performance Cards
    const totalTreated = 1240 + doctorAppointments.filter(apt => apt.status === "Completed").length;
    document.getElementById("analytics-treated-total").innerText = totalTreated.toLocaleString();
    
    // Average Consultation Time
    let avgTime = "15 min";
    if (CURRENT_DOCTOR.department === "Cardiology") avgTime = "20 min";
    else if (CURRENT_DOCTOR.department === "Pediatrics") avgTime = "12 min";
    else if (CURRENT_DOCTOR.department === "Neurology") avgTime = "25 min";
    document.getElementById("analytics-avg-time").innerText = avgTime;

    // Satisfaction score
    const reviewsData = DOCTOR_REVIEWS[CURRENT_DOCTOR.email] || { satisfaction: "96%" };
    document.getElementById("analytics-satisfaction").innerText = reviewsData.satisfaction;
    
    // Attendance rates
    let attendance = "96%";
    if (CURRENT_DOCTOR.department === "Dentistry") attendance = "98%";
    else if (CURRENT_DOCTOR.department === "Ophthalmology") attendance = "95%";
    document.getElementById("analytics-attendance").innerText = attendance;

    renderAnalyticsCharts();
}

setInterval(() => {
    updateDashboardGreeting();
    updateDashboardStats();
    renderTodaysAppointments();
}, 60000);

// ==========================================================================
// USER LOGIC HANDLERS (LOGIN / VALIDATION / FORMS)
// ==========================================================================
function initFormProcessors() {
    const loginForm = document.getElementById("login-form");
    const roleSelect = document.getElementById("login-role");


    
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault(); 
            
            if (!loginForm.checkValidity()) {
                e.stopPropagation();
                loginForm.classList.add("was-validated");
            } else {
               const email = document.getElementById("login-id").value.trim();
            const password = document.getElementById("login-password").value.trim();

               

            // Admin Login
if (
    email.toLowerCase() === "admin@mediconnect.com" &&
    password === "admin123"
) {
    window.location.href = "admin-dashboard/admin-dashboard.html";
    return;
}

/* ==========================
   Role Redirect
========================== */



                const doctor = DOCTORS.find(
                    d => d.email.toLowerCase() === email.toLowerCase() &&
                         d.password === password
                );

                if (doctor) {
                    CURRENT_DOCTOR = doctor;

                    // Check remember me setting
                    const rememberMeChecked = document.getElementById("rememberMe").checked;
                    if (rememberMeChecked) {
                        localStorage.setItem("remember_email", email);
                        localStorage.setItem("remember_password", password);
                    } else {
                        localStorage.removeItem("remember_email");
                        localStorage.removeItem("remember_password");
                    }

                    // Pre-fill profile page fields
                    loadProfile(); 

                    document.getElementById("login-page").classList.add("d-none");
                    document.getElementById("app-container").classList.remove("d-none");

                    updateDashboardGreeting();
                    updateDashboardStats();
                    renderTodaysAppointments();
                    renderDoctorReviews();
                    
                    // Render default tables with logged doctor department
                    renderAppointmentsTable(APPOINTMENTS_DATA);
                    renderScheduleTable();

                    switchView("dashboard");
                    showToast("Welcome " + doctor.name);
                } else {
                    alert("Invalid Email Address or Password");
                }
            }
        });
    }

    // Show/Hide password toggle listener
    const togglePasswordBtn = document.getElementById("togglePasswordBtn");
    if (togglePasswordBtn) {
        const passwordInput = document.getElementById("login-password");
        const togglePasswordIcon = document.getElementById("togglePasswordIcon");
        togglePasswordBtn.addEventListener("click", () => {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                togglePasswordIcon.className = "bi bi-eye";
            } else {
                passwordInput.type = "password";
                togglePasswordIcon.className = "bi bi-eye-slash";
            }
        });
    }

    // Forgot password form submission
    const forgotForm = document.getElementById("forgot-password-form");
    if (forgotForm) {
        forgotForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!forgotForm.checkValidity()) {
                e.stopPropagation();
                forgotForm.classList.add("was-validated");
            } else {
                const email = document.getElementById("reset-email").value;
                const modalEl = document.getElementById("forgotPasswordModal");
                const modal = bootstrap.Modal.getInstance(modalEl);
                if (modal) modal.hide();
                showToast(`Password reset link successfully sent to ${email}`);
                forgotForm.reset();
                forgotForm.classList.remove("was-validated");
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
                // Don't reset remember values if saved
                const savedEmail = localStorage.getItem("remember_email");
                const savedPassword = localStorage.getItem("remember_password");
                loginForm.reset();
                if (savedEmail && savedPassword) {
                    document.getElementById("login-id").value = savedEmail;
                    document.getElementById("login-password").value = savedPassword;
                    document.getElementById("rememberMe").checked = true;
                }
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
                const dayInput = document.getElementById("schedule-day").value;
                const timeInput = document.getElementById("schedule-time").value;
                
                SCHEDULE_DATA.push({
                    id: Date.now(),
                    day: dayInput,
                    time: timeInput
                });
                
                renderScheduleTable();
                scheduleForm.reset();
                scheduleForm.classList.remove("was-validated");
                showToast("New clinical operational hours committed to schedule.");
            }
        });
    }
    
    const leaveForm = document.getElementById("leave-form");
    if (leaveForm) {
        leaveForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if(!leaveForm.checkValidity()) {
                e.stopPropagation();
                leaveForm.classList.add("was-validated");
            } else {
                processLeaveSubmission();
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

    // FILTER dataset for CURRENT_DOCTOR department
    const filteredDataset = dataset.filter(apt => apt.department.toLowerCase() === CURRENT_DOCTOR.department.toLowerCase());

    if(filteredDataset.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">No patient matches found matching operational specifications.</td></tr>`;
        return;
    }

    filteredDataset.forEach(apt => {
        let priorityBadge = "";
        if(apt.priority === "Urgent") priorityBadge = "🔴 Urgent";
        else if(apt.priority === "Follow-up") priorityBadge = "🟡 Follow-up";
        else priorityBadge = "🟢 Routine";

        let statusBadge = "";
        switch (apt.status) {
            case "Pending": statusBadge = `<span class="badge bg-warning-subtle text-warning border border-warning border-opacity-25 px-2 py-1 rounded">Pending</span>`; break;
            case "Confirmed": statusBadge = `<span class="badge bg-primary-subtle text-primary border border-primary border-opacity-25 px-2 py-1 rounded">Confirmed</span>`; break;
            case "Completed": statusBadge = `<span class="badge bg-success-subtle text-success border border-success border-opacity-25 px-2 py-1 rounded">Completed</span>`; break;
            case "Cancelled": statusBadge = `<span class="badge bg-danger-subtle text-danger border border-danger border-opacity-25 px-2 py-1 rounded">Cancelled</span>`; break;
        }

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="fw-bold text-dark border-bottom-0 ps-4">${apt.patientName}</td>
            <td class="border-bottom-0">${apt.date}</td>
            <td class="border-bottom-0">${apt.time}</td>
            <td class="fw-medium border-bottom-0">${priorityBadge}</td>
            <td class="border-bottom-0">${statusBadge}</td>
            <td class="text-end border-bottom-0 pe-4">
                <div class="btn-group gap-1 shadow-sm rounded">
                    <button class="btn btn-sm btn-outline-primary transition-card" onclick="loadPatientDetails('${apt.id}')"><i class="bi bi-folder2-open"></i> EHR File</button>
                    <button class="btn btn-sm btn-outline-secondary transition-card" onclick="loadStatusUpdater('${apt.id}')"><i class="bi bi-sliders"></i> Status</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// EHR Patient Details Loader
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
    showToast("Consultation summary variables compiled, signed digitally, and committed safely onto client record.");
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
        renderAppointmentsTable(APPOINTMENTS_DATA);
        
        updateDashboardStats();
        renderTodaysAppointments();
        
        showToast(`Appointment internal tracking workflow moved to state: [${newStatus}].`);
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
            <td class="fw-semibold ps-4 border-bottom-0">${item.day}</td>
            <td class="font-monospace text-muted border-bottom-0">${item.time}</td>
            <td class="text-end pe-4 border-bottom-0">
                <button class="btn btn-sm btn-outline-danger p-1 px-2 border-0 shadow-sm transition-card bg-light" onclick="deleteScheduleBlock(${item.id})">
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
// MANAGE LEAVE CALENDAR MODULE & LEAVE LOGIC ENGINE
// ==========================================================================
function updateAvailabilityToggle() {
    const label = document.getElementById("availabilityLabel");
    const navLabel = document.getElementById("nav-availability-status");
    if (IS_AVAILABLE_TODAY) {
        if(label) { label.innerText = "🟢 Available Today"; label.className = "form-check-label small fw-bold text-success cursor-pointer"; }
        if(navLabel) { navLabel.innerHTML = `<i class="bi bi-circle-fill me-1" style="font-size: 0.5rem; vertical-align: middle;"></i> Available Today`; navLabel.className = "badge bg-success-subtle text-success border border-success border-opacity-25 rounded-pill px-3 py-2 w-100 fw-medium"; }
    } else {
        if(label) { label.innerText = "🔴 Not Available"; label.className = "form-check-label small fw-bold text-danger cursor-pointer"; }
        if(navLabel) { navLabel.innerHTML = `<i class="bi bi-circle-fill me-1" style="font-size: 0.5rem; vertical-align: middle;"></i> Not Available`; navLabel.className = "badge bg-danger-subtle text-danger border border-danger border-opacity-25 rounded-pill px-3 py-2 w-100 fw-medium"; }
    }
}

function executeQuickScheduleAction(action) {
    if (action === 'applyAll') {
        const mondaySlots = SCHEDULE_DATA.filter(s => s.day === 'Mondays');
        if (mondaySlots.length > 0) {
            ['Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays'].forEach(day => {
                mondaySlots.forEach(slot => {
                    const exists = SCHEDULE_DATA.find(s => s.day === day && s.time === slot.time);
                    if (!exists) {
                        SCHEDULE_DATA.push({ id: Date.now() + Math.random(), day: day, time: slot.time });
                    }
                });
            });
            showToast("Monday's schedule successfully applied to all weekdays.");
        } else {
            alert("No schedule found for Monday to copy.");
        }
    } else if (action === 'emergency') {
        const tgl = document.getElementById("availabilityToggle");
        if(tgl) tgl.checked = false;
        IS_AVAILABLE_TODAY = false;
        updateAvailabilityToggle();
        
        const todayStr = getRelativeDate(0);
        LEAVE_DATA.push({
            id: Date.now(),
            type: "Family Emergency",
            start: todayStr,
            end: todayStr,
            format: "single",
            reason: "Emergency flagged via quick action.",
            emergency: true,
            status: "Approved"
        });
        showToast("Emergency leave marked for today. Appointments blocked.");
    } else if (action === 'reset') {
        if(confirm("Are you sure you want to clear the entire schedule?")) {
            SCHEDULE_DATA = [];
        }
    }
    
    renderScheduleTable();
    renderMonthlyCalendar();
}

function toggleLeaveFormat() {
    const format = document.getElementById("leave-format").value;
    const singleWrap = document.getElementById("single-date-wrapper");
    const multiStartWrap = document.getElementById("multi-start-wrapper");
    const multiEndWrap = document.getElementById("multi-end-wrapper");
    const singleInput = document.getElementById("leave-single-date");
    const startInput = document.getElementById("leave-start-date");
    const endInput = document.getElementById("leave-end-date");
    
    if(format === 'single') {
        singleWrap.classList.remove('d-none');
        multiStartWrap.classList.add('d-none');
        multiEndWrap.classList.add('d-none');
        singleInput.required = true;
        startInput.required = false;
        endInput.required = false;
        calculateLeaveDuration();
    } else {
        singleWrap.classList.add('d-none');
        multiStartWrap.classList.remove('d-none');
        multiEndWrap.classList.remove('d-none');
        singleInput.required = false;
        startInput.required = true;
        endInput.required = true;
        calculateLeaveDuration();
    }
}

function toggleOtherReason() {
    const type = document.getElementById("leave-type-drp").value;
    const otherWrap = document.getElementById("other-reason-wrapper");
    const otherInput = document.getElementById("leave-other-reason");
    
    if(type === 'Other') {
        otherWrap.classList.remove('d-none');
        otherInput.required = true;
    } else {
        otherWrap.classList.add('d-none');
        otherInput.required = false;
    }
}

function calculateLeaveDuration() {
    const format = document.getElementById("leave-format").value;
    const durationDisplay = document.getElementById("duration-display");
    const durationText = document.getElementById("duration-text");
    
    if(format === 'single') {
        const val = document.getElementById("leave-single-date").value;
        if(val) {
            durationDisplay.classList.remove('d-none');
            durationText.innerText = "Duration: 1 Day";
        } else {
            durationDisplay.classList.add('d-none');
        }
    } else {
        const start = document.getElementById("leave-start-date").value;
        const end = document.getElementById("leave-end-date").value;
        
        if(start && end) {
            const startDate = new Date(start);
            const endDate = new Date(end);
            if(endDate >= startDate) {
                const diffTime = Math.abs(endDate - startDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                durationDisplay.classList.remove('d-none');
                durationText.innerText = `Duration: ${diffDays} Days`;
            } else {
                durationDisplay.classList.remove('d-none');
                durationText.innerText = "Invalid Date Range";
            }
        } else {
            durationDisplay.classList.add('d-none');
        }
    }
}

function processLeaveSubmission() {
    const format = document.getElementById("leave-format").value;
    let start, end;
    
    if(format === 'single') {
        start = document.getElementById("leave-single-date").value;
        end = start;
    } else {
        start = document.getElementById("leave-start-date").value;
        end = document.getElementById("leave-end-date").value;
        if(new Date(end) < new Date(start)) {
            alert("End date cannot be earlier than start date.");
            return;
        }
    }
    
    let type = document.getElementById("leave-type-drp").value;
    if(type === 'Other') {
        type = document.getElementById("leave-other-reason").value;
    }
    
    const reason = document.getElementById("leave-notes").value || type;
    const emergency = document.getElementById("leave-emergency-toggle").checked;
    
    const newLeave = {
        id: Date.now(),
        type: type,
        start: start,
        end: end,
        format: format,
        reason: reason,
        emergency: emergency,
        status: "Pending"
    };
    
    LEAVE_DATA.push(newLeave);
    
    const form = document.getElementById("leave-form");
    form.reset();
    form.classList.remove('was-validated');
    toggleLeaveFormat();
    toggleOtherReason();
    document.getElementById("duration-display").classList.add('d-none');
    
    showToast("Leave request formally submitted. Future appointments blocked.");
    
    renderMonthlyCalendar();
}

function changeCalendarMonth(offset) {
    currentDateRender.setMonth(currentDateRender.getMonth() + offset);
    renderMonthlyCalendar();
}

function getDatesInRange(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);
  
  while (currentDate <= end) {
    dates.push(`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

function renderMonthlyCalendar() {
    const grid = document.getElementById("leave-calendar-grid");
    const monthHeader = document.getElementById("calendar-month-year");
    if (!grid || !monthHeader) return;
    
    grid.innerHTML = "";
    
    const year = currentDateRender.getFullYear();
    const month = currentDateRender.getMonth();
    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    monthHeader.innerText = `${monthNames[month]} ${year}`;
    
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
        grid.innerHTML += `<div class="calendar-header-day">${day}</div>`;
    });
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const today = new Date();
    const isCurrentMonthYear = today.getMonth() === month && today.getFullYear() === year;
    
    const leaveLookup = {};
    LEAVE_DATA.forEach(leave => {
        if(leave.status !== 'Cancelled') {
            const rangeDates = getDatesInRange(leave.start, leave.end);
            rangeDates.forEach(dStr => {
                leaveLookup[dStr] = leave; 
            });
        }
    });

    for(let i = 0; i < firstDay; i++) {
        grid.innerHTML += `<div class="calendar-day-cell empty-cell"></div>`;
    }
    
    for(let i = 1; i <= daysInMonth; i++) {
        const isToday = isCurrentMonthYear && today.getDate() === i;
        const cellDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        
        let extraClasses = 'current-month';
        if(isToday) extraClasses += ' today';
        
        let clickAttr = '';
        const matchingLeave = leaveLookup[cellDateStr];
        
        if(matchingLeave) {
            extraClasses += ' has-leave';
            if(matchingLeave.emergency) extraClasses += ' emergency-leave';
            clickAttr = `onclick="openLeaveModal(${matchingLeave.id})" title="Click to view details"`;
        }
        
        grid.innerHTML += `<div class="calendar-day-cell ${extraClasses}" ${clickAttr}>${i}</div>`;
    }
}

function openLeaveModal(leaveId) {
    const leave = LEAVE_DATA.find(l => l.id === leaveId);
    if(leave) {
        document.getElementById("modal-leave-date").innerText = leave.format === 'single' ? leave.start : `${leave.start} to ${leave.end}`;
        document.getElementById("modal-leave-type").innerText = leave.type;
        
        let durationStr = "1 Day";
        if(leave.format === 'multiple') {
            const start = new Date(leave.start);
            const end = new Date(leave.end);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            durationStr = `${diffDays} Days`;
        }
        document.getElementById("modal-leave-duration").innerText = durationStr;
        
        const statusEl = document.getElementById("modal-leave-status");
        statusEl.innerText = leave.status;
        statusEl.className = leave.status === 'Approved' ? 'text-success' : 'text-warning';
        
        const emergencyEl = document.getElementById("modal-leave-emergency");
        emergencyEl.innerText = leave.emergency ? "Yes" : "No";
        emergencyEl.className = leave.emergency ? "text-danger" : "text-dark";
        
        document.getElementById("modal-leave-reason").innerText = leave.reason;
        
        const modal = new bootstrap.Modal(document.getElementById('leaveDetailsModal'));
        modal.show();
    }
}

// ==========================================================================
// SALARY DOWNLOAD UTILITIES
// ==========================================================================
function downloadReceipt(month, amount, status) {
    const nameInput = document.getElementById('prof-name');
    const docName = nameInput ? nameInput.value : CURRENT_DOCTOR.name;
    
    const receiptContent = `
=============================================
         MEDI CONNECT - SALARY RECEIPT            
=============================================

Doctor Name       : ${docName}
Statement Month   : ${month}
Total Net Amount  : ${amount}
Payment Status    : ${status}

Generated On      : ${new Date().toLocaleDateString()}

---------------------------------------------
Thank you for your dedicated service.
=============================================
`;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = `MEDI_CONNECT_Salary_Receipt_${month.replace(' ', '_')}.txt`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showToast(`Salary receipt for ${month} downloaded successfully.`);
}

function updateDepartmentIllustration(department) {
    const iconWrapper = document.getElementById("department-icon-wrapper");
    const labelEl = document.getElementById("department-illustration-label");
    if (!iconWrapper) return;

    if (labelEl) {
        labelEl.textContent = department;
    }

    const deptLower = department.toLowerCase();
    let svgContent = "";

    if (deptLower.includes("cardiology")) {
        svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"><defs><linearGradient id="grad-cardio" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2563EB" /><stop offset="50%" stop-color="#0891B2" /><stop offset="100%" stop-color="#14B8A6" /></linearGradient><filter id="glow-cardio" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#0891B2" flood-opacity="0.6"/></filter></defs><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="url(#grad-cardio)" filter="url(#glow-cardio)"/><path d="M3 13h3.5l1.5-4 2 8 2-10 1.5 6 1-2H21" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    } else if (deptLower.includes("dentistry")) {
        svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"><defs><linearGradient id="grad-dent" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2563EB" /><stop offset="50%" stop-color="#0891B2" /><stop offset="100%" stop-color="#14B8A6" /></linearGradient><filter id="glow-dent" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#14B8A6" flood-opacity="0.6"/></filter></defs><path d="M12 2c-3.3 0-5.5 1.7-5.5 5.5 0 2 .8 4 1.3 5.5.5 1.5.7 3 .2 4.5-.3.8-.1 1.5.5 1.5s1.2-.8 1.7-2.3c.5-1.5 1-2.2 1.8-2.2s1.3.7 1.8 2.2c.5 1.5 1.1 2.3 1.7 2.3s.8-.7.5-1.5c-.5-1.5-.3-3 .2-4.5.5-1.5 1.3-3.5 1.3-5.5C17.5 3.7 15.3 2 12 2z" fill="url(#grad-dent)" filter="url(#glow-dent)"/><path d="M17.5 4.5l.3 1 .9.3-.9.3-.3 1-.3-1-.9-.3.9-.3z" fill="#FFFFFF"/></svg>`;
    } else if (deptLower.includes("neurology")) {
        svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"><defs><linearGradient id="grad-neuro" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2563EB" /><stop offset="50%" stop-color="#0891B2" /><stop offset="100%" stop-color="#14B8A6" /></linearGradient><filter id="glow-neuro" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#0891B2" flood-opacity="0.6"/></filter></defs><path d="M12 3c-3.6 0-6.5 2.7-6.5 6 0 1.2.4 2.3 1 3.2C5.6 13 5 14.2 5 15.5 5 18 7 20 9.5 20c.6 0 1.2-.1 1.7-.4.5.3 1 .4 1.6.4.6 0 1.1-.1 1.6-.4.5.3 1 .4 1.7.4 2.5 0 4.5-2 4.5-4.5 0-1.3-.6-2.5-1.5-3.3.6-.9 1-2 1-3.2 0-3.3-2.9-6-6.5-6z" fill="url(#grad-neuro)" filter="url(#glow-neuro)"/><path d="M9 7.5c.5-1.5 2-2 3-1.5M7.5 10c1-.5 2 .5 2 1.5M8 13.5c1 .5 1.5 1.5 1 2.5M15 7.5c-.5-1.5-2-2-3-1.5M16.5 10c-1-.5-2 .5-2 1.5M16 13.5c-1 .5-1.5 1.5-1 2.5" fill="none" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round"/></svg>`;
    } else if (deptLower.includes("orthopedics")) {
        svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"><defs><linearGradient id="grad-ortho" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2563EB" /><stop offset="50%" stop-color="#0891B2" /><stop offset="100%" stop-color="#14B8A6" /></linearGradient><filter id="glow-ortho" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#0891B2" flood-opacity="0.6"/></filter></defs><g transform="rotate(-45 12 12)" filter="url(#glow-ortho)"><rect x="5" y="11" width="14" height="2" rx="1" fill="url(#grad-ortho)"/><circle cx="5" cy="10" r="2" fill="url(#grad-ortho)"/><circle cx="5" cy="14" r="2" fill="url(#grad-ortho)"/><circle cx="19" cy="10" r="2" fill="url(#grad-ortho)"/><circle cx="19" cy="14" r="2" fill="url(#grad-ortho)"/></g></svg>`;
    } else if (deptLower.includes("ent")) {
        svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"><defs><linearGradient id="grad-ent" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2563EB" /><stop offset="50%" stop-color="#0891B2" /><stop offset="100%" stop-color="#14B8A6" /></linearGradient><filter id="glow-ent" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#0891B2" flood-opacity="0.6"/></filter></defs><path d="M9 3a5 5 0 0 0-3 9.2V19a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-1.2A6 6 0 0 0 17 9a5 5 0 0 0-8-6z" fill="url(#grad-ent)" filter="url(#glow-ent)"/><path d="M9 5a3 3 0 0 1 4.8 2.4c0 1.5-.8 2.8-2 3.4a1 1 0 0 0-.6.9v3.6a1 1 0 0 1-2 0V11a1 1 0 0 0-.5-.9C8 9.3 7 8 7 6.4A3 3 0 0 1 9 5z" fill="#FFFFFF"/></svg>`;
    } else if (deptLower.includes("gynecology")) {
        svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"><defs><linearGradient id="grad-gyn" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2563EB" /><stop offset="50%" stop-color="#0891B2" /><stop offset="100%" stop-color="#14B8A6" /></linearGradient><filter id="glow-gyn" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#0891B2" flood-opacity="0.6"/></filter></defs><g filter="url(#glow-gyn)"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="url(#grad-gyn)"/><circle cx="10" cy="8" r="1.8" fill="#FFFFFF"/><path d="M7.5 14c0-1.5 1.5-2.2 2.5-2.2s2.5.7 2.5 2.2v1.5h-5V14z" fill="#FFFFFF"/><circle cx="13.5" cy="10.5" r="1.1" fill="#FFFFFF"/><path d="M12.5 13.5c0-.8.8-1.2 1.3-1.2s1.3.4 1.3 1.2v1h-2.6v-1z" fill="#FFFFFF"/></g></svg>`;
    } else if (deptLower.includes("pulmonology")) {
        svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"><defs><linearGradient id="grad-pulm" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2563EB" /><stop offset="50%" stop-color="#0891B2" /><stop offset="100%" stop-color="#14B8A6" /></linearGradient><filter id="glow-pulm" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#0891B2" flood-opacity="0.6"/></filter></defs><g filter="url(#glow-pulm)"><path d="M11 5.5C8 5.5 5.5 8 5.5 12c0 3.5 2 6 5 6.5V5.5z" fill="url(#grad-pulm)"/><path d="M13 5.5C16 5.5 18.5 8 18.5 12c0 3.5-2 6-5 6.5V5.5z" fill="url(#grad-pulm)"/><path d="M12 3.5v5m0 0l-2 2m2-2l2 2" fill="none" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round"/></g></svg>`;
    } else if (deptLower.includes("general physician")) {
        svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"><defs><linearGradient id="grad-gp" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2563EB" /><stop offset="50%" stop-color="#0891B2" /><stop offset="100%" stop-color="#14B8A6" /></linearGradient><filter id="glow-gp" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#0891B2" flood-opacity="0.6"/></filter></defs><g filter="url(#glow-gp)"><path d="M7 4h3M14 4h3M8 4v2c0 3 2 5.5 4 5.5s4-2.5 4-5.5V4" fill="none" stroke="url(#grad-gp)" stroke-width="2" stroke-linecap="round"/><path d="M12 11.5v4.5" fill="none" stroke="url(#grad-gp)" stroke-width="2"/><circle cx="12" cy="18" r="2.5" fill="url(#grad-gp)"/><circle cx="12" cy="18" r="0.8" fill="#FFFFFF"/></g></svg>`;
    } else if (deptLower.includes("nephrology")) {
        svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"><defs><linearGradient id="grad-neph" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2563EB" /><stop offset="50%" stop-color="#0891B2" /><stop offset="100%" stop-color="#14B8A6" /></linearGradient><filter id="glow-neph" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#0891B2" flood-opacity="0.6"/></filter></defs><g filter="url(#glow-neph)"><path d="M9.5 5C7 5 5 7.5 5 11c0 3.5 2 6 4.5 6 .8 0 1-.8 1-2.5V7.5c0-1.7-.2-2.5-1-2.5z" fill="url(#grad-neph)"/><path d="M14.5 5c2.5 0 4.5 2.5 4.5 6 0 3.5-2 6-4.5 6-.8 0-1-.8-1-2.5V7.5c0-1.7.2-2.5 1-2.5z" fill="url(#grad-neph)"/><path d="M10.5 13.5c0 1.5.8 2.5 1.5 4M13.5 13.5c0 1.5-.8 2.5-1.5 4" fill="none" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round"/></g></svg>`;
    } else if (deptLower.includes("dermatology")) {
        svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"><defs><linearGradient id="grad-derm" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2563EB" /><stop offset="50%" stop-color="#0891B2" /><stop offset="100%" stop-color="#14B8A6" /></linearGradient><filter id="glow-derm" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#0891B2" flood-opacity="0.6"/></filter></defs><g filter="url(#glow-derm)"><path d="M3 8h18M3 13h18M3 18h18" fill="none" stroke="url(#grad-derm)" stroke-width="2" stroke-linecap="round"/><path d="M11.5 3c-1.5 3.5.5 5.5 1.5 7" fill="none" stroke="url(#grad-derm)" stroke-width="2" stroke-linecap="round"/><circle cx="13" cy="11.5" r="1.5" fill="#FFFFFF"/></g></svg>`;
    } else if (deptLower.includes("ophthalmology")) {
        svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"><defs><linearGradient id="grad-ophth" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2563EB" /><stop offset="50%" stop-color="#0891B2" /><stop offset="100%" stop-color="#14B8A6" /></linearGradient><filter id="glow-ophth" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#0891B2" flood-opacity="0.6"/></filter></defs><g filter="url(#glow-ophth)"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" fill="none" stroke="url(#grad-ophth)" stroke-width="2"/><circle cx="12" cy="12" r="4.5" fill="url(#grad-ophth)"/><circle cx="12" cy="12" r="1.8" fill="#FFFFFF"/></g></svg>`;
    } else if (deptLower.includes("pediatrics")) {
        svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"><defs><linearGradient id="grad-peds" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2563EB" /><stop offset="50%" stop-color="#0891B2" /><stop offset="100%" stop-color="#14B8A6" /></linearGradient><filter id="glow-peds" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#0891B2" flood-opacity="0.6"/></filter></defs><g filter="url(#glow-peds)"><circle cx="7" cy="8" r="2.5" fill="url(#grad-peds)"/><circle cx="17" cy="8" r="2.5" fill="url(#grad-peds)"/><circle cx="7" cy="8" r="1" fill="#FFFFFF"/><circle cx="17" cy="8" r="1" fill="#FFFFFF"/><circle cx="12" cy="13.5" r="5.5" fill="url(#grad-peds)"/><circle cx="10" cy="12.5" r="0.8" fill="#FFFFFF"/><circle cx="14" cy="12.5" r="0.8" fill="#FFFFFF"/><ellipse cx="12" cy="15" rx="1.5" ry="1" fill="#FFFFFF"/><circle cx="12" cy="14.5" r="0.6" fill="url(#grad-peds)"/><path d="M19 1.5h2v2h2v2h-2v2h-2v-2h-2v-2h2z" fill="#FFFFFF"/></g></svg>`;
    } else {
        svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"><defs><linearGradient id="grad-gp" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2563EB" /><stop offset="50%" stop-color="#0891B2" /><stop offset="100%" stop-color="#14B8A6" /></linearGradient><filter id="glow-gp" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#0891B2" flood-opacity="0.6"/></filter></defs><g filter="url(#glow-gp)"><path d="M7 4h3M14 4h3M8 4v2c0 3 2 5.5 4 5.5s4-2.5 4-5.5V4" fill="none" stroke="url(#grad-gp)" stroke-width="2" stroke-linecap="round"/><path d="M12 11.5v4.5" fill="none" stroke="url(#grad-gp)" stroke-width="2"/><circle cx="12" cy="18" r="2.5" fill="url(#grad-gp)"/><circle cx="12" cy="18" r="0.8" fill="#FFFFFF"/></g></svg>`;
    }

    iconWrapper.innerHTML = svgContent;
}