// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    loadInitialData();
    setupEventListeners();
    simulateInitialNotifications();
});

// Initialize Chart.js charts
function initializeCharts() {
    // Response Time Chart
    const responseCtx = document.getElementById('responseChart').getContext('2d');
    const responseChart = new Chart(responseCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Response Time (seconds)',
                data: [5.2, 4.8, 4.5, 4.2, 4.1, 4.3, 4.0],
                borderColor: '#1a73e8',
                backgroundColor: 'rgba(26, 115, 232, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 3.5,
                    title: {
                        display: true,
                        text: 'Seconds'
                    }
                }
            }
        }
    });

    // Trial Matching Chart
    const trialCtx = document.getElementById('trialChart').getContext('2d');
    const trialChart = new Chart(trialCtx, {
        type: 'bar',
        data: {
            labels: ['Cancer', 'Cardio', 'Neuro', 'Respiratory', 'Autoimmune'],
            datasets: [{
                label: 'Matching Success Rate',
                data: [92, 88, 95, 85, 90],
                backgroundColor: [
                    'rgba(52, 168, 83, 0.7)',
                    'rgba(26, 115, 232, 0.7)',
                    'rgba(251, 188, 4, 0.7)',
                    'rgba(234, 67, 53, 0.7)',
                    'rgba(155, 81, 224, 0.7)'
                ],
                borderColor: [
                    'rgb(52, 168, 83)',
                    'rgb(26, 115, 232)',
                    'rgb(251, 188, 4)',
                    'rgb(234, 67, 53)',
                    'rgb(155, 81, 224)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Success Rate (%)'
                    }
                }
            }
        }
    });

    window.responseChart = responseChart;
    window.trialChart = trialChart;
}

// Load initial data
function loadInitialData() {
    // Load emergencies
    const emergencies = [
        { id: 1, type: 'Earthquake', location: 'North Region', severity: 'high' },
        { id: 2, type: 'Flood', location: 'East Coast', severity: 'medium' },
        { id: 3, type: 'Industrial Accident', location: 'West Region', severity: 'high' },
        { id: 4, type: 'Medical Emergency', location: 'Central Region', severity: 'low' }
    ];
    
    const emergenciesContainer = document.getElementById('emergenciesContainer');
    emergencies.forEach(emergency => {
        const emergencyElement = createEmergencyElement(emergency);
        emergenciesContainer.appendChild(emergencyElement);
    });
    
    // Load trial matches
    const trials = [
        { id: 1, name: 'Oncology Immunotherapy Trial', condition: 'Cancer', location: 'North Region', match: 95 },
        { id: 2, name: 'Cardiovascular Prevention Study', condition: 'Cardiovascular', location: 'Multiple', match: 87 },
        { id: 3, name: 'Neurological Disorder Research', condition: 'Neurological', location: 'East Region', match: 92 }
    ];
    
    const trialsContainer = document.getElementById('trialsContainer');
    trials.forEach(trial => {
        const trialElement = createTrialElement(trial);
        trialsContainer.appendChild(trialElement);
    });
}

// Create emergency element
function createEmergencyElement(emergency) {
    const div = document.createElement('div');
    div.className = 'emergency-item';
    
    const severityClass = `severity-${emergency.severity}`;
    
    div.innerHTML = `
        <div class="emergency-info">
            <h4>${emergency.type}</h4>
            <div class="emergency-location">
                <i class="fas fa-map-marker-alt"></i> ${emergency.location}
            </div>
        </div>
        <div class="emergency-severity ${severityClass}">
            ${emergency.severity.toUpperCase()}
        </div>
    `;
    
    return div;
}

// Create trial element
function createTrialElement(trial) {
    const div = document.createElement('div');
    div.className = 'trial-item';
    
    div.innerHTML = `
        <div class="trial-info">
            <h4>${trial.name}</h4>
            <div class="trial-details">
                <span><i class="fas fa-stethoscope"></i> ${trial.condition}</span>
                <span><i class="fas fa-map-marker-alt"></i> ${trial.location}</span>
            </div>
            <div class="match-score">
                <i class="fas fa-percentage"></i> ${trial.match}% Match
            </div>
        </div>
    `;
    
    return div;
}

