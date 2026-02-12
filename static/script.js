// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    loadInitialData();
    setupEventListeners();
    initializeRealTimeIntelligence();
    initializeMapPanel();
    updatePredictiveAllocation();
    updateTrialSuccessPredictor();
    runDigitalTwinSimulation();
    setupAssistantWidget();
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
    
    // Age slider - only updates age label (twin runs on button)
    const ageSlider = document.getElementById('patientAge');
    const ageValue = document.getElementById('ageValue');
    
    ageSlider.addEventListener('input', function() {
        ageValue.textContent = `${this.value} years`;
    });
    
    // Control buttons - all trigger coordinated analytics + notifications
    document.getElementById('startProjectBtn').addEventListener('click', function() {
        handleProjectControl('Project started', 'Disaster Response Coordinator project kicked off. Analytics and status have been refreshed.');
    });
    
    document.getElementById('trackProgressBtn').addEventListener('click', function() {
        handleProjectControl('Progress tracking', 'Latest system metrics loaded so you can review progress.');
    });
    
    document.getElementById('generateReportBtn').addEventListener('click', function() {
        handleProjectControl('Report generated', 'A summary report was generated using the most recent analytics.');
    });
    
    document.getElementById('simulateDataBtn').addEventListener('click', function() {
        handleProjectControl('Data simulation', 'Dashboard metrics and charts updated with simulated data.');
    });
    
    // Select project button
    document.getElementById('selectProjectBtn').addEventListener('click', function() {
        alert('Project selected! You will now be redirected to the submission page to track your progress.');
        // In a real app, this would redirect to a submission page
        // window.location.href = 'submission.html';
    });

    // Digital twin - only runs when the button is pressed
    const runBtn = document.getElementById('runTwinBtn');
    if (runBtn) {
        runBtn.addEventListener('click', runDigitalTwinSimulation);
    }
}

