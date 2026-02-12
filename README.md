# Emergency Response & Clinical Trial Dashboard

This folder contains a small end-to-end demo web application built with **Flask**, **HTML/CSS/JavaScript**, **Chart.js**, and **Leaflet**. It presents a unified dashboard for:

- Coordinating **disaster / emergency response**
- Matching patients to **clinical trials**
- Visualizing system **analytics and simulations**

The app is intentionally self‑contained and runs entirely on your local machine (no external database). It focuses on UX, interactivity, and clear storytelling of an "intelligent" coordinator rather than production back‑end complexity.

---

## Project Structure

- `app.py` – Flask application entry point
  - Handles routing (`/`, `/login`, `/logout`)
  - Simple session-based login (demo creds: `admin` / `password`)
  - JSON API endpoints: `/api/data` and `/api/chat` (chat is currently unused by the front end)
- `templates/`
  - `login.html` – Login page UI
  - `index.html` – Main dashboard layout and HTML panels
- `static/`
  - `styles.css` – Main styling for the modern dashboard UI
  - `script.js` – All front-end behaviour: charts, simulations, map, assistant, etc.

The top-level `index.html` and `styles.css` in this folder are older static versions; the Flask app uses the `templates/` and `static/` versions.

---

## How to Run Locally

Requirements:

- Python 3.10+ (your environment uses 3.12)
- `Flask` and `requests` Python packages

Install dependencies:

```bash
pip install flask requests
```

From this folder (`intel/project11`):

```bash
python app.py
```

Then open the browser at:

- `http://127.0.0.1:5000/`

Login with:

- **Username:** `admin`
- **Password:** `password`

> Note: the server is bound to `127.0.0.1`, so only your machine can access it. This is intentional for a local demo.

---

## High-Level Features

### 1. Secure Login Gate (Demo)

- Simple credential check before granting access to the dashboard.
- Session-based guard on `/` so the dashboard is not visible without logging in.

### 2. Disaster Response Coordinator Panel

Located on the left of the main dashboard.

- **Key metrics**
  - Average response time
  - Percentage of resources deployed
  - Coordination score
- **Active emergencies list** updated dynamically
  - Each emergency has type, location, and severity (low / medium / high)
- **Simulate Emergency** button
  - Randomly injects a new emergency scenario
  - Updates metrics such as response time and resources deployed
  - Triggers notifications and downstream analytics updates
- **Resource allocation bars**
  - Visual status for medical supplies, personnel, and transport

### 3. Clinical Trial Matcher Panel

Middle panel on the dashboard.

- **Trial matching metrics**
  - Match accuracy
  - Match time latency
  - Count of active trials
- **Patient input controls**
  - Condition (e.g., Cancer, Cardiovascular, Neurological)
  - Age slider with live value label
  - Region selector (North, South, East, West)
- **Find Matching Trials** action
  - Generates a realistic list of simulated clinical trials
  - Each trial shows name, condition, location, and match percentage
- **Patient Digital Twin** mini-simulation
  - Comorbidities: Diabetes, Hypertension, Cardiac history
  - Genetic risk profile: Low / Medium / High
  - Current stability slider
  - Outputs:
    - Survival probability
    - Drug response likelihood
    - Side-effect risk
  - Probabilities are computed from a risk score with some random jitter to keep runs fresh but believable.

### 4. System Analytics Panel (Charts)

Right-hand dashboard card.

- Uses **Chart.js** to show:
  - **Response time over time** (line chart)
  - **Trial matching success by condition** (bar chart)
- Charts update whenever the system runs new simulations, ensuring visuals stay synced with metrics.

### 5. Real-Time Intelligence Stream

In `static/script.js`, the **Real-Time Intelligence** section simulates a streaming feed:

- Live emergency alerts with severity and location
- Simulated social media signals tied to events
- Calculated alerts-per-minute and an inferred hotspot location
- Old entries are pruned to keep the panel concise and readable

### 6. Predictive Resource Allocation

The `updatePredictiveAllocation()` logic:

- Scans current emergencies and counts high/medium severity events.
- Computes a pressure score and derives **recommended** vs **deployed** resources for:
  - Ambulances
  - Medical kits
  - Rescue teams
- Calculates a risk percentage for each resource type if deployed levels lag behind recommended.

This turns static metrics into something that behaves like a lightweight decision-support model.

### 7. GIS & Route Optimization Map

