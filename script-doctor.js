// ==========================================================================
// CORE DATA ISOLATION SCHEMAS & UTILITIES
// ==========================================================================

const SAMPLE_DOCTORS = [
    {
      id: "DOC101",
      email: "aruna@mediconnect.com",
      password: "1234",
      name: "Dr. Aruna",
      department: "Cardiology",
      specialization: "Interventional Cardiology",
      qualification: "MBBS, MD, DM (Cardiology)",
      experience: "12 Years",
      fee: 1000,
      phone: "+91 98765 43210",
      address: "Block A, Room 302, Mediconnect Hospital, Cityville",
      photo: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=240"
    },
    {
      id: "DOC102",
      email: "bharath@mediconnect.com",
      password: "1234",
      name: "Dr. Bharath",
      department: "Neurology",
      specialization: "Neurodegenerative Disorders",
      qualification: "MBBS, MD, MCh (Neurology)",
      experience: "10 Years",
      fee: 1200,
      phone: "+91 98765 43211",
      address: "Block B, Room 405, Mediconnect Hospital, Cityville",
      photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=240"
    },
    {
      id: "DOC103",
      email: "kavya@mediconnect.com",
      password: "1234",
      name: "Dr. Kavya",
      department: "Orthopedics",
      specialization: "Sports Medicine & Joint Replacements",
      qualification: "MBBS, MS (Orthopedics)",
      experience: "8 Years",
      fee: 800,
      phone: "+91 98765 43212",
      address: "Block C, Room 101, Mediconnect Hospital, Cityville",
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=240"
    }
  ];
  
  // Helper to calculate offset date strings
  function getOffsetDateString(daysOffset) {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
  
  // Default Data Templates per Doctor
  const DEFAULT_DOC_DATA = {
    "DOC101": {
      appointments: [
        { id: "APT-101", patientName: "Jane Doe", age: 45, gender: "Female", bloodGroup: "O+", contact: "+91 99999 88888", date: getOffsetDateString(0), time: "09:00 AM", priority: "Urgent", status: "Pending", complaint: "Sudden chest tightness and heart palpitations.", history: "Mild hypertension managed with Amlodipine 5mg.", symptoms: "", diagnosis: "", prescription: "", followup: "", treatment: "" },
        { id: "APT-102", patientName: "John Smith", age: 62, gender: "Male", bloodGroup: "A+", contact: "+91 88888 77777", date: getOffsetDateString(0), time: "10:30 AM", priority: "Routine", status: "Confirmed", complaint: "Regular post-angioplasty recovery evaluation.", history: "Coronary Artery Bypass Graft (CABG) in 2024.", symptoms: "", diagnosis: "", prescription: "", followup: "", treatment: "" },
        { id: "APT-103", patientName: "Sarah Lee", age: 35, gender: "Female", bloodGroup: "B+", contact: "+91 77777 66666", date: getOffsetDateString(0), time: "11:45 AM", priority: "Follow-up", status: "Completed", complaint: "Review of 24-hour Holter monitoring reports.", history: "No other significant history.", symptoms: "Palpitations during exercise", diagnosis: "Sinus Tachycardia - benign", prescription: "Tab. Propranolol 10mg - BD x 14 Days", followup: "Repeat holter in 3 months", treatment: "Reduce caffeine intake, daily cardio exercises" },
        { id: "APT-104", patientName: "Robert Chang", age: 58, gender: "Male", bloodGroup: "O-", contact: "+91 66666 55555", date: getOffsetDateString(-1), time: "02:00 PM", priority: "Urgent", status: "Completed", complaint: "Severe dizziness and racing heartbeats.", history: "Type 2 Diabetes Mellitus.", symptoms: "Lightheadedness, irregular heartbeats", diagnosis: "Paroxysmal Atrial Fibrillation", prescription: "Tab. Metoprolol 25mg - Daily\nTab. Apixaban 5mg - BD", followup: "Cardiology review in 2 weeks with ECG reports", treatment: "Low sodium diet, strict glucose regulation" },
        { id: "APT-105", patientName: "Emily Stone", age: 50, gender: "Female", bloodGroup: "AB+", contact: "+91 55555 44444", date: getOffsetDateString(1), time: "10:00 AM", priority: "Routine", status: "Confirmed", complaint: "Hypertension medication review.", history: "Chronic hypertension x 5 years.", symptoms: "", diagnosis: "", prescription: "", followup: "", treatment: "" }
      ],
      schedule: [
        { id: "S1", day: "Monday", time: "09:00 AM - 12:00 PM" },
        { id: "S2", day: "Wednesday", time: "01:00 PM - 04:00 PM" },
        { id: "S3", day: "Friday", time: "05:00 PM - 08:00 PM" }
      ],
      leaves: [
        { id: "L1", type: "Medical Leave", start: getOffsetDateString(2), end: getOffsetDateString(2), format: "single", reason: "Minor dental extraction recovery.", emergency: false, status: "Approved" },
        { id: "L2", type: "Conference / Seminar", start: getOffsetDateString(10), end: getOffsetDateString(12), format: "multiple", reason: "Attending International Cardiology Summit.", emergency: false, status: "Approved" }
      ],
      reviews: [
        { name: "Jane Doe", rating: 5, review: "Excellent doctor! Dr. Aruna is highly patient, thoroughly explained my ECG metrics, and eased my anxiety.", date: getOffsetDateString(-2), doctor: "Dr. Aruna" },
        { name: "Sarah Lee", rating: 4, review: "Very skilled practitioner. Clinic scheduling was a bit delayed, but the consultation was highly satisfactory.", date: getOffsetDateString(-5), doctor: "Dr. Aruna" },
        { name: "Robert Chang", rating: 5, review: "Highly professional. Her immediate treatment of my atrial fibrillation was life-saving.", date: getOffsetDateString(-8), doctor: "Dr. Aruna" }
      ],
      salary: [
        { month: "May 2026", base: 180000, bonuses: 12000, deductions: 5000, status: "Transferred" },
        { month: "April 2026", base: 180000, bonuses: 15000, deductions: 5000, status: "Transferred" },
        { month: "March 2026", base: 180000, bonuses: 8000, deductions: 5000, status: "Transferred" }
      ],
      availability: true
    },
    "DOC102": {
      appointments: [
        { id: "APT-201", patientName: "Arthur Dent", age: 42, gender: "Male", bloodGroup: "B-", contact: "+91 99999 11111", date: getOffsetDateString(0), time: "09:30 AM", priority: "Urgent", status: "Confirmed", complaint: "Frequent severe migraines accompanied by visual aura.", history: "History of episodic tension headaches.", symptoms: "", diagnosis: "", prescription: "", followup: "", treatment: "" },
        { id: "APT-202", patientName: "Clara Oswald", age: 28, gender: "Female", bloodGroup: "A-", contact: "+91 88888 22222", date: getOffsetDateString(0), time: "11:00 AM", priority: "Routine", status: "Pending", complaint: "Persistent tremors in right index finger.", history: "No relevant medical history.", symptoms: "", diagnosis: "", prescription: "", followup: "", treatment: "" },
        { id: "APT-203", patientName: "Bruce Wayne", age: 38, gender: "Male", bloodGroup: "O+", contact: "+91 77777 33333", date: getOffsetDateString(-1), time: "04:00 PM", priority: "Urgent", status: "Completed", complaint: "Chronic sleep deprivation and recurring post-trauma headaches.", history: "Multiple mild concussions, active physical lifestyle.", symptoms: "Insomnia, memory fog, occipital headaches", diagnosis: "Post-Concussion Syndrome & Chronic Fatigue", prescription: "Tab. Melatonin 5mg - Bedtime\nTab. Amitriptyline 10mg - Nocturnal x 30 Days", followup: "Repeat evaluation in 4 weeks", treatment: "Cognitive rest protocol, avoid screen exposure before sleep" },
        { id: "APT-204", patientName: "Diana Prince", age: 31, gender: "Female", bloodGroup: "AB-", contact: "+91 66666 44444", date: getOffsetDateString(1), time: "09:00 AM", priority: "Follow-up", status: "Confirmed", complaint: "Post-concussion reflex and cranial nerve check.", history: "Recent fall during training.", symptoms: "", diagnosis: "", prescription: "", followup: "", treatment: "" }
      ],
      schedule: [
        { id: "S4", day: "Tuesday", time: "10:00 AM - 01:00 PM" },
        { id: "S5", day: "Thursday", time: "02:00 PM - 05:00 PM" }
      ],
      leaves: [
        { id: "L3", type: "Vacation Leave", start: getOffsetDateString(5), end: getOffsetDateString(7), format: "multiple", reason: "Family trip.", emergency: false, status: "Approved" }
      ],
      reviews: [
        { name: "Arthur Dent", rating: 5, review: "Dr. Bharath is brilliant. His migraine treatment plan changed my life completely.", date: getOffsetDateString(-3), doctor: "Dr. Bharath" },
        { name: "Bruce Wayne", rating: 4, review: "Competent, direct, and provided solid neurological advice. Very professional.", date: getOffsetDateString(-6), doctor: "Dr. Bharath" }
      ],
      salary: [
        { month: "May 2026", base: 190000, bonuses: 9000, deductions: 6000, status: "Transferred" },
        { month: "April 2026", base: 190000, bonuses: 11000, deductions: 6000, status: "Transferred" }
      ],
      availability: true
    },
    "DOC103": {
      appointments: [
        { id: "APT-301", patientName: "Peter Parker", age: 21, gender: "Male", bloodGroup: "A+", contact: "+91 99999 55555", date: getOffsetDateString(0), time: "10:00 AM", priority: "Urgent", status: "Confirmed", complaint: "Sprained left wrist from physical exertion.", history: "Ligament strain in ankle in 2023.", symptoms: "", diagnosis: "", prescription: "", followup: "", treatment: "" },
        { id: "APT-302", patientName: "Mary Jane", age: 26, gender: "Female", bloodGroup: "B+", contact: "+91 88888 66666", date: getOffsetDateString(-1), time: "12:00 PM", priority: "Routine", status: "Completed", complaint: "Follow-up on ankle fracture recovery.", history: "Lateral malleolus fracture 8 weeks ago.", symptoms: "Mild localized swelling, post-activity stiffness", diagnosis: "Healing lateral malleolus fibular fracture", prescription: "Tab. Calcium + Vitamin D3 - Daily x 30 Days", followup: "Physiotherapy review in 4 weeks", treatment: "Begin ankle mobilization training, wear support brace" },
        { id: "APT-303", patientName: "Steve Rogers", age: 99, gender: "Male", bloodGroup: "O+", contact: "+91 77777 77777", date: getOffsetDateString(-2), time: "11:00 AM", priority: "Follow-up", status: "Completed", complaint: "Chronic right shoulder joint stiffness.", history: "Old injury, osteoarthritis changes.", symptoms: "Restricted range of motion, nocturnal pain", diagnosis: "Adhesive Capsulitis (Frozen Shoulder) & Osteoarthritis", prescription: "Inj. Methylprednisolone (intra-articular, administered)\nTab. Etoricoxib 90mg - Daily PRN", followup: "Review in 3 weeks for mobility audit", treatment: "Daily active stretching exercises, physiotherapy" },
        { id: "APT-304", patientName: "Tony Stark", age: 48, gender: "Male", bloodGroup: "A-", contact: "+91 66666 88888", date: getOffsetDateString(1), time: "02:00 PM", priority: "Urgent", status: "Confirmed", complaint: "Acute left knee pain and joint swelling.", history: "Gouty arthritis, meniscus tear surgery 2022.", symptoms: "", diagnosis: "", prescription: "", followup: "", treatment: "" }
      ],
      schedule: [
        { id: "S6", day: "Tuesday", time: "09:00 AM - 01:00 PM" },
        { id: "S7", day: "Wednesday", time: "09:00 AM - 01:00 PM" },
        { id: "S8", day: "Thursday", time: "10:00 AM - 02:00 PM" }
      ],
      leaves: [
        { id: "L4", type: "Family Emergency", start: getOffsetDateString(1), end: getOffsetDateString(1), format: "single", reason: "Family health urgency.", emergency: true, status: "Approved" }
      ],
      reviews: [
        { name: "Peter Parker", rating: 5, review: "Great orthopedician! She wrapped my wrist quickly and explained stretching procedures.", date: getOffsetDateString(-1), doctor: "Dr. Kavya" },
        { name: "Steve Rogers", rating: 5, review: "Dr. Kavya is highly professional. The joint treatment significantly restored my shoulder movement.", date: getOffsetDateString(-4), doctor: "Dr. Kavya" }
      ],
      salary: [
        { month: "May 2026", base: 170000, bonuses: 14000, deductions: 4000, status: "Transferred" },
        { month: "April 2026", base: 170000, bonuses: 12000, deductions: 4000, status: "Transferred" }
      ],
      availability: true
    }
  };
  
  // State Variables
  let currentDoctor = null;
  let currentView = "dashboard";
  let currentDashboardFilter = "today"; // "today", "Pending", "Completed", "Cancelled"
  let activeLeaveMonth = new Date();
  let selectedAppointment = null;
  let profileEditMode = false;
  let satisfactionChartInstance = null;
  let volumeChartInstance = null;
  let revenueChartInstance = null;
  let performanceChartInstance = null;
  let benchmarkChartInstance = null;
  
  // Prefix Storage Utils
  function saveDocData(key, data) {
    if (!currentDoctor) return;
    localStorage.setItem(`${currentDoctor.id}_${key}`, JSON.stringify(data));
  }
  
  function loadDocData(key) {
    if (!currentDoctor) return null;
    const raw = localStorage.getItem(`${currentDoctor.id}_${key}`);
    return raw ? JSON.parse(raw) : null;
  }
  
  // Initializing Storage Database
  function initDoctorStorage(docId) {
    if (localStorage.getItem(`${docId}_initialized`)) return;
    
    const doctor = SAMPLE_DOCTORS.find(d => d.id === docId);
    const data = DEFAULT_DOC_DATA[docId];
    
    localStorage.setItem(`${docId}_profile`, JSON.stringify(doctor));
    localStorage.setItem(`${docId}_appointments`, JSON.stringify(data.appointments));
    localStorage.setItem(`${docId}_schedule`, JSON.stringify(data.schedule));
    localStorage.setItem(`${docId}_leaves`, JSON.stringify(data.leaves));
    localStorage.setItem(`${docId}_reviews`, JSON.stringify(data.reviews));
    localStorage.setItem(`${docId}_salary`, JSON.stringify(data.salary));
    localStorage.setItem(`${docId}_availability`, JSON.stringify(data.availability));
    localStorage.setItem(`${docId}_initialized`, "true");
  }
  
  // Run storage population on load
  SAMPLE_DOCTORS.forEach(d => initDoctorStorage(d.id));
  
  // ==========================================================================
  // AUTHENTICATION LOGIC
  // ==========================================================================
  
  document.addEventListener("DOMContentLoaded", () => {
    setupPasswordToggle();
    setupRememberMeCheck();
    setupSidebarNavigation();
    setupAuthFormSubmit();
    setupNavbarProfileDropdown();
    setupSearchAndFilters();
    setupScheduleForm();
    setupLeaveForm();
    setupProfileFormSubmit();
    
    // Check if session exists
    const sessionDocId = sessionStorage.getItem("current_doctor_id");
    if (sessionDocId) {
      loginDoctor(sessionDocId);
    }
  });
  
  function setupPasswordToggle() {
    const toggle = document.getElementById("password-toggle");
    const input = document.getElementById("login-password");
    if (!toggle || !input) return;
    
    toggle.addEventListener("click", () => {
      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      toggle.innerHTML = isPassword ? `<i class="bi bi-eye-slash-fill"></i>` : `<i class="bi bi-eye-fill"></i>`;
    });
  }
  
  function setupRememberMeCheck() {
    const rememberedEmail = localStorage.getItem("remembered_email");
    const rememberedPass = localStorage.getItem("remembered_password");
    const emailInput = document.getElementById("login-email");
    const passInput = document.getElementById("login-password");
    const check = document.getElementById("remember-me");
    
    if (rememberedEmail && emailInput && passInput && check) {
      emailInput.value = rememberedEmail;
      passInput.value = rememberedPass;
      check.checked = true;
    }
    
    const forgot = document.getElementById("forgot-password");
    if (forgot) {
      forgot.addEventListener("click", (e) => {
        e.preventDefault();
        showToast("A temporary password reset link has been dispatched to your email address.");
      });
    }
  }
  
  function setupAuthFormSubmit() {
    const form = document.getElementById("login-form");
    const loading = document.getElementById("login-loading");
    const alertError = document.getElementById("login-error-alert");
    
    if (!form) return;
    
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alertError.classList.add("d-none");
      
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }
      
      const email = document.getElementById("login-email").value.trim().toLowerCase();
      const pass = document.getElementById("login-password").value;
      
      // Show network spinner
      loading.classList.add("active");
      
      setTimeout(() => {
        const match = SAMPLE_DOCTORS.find(d => d.email === email && d.password === pass);
        
        if (match) {
          // Save remember me details
          const rememberMe = document.getElementById("remember-me").checked;
          if (rememberMe) {
            localStorage.setItem("remembered_email", email);
            localStorage.setItem("remembered_password", pass);
          } else {
            localStorage.removeItem("remembered_email");
            localStorage.removeItem("remembered_password");
          }
          
          // Save Session
          sessionStorage.setItem("current_doctor_id", match.id);
          loginDoctor(match.id);
          
          // Reset Form
          form.classList.remove("was-validated");
          form.reset();
          setupRememberMeCheck();
        } else {
          alertError.classList.remove("d-none");
        }
        loading.classList.remove("active");
      }, 1200);
    });
    
    const logout = document.getElementById("btn-logout");
    if (logout) {
      logout.addEventListener("click", () => {
        sessionStorage.removeItem("current_doctor_id");
        currentDoctor = null;
        document.getElementById("app-container").classList.add("d-none");
        document.getElementById("login-view").classList.remove("d-none");
        showToast("Successfully logged out from MediConnect.");
      });
    }
  }
  
  function loginDoctor(docId) {
    // Load Doctor Details
    const profileRaw = localStorage.getItem(`${docId}_profile`);
    currentDoctor = profileRaw ? JSON.parse(profileRaw) : SAMPLE_DOCTORS.find(d => d.id === docId);
    
    // Transition Layouts
    document.getElementById("login-view").classList.add("d-none");
    document.getElementById("app-container").classList.remove("d-none");
    
    // Reset navigation status
    navigateToView("dashboard");
    syncNavbarProfileData();
    showToast(`Welcome back, ${currentDoctor.name}! Access Authorized.`);
  }
  
  // ==========================================================================
  // NAVBAR & PROFILE SYNC LOGIC
  // ==========================================================================
  
  function syncNavbarProfileData() {
    if (!currentDoctor) return;
    
    // Load live attributes from storage
    const profile = loadDocData("profile") || currentDoctor;
    currentDoctor = profile; // keep locally updated
    
    const availability = JSON.parse(localStorage.getItem(`${currentDoctor.id}_availability`));
    
    // Update Navbar tags
    document.getElementById("nav-doc-name").innerText = profile.name;
    document.getElementById("nav-doc-department").innerText = profile.department;
    document.getElementById("nav-doc-photo").src = profile.photo;
    
    const dot = document.getElementById("nav-availability-dot");
    if (availability) {
      dot.classList.remove("offline");
    } else {
      dot.classList.add("offline");
    }
    
    // Update Dropdown card tags
    document.getElementById("drop-doc-name").innerText = profile.name;
    document.getElementById("drop-doc-dept").innerText = profile.department;
    document.getElementById("drop-doc-photo").src = profile.photo;
    document.getElementById("drop-doc-exp").innerText = profile.experience;
    document.getElementById("drop-doc-email").innerText = profile.email;
    document.getElementById("drop-doc-phone").innerText = profile.phone;
    
    const badge = document.getElementById("drop-availability-badge");
    badge.innerText = availability ? "Available Today" : "Not Available";
    badge.className = availability 
      ? "badge bg-success-subtle text-success border border-success border-opacity-25 rounded-pill px-3 py-1"
      : "badge bg-danger-subtle text-danger border border-danger border-opacity-25 rounded-pill px-3 py-1";
      
    // Sync toggle inputs on schedule tab
    const toggle = document.getElementById("availability-toggle");
    const label = document.getElementById("availability-toggle-label");
    if (toggle && label) {
      toggle.checked = availability;
      label.innerText = availability ? "🟢 Available Today" : "🔴 Not Available";
      label.className = availability ? "form-check-label fw-bold text-success text-sm cursor-pointer" : "form-check-label fw-bold text-danger text-sm cursor-pointer";
    }
  }
  
  function setupNavbarProfileDropdown() {
    const trigger = document.getElementById("nav-profile-trigger");
    const dropdown = document.getElementById("profile-dropdown-card");
    
    if (!trigger || !dropdown) return;
    
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("active");
    });
    
    document.addEventListener("click", () => {
      dropdown.classList.remove("active");
    });
    
    dropdown.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
  
  // ==========================================================================
  // SPA ROUTER VIEW SWITCHING
  // ==========================================================================
  
  function setupSidebarNavigation() {
    const links = document.querySelectorAll(".sidebar-link");
    const toggle = document.getElementById("sidebar-toggle");
    const close = document.getElementById("sidebar-close");
    const sidebar = document.getElementById("sidebar");
    
    links.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = link.getAttribute("data-target");
        navigateToView(target);
        sidebar.classList.remove("active");
      });
    });
    
    if (toggle) {
      toggle.addEventListener("click", () => {
        sidebar.classList.toggle("active");
      });
    }
    
    if (close) {
      close.addEventListener("click", () => {
        sidebar.classList.remove("active");
      });
    }
  }
  
  function navigateToView(viewId, isEditingProfile = false) {
    currentView = viewId;
    profileEditMode = isEditingProfile;
    
    // Sync sidebar active state CSS
    document.querySelectorAll(".sidebar-link").forEach(link => {
      const target = link.getAttribute("data-target");
      if (target === viewId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
    
    // Hide all sections, show target section
    document.querySelectorAll(".app-view").forEach(sect => {
      sect.classList.add("d-none");
    });
    
    const targetSect = document.getElementById(`view-${viewId}`);
    if (targetSect) {
      targetSect.classList.remove("d-none");
    }
    
    // Update header title
    const titlesMapping = {
      "dashboard": "Dashboard Overview",
      "appointments": "Appointments Registry",
      "patient-details": "Patient Electronic Health Record",
      "consultation-notes": "Consultation Desk & Rx Generator",
      "schedule": "Availability & Calendar Scheduler",
      "reviews": "Patient Feedback Board",
      "analytics": "Interactive Performance Analytics",
      "profile": "Practitioner Profile Settings",
      "salary": "Monthly Payroll Statements"
    };
    
    document.getElementById("header-view-title").innerText = titlesMapping[viewId] || "Clinical Workspace";
    
    // Trigger specific view renders
    if (viewId === "dashboard") {
      renderDashboardView();
    } else if (viewId === "appointments") {
      renderAppointmentsRegistryView();
    } else if (viewId === "schedule") {
      renderScheduleModuleView();
    } else if (viewId === "reviews") {
      renderReviewsModuleView();
    } else if (viewId === "analytics") {
      renderAnalyticsModuleView();
    } else if (viewId === "profile") {
      renderProfileModuleView();
    } else if (viewId === "salary") {
      renderSalaryModuleView();
    }
    
    window.scrollTo(0, 0);
  }
  
  // ==========================================================================
  // VIEW 1: DASHBOARD VIEW LOGIC
  // ==========================================================================
  
  function renderDashboardView() {
    if (!currentDoctor) return;
    
    syncNavbarProfileData();
    
    // Time-based Greeting & Banner
    const hour = new Date().getHours();
    let timeStr = "Good Evening";
    if (hour < 12) timeStr = "Good Morning";
    else if (hour < 17) timeStr = "Good Afternoon";
    
    document.getElementById("dash-greeting-text").innerText = `${timeStr}, ${currentDoctor.name}`;
    document.getElementById("dash-department-text").innerText = `${currentDoctor.department} Department Workspace`;
    document.getElementById("dash-dept-banner-icon-text").innerText = currentDoctor.department;
    
    const quotes = {
      "Cardiology": "Every heartbeat you protect brings hope to another family.",
      "Neurology": "Your expertise restores clarity and neural confidence to every patient.",
      "Orthopedics": "Every mobile step a patient takes starts with your dedication."
    };
    document.getElementById("dash-motivational-quote").innerText = quotes[currentDoctor.department] || "Dedicated to medical care and research.";
    
    document.getElementById("dash-date-text").innerText = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    });
    
    // Load datasets
    const appointments = loadDocData("appointments") || [];
    const reviews = loadDocData("reviews") || [];
    
    // Compute Stats values
    const todayStr = getOffsetDateString(0);
    const todayApts = appointments.filter(a => a.date === todayStr);
    const totalToday = todayApts.length;
    const pendingCount = appointments.filter(a => a.status === "Pending").length;
    const completedToday = appointments.filter(a => a.status === "Completed" && a.date === todayStr).length;
    const cancelledToday = appointments.filter(a => a.status === "Cancelled" && a.date === todayStr).length;
    
    if (document.getElementById("stats-today-count")) document.getElementById("stats-today-count").innerText = totalToday;
    if (document.getElementById("stats-pending-count")) document.getElementById("stats-pending-count").innerText = pendingCount;
    if (document.getElementById("stats-completed-count")) document.getElementById("stats-completed-count").innerText = completedToday;
    if (document.getElementById("stats-cancelled-count")) document.getElementById("stats-cancelled-count").innerText = cancelledToday;
    
    // Secondary stats
    const uniquePatients = [...new Set(appointments.map(a => a.patientName))].length;
    const completedAll = appointments.filter(a => a.status === "Completed").length;
    const revenue = completedAll * currentDoctor.fee;
    
    const avgRating = reviews.length > 0 ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1) : "0.0";
    
    document.getElementById("overview-patients-count").innerText = uniquePatients;
    document.getElementById("overview-rating-val").innerText = avgRating;
    document.getElementById("overview-revenue-val").innerText = `₹${revenue.toLocaleString()}`;
    document.getElementById("overview-completed-val").innerText = completedAll;
    
    // Render recent table list
    renderDashboardTable();
  }
  
  function setDashboardFilter(filterType) {
    currentDashboardFilter = filterType;
    
    document.querySelectorAll(".dashboard-stat-card").forEach(card => {
      card.classList.remove("active-filter");
    });
    
    const targetCard = document.getElementById(`stat-${filterType.toLowerCase()}`);
    if (targetCard) targetCard.classList.add("active-filter");
    
    const headerTitle = document.getElementById("dashboard-table-header-title");
    const titles = {
      "today": "Today's Scheduled Appointments",
      "Pending": "Pending Appointments Queue",
      "Completed": "Completed Consultations Today",
      "Cancelled": "Cancelled Appointments Today"
    };
    if (headerTitle) headerTitle.innerText = titles[filterType] || "Appointments";
    
    renderDashboardTable();
  }
  
  function renderDashboardTable() {
    const tbody = document.getElementById("dashboard-appointments-tbody");
    if (!tbody) return;
    
    tbody.innerHTML = "";
    const appointments = loadDocData("appointments") || [];
    const searchVal = document.getElementById("dashboard-search-input").value.trim().toLowerCase();
    
    const todayStr = getOffsetDateString(0);
    
    let filtered = appointments;
    
    // Filter by stat tab selection
    if (currentDashboardFilter === "today") {
      filtered = filtered.filter(a => a.date === todayStr);
    } else {
      filtered = filtered.filter(a => a.status === currentDashboardFilter);
    }
    
    // Filter by search matching name
    if (searchVal !== "") {
      filtered = filtered.filter(a => a.patientName.toLowerCase().includes(searchVal));
    }
    
    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">No appointments found matching constraints.</td></tr>`;
      return;
    }
    
    // Sort by latest appointments first (date descending, then time descending)
    filtered.sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time));
    
    filtered.forEach(apt => {
      const tr = document.createElement("tr");
      
      let statusClass = "pending";
      if (apt.status === "Confirmed") statusClass = "confirmed";
      else if (apt.status === "Completed") statusClass = "completed";
      else if (apt.status === "Cancelled") statusClass = "cancelled";
      
      tr.innerHTML = `
        <td><strong class="text-ink">${apt.patientName}</strong></td>
        <td><i class="bi bi-calendar-event me-1 text-blue"></i> ${apt.date}</td>
        <td><i class="bi bi-clock me-1 text-teal"></i> ${apt.time}</td>
        <td><span class="badge-status ${statusClass}">${apt.status}</span></td>
        <td class="text-end">
          <div class="d-inline-flex gap-1 flex-wrap justify-content-end">
            <button class="btn btn-sm btn-gradient-secondary py-1 px-2 border-0 shadow-sm text-xs" onclick="openPatientEHR('${apt.id}')">View</button>
            <button class="btn btn-sm btn-gradient-secondary py-1 px-2 border-0 shadow-sm text-xs text-primary" onclick="openStatusModifier('${apt.id}')">Update</button>
            <button class="btn btn-sm btn-gradient-primary py-1 px-2 border-0 shadow-sm text-xs text-white" onclick="completeAppointmentDirect('${apt.id}')">Complete</button>
            <button class="btn btn-sm btn-gradient-secondary py-1 px-2 border-0 shadow-sm text-xs text-danger" onclick="cancelAppointmentDirect('${apt.id}')">Cancel</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }
  
  function setupSearchAndFilters() {
    const dashSearch = document.getElementById("dashboard-search-input");
    if (dashSearch) {
      dashSearch.addEventListener("input", renderDashboardTable);
    }
    
    const regSearch = document.getElementById("registry-search-input");
    const regStatus = document.getElementById("registry-filter-status");
    const regPriority = document.getElementById("registry-filter-priority");
    
    if (regSearch) regSearch.addEventListener("input", renderAppointmentsRegistryView);
    if (regStatus) regStatus.addEventListener("change", renderAppointmentsRegistryView);
    if (regPriority) regPriority.addEventListener("change", renderAppointmentsRegistryView);
  }
  
  // ==========================================================================
  // VIEW 2: APPOINTMENTS REGISTRY MODULE
  // ==========================================================================
  
  function renderAppointmentsRegistryView() {
    const tbody = document.getElementById("registry-appointments-tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    
    const appointments = loadDocData("appointments") || [];
    const searchVal = document.getElementById("registry-search-input").value.trim().toLowerCase();
    const statusVal = document.getElementById("registry-filter-status").value;
    const priorityVal = document.getElementById("registry-filter-priority").value;
    
    let filtered = appointments;
    
    // Filters
    if (searchVal !== "") {
      filtered = filtered.filter(a => a.patientName.toLowerCase().includes(searchVal));
    }
    if (statusVal !== "all") {
      filtered = filtered.filter(a => a.status === statusVal);
    }
    if (priorityVal !== "all") {
      filtered = filtered.filter(a => a.priority === priorityVal);
    }
    
    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">No registry entries match the filters.</td></tr>`;
      return;
    }
    
    // Sort by date (descending) then time
    filtered.sort((a, b) => b.date.localeCompare(a.date) || a.time.localeCompare(b.time));
    
    filtered.forEach(apt => {
      const tr = document.createElement("tr");
      
      let statusClass = "pending";
      if (apt.status === "Confirmed") statusClass = "confirmed";
      else if (apt.status === "Completed") statusClass = "completed";
      else if (apt.status === "Cancelled") statusClass = "cancelled";
      
      tr.innerHTML = `
        <td><strong class="text-ink">${apt.patientName}</strong></td>
        <td><i class="bi bi-calendar-event me-1 text-blue"></i> ${apt.date}</td>
        <td><i class="bi bi-clock me-1 text-teal"></i> ${apt.time}</td>
        <td><span class="badge-status ${statusClass}">${apt.status}</span></td>
        <td class="text-end">
          <div class="d-inline-flex gap-1 flex-wrap justify-content-end">
            <button class="btn btn-sm btn-gradient-secondary py-1 px-2 border-0 shadow-sm text-xs" onclick="openPatientEHR('${apt.id}')">View</button>
            <button class="btn btn-sm btn-gradient-secondary py-1 px-2 border-0 shadow-sm text-xs text-primary" onclick="openStatusModifier('${apt.id}')">Update</button>
            <button class="btn btn-sm btn-gradient-primary py-1 px-2 border-0 shadow-sm text-xs text-white" onclick="completeAppointmentDirect('${apt.id}')">Complete</button>
            <button class="btn btn-sm btn-gradient-secondary py-1 px-2 border-0 shadow-sm text-xs text-danger" onclick="cancelAppointmentDirect('${apt.id}')">Cancel</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }
  
  // Status modifiers popup helpers
  function openStatusModifier(aptId) {
    const appointments = loadDocData("appointments") || [];
    const apt = appointments.find(a => a.id === aptId);
    if (!apt) return;
    
    selectedAppointment = apt;
    
    document.getElementById("status-modal-pt-name").innerText = apt.patientName;
    document.getElementById("status-modal-pt-details").innerText = `Appt: ${apt.id} | Scheduled: ${apt.date} @ ${apt.time}`;
    
    const modal = new bootstrap.Modal(document.getElementById('statusModal'));
    modal.show();
  }
  
  function commitStatusChange(newStatus) {
    if (!selectedAppointment) return;
    
    const appointments = loadDocData("appointments") || [];
    const index = appointments.findIndex(a => a.id === selectedAppointment.id);
    
    if (index !== -1) {
      appointments[index].status = newStatus;
      saveDocData("appointments", appointments);
      showToast(`Appointment status updated to: [${newStatus}].`);
      
      // Dismiss modal using bootstrap instance
      const modalEl = document.getElementById('statusModal');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) modalInstance.hide();
      
      // Refresh active views
      if (currentView === "dashboard") renderDashboardView();
      else if (currentView === "appointments") renderAppointmentsRegistryView();
    }
  }
  
  // ==========================================================================
  // VIEW 3: PATIENT EHR MODULE LOGIC
  // ==========================================================================
  
  function openPatientEHR(aptId) {
    const appointments = loadDocData("appointments") || [];
    const apt = appointments.find(a => a.id === aptId);
    if (!apt) return;
    
    selectedAppointment = apt;
    navigateToView("patient-details");
  }
  
  function renderPatientDetailsView() {
    if (!selectedAppointment) return;
    const apt = selectedAppointment;
    
    // Render initials
    const initials = apt.patientName.split(" ").map(n => n[0]).join("");
    document.getElementById("ehr-pt-initials").innerText = initials;
    
    document.getElementById("ehr-pt-name").innerText = apt.patientName;
    document.getElementById("ehr-pt-id").innerText = `Patient ID: #${apt.id}`;
    document.getElementById("ehr-pt-agesex").innerText = `${apt.age} Yrs / ${apt.gender}`;
    document.getElementById("ehr-pt-blood").innerText = apt.bloodGroup || "Not Provided";
    document.getElementById("ehr-pt-phone").innerText = apt.contact;
    document.getElementById("ehr-pt-doc").innerText = currentDoctor.name;
    
    document.getElementById("ehr-pt-complaint").innerText = apt.complaint;
    document.getElementById("ehr-pt-history").innerText = apt.history || "No medical history recorded.";
    
    // Render previous visits log
    renderPreviousVisitsTable(apt.patientName);
  }
  
  function renderPreviousVisitsTable(ptName) {
    const tbody = document.getElementById("ehr-previous-visits-tbody");
    if (!tbody) return;
    
    tbody.innerHTML = "";
    const appointments = loadDocData("appointments") || [];
    
    // Load completed visits for this patient
    const visits = appointments.filter(a => a.patientName === ptName && a.status === "Completed");
    
    if (visits.length === 0) {
      tbody.innerHTML = `<tr><td colspan="3" class="text-center py-3 text-muted text-sm">No previous visit records found.</td></tr>`;
      return;
    }
    
    visits.forEach(v => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="text-muted text-xs">${v.date}</td>
        <td class="fw-bold">${v.diagnosis || "Consultation Completed"}</td>
        <td class="text-truncate font-monospace small" style="max-width: 250px;" title="${v.prescription}">${v.prescription || "No meds prescribed."}</td>
      `;
      tbody.appendChild(tr);
    });
  }
  
  function transitionToConsultationDesk() {
    navigateToView("consultation-notes");
  }
  
  // Quick action consultation opening helper
  function openQuickConsultation() {
    const appointments = loadDocData("appointments") || [];
    
    // Find first active/pending appointment for today to prefill, else prompt
    const todayStr = getOffsetDateString(0);
    const pendingToday = appointments.find(a => a.date === todayStr && a.status !== "Completed" && a.status !== "Cancelled");
    
    if (pendingToday) {
      selectedAppointment = pendingToday;
      navigateToView("consultation-notes");
    } else {
      // Navigate to registry list to select patient
      navigateToView("appointments");
      showToast("Please choose a patient from the registry to begin consultation.");
    }
  }
  
  // ==========================================================================
  // VIEW 4: CONSULTATION DESK & RX SLIP
  // ==========================================================================
  
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("consultation-notes-form");
    if (!form) return;
    
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }
      
      if (!selectedAppointment) return;
      
      const appointments = loadDocData("appointments") || [];
      const idx = appointments.findIndex(a => a.id === selectedAppointment.id);
      
      if (idx !== -1) {
        appointments[idx].status = "Completed";
        appointments[idx].symptoms = document.getElementById("consult-symptoms").value.trim();
        appointments[idx].diagnosis = document.getElementById("consult-diagnosis").value.trim();
        appointments[idx].prescription = document.getElementById("consult-prescription").value.trim();
        appointments[idx].followup = document.getElementById("consult-followup").value.trim();
        appointments[idx].treatment = document.getElementById("consult-treatment").value.trim();
        
        saveDocData("appointments", appointments);
        showToast("Consultation notes logged, signed digitally, and committed to patient record.");
        
        form.reset();
        form.classList.remove("was-validated");
        navigateToView("appointments");
      }
    });
  });
  
  function renderConsultationDeskView() {
    if (!selectedAppointment) return;
    const apt = selectedAppointment;
    
    document.getElementById("consult-pt-name").innerText = apt.patientName;
    document.getElementById("consult-pt-meta").innerText = `ID: #${apt.id} | Age: ${apt.age} | Gender: ${apt.gender}`;
    document.getElementById("consult-pt-priority").innerText = `${apt.priority} Queue`;
    
    // Fill inputs if resuming or empty
    document.getElementById("consult-symptoms").value = apt.symptoms || "";
    document.getElementById("consult-diagnosis").value = apt.diagnosis || "";
    document.getElementById("consult-prescription").value = apt.prescription || "";
    document.getElementById("consult-followup").value = apt.followup || "";
    document.getElementById("consult-treatment").value = apt.treatment || "";
    
    // Setup back button
    const back = document.getElementById("consultation-back-btn");
    back.setAttribute("onclick", `navigateToView('patient-details')`);
  }
  
  // Generate Printable Prescription in popup window
  function triggerPrintPrescription() {
    if (!selectedAppointment) return;
    
    // Fetch values from inputs to render dynamic print layout
    const symptoms = document.getElementById("consult-symptoms").value.trim();
    const diagnosis = document.getElementById("consult-diagnosis").value.trim();
    const prescription = document.getElementById("consult-prescription").value.trim();
    const followup = document.getElementById("consult-followup").value.trim();
    const treatment = document.getElementById("consult-treatment").value.trim();
    
    if (!symptoms || !diagnosis || !prescription || !followup) {
      alert("Please fill in Symptoms, Diagnosis, Prescription, and Follow-Up to print prescription.");
      return;
    }
    
    // Populate print container HTML
    document.getElementById("print-doc-name").innerText = currentDoctor.name;
    document.getElementById("print-doc-dept").innerText = `${currentDoctor.department} Practitioner`;
    document.getElementById("print-doc-email").innerText = currentDoctor.email;
    
    document.getElementById("print-pt-name").innerText = selectedAppointment.patientName;
    document.getElementById("print-pt-agesex").innerText = `Age: ${selectedAppointment.age} | Gender: ${selectedAppointment.gender}`;
    document.getElementById("print-pt-date").innerText = `Date: ${new Date().toLocaleDateString()}`;
    document.getElementById("print-pt-id").innerText = `Ref ID: #${selectedAppointment.id}`;
    
    document.getElementById("print-pt-symptoms").innerText = symptoms;
    document.getElementById("print-pt-diagnosis").innerText = diagnosis;
    document.getElementById("print-pt-prescription").innerText = prescription;
    document.getElementById("print-pt-followup").innerText = followup;
    document.getElementById("print-pt-treatment").innerText = treatment || "No long term advice provided.";
    
    document.getElementById("print-signature-name").innerText = currentDoctor.name;
    
    // Trigger system print
    window.print();
  }
  
  // ==========================================================================
  // VIEW 5: SCHEDULER & LEAVE CALENDAR MODULE
  // ==========================================================================
  
  function renderScheduleModuleView() {
    syncNavbarProfileData();
    renderScheduleSlotsTable();
    renderCalendarViewGrid();
  }
  
  // Clinic Availability Toggles
  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("availability-toggle");
    if (!toggle) return;
    
    toggle.addEventListener("change", (e) => {
      const isChecked = e.target.checked;
      localStorage.setItem(`${currentDoctor.id}_availability`, JSON.stringify(isChecked));
      syncNavbarProfileData();
      showToast(`Practitioner clinic status shifted to: ${isChecked ? "ONLINE" : "OFFLINE"}.`);
    });
  });
  
  function parseShiftDetails(timeStr) {
    if (timeStr.includes("Morning") || timeStr.includes("09:00 AM")) {
      return { name: "Morning Shift", timing: "09:00 AM - 12:00 PM" };
    } else if (timeStr.includes("Afternoon") || timeStr.includes("12:00 PM") || timeStr.includes("01:00 PM")) {
      const timing = timeStr.includes("12:00 PM") ? "12:00 PM - 03:00 PM" : "01:00 PM - 04:00 PM";
      return { name: "Afternoon Shift", timing: timing };
    } else if (timeStr.includes("Evening") || timeStr.includes("03:00 PM") || timeStr.includes("05:00 PM")) {
      const timing = timeStr.includes("03:00 PM") ? "03:00 PM - 06:00 PM" : "05:00 PM - 08:00 PM";
      return { name: "Evening Shift", timing: timing };
    } else if (timeStr.includes("Night") || timeStr.includes("06:00 PM") || timeStr.includes("08:00 PM")) {
      const timing = timeStr.includes("06:00 PM") ? "06:00 PM - 09:00 PM" : "08:00 PM - 11:00 PM";
      return { name: "Night Shift", timing: timing };
    }
    return { name: "Weekly Shift", timing: timeStr };
  }
  
  function renderScheduleSlotsTable() {
    const container = document.getElementById("schedule-slots-container");
    if (!container) return;
    
    container.innerHTML = "";
    const slots = loadDocData("schedule") || [];
    
    if (slots.length === 0) {
      container.innerHTML = `<div class="text-center py-4 text-muted">No active shift slots.</div>`;
      return;
    }
    
    slots.forEach(slot => {
      const shift = parseShiftDetails(slot.time);
      const div = document.createElement("div");
      div.className = "weekly-shift-card p-3 border rounded shadow-sm bg-white mb-2 d-flex justify-content-between align-items-center";
      div.innerHTML = `
        <div>
          <h6 class="fw-bold mb-1 text-ink">${slot.day}</h6>
          <span class="text-teal fw-semibold text-xs d-block mb-1">${shift.name}</span>
          <small class="text-muted font-monospace text-xs"><i class="bi bi-clock me-1 text-primary"></i>${shift.timing}</small>
        </div>
        <button class="btn btn-sm btn-link text-danger p-1" onclick="deleteShiftSlot('${slot.id}')" aria-label="Delete Slot">
          <i class="bi bi-trash fs-5"></i>
        </button>
      `;
      container.appendChild(div);
    });
  }
  
  function setupScheduleForm() {
    const form = document.getElementById("add-schedule-form");
    if (!form) return;
    
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }
      
      const day = document.getElementById("schedule-day").value;
      const time = document.getElementById("schedule-time").value;
      
      const slots = loadDocData("schedule") || [];
      
      // Check duplication
      const dup = slots.find(s => s.day === day && s.time === time);
      if (dup) {
        alert("This shift slot is already registered.");
        return;
      }
      
      slots.push({
        id: "SLOT_" + Date.now(),
        day: day,
        time: time
      });
      
      saveDocData("schedule", slots);
      showToast(`Shift slot registered for: ${day} [${time}].`);
      
      form.reset();
      form.classList.remove("was-validated");
      renderScheduleSlotsTable();
    });
  }
  
  function deleteShiftSlot(slotId) {
    let slots = loadDocData("schedule") || [];
    slots = slots.filter(s => s.id !== slotId);
    saveDocData("schedule", slots);
    showToast("Shift slot removed.");
    renderScheduleSlotsTable();
  }
  
  // Leaves Form Handling
  function setupLeaveForm() {
    const form = document.getElementById("leave-form");
    if (!form) return;
    
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }
      
      const formatRadio = document.querySelector('input[name="leaveFormat"]:checked');
      const format = formatRadio ? formatRadio.value : "single";
      const type = document.getElementById("leave-type").value;
      const reason = document.getElementById("leave-reason").value.trim();
      const isEmergency = document.getElementById("leave-emergency-toggle") ? document.getElementById("leave-emergency-toggle").checked : false;
      
      let start = "";
      let end = "";
      
      if (format === "single") {
        start = document.getElementById("leave-single-date").value;
        end = start;
        if (!start) {
          alert("Please choose a leave date.");
          return;
        }
      } else {
        start = document.getElementById("leave-start-date").value;
        end = document.getElementById("leave-end-date").value;
        if (!start || !end) {
          alert("Please specify start and end dates.");
          return;
        }
        if (new Date(end) < new Date(start)) {
          alert("End date cannot precede the start date.");
          return;
        }
      }
      
      const leaves = loadDocData("leaves") || [];
      
      leaves.push({
        id: "LEAVE_" + Date.now(),
        type: type,
        start: start,
        end: end,
        format: format,
        reason: reason,
        emergency: isEmergency,
        status: "Approved"
      });
      
      saveDocData("leaves", leaves);
      showToast("Leave request filed and approved successfully.");
      
      form.reset();
      form.classList.remove("was-validated");
      toggleLeaveFormatInputs();
      renderCalendarViewGrid();
    });
  }
  
  function toggleLeaveFormatInputs() {
    const formatRadio = document.querySelector('input[name="leaveFormat"]:checked');
    const format = formatRadio ? formatRadio.value : "single";
    const single = document.getElementById("leave-single-date-wrapper");
    const start = document.getElementById("leave-start-date-wrapper");
    const end = document.getElementById("leave-end-date-wrapper");
    
    const singleInput = document.getElementById("leave-single-date");
    const startInput = document.getElementById("leave-start-date");
    const endInput = document.getElementById("leave-end-date");
    
    if (!single || !start || !end) return;
    
    if (format === "single") {
      single.classList.remove("d-none");
      start.classList.add("d-none");
      end.classList.add("d-none");
      if (singleInput) singleInput.required = true;
      if (startInput) startInput.required = false;
      if (endInput) endInput.required = false;
    } else {
      single.classList.add("d-none");
      start.classList.remove("d-none");
      end.classList.remove("d-none");
      if (singleInput) singleInput.required = false;
      if (startInput) startInput.required = true;
      if (endInput) endInput.required = true;
    }
  }
  
  // Leaves Calendar view grid render
  function adjustCalendarMonth(direction) {
    activeLeaveMonth.setMonth(activeLeaveMonth.getMonth() + direction);
    renderCalendarViewGrid();
  }
  
  function getDatesRangeArray(startStr, endStr) {
    const dates = [];
    const start = new Date(startStr);
    const end = new Date(endStr);
    
    const current = new Date(start);
    while (current <= end) {
      dates.push(new Date(current).toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }
  
  function renderCalendarViewGrid() {
    const grid = document.querySelector(".calendar-grid");
    if (!grid) return;
    
    grid.innerHTML = "";
    
    const year = activeLeaveMonth.getFullYear();
    const month = activeLeaveMonth.getMonth();
    
    const monthsNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    document.getElementById("calendar-header-title").innerText = `${monthsNames[month]} ${year}`;
    
    // Render Day headers
    const daysHeader = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    daysHeader.forEach(d => {
      const div = document.createElement("div");
      div.className = "calendar-cell header-cell";
      div.innerText = d;
      grid.appendChild(div);
    });
    
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    // Render offsets empty cells
    for (let i = 0; i < firstDayIndex; i++) {
      const div = document.createElement("div");
      div.className = "calendar-cell empty";
      grid.appendChild(div);
    }
    
    // Load leaves
    const leaves = loadDocData("leaves") || [];
    const leaveLookup = {};
    
    leaves.forEach(l => {
      const range = getDatesRangeArray(l.start, l.end);
      range.forEach(dateStr => {
        leaveLookup[dateStr] = l;
      });
    });
    
    const todayStr = getOffsetDateString(0);
    
    // Render days
    for (let day = 1; day <= totalDays; day++) {
      const div = document.createElement("div");
      const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      div.className = "calendar-cell";
      if (formattedDate === todayStr) {
        div.classList.add("today");
      }
      
      div.innerHTML = `<span class="cell-date">${day}</span>`;
      
      const matchingLeave = leaveLookup[formattedDate];
      if (matchingLeave) {
        div.classList.add("has-leave");
        if (matchingLeave.emergency) {
          div.classList.add("emergency-leave");
        }
        div.innerHTML += `<span class="cell-badge">${matchingLeave.type}</span>`;
        div.setAttribute("onclick", `openLeaveDetailsModal('${matchingLeave.id}')`);
      }
      
      grid.appendChild(div);
    }
  }
  
  function openLeaveDetailsModal(leaveId) {
    const leaves = loadDocData("leaves") || [];
    const leave = leaves.find(l => l.id === leaveId);
    if (!leave) return;
    
    document.getElementById("modal-leave-type").innerText = leave.type;
    
    const start = new Date(leave.start);
    const end = new Date(leave.end);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    document.getElementById("modal-leave-duration").innerText = `${diffDays} Day(s)`;
    document.getElementById("modal-leave-date").innerText = leave.format === "single" ? leave.start : `${leave.start} to ${leave.end}`;
    
    const emergency = document.getElementById("modal-leave-emergency");
    emergency.innerText = leave.emergency ? "Emergency Flagged - Approved" : "Normal Leave - Approved";
    emergency.className = leave.emergency ? "fw-bold text-danger" : "fw-bold text-teal";
    
    document.getElementById("modal-leave-notes").innerText = leave.reason;
    
    const modal = new bootstrap.Modal(document.getElementById('leaveDetailsModal'));
    modal.show();
  }
  
  // ==========================================================================
  // VIEW 6: PATIENT REVIEWS BOARD MODULE
  // ==========================================================================
  
  function renderReviewsModuleView() {
    const reviews = loadDocData("reviews") || [];
    
    // Calculate Averages
    const total = reviews.length;
    const avg = total > 0 ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / total).toFixed(1) : "0.0";
    
    const reviewsTotal = document.getElementById("reviews-total-text");
    const reviewsAvg = document.getElementById("reviews-avg-value");
    const starsContainer = document.getElementById("reviews-avg-stars");
    const tbody = document.getElementById("reviews-tbody");
    
    if (reviewsTotal) reviewsTotal.innerText = total;
    if (reviewsAvg) reviewsAvg.innerText = avg;
    
    // Render stars
    if (starsContainer) {
      starsContainer.innerHTML = "";
      const solidCount = Math.round(parseFloat(avg));
      for (let i = 1; i <= 5; i++) {
        starsContainer.innerHTML += i <= solidCount ? `<i class="bi bi-star-fill"></i>` : `<i class="bi bi-star"></i>`;
      }
    }
    
    // Distribution counts (safe checks for hidden elements)
    const dist = { 5: 0, 4: 0, 3: 0 };
    reviews.forEach(r => {
      if (r.rating >= 5) dist[5]++;
      else if (r.rating >= 4) dist[4]++;
      else if (r.rating >= 3) dist[3]++;
    });
    
    [5, 4, 3].forEach(star => {
      const countEl = document.getElementById(`reviews-dist-${star}-count`);
      const barEl = document.getElementById(`reviews-dist-${star}-bar`);
      if (countEl) countEl.innerText = dist[star];
      if (barEl) {
        const pct = total > 0 ? (dist[star] / total) * 100 : 0;
        barEl.style.width = `${pct}%`;
      }
    });
    
    if (!tbody) return;
    
    tbody.innerHTML = "";
    if (reviews.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" class="text-center py-4 text-muted">No reviews recorded.</td></tr>`;
      return;
    }
    
    // Render review table rows
    reviews.forEach(r => {
      const tr = document.createElement("tr");
      
      let starsStr = "";
      for (let i = 1; i <= 5; i++) {
        starsStr += i <= r.rating ? "★" : "☆";
      }
      
      tr.innerHTML = `
        <td><strong class="text-ink">${r.name}</strong></td>
        <td><span class="star-rating text-warning font-monospace fw-bold">${starsStr}</span></td>
        <td class="text-muted small">${r.review}</td>
        <td class="text-muted text-xs">${r.date}</td>
      `;
      tbody.appendChild(tr);
    });
  }
  
  // ==========================================================================
  // VIEW 7: ANALYTICS MODULE LOGIC (CHART.JS)
  // ==========================================================================
  
  function renderAnalyticsModuleView() {
    const appointments = loadDocData("appointments") || [];
    const reviews = loadDocData("reviews") || [];
    
    const totalBookings = appointments.length;
    const completedCount = appointments.filter(a => a.status === "Completed").length;
    const pendingCount = appointments.filter(a => a.status === "Pending").length;
    const cancelledCount = appointments.filter(a => a.status === "Cancelled").length;
    const rescheduledCount = appointments.filter(a => a.status === "Confirmed").length;
    const uniquePatients = [...new Set(appointments.map(a => a.patientName))].length;
    
    const ratingAvg = reviews.length > 0 ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length : 0;
    const satisfactionPct = ratingAvg > 0 ? Math.round((ratingAvg / 5) * 100) : 0;
    
    // Set summary values
    const ptsCountEl = document.getElementById("analytics-pts-count");
    const aptsCountEl = document.getElementById("analytics-apts-count");
    const reviewsCountEl = document.getElementById("analytics-reviews-count");
    
    if (ptsCountEl) ptsCountEl.innerText = uniquePatients;
    if (aptsCountEl) aptsCountEl.innerText = totalBookings;
    if (reviewsCountEl) reviewsCountEl.innerText = reviews.length;
    
    // Set sub-chart statistics cards
    const completedValEl = document.getElementById("stats-completed-val");
    const pendingValEl = document.getElementById("stats-pending-val");
    const cancelledValEl = document.getElementById("stats-cancelled-val");
    
    if (completedValEl) completedValEl.innerText = completedCount;
    if (pendingValEl) pendingValEl.innerText = pendingCount;
    if (cancelledValEl) cancelledValEl.innerText = cancelledCount;
    
    // Keep legacy labels updated to avoid errors
    const completedCountLegacy = document.getElementById("analytics-completed-count");
    const revenueLegacy = document.getElementById("analytics-revenue-val");
    const satisfactionLegacy = document.getElementById("analytics-satisfaction-val");
    if (completedCountLegacy) completedCountLegacy.innerText = completedCount;
    if (revenueLegacy) revenueLegacy.innerText = `₹${(completedCount * currentDoctor.fee).toLocaleString()}`;
    if (satisfactionLegacy) satisfactionLegacy.innerText = `${satisfactionPct}%`;
    
    // Destroy existing chart to reload
    if (window.appointmentStatusChart) {
      window.appointmentStatusChart.destroy();
    }
    
    // Render Appointment Status Pie Chart
    const pieCanvas = document.getElementById("chart-appointment-status");
    if (pieCanvas) {
      const pieCtx = pieCanvas.getContext("2d");
      window.appointmentStatusChart = new Chart(pieCtx, {
        type: 'pie',
        data: {
          labels: ['Completed', 'Pending', 'Cancelled', 'Rescheduled'],
          datasets: [{
            data: [completedCount, pendingCount, cancelledCount, rescheduledCount],
            backgroundColor: ['#2ec4b6', '#ff9f1c', '#e71d36', '#2366A4'],
            borderWidth: 2,
            borderColor: '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 15,
                padding: 20,
                font: {
                  family: "'Plus Jakarta Sans', sans-serif",
                  weight: '600'
                }
              }
            }
          }
        }
      });
    }
  }
  
  // ==========================================================================
  // VIEW 8: PRACTITIONER PROFILE EDIT MODULE
  // ==========================================================================
  
  function renderProfileModuleView() {
    const profile = loadDocData("profile") || currentDoctor;
    
    // Prefill Sidebar profile display
    document.getElementById("profile-doc-name").innerText = profile.name;
    document.getElementById("profile-doc-specialization").innerText = profile.specialization;
    const sidebarEmail = document.getElementById("profile-sidebar-email");
    const sidebarPhone = document.getElementById("profile-sidebar-phone");
    if (sidebarEmail) sidebarEmail.innerText = profile.email;
    if (sidebarPhone) sidebarPhone.innerText = profile.phone;
    document.getElementById("profile-sidebar-exp").innerText = profile.experience;
    document.getElementById("profile-sidebar-fee").innerText = `₹${profile.fee}`;
    document.getElementById("profile-sidebar-address").innerText = profile.address;
    document.getElementById("profile-photo-preview").src = profile.photo;
    
    // Prefill Forms inputs
    document.getElementById("profile-name").value = profile.name;
    document.getElementById("profile-email").value = profile.email;
    document.getElementById("profile-phone").value = profile.phone;
    document.getElementById("profile-department").value = profile.department;
    document.getElementById("profile-exp").value = profile.experience;
    document.getElementById("profile-qualification").value = profile.qualification;
    document.getElementById("profile-fee").value = profile.fee;
    document.getElementById("profile-specialization").value = profile.specialization;
    document.getElementById("profile-address").value = profile.address;
    
    // Set View / Edit toggles state
    const inputs = document.querySelectorAll("#profile-form input, #profile-form textarea");
    inputs.forEach(input => {
      // Keep email and department locked/disabled permanently as organizational credentials
      if (input.id !== "profile-email" && input.id !== "profile-department") {
        input.disabled = !profileEditMode;
      }
    });
    
    const editActions = document.getElementById("profile-edit-actions");
    const editToggleBtn = document.getElementById("profile-edit-toggle-btn");
    
    if (profileEditMode) {
      editActions.classList.remove("d-none");
      editActions.classList.add("d-flex");
      editToggleBtn.classList.add("d-none");
    } else {
      editActions.classList.add("d-none");
      editActions.classList.remove("d-flex");
      editToggleBtn.classList.remove("d-none");
    }
  }
  
  function toggleProfileEditMode() {
    profileEditMode = true;
    renderProfileModuleView();
  }
  
  function cancelProfileEdit() {
    profileEditMode = false;
    renderProfileModuleView();
    showToast("Profile edits discarded.");
  }
  
  function setupProfileFormSubmit() {
    const form = document.getElementById("profile-form");
    if (!form) return;
    
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }
      
      const profile = loadDocData("profile") || currentDoctor;
      
      // Save updated form inputs
      profile.name = document.getElementById("profile-name").value.trim();
      profile.phone = document.getElementById("profile-phone").value.trim();
      profile.experience = document.getElementById("profile-exp").value.trim();
      profile.qualification = document.getElementById("profile-qualification").value.trim();
      profile.fee = parseInt(document.getElementById("profile-fee").value) || profile.fee;
      profile.specialization = document.getElementById("profile-specialization").value.trim();
      profile.address = document.getElementById("profile-address").value.trim();
      
      saveDocData("profile", profile);
      currentDoctor = profile; // update local pointer
      
      showToast("Profile configuration settings committed successfully.");
      
      profileEditMode = false;
      form.classList.remove("was-validated");
      syncNavbarProfileData();
      renderProfileModuleView();
    });
    
    // Photo upload FileReader Base64 bindings
    const uploader = document.getElementById("photo-file-input");
    if (uploader) {
      uploader.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const base64Url = event.target.result;
            const profile = loadDocData("profile") || currentDoctor;
            profile.photo = base64Url;
            saveDocData("profile", profile);
            currentDoctor = profile;
            
            document.getElementById("profile-photo-preview").src = base64Url;
            syncNavbarProfileData();
            showToast("Profile avatar uploaded successfully.");
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }
  
  // ==========================================================================
  // VIEW 9: SALARY STATEMENTS MODULE
  // ==========================================================================
  
  function renderSalaryModuleView() {
    const appointments = loadDocData("appointments") || [];
    const salaryHistory = loadDocData("salary") || [];
    
    // Calculate dynamic bonuses and net for current month
    const completedThisMonth = appointments.filter(a => a.status === "Completed").length; // simplifed mock
    
    const baseSalary = 180000;
    const bonusRate = 500; // ₹500 bonus per completed visit
    const bonuses = completedThisMonth * bonusRate;
    const deductions = 5000; // standard tax/PF
    const netPay = baseSalary + bonuses - deductions;
    
    // Calculate total paid across history
    const totalPaid = salaryHistory.reduce((acc, s) => acc + (s.base + s.bonuses - s.deductions), 0);
    
    // Safe element updates
    const baseEl = document.getElementById("salary-base-val");
    const bonusesEl = document.getElementById("salary-bonuses-val");
    const deductionsEl = document.getElementById("salary-deductions-val");
    const netEl = document.getElementById("salary-net-val");
    const totalPaidEl = document.getElementById("salary-total-paid-val");
    
    if (baseEl) baseEl.innerText = `₹${baseSalary.toLocaleString()}`;
    if (bonusesEl) bonusesEl.innerText = `₹${bonuses.toLocaleString()}`;
    if (deductionsEl) deductionsEl.innerText = `₹${deductions.toLocaleString()}`;
    if (netEl) netEl.innerText = `₹${netPay.toLocaleString()}`;
    if (totalPaidEl) totalPaidEl.innerText = `₹${totalPaid.toLocaleString()}`;
    
    // Render History table
    const tbody = document.getElementById("salary-history-tbody");
    if (!tbody) return;
    
    tbody.innerHTML = "";
    
    // Render current month pending/processing status
    const currentMonthTr = document.createElement("tr");
    currentMonthTr.innerHTML = `
      <td><strong>June 2026 (Current)</strong></td>
      <td><strong>₹${netPay.toLocaleString()}</strong></td>
      <td><span class="badge bg-warning-subtle text-warning border border-warning border-opacity-25 rounded px-2 py-1">Processing</span></td>
      <td class="text-end">
        <button class="btn btn-sm btn-gradient-secondary border-0 shadow-sm px-3 text-xs" onclick="downloadSlipFor('June 2026', ${baseSalary}, ${bonuses}, ${deductions}, ${netPay}, 'Processing')">
          <i class="bi bi-download"></i> Slip
        </button>
      </td>
    `;
    tbody.appendChild(currentMonthTr);
    
    // Render past months
    salaryHistory.forEach(s => {
      const totalNet = s.base + s.bonuses - s.deductions;
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${s.month}</strong></td>
        <td><strong>₹${totalNet.toLocaleString()}</strong></td>
        <td><span class="badge bg-success-subtle text-success border border-success border-opacity-25 rounded px-2 py-1">${s.status}</span></td>
        <td class="text-end">
          <button class="btn btn-sm btn-gradient-secondary border-0 shadow-sm px-3 text-xs" onclick="downloadSlipFor('${s.month}', ${s.base}, ${s.bonuses}, ${s.deductions}, ${totalNet}, '${s.status}')">
            <i class="bi bi-download"></i> Slip
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }
  
  function downloadSlipFor(month, base, bonuses, deductions, net, status) {
    const profile = loadDocData("profile") || currentDoctor;
    
    const slipText = `
  ============================================================
                MEDICONNECT CLINICAL HOSPITAL
                   OFFICIAL PAYROLL SLIP
  ============================================================
  PRACTITIONER NAME  : ${profile.name}
  DEPARTMENT         : ${profile.department}
  STATEMENT MONTH    : ${month}
  PAYMENT STATUS     : ${status}
  ------------------------------------------------------------
  EARNINGS BREAKDOWN:
    1. BASE PRACTITIONER SALARY    : INR ${base.toLocaleString()}.00
    2. CONSULTATION BONUSES RATE   : INR ${bonuses.toLocaleString()}.00
    
  DEDUCTIONS BREAKDOWN:
    1. PF & PROFESSIONAL TAX       : INR ${deductions.toLocaleString()}.00
    
  ------------------------------------------------------------
  NET AMOUNT TRANSFERRED           : INR ${net.toLocaleString()}.00
  ============================================================
  Generated On : ${new Date().toLocaleString()}
  Secure Digital Ledger Verified.
  ============================================================
  `;
    
    const blob = new Blob([slipText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `MediConnect_SalarySlip_${month.replace(' ', '_')}.txt`;
    
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Salary slip for ${month} downloaded successfully.`);
  }
  
  function downloadCurrentSalarySlip() {
    const appointments = loadDocData("appointments") || [];
    const completedThisMonth = appointments.filter(a => a.status === "Completed").length;
    
    const baseSalary = 180000;
    const bonuses = completedThisMonth * 500;
    const deductions = 5000;
    const netPay = baseSalary + bonuses - deductions;
    
    downloadSlipFor("June 2026", baseSalary, bonuses, deductions, netPay, "Processing");
  }
  
  // ==========================================================================
  // SYSTEM ALERT TOAST UTILITIES
  // ==========================================================================
  
  function showToast(message) {
    const toastEl = document.getElementById("app-toast");
    const textEl = document.getElementById("toast-message-text");
    if (!toastEl || !textEl) return;
    
    textEl.innerText = message;
    const toastInstance = new bootstrap.Toast(toastEl, { delay: 4000 });
    toastInstance.show();
  }
  
  function completeAppointmentDirect(aptId) {
    const appointments = loadDocData("appointments") || [];
    const idx = appointments.findIndex(a => a.id === aptId);
    if (idx !== -1) {
      appointments[idx].status = "Completed";
      saveDocData("appointments", appointments);
      showToast("Appointment marked as Completed.");
      if (currentView === "dashboard") renderDashboardView();
      else if (currentView === "appointments") renderAppointmentsRegistryView();
      else if (currentView === "analytics") renderAnalyticsModuleView();
    }
  }
  
  function cancelAppointmentDirect(aptId) {
    const appointments = loadDocData("appointments") || [];
    const idx = appointments.findIndex(a => a.id === aptId);
    if (idx !== -1) {
      appointments[idx].status = "Cancelled";
      saveDocData("appointments", appointments);
      showToast("Appointment marked as Cancelled.");
      if (currentView === "dashboard") renderDashboardView();
      else if (currentView === "appointments") renderAppointmentsRegistryView();
      else if (currentView === "analytics") renderAnalyticsModuleView();
    }
  }
  