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

// ============================================
// VIEW REPORT MODAL (For Backend)
// ============================================
function openReportModal(data) {
    // Create a modal to show real report content
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px; max-height: 80vh; overflow-y: auto;">
            <h2><i class="fas fa-file-medical text-teal"></i> ${data.reportName}</h2>
            <div style="margin: 16px 0; padding: 16px; background: #f8fcfd; border-radius: 12px;">
                <div style="display:flex; gap: 16px; flex-wrap: wrap;">
                    <div><strong>Patient:</strong> ${data.patientName}</div>
                    <div><strong>Doctor:</strong> ${data.doctor}</div>
                    <div><strong>Date:</strong> ${data.date}</div>
                    <div><strong>Category:</strong> ${data.category}</div>
                </div>
            </div>
            <div style="background: white; padding: 16px; border-radius: 12px; border: 1px solid #e4f0f5; min-height: 200px;">
                ${data.content || 'Report content would be displayed here...'}
            </div>
            <div class="modal-actions" style="margin-top: 16px;">
                <button class="btn-cancel" onclick="this.closest('.modal-overlay').remove()">Close</button>
                <button class="btn-primary" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-download"></i> Download
                </button>
                <button class="btn-primary" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-print"></i> Print
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// ============================================
// GET AUTH TOKEN (Helper for Backend)
// ============================================
function getAuthToken() {
    // Get token from localStorage or sessionStorage
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken') || '';
}

// ============================================
// SET AUTH TOKEN (Helper for Backend)
// ============================================
function setAuthToken(token) {
    localStorage.setItem('authToken', token);
}