// Shared handler so project controls update analytics + notifications together
function handleProjectControl(title, message) {
    // Update metrics and charts
    simulateSystemData();
    // Create notification entry
    showNotification(title, message);
    // Gently draw attention to analytics section
    const analyticsPanel = document.querySelector('.chart-panel');
    if (analyticsPanel) {
        analyticsPanel.classList.add('panel-highlight');
        setTimeout(() => analyticsPanel.classList.remove('panel-highlight'), 800);
    }
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
    const currentTime = parseFloat(responseTime.textContent) || 4.2;
    // Let response time move slightly up or down within a band
    const timeDelta = (Math.random() - 0.5) * 0.4; // -0.2s to +0.2s
    const newTime = Math.min(5.0, Math.max(3.2, currentTime + timeDelta));
    responseTime.textContent = `${newTime.toFixed(1)}s`;
    
    const resourcesDeployed = document.getElementById('resourcesDeployed');
    const currentResources = parseInt(resourcesDeployed.textContent) || 90;
    // Let deployment vary but stay in a healthy range
    const resourceDelta = Math.floor((Math.random() - 0.5) * 8); // -4% to +4%
    const newResources = Math.min(99, Math.max(70, currentResources + resourceDelta));
    resourcesDeployed.textContent = `${newResources}%`;
    
    // Update resource bars
    document.getElementById('medicalBar').style.width = `${60 + Math.floor(Math.random() * 30)}%`;
    document.getElementById('personnelBar').style.width = `${50 + Math.floor(Math.random() * 35)}%`;
    document.getElementById('transportBar').style.width = `${65 + Math.floor(Math.random() * 25)}%`;
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

    // Update higher-level intelligence layers
    updatePredictiveAllocation();
    updateTrialSuccessPredictor();
    updateRoutePlan();

    // Refresh the header status badges based on live metrics
    updateHeaderStatusBadges();
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

// -----------------------------
// Simple in-page assistant widget
// -----------------------------

function setupAssistantWidget() {
    const toggle = document.getElementById('assistantToggle');
    const panel = document.getElementById('assistantPanel');
    const form = document.getElementById('assistantForm');
    const input = document.getElementById('assistantInput');
    const messages = document.getElementById('assistantMessages');

    if (!toggle || !panel || !form || !input || !messages) {
        return; // HTML not present
    }

    toggle.addEventListener('click', () => {
        panel.classList.toggle('assistant-open');
        panel.classList.toggle('hidden');
        if (panel.classList.contains('assistant-open')) {
            input.focus();
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const text = input.value.trim();
        if (!text) return;

        appendAssistantMessage('user', text);
        input.value = '';

        // Pure front-end helper: no backend call.
        // Show a short "thinking" message, then respond using getAssistantReply.
        const thinkingEl = appendAssistantMessage('bot', 'Thinking...');

        setTimeout(() => {
            if (!thinkingEl) return;
            const reply = getAssistantReply(text);
            thinkingEl.textContent = reply;
        }, 400);
    });
}

function appendAssistantMessage(role, text) {
    const messages = document.getElementById('assistantMessages');
    if (!messages) return;

    const item = document.createElement('div');
    item.className = `assistant-message assistant-message-${role}`;
    item.textContent = text;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;

    return item;
}

function getAssistantReply(text) {
    const lowered = text.toLowerCase();

    if (lowered.includes('emergency') || lowered.includes('disaster')) {
        return 'You can simulate new emergencies with the "Simulate Emergency" button. The left panel and metrics will update when you click it.';
    }
    if (lowered.includes('trial') || lowered.includes('patient')) {
        return 'Use the Patient-Trial Matching controls in the middle panel, then click "Find Matching Trials" to update the results.';
    }
    if (lowered.includes('chart') || lowered.includes('analytics')) {
        return 'Any of the project control buttons will refresh the analytics section by running a quick data simulation.';
    }
    if (lowered.includes('project') || lowered.includes('start')) {
        return 'Click the controls under "Project Controls" to start the project, track progress, generate a report, or simulate data all at once.';
    }

    return 'I am a simple helper bot for this dashboard. Try asking about emergencies, trials, charts, or project controls.';
}

// -----------------------------
// Real-Time Intelligence layer
// -----------------------------

let alertHistory = [];
let socialCount = 0;

function initializeRealTimeIntelligence() {
    // Seed with a couple of entries so the panel is not empty
    pushEmergencyAlert('Wildfire expanding near Forest Region', 'North Region', 'high');
    pushSocialSignal('"Smoke near the hills, anyone else seeing this?" – North Region');

    setInterval(() => {
        simulateIncomingAlert();
    }, 7000);
}

function simulateIncomingAlert() {
    const types = ['Aftershock detected', 'River level rising', 'Roadblock reported', 'New medical cluster', 'High wind warning'];
    const locations = ['North Region', 'South Region', 'East Coast', 'Central City', 'Highlands'];
    const severities = ['low', 'medium', 'high'];

    const type = types[Math.floor(Math.random() * types.length)];
    const loc = locations[Math.floor(Math.random() * locations.length)];
    const sev = severities[Math.floor(Math.random() * severities.length)];

    pushEmergencyAlert(type, loc, sev);

    // Occasionally simulate a corresponding social signal
    if (Math.random() < 0.6) {
        pushSocialSignal(`Social post from ${loc}: "${type}"`);
    }
}

function pushEmergencyAlert(text, location, severity) {
    const container = document.getElementById('liveFeedList');
    if (!container) return;

    const item = document.createElement('div');
    item.className = 'stream-item';
    item.innerHTML = `
        <span class="stream-tag severity-${severity}">${severity.toUpperCase()}</span>
        <div class="stream-body">
            <div class="stream-title">${text}</div>
            <div class="stream-meta"><i class="fas fa-map-marker-alt"></i> ${location}</div>
        </div>
    `;

    container.insertBefore(item, container.firstChild);
    while (container.children.length > 6) {
        container.removeChild(container.lastChild);
    }

    alertHistory.push(Date.now());
    // Keep last 60 seconds
    const cutoff = Date.now() - 60000;
    alertHistory = alertHistory.filter(ts => ts >= cutoff);

    const rate = alertHistory.length / 1.0; // per last minute
    const rateEl = document.getElementById('alertsPerMinute');
    if (rateEl) rateEl.textContent = rate.toFixed(1);

    // Update hotspot text loosely based on most recent location
    const hotspot = document.getElementById('densityHotspot');
    if (hotspot) hotspot.textContent = location;
}

function pushSocialSignal(text) {
    const container = document.getElementById('socialFeedList');
    if (!container) return;

    const item = document.createElement('div');
    item.className = 'stream-item';
    item.innerHTML = `
        <span class="stream-tag social">SOCIAL</span>
        <div class="stream-body">
            <div class="stream-title">${text}</div>
        </div>
    `;

    container.insertBefore(item, container.firstChild);
    while (container.children.length > 6) {
        container.removeChild(container.lastChild);
    }

    socialCount += 1;
    const socialEl = document.getElementById('socialSignals');
    if (socialEl) socialEl.textContent = socialCount.toString();
}

// -----------------------------
// Predictive resource allocation
// -----------------------------

function updatePredictiveAllocation() {
    const emergencies = document.querySelectorAll('#emergenciesContainer .emergency-item');
    let high = 0;
    let medium = 0;
    emergencies.forEach(el => {
        if (el.querySelector('.severity-high')) high += 1;
        else if (el.querySelector('.severity-medium')) medium += 1;
    });

    const pressureScore = high * 1.5 + medium;

    const baseAmbulances = 6;
    const baseKits = 80;
    const baseTeams = 4;

    const recAmbulances = Math.round(baseAmbulances + pressureScore * 1.2);
    const recKits = Math.round(baseKits + pressureScore * 10);
    const recTeams = Math.round(baseTeams + pressureScore * 0.8);

    const deployedPct = parseInt(document.getElementById('resourcesDeployed').textContent) || 80;
    const deployedFactor = deployedPct / 100;

    setPredictiveBlock('Ambulances', 'ambulances', recAmbulances, Math.round(recAmbulances * deployedFactor));
    setPredictiveBlock('Medical kits', 'kits', recKits, Math.round(recKits * deployedFactor));
    setPredictiveBlock('Rescue teams', 'teams', recTeams, Math.round(recTeams * deployedFactor));
}

function setPredictiveBlock(label, key, recommended, deployed) {
    const recEl = document.getElementById(`rec-${key}`);
    const depEl = document.getElementById(`dep-${key}`);
    const riskEl = document.getElementById(`risk-${key}`);
    if (!recEl || !depEl || !riskEl) return;

    recEl.textContent = recommended;
    depEl.textContent = deployed;

    const shortage = Math.max(0, recommended - deployed);
    const riskPct = Math.min(99, Math.round((shortage / (recommended || 1)) * 100));
    riskEl.textContent = `${riskPct}%`;
}

// -----------------------------
// GIS + route optimization
// -----------------------------

let mapInstance;
let routeLine;
let blockedSegments = 1;
let emergencyZoneCircle; // clickable origin
let hospitalMarker;      // fixed destination
let routeOriginLabel = 'disaster shelter';

function initializeMapPanel() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer || typeof L === 'undefined') return;

    mapInstance = L.map('map').setView([37.7749, -122.4194], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap'
    }).addTo(mapInstance);

    // Simulated key points
    emergencyZoneCircle = L.circle([37.78, -122.45], { radius: 1200, color: '#ea4335' }).addTo(mapInstance);
    routeOriginLabel = 'disaster shelter';
    emergencyZoneCircle.bindPopup('Disaster shelter');

    hospitalMarker = L.marker([37.76, -122.41]).addTo(mapInstance);
    hospitalMarker.bindPopup('Primary hospital');

    const camp = L.marker([37.72, -122.43]).addTo(mapInstance);
    camp.bindPopup('Relief camp');

    // Blocked road segment (red line)
    const blocked = L.polyline([[37.77, -122.44],[37.75, -122.46]], { color: '#ea4335', weight: 5, dashArray: '6,4' }).addTo(mapInstance);
    blocked.bindPopup('Blocked road');

    // Initial safe route polyline
    routeLine = L.polyline(getSafeRouteCoords(), { color: '#0f766e', weight: 4 }).addTo(mapInstance);
    updateRoutePlan();

    // When user clicks anywhere on the map, move the origin
    // there and recompute the route + metrics.
    mapInstance.on('click', function (e) {
        if (!hospitalMarker) return;

        const clicked = e.latlng;

        const facilities = [
            'Disaster shelter',
            'Field triage camp',
            'First response station',
            'Community clinic'
        ];
        const facility = facilities[Math.floor(Math.random() * facilities.length)];

        if (emergencyZoneCircle) {
            emergencyZoneCircle.setLatLng(clicked);
        } else {
            emergencyZoneCircle = L.circle(clicked, { radius: 1200, color: '#ea4335' }).addTo(mapInstance);
        }
        routeOriginLabel = facility.toLowerCase();
        emergencyZoneCircle.bindPopup(facility).openPopup();

        updateRoutePlan(clicked);
    });
}