// Setup event listeners
function setupEventListeners() {
    // Simulate emergency button
    document.getElementById('simulateBtn').addEventListener('click', function() {
        simulateNewEmergency();
        showNotification('New emergency simulated', 'System added a test emergency scenario');
    });
    
    // Match patients button
    document.getElementById('matchBtn').addEventListener('click', function() {
        simulatePatientMatching();
        showNotification('Patient matching initiated', 'Finding clinical trials for current patient profile');
    });
    
    // Find trials button
    document.getElementById('findTrialsBtn').addEventListener('click', function() {
        findMatchingTrials();
    });
    
    // Age slider
    const ageSlider = document.getElementById('patientAge');
    const ageValue = document.getElementById('ageValue');
    
    ageSlider.addEventListener('input', function() {
        ageValue.textContent = `${this.value} years`;
    });
    
    // Control buttons
    document.getElementById('startProjectBtn').addEventListener('click', function() {
        showNotification('Project started', 'Disaster Response Coordinator project initiated with 1-week timeline');
    });
    
    document.getElementById('trackProgressBtn').addEventListener('click', function() {
        showNotification('Progress tracking', 'Opening project progress dashboard');
    });
    
    document.getElementById('generateReportBtn').addEventListener('click', function() {
        showNotification('Report generated', 'System performance report created and ready for download');
    });
    
    document.getElementById('simulateDataBtn').addEventListener('click', function() {
        simulateSystemData();
        showNotification('Data simulation', 'System data refreshed with simulated metrics');
    });
    
    // Select project button
    document.getElementById('selectProjectBtn').addEventListener('click', function() {
        alert('Project selected! You will now be redirected to the submission page to track your progress.');
        // In a real app, this would redirect to a submission page
        // window.location.href = 'submission.html';
    });
}

// Simulate a new emergency
function simulateNewEmergency() {
    const emergencies = [
        { type: 'Wildfire', location: 'Forest Region', severity: 'high' },
        { type: 'Hurricane', location: 'Coastal Area', severity: 'medium' },
        { type: 'Chemical Spill', location: 'Industrial Zone', severity: 'high' },
        { type: 'Power Outage', location: 'Urban Center', severity: 'low' }
    ];
    
    const randomEmergency = emergencies[Math.floor(Math.random() * emergencies.length)];
    const emergenciesContainer = document.getElementById('emergenciesContainer');
    const emergencyElement = createEmergencyElement({
        id: Date.now(),
        ...randomEmergency
    });
    
    emergenciesContainer.insertBefore(emergencyElement, emergenciesContainer.firstChild);
    
    // Update metrics
    updateResponseMetrics();
}

// Simulate patient matching
function simulatePatientMatching() {
    const matchRate = document.getElementById('matchRate');
    const currentRate = parseInt(matchRate.textContent);
    const newRate = Math.min(99, currentRate + Math.floor(Math.random() * 3));
    matchRate.textContent = `${newRate}%`;
    
    const matchTime = document.getElementById('matchTime');
    const currentTime = parseFloat(matchTime.textContent);
    const newTime = Math.max(0.3, currentTime - (Math.random() * 0.1));
    matchTime.textContent = `${newTime.toFixed(1)}s`;
}

// Find matching trials based on input
function findMatchingTrials() {
    const condition = document.getElementById('patientCondition').value;
    const age = document.getElementById('patientAge').value;
    const location = document.getElementById('patientLocation').value;
    
    // Clear previous results
    const trialsContainer = document.getElementById('trialsContainer');
    trialsContainer.innerHTML = '';
    
    // Simulate finding trials based on criteria
    const simulatedTrials = [
        { id: 1, name: `${condition.charAt(0).toUpperCase() + condition.slice(1)} Advanced Treatment Study`, condition: condition, location: location, match: 85 + Math.floor(Math.random() * 10) },
        { id: 2, name: `Phase 3 ${condition} Clinical Trial`, condition: condition, location: 'Multiple', match: 80 + Math.floor(Math.random() * 15) },
        { id: 3, name: `${condition} Prevention and Management Research`, condition: condition, location: 'National', match: 75 + Math.floor(Math.random() * 20) },
        { id: 4, name: `Innovative ${condition} Therapy Program`, condition: condition, location: location === 'north' ? 'South Region' : 'North Region', match: 70 + Math.floor(Math.random() * 25) }
    ];
    
    simulatedTrials.forEach(trial => {
        const trialElement = createTrialElement(trial);
        trialsContainer.appendChild(trialElement);
    });
    
    showNotification('Trials matched', `Found ${simulatedTrials.length} clinical trials matching the patient criteria`);
}