Using **Leaflet** in `initializeMapPanel()`:

- Renders a city-scale map with:
  - Disaster shelter origin zone (circle)
  - Primary hospital
  - Relief camp
  - Blocked road segment (red dashed polyline)
- Draws a **safe route** avoiding the blocked segment.
- Supports user interaction:
  - Clicking on the map moves the origin to a new facility (shelter, field camp, etc.).
  - Recomputes an approximate route and distance using a Haversine estimate.
- Updates textual **route summary**, **ETA**, risk level, and number of blocked segments.

### 8. Trial Outcome Predictor

The `updateTrialSuccessPredictor()` function:

- Uses match rate and trial count to estimate:
  - Trial completion probability
  - Dropout risk
  - Adverse event risk
- Updates clearly labeled percentage metrics to provide a quick feel for likely trial performance.

### 9. Notification Center

A compact notification list:

- Seeds several initial system events (system initialized, DB synced, performance optimized, resources deployed).
- `showNotification()` adds new notifications when the user triggers actions
  (e.g., project control buttons, running simulations).
- Keeps a maximum number of items and visually highlights the bell icon for feedback.

### 10. In-Page Assistant Widget (Front-End Helper)

Embedded assistant panel in the UI:

- Toggle button opens/closes a small chat-like interface.
- When the user submits a question:
  - Their message appears in the list.
  - A temporary "Thinking…" message is shown.
  - The app quickly replaces it with a response generated entirely in the browser by `getAssistantReply()`.
- `getAssistantReply()` inspects the message for keywords and provides contextual guidance, such as:
  - How to simulate emergencies
  - How to run patient-trial matching
  - Where to look for charts and analytics
  - How to use project controls

> Originally the assistant could call a back-end `/api/chat` endpoint that proxies to a local **Ollama** LLM server. The front end is currently configured to use only the lightweight client-side helper, making the demo easy to run on any machine without an LLM installed. The server-side `/api/chat` endpoint remains available for future experiments.

---

## Unique / Creative Aspects

This project is not just a static UI; several design choices make it stand out as a demo:

1. **End-to-end narrative across domains**  
   It ties together *disaster response*, *clinical trials*, *GIS routing*, *predictive analytics*, and a *helper assistant* into one coherent story instead of separate toy pages.

2. **Layered intelligence instead of random numbers**  
   Many metrics (response time, match rate, risk scores, predictive allocation, digital twin outputs) are updated according to simple but meaningful formulas, so numbers move in ways that feel plausible, not purely random.

3. **Interactive GIS routing with constraints**  
   The Leaflet map doesn’t just show markers—it models blocked roads and recomputes routes/ETAs when the user picks new origins, mimicking real-world route planning under disruptions.

4. **Patient Digital Twin mini-model**  
   The digital twin module combines comorbidities, genetics, stability, and age to derive survival / response / side-effect probabilities. This is a compact example of how clinical risk models can be visualized to non-technical stakeholders.

5. **Real-time intelligence feed mixing structured and social signals**  
   The live feed blends simulated sensor/alert events with social media posts, reinforcing how modern coordinators fuse multiple data streams while keeping the UI easy to scan.

6. **Embedded assistant for explaining the dashboard itself**  
   The in-page assistant acts as a guided tour: instead of a static help page, users can ask natural-language questions like "how do I simulate an emergency?" and get contextual instructions.

7. **Project-controls as a storytelling layer**  
   The project control buttons (start project, track progress, generate report, simulate data) don’t just flip a boolean—they trigger coordinated updates across analytics, notifications, and metrics, giving a realistic feeling of running an initiative rather than clicking isolated widgets.

8. **Clean separation of concerns**  
   - Flask handles routing, sessions, and (optionally) the chat API.
   - All simulations and UI interactions live in `static/script.js`.
   - Visual design is centralized in `static/styles.css` and built with a consistent design system (colors, spacing, cards, badges).

---

## Possible Extensions

If we want to grow this project further, here are natural next steps:

- Connect to a real database for storing emergencies, patients, and trial records.
- Replace simulated metrics with live data feeds or CSV imports.
- Re-enable the `/api/chat` integration and hook it up to a real LLM endpoint (Ollama or a hosted model) for richer assistant responses.
- Add user roles (e.g., incident commander vs. clinical researcher) with tailored views.
- Containerize the app (Docker) and deploy to a cloud platform for public demos.