function getSafeRouteCoords() {
    return [
        [37.78, -122.45],
        [37.79, -122.43],
        [37.77, -122.42],
        [37.76, -122.41]
    ];
}

// Rough distance between two lat/lng points using Haversine formula
function estimateDistanceKm(start, end) {
    const toRad = deg => (deg * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(end.lat - start.lat);
    const dLon = toRad(end.lng - start.lng);
    const lat1 = toRad(start.lat);
    const lat2 = toRad(end.lat);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function updateRoutePlan(startLatLng) {
    const summary = document.getElementById('routeSummary');
    const etaEl = document.getElementById('routeEta');
    const riskEl = document.getElementById('routeRisk');
    const blockEl = document.getElementById('routeBlocked');
    if (!summary || !etaEl || !riskEl || !blockEl) return;

    let coords;
    let distanceKm;

    if (startLatLng && hospitalMarker) {
        const end = hospitalMarker.getLatLng();

        // Simple three-point route: start -> mid-point -> hospital
        const mid = {
            lat: (startLatLng.lat + end.lat) / 2 + 0.01,
            lng: (startLatLng.lng + end.lng) / 2
        };

        coords = [
            [startLatLng.lat, startLatLng.lng],
            [mid.lat, mid.lng],
            [end.lat, end.lng]
        ];

        distanceKm = estimateDistanceKm(startLatLng, end);
        summary.textContent = `Route from ${routeOriginLabel || 'first response site'} to primary hospital avoiding blocked road segment.`;
    } else {
        coords = getSafeRouteCoords();
        // Default simulated distance
        distanceKm = 7 + Math.random() * 2;
        summary.textContent = `Route from ${routeOriginLabel || 'disaster shelter'} to primary hospital avoiding blocked road segment.`;
    }

    const etaMin = Math.round(distanceKm / 0.6); // 0.6 km/min ~ 36 km/h

    etaEl.textContent = `${etaMin} min`;
    riskEl.textContent = etaMin > 14 ? 'Elevated' : 'Normal';
    blockEl.textContent = blockedSegments.toString();

    if (routeLine && mapInstance) {
        routeLine.setLatLngs(coords);
    }
}

// -----------------------------
// Patient Digital Twin
// -----------------------------

function runDigitalTwinSimulation() {
    const ageEl = document.getElementById('patientAge');
    const vitalsEl = document.getElementById('twinVitals');
    const geneticsEl = document.getElementById('twinGenetics');
    const vitalsLabelEl = document.getElementById('twinVitalsValue');
    const survivalEl = document.getElementById('twinSurvival');
    const responseEl = document.getElementById('twinResponse');
    const sideEffectsEl = document.getElementById('twinSideEffects');
    const diabetesEl = document.getElementById('twinDiabetes');
    const hypertensionEl = document.getElementById('twinHypertension');
    const cardioEl = document.getElementById('twinCardio');

    // If any core element is missing, skip to avoid JS errors
    if (!ageEl || !vitalsEl || !geneticsEl || !vitalsLabelEl || !survivalEl || !responseEl || !sideEffectsEl) {
        return;
    }

    const age = parseInt(ageEl.value, 10) || 45;
    const vitals = parseInt(vitalsEl.value, 10) || 70;
    const genetics = geneticsEl.value;
    const hasDiabetes = diabetesEl && diabetesEl.checked;
    const hasHypertension = hypertensionEl && hypertensionEl.checked;
    const hasCardio = cardioEl && cardioEl.checked;

    vitalsLabelEl.textContent = `${vitals} / 100`;

    let riskScore = 0;
    if (age > 60) riskScore += 2;
    if (age > 75) riskScore += 2;
    if (hasDiabetes) riskScore += 1.5;
    if (hasHypertension) riskScore += 1.5;
    if (hasCardio) riskScore += 2;
    if (genetics === 'medium') riskScore += 1;
    if (genetics === 'high') riskScore += 2.5;
    riskScore += (100 - vitals) / 40; // worse vitals -> higher risk

    // Base probabilities from risk score
    let survivalProb = Math.max(40, 98 - riskScore * 6);
    let responseProb = Math.max(25, 90 - riskScore * 4 + vitals / 6);
    let sideEffectRisk = Math.min(95, 15 + riskScore * 7);

    // Add a small random variation so each run feels
    // like a fresh simulation while staying in safe bounds.
    const jitter = () => (Math.random() - 0.5) * 4; // -2% to +2%
    survivalProb = Math.max(0, Math.min(99, survivalProb + jitter()));
    responseProb = Math.max(0, Math.min(99, responseProb + jitter()));
    sideEffectRisk = Math.max(0, Math.min(99, sideEffectRisk + jitter()));

    survivalEl.textContent = `${Math.round(survivalProb)}%`;
    responseEl.textContent = `${Math.round(responseProb)}%`;
    sideEffectsEl.textContent = `${Math.round(sideEffectRisk)}%`;
}

// -----------------------------
// Trial success predictor
// -----------------------------

function updateTrialSuccessPredictor() {
    const trialCount = parseInt(document.getElementById('trialCount').textContent) || 40;
    const matchRate = parseInt(document.getElementById('matchRate').textContent) || 90;

    const completion = Math.min(99, Math.round(70 + (matchRate - 80) * 0.8));
    const dropout = Math.max(5, Math.round(30 - (matchRate - 80) * 0.5));
    const adverse = Math.max(8, Math.round(18 + (100 - matchRate) * 0.3));

    const completionEl = document.getElementById('trialCompletionProb');
    const dropoutEl = document.getElementById('trialDropoutRisk');
    const adverseEl = document.getElementById('trialAdverseRisk');

    if (completionEl) completionEl.textContent = `${completion}%`;
    if (dropoutEl) dropoutEl.textContent = `${dropout}%`;
    if (adverseEl) adverseEl.textContent = `${adverse}%`;
}

// -----------------------------
// Dynamic project status badges
// -----------------------------

function updateHeaderStatusBadges() {
    const responseTimeText = document.getElementById('responseTime')?.textContent || '4.2s';
    const resourcesText = document.getElementById('resourcesDeployed')?.textContent || '80%';
    const coordinationText = document.getElementById('coordinationScore')?.textContent || '90';
    const matchRateText = document.getElementById('matchRate')?.textContent || '90%';
    const matchTimeText = document.getElementById('matchTime')?.textContent || '1.0s';

    const responseTime = parseFloat(responseTimeText) || 4.2;
    const resourcesPct = parseInt(resourcesText) || 80;
    const coordination = parseInt(coordinationText) || 90;
    const matchRate = parseInt(matchRateText) || 90;
    const matchTime = parseFloat(matchTimeText) || 1.0;

    const disasterStatus = classifyDisasterStatus(responseTime, resourcesPct, coordination);
    const trialStatus = classifyTrialStatus(matchRate, matchTime);
    const overallStatus = classifyOverallStatus(disasterStatus.level, trialStatus.level);

    applyStatusBadge('disaster', disasterStatus);
    applyStatusBadge('trials', trialStatus);
    applyStatusBadge('overall', overallStatus);
}

function classifyDisasterStatus(responseTime, resourcesPct, coordination) {
    // Simple thresholds for demo purposes
    if (responseTime <= 4.5 && resourcesPct >= 80 && coordination >= 90) {
        return { level: 'ok', text: 'Disaster Response Coordinator - Advanced' };
    }
    if (responseTime <= 5.0 && resourcesPct >= 70 && coordination >= 80) {
        return { level: 'warning', text: 'Disaster Response Coordinator - Stable' };
    }
    return { level: 'risk', text: 'Disaster Response Coordinator - Needs Attention' };
}

function classifyTrialStatus(matchRate, matchTime) {
    if (matchRate >= 92 && matchTime <= 1.0) {
        return { level: 'ok', text: 'Clinical Trial Matcher - Advanced' };
    }
    if (matchRate >= 85 && matchTime <= 1.5) {
        return { level: 'warning', text: 'Clinical Trial Matcher - Stable' };
    }
    return { level: 'risk', text: 'Clinical Trial Matcher - Needs Tuning' };
}

function classifyOverallStatus(disasterLevel, trialLevel) {
    const levels = { ok: 2, warning: 1, risk: 0 };
    const minLevel = Math.min(levels[disasterLevel] ?? 1, levels[trialLevel] ?? 1);

    if (minLevel === 2) {
        return { level: 'ok', text: 'Ready for Implementation' };
    }
    if (minLevel === 1) {
        return { level: 'warning', text: 'Ready with Monitoring' };
    }
    return { level: 'risk', text: 'Prototype / Not Ready' };
}

function applyStatusBadge(key, status) {
    const dot = document.getElementById(`status-dot-${key}`);
    const label = document.getElementById(`status-text-${key}`);
    if (!dot || !label) return;

    dot.classList.remove('status-ok', 'status-warning', 'status-risk');
    if (status.level === 'ok') dot.classList.add('status-ok');
    else if (status.level === 'warning') dot.classList.add('status-warning');
    else dot.classList.add('status-risk');

    label.textContent = status.text;
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