// Update response metrics
function updateResponseMetrics() {
    const responseTime = document.getElementById('responseTime');
    const currentTime = parseFloat(responseTime.textContent);
    const newTime = Math.max(3.5, currentTime - (Math.random() * 0.3));
    responseTime.textContent = `${newTime.toFixed(1)}s`;
    
    const resourcesDeployed = document.getElementById('resourcesDeployed');
    const currentResources = parseInt(resourcesDeployed.textContent);
    const newResources = Math.min(95, currentResources + Math.floor(Math.random() * 5));
    resourcesDeployed.textContent = `${newResources}%`;
    
    // Update resource bars
    document.getElementById('medicalBar').style.width = `${70 + Math.floor(Math.random() * 20)}%`;
    document.getElementById('personnelBar').style.width = `${60 + Math.floor(Math.random() * 25)}%`;
    document.getElementById('transportBar').style.width = `${75 + Math.floor(Math.random() * 20)}%`;
}

// Simulate system data updates
function simulateSystemData() {
    // Update metrics with random values
    updateResponseMetrics();
    simulatePatientMatching();
    
    // Update trial count
    const trialCount = document.getElementById('trialCount');
    const currentCount = parseInt(trialCount.textContent);
    const newCount = currentCount + Math.floor(Math.random() * 3) - 1;
    trialCount.textContent = Math.max(35, Math.min(50, newCount));
    
    // Update coordination score
    const coordinationScore = document.getElementById('coordinationScore');
    const currentScore = parseInt(coordinationScore.textContent);
    const newScore = Math.max(80, Math.min(99, currentScore + Math.floor(Math.random() * 5) - 2));
    coordinationScore.textContent = newScore;
    
    // Update charts
    updateCharts();
}

// Update charts with new data
function updateCharts() {
    // Update response chart
    const newDataPoint = 3.8 + Math.random() * 0.8;
    window.responseChart.data.datasets[0].data.push(newDataPoint);
    window.responseChart.data.labels.push('New');
    
    if (window.responseChart.data.datasets[0].data.length > 7) {
        window.responseChart.data.datasets[0].data.shift();
        window.responseChart.data.labels.shift();
    }
    
    window.responseChart.update();
    
    // Update trial chart with random variations
    window.trialChart.data.datasets[0].data = window.trialChart.data.datasets[0].data.map(value => {
        const change = Math.floor(Math.random() * 10) - 5;
        return Math.max(75, Math.min(99, value + change));
    });
    
    window.trialChart.update();
}

// Simulate initial notifications
function simulateInitialNotifications() {
    const notifications = [
        { title: 'System Initialized', message: 'Disaster Response Coordinator is now operational', time: '2 minutes ago' },
        { title: 'Database Synced', message: 'Clinical trial database updated with 12 new entries', time: '15 minutes ago' },
        { title: 'Performance Optimized', message: 'Matching latency reduced by 15%', time: '1 hour ago' },
        { title: 'Resource Allocated', message: 'Emergency supplies deployed to North Region', time: '3 hours ago' }
    ];
    
    const notificationsContainer = document.getElementById('notificationsContainer');
    notifications.forEach(notification => {
        const notificationElement = createNotificationElement(notification);
        notificationsContainer.appendChild(notificationElement);
    });
}

// Create notification element
function createNotificationElement(notification) {
    const div = document.createElement('div');
    div.className = 'notification-item';
    
    div.innerHTML = `
        <i class="fas fa-bell"></i>
        <div class="notification-content">
            <h4>${notification.title}</h4>
            <p>${notification.message}</p>
            <div class="notification-time">${notification.time}</div>
        </div>
    `;
    
    return div;
}

// Show a new notification
function showNotification(title, message) {
    const notificationsContainer = document.getElementById('notificationsContainer');
    const notificationElement = createNotificationElement({
        title,
        message,
        time: 'Just now'
    });
    
    notificationsContainer.insertBefore(notificationElement, notificationsContainer.firstChild);
    
    // Limit to 5 notifications
    if (notificationsContainer.children.length > 5) {
        notificationsContainer.removeChild(notificationsContainer.lastChild);
    }
    
    // Visual feedback
    const bell = document.querySelector('.fa-bell');
    bell.parentElement.style.color = '#1a73e8';
    setTimeout(() => {
        bell.parentElement.style.color = '';
    }, 1000);
}