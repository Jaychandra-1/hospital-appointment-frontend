document.addEventListener("DOMContentLoaded", function () {
    
    // --- ChartJS Config for Appointments Overview Line Graph ---
    const ctx = document.getElementById('appointmentsChart').getContext('2d');
    
    // Gradient fill setup for the area under the curve
    const chartGradient = ctx.createLinearGradient(0, 0, 0, 300);
    chartGradient.addColorStop(0, 'rgba(0, 168, 150, 0.3)');  /* Teal alpha tint */
    chartGradient.addColorStop(1, 'rgba(0, 168, 150, 0.0)');

    const appointmentsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Appointments',
                data: [20, 32, 55, 40, 62, 45, 90], // Matches standard plot arcs in image
                borderColor: '#00a896', // Medical Teal Color matching visual
                borderWidth: 3,
                pointBackgroundColor: '#00a896',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
                tension: 0.4, // Smooth curved geometry
                fill: true,
                backgroundColor: chartGradient
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // Matches target image UI
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        color: '#627d98',
                        font: { size: 11 }
                    },
                    grid: {
                        color: '#e2e8f0',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: '#627d98',
                        font: { size: 11 }
                    },
                    grid: {
                        display: false // Clears vertical grids for clean visual
                    }
                }
            }
        }
    });

    // --- Interactive Logic (Optional Add-ons) ---
    // Handle switching between navigation tabs
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Quick action simple response alerts
    const actionCards = document.querySelectorAll('.action-btn-card');
    actionCards.forEach(card => {
        card.addEventListener('click', function() {
            const actionText = this.querySelector('span').innerText;
            alert(`Triggered Workflow: "${actionText}" functionality.`);
        });
    });
});

const logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){
    logoutBtn.addEventListener("click", function(e){

        e.preventDefault();

        const confirmLogout =
            confirm("Are you sure you want to logout?");

        if(confirmLogout){

            window.location.href = "login.html";

        }
    });
}



const dashboardBtn = document.getElementById("dashboardBtn");
const doctorsBtn = document.getElementById("doctorsBtn");

const patientsBtn = document.getElementById("patientsBtn");



const pages = {
    dashboard: document.getElementById("dashboard-page"),
    doctors: document.getElementById("doctors-page"),
    patients: document.getElementById("patients-page"),
    appointments: document.getElementById("appointments-page"),
    reports: document.getElementById("reports-page"),
    settings: document.getElementById("settings-page")
};

function showPage(pageName){

    for(let page in pages){
        pages[page].style.display = "none";
    }

    pages[pageName].style.display = "block";
}


dashboardBtn.addEventListener("click", function(e){
    e.preventDefault();
    showPage("dashboard");
    setActive(this);
});

doctorsBtn.addEventListener("click", function(e){
    e.preventDefault();
    showPage("doctors");
    setActive(this);
});

patientsBtn.addEventListener("click", function(e){
    e.preventDefault();
    showPage("patients");
    setActive(this);
});


const appointmentsBtn =
    document.getElementById("appointmentsBtn");

appointmentsBtn.addEventListener("click", function(e){

    e.preventDefault();

    showPage("appointments");
    setActive(this);

});

function setActive(button){

    document.querySelectorAll(".nav-item")
        .forEach(item =>
            item.classList.remove("active"));

    button.classList.add("active");
}



const reportsBtn =
    document.getElementById("reportsBtn");

    reportsBtn.addEventListener("click", function(e){

    e.preventDefault();

    showPage("reports");

    setActive(this);

});



const settingsBtn =
    document.getElementById("settingsBtn");

    settingsBtn.addEventListener("click", function(e){

    e.preventDefault();

    showPage("settings");

    setActive(this);

});

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




