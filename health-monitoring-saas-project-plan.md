# Personal Health Monitoring SaaS - Project Plan

## 1. Project Overview

### Vision
Build a web-based health monitoring SaaS where users can track personal health metrics through connected wearables (Fitbit, Apple Health) and manual logging, set health goals, and receive alerts.

### Tech Stack
- **Frontend**: React + TypeScript + Next.js
- **Backend**: Java + Spring Boot
- **Database**: PostgreSQL + Redis (caching)
- **Deployment**: Docker + Kubernetes + Azure

### Core Features (MVP)
- User authentication (register, login, password reset)
- Connect health data sources (wearables, manual entry)
- View health metrics with trends
- Set health goals and alerts
- Dashboard with health overview

---

## 2. Database Schema & Models

### 2.1 User Management
```
Users Table
- user_id (PK)
- email (UNIQUE)
- password_hash (nullable - for OAuth users)
- first_name
- last_name
- date_of_birth
- gender (M/F/Other)
- height_cm
- current_weight_kg
- medical_conditions (JSON)
- medications (JSON)
- auth_provider (email, github) - DEFAULT: 'email'
- github_id (GitHub user ID, nullable)
- github_username (GitHub username, nullable)
- created_at
- updated_at
- is_active

Indexes:
- (email) - unique
- (github_id) - unique for GitHub users
```

### 2.2 Health Services (Wearable/Data Sources)
```
HealthServices Table
- service_id (PK)
- user_id (FK)
- service_type (Fitbit, AppleHealth, Manual, Garmin, Oura, etc.)
- display_name
- is_connected
- access_token (encrypted)
- refresh_token (encrypted)
- last_sync_time
- sync_frequency (real-time, hourly, daily)
- created_at
- updated_at
```

### 2.3 Health Metrics Data
```
HealthMetrics Table
- metric_id (PK)
- user_id (FK)
- service_id (FK)
- metric_type (heart_rate, steps, sleep_duration, weight, blood_pressure, glucose, etc.)
- value
- unit (bpm, steps, hours, kg, mmHg, mg/dL, etc.)
- recorded_at (timestamp when data was recorded)
- created_at (when inserted to DB)
- metadata (JSON - additional info)

Indexes:
- (user_id, recorded_at)
- (user_id, metric_type, recorded_at)
```

### 2.4 Health Goals
```
HealthGoals Table
- goal_id (PK)
- user_id (FK)
- goal_name (e.g., "Walk 10k steps daily")
- metric_type (heart_rate, steps, weight, sleep, etc.)
- target_value
- unit
- target_unit_period (daily, weekly, monthly)
- start_date
- end_date (optional, null = ongoing)
- is_active
- created_at
- updated_at
```

### 2.5 Alerts/Thresholds
```
HealthAlerts Table
- alert_id (PK)
- user_id (FK)
- alert_name (e.g., "High Heart Rate Alert")
- metric_type (heart_rate, weight, sleep, etc.)
- condition (greater_than, less_than, equals)
- threshold_value
- is_active
- notification_type (email, webhook, in_app)
- created_at
- updated_at

Alert Triggers (history of alerts triggered)
- trigger_id (PK)
- alert_id (FK)
- metric_value (actual value when triggered)
- triggered_at
- acknowledged_at (null if not acknowledged)
```

### 2.6 API Keys (for programmatic access)
```
APIKeys Table
- key_id (PK)
- user_id (FK)
- key_hash
- name (descriptive)
- last_used_at
- created_at
- expires_at (optional)
- is_active
```

---

## 3. Backend APIs (Spring Boot)

### 3.1 Authentication Endpoints
```
--- Email/Password Authentication ---
POST /auth/register
  - Input: email, password, firstName, lastName, dateOfBirth, gender
  - Output: user_id, auth_token
  - Validation: Email unique, password strength

POST /auth/login
  - Input: email, password
  - Output: auth_token, refresh_token, user_info

POST /auth/forgot-password
  - Input: email
  - Output: Reset link sent

POST /auth/reset-password
  - Input: reset_token, new_password
  - Output: Success/Error

--- GitHub OAuth 2.0 Authentication ---
GET /auth/github/authorize
  - Initiates GitHub OAuth flow
  - Redirects to GitHub consent screen

GET /auth/github/callback
  - GitHub redirects here after user consent
  - Params: code, state
  - Creates/updates user in DB
  - Returns: auth_token, refresh_token, user_info

--- Token Management ---
POST /auth/refresh-token
  - Input: refresh_token
  - Output: new auth_token

POST /auth/logout
  - Invalidate tokens
```

### 3.2 User Profile Endpoints
```
GET /users/profile
  - Returns: user_id, email, name, DOB, gender, height, weight, medical_conditions, medications

PUT /users/profile
  - Update: name, height, weight, medical_conditions, medications

GET /users/profile/health-info
  - Returns: height, weight, age, gender, medical history

PUT /users/profile/health-info
  - Update health profile
```

### 3.3 Health Services Endpoints
```
GET /health-services
  - Returns: List of connected health services for user

POST /health-services
  - Input: service_type, display_name
  - Output: service_id, connection_url (for OAuth redirect)

POST /health-services/{service_id}/connect
  - OAuth callback handler
  - Stores access_token, refresh_token

DELETE /health-services/{service_id}
  - Disconnect a health service

POST /health-services/{service_id}/sync
  - Manually trigger sync from that service

GET /health-services/{service_id}/sync-status
  - Returns: last_sync_time, sync_frequency
```

### 3.4 Health Metrics Endpoints
```
GET /health-metrics
  - Query params: metric_type, start_date, end_date, limit
  - Returns: List of metrics with timestamps

POST /health-metrics
  - Manual entry of health data
  - Input: metric_type, value, unit, recorded_at

GET /health-metrics/summary
  - Query params: start_date, end_date, granularity (daily, weekly, monthly)
  - Returns: Aggregated metrics (avg, min, max, trend)

GET /health-metrics/{metric_type}/trend
  - Returns: Trend data for charting (last 30 days, 90 days, 1 year)

GET /health-metrics/latest
  - Returns: Most recent value for each metric type
```

### 3.5 Health Goals Endpoints
```
GET /health-goals
  - Returns: List of active goals

POST /health-goals
  - Create new goal
  - Input: goal_name, metric_type, target_value, unit, target_unit_period, end_date

PUT /health-goals/{goal_id}
  - Update goal

DELETE /health-goals/{goal_id}
  - Delete goal

GET /health-goals/{goal_id}/progress
  - Returns: Current progress vs. target
```

### 3.6 Health Alerts Endpoints
```
GET /health-alerts
  - Returns: List of alert rules

POST /health-alerts
  - Create alert
  - Input: alert_name, metric_type, condition, threshold_value, notification_type

PUT /health-alerts/{alert_id}
  - Update alert

DELETE /health-alerts/{alert_id}
  - Delete alert

GET /health-alerts/triggers
  - Query params: start_date, end_date, acknowledged
  - Returns: List of triggered alerts

POST /health-alerts/triggers/{trigger_id}/acknowledge
  - Mark alert as read

GET /health-alerts/triggers/recent
  - Returns: Last 10 triggered alerts
```

### 3.7 Dashboard Endpoints
```
GET /dashboard/summary
  - Returns: Health overview
  - Data: Latest metrics, active goals, recent alerts, uptime status
  - Response structure:
    {
      "latest_metrics": {...},
      "goals_progress": [...],
      "recent_alerts": [...],
      "health_score": 75
    }
```

---

## 4. Frontend Structure (React + TypeScript + Next.js)

### 4.1 Project Structure
```
frontend/
├── pages/
│   ├── index.tsx (Landing/Dashboard)
│   ├── auth/
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   └── reset-password.tsx
│   ├── health-services.tsx
│   ├── add-health-service.tsx
│   ├── metrics.tsx
│   ├── goals.tsx
│   ├── alerts.tsx
│   └── profile.tsx
├── components/
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── Dashboard/
│   │   ├── HealthSummary.tsx
│   │   ├── RecentAlerts.tsx
│   │   └── GoalsProgress.tsx
│   ├── Services/
│   │   ├── ServicesList.tsx
│   │   └── AddServiceForm.tsx
│   ├── Metrics/
│   │   ├── MetricsChart.tsx
│   │   └── MetricsTrend.tsx
│   ├── Goals/
│   │   ├── GoalsList.tsx
│   │   └── AddGoalForm.tsx
│   ├── Alerts/
│   │   ├── AlertsList.tsx
│   │   └── CreateAlertForm.tsx
│   └── Common/
│       ├── Loading.tsx
│       ├── Error.tsx
│       └── Modal.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useHealthMetrics.ts
│   ├── useHealthServices.ts
│   ├── useFetch.ts
│   └── useLocalStorage.ts
├── context/
│   ├── AuthContext.tsx
│   └── NotificationContext.tsx
├── utils/
│   ├── api.ts (API client)
│   ├── auth.ts (Auth helpers)
│   ├── formatting.ts (Date, number formatting)
│   └── validators.ts
├── types/
│   ├── index.ts (Global types)
│   ├── user.ts
│   ├── health.ts
│   └── api.ts
└── styles/
    └── globals.css (Tailwind)
```

### 4.2 Core Pages
```
1. Login Page (pages/auth/login.tsx)
   - Email & password input
   - "Forgot Password" & "Sign Up" links

2. Sign Up Page (pages/auth/signup.tsx)
   - Email, password, name, DOB, gender fields
   - Email verification

3. Dashboard (pages/index.tsx)
   - Health overview cards
   - Recent alerts widget
   - Quick goals progress
   - Latest metrics display

4. Health Services (pages/health-services.tsx)
   - List of connected services
   - Add Service button
   - Disconnect button per service
   - Last sync time per service

5. Add Health Service (pages/add-health-service.tsx)
   - Select service type (dropdown)
   - Connect button (OAuth flow)
   - Success/Error message

6. Metrics Dashboard (pages/metrics.tsx)
   - Charts for each metric type
   - Date range selector
   - Download data button

7. Goals (pages/goals.tsx)
   - List of active goals
   - Progress bars
   - Add Goal button
   - Edit/Delete per goal

8. Alerts (pages/alerts.tsx)
   - List of alert rules
   - Create Alert button
   - Recent alert triggers list
   - Edit/Delete per alert

9. User Profile (pages/profile.tsx)
   - Name, email, DOB, gender
   - Height, weight, medical conditions
   - Medications list
   - API Key management
   - Logout button
```

---

## 5. Data Flow & Architecture

### 5.1 User Authentication Flow

**Email/Password Flow:**
```
User (Frontend) → Login Form
↓
POST /auth/login → Backend
↓
Verify Email & Password → Database
↓
Generate JWT Token
↓
Return {auth_token, refresh_token}
↓
Frontend Stores Token (localStorage/sessionStorage)
↓
Include token in all subsequent requests (Authorization header)
```

**OAuth 2.0 Flow:**
```
User (Frontend) → Click "Sign in with [Google/Microsoft/etc]"
↓
Redirect to GET /auth/oauth/{provider}/authorize
↓
Backend redirects to OAuth provider (Google/Microsoft/etc)
↓
User grants permission on provider's consent screen
↓
OAuth provider redirects to GET /auth/oauth/{provider}/callback
↓
Backend exchanges auth code for access_token from provider
↓
Backend retrieves user info from OAuth provider
↓
Check if user exists in DB:
  - If exists: Update oauth_id, oauth_email
  - If not exists: Create new user with auth_provider, oauth_id
↓
Generate JWT Token & refresh_token
↓
Return {auth_token, refresh_token, user_info}
↓
Frontend Stores Token (localStorage/sessionStorage)
↓
Include token in all subsequent requests (Authorization header)
```

### 5.2 Health Data Sync Flow
```
User connects Fitbit/Apple Health
↓
OAuth redirect to Fitbit/Apple
↓
User grants permission
↓
Callback stores access_token & refresh_token in DB (encrypted)
↓
Backend scheduler runs every hour
↓
Fetch data from Fitbit API
↓
Store in HealthMetrics table
↓
Check if any alerts triggered
↓
Send notifications if needed
↓
Frontend polls GET /dashboard/summary (every 5 min or WebSocket)
↓
Display updated metrics to user
```

### 5.3 Alert Trigger Flow
```
New metric value received
↓
Check against all user's HealthAlerts
↓
If threshold crossed
  ↓
  Create AlertTrigger record
  ↓
  Send notification (email/webhook)
  ↓
  Update UI in real-time (WebSocket or polling)
  ↓
  Display in Alerts center
```

---

## 6. Integration with External APIs

### 6.1 Fitbit API
```
OAuth2 flow to get access_token
GET https://api.fitbit.com/1/user/-/activities/date/2024-01-15.json
Response: steps, calories, distance, heart_rate_zones
Store in HealthMetrics table
```

### 6.2 Apple Health
```
Use HealthKit framework (iOS) or CloudKit integration
Request user permission to read: HKQuantityTypeIdentifierStepCount, etc.
Sync data periodically
Store in HealthMetrics table
```

### 6.3 Manual Data Entry
```
User fills form with metric_type, value, recorded_at
POST /health-metrics
Stores immediately without external API call
```

---

## 7. GitHub OAuth 2.0 Integration

### 7.1 GitHub OAuth Configuration

**GitHub OAuth 2.0 Setup**
- Configuration:
  - Client ID & Client Secret: From GitHub App settings (https://github.com/settings/developers)
  - Redirect URI: https://api.healthmonitoring.com/auth/github/callback
  - Authorization callback URL: https://api.healthmonitoring.com/auth/github/callback
- Scopes: user:email (read email addresses from user profile)
- User Info Retrieved: id (GitHub user ID), login (username), email, name, avatar_url

### 7.2 Backend Implementation (Spring Boot)

**Dependencies:**
```xml
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-oauth2-client</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webflux</artifactId>
</dependency>
```

**Configuration (application.yml):**
```yaml
spring:
  security:
    oauth2:
      client:
        registration:
          github:
            clientId: ${GITHUB_CLIENT_ID}
            clientSecret: ${GITHUB_CLIENT_SECRET}
            scope: user:email
        provider:
          github:
            authorization-uri: https://github.com/login/oauth/authorize
            token-uri: https://github.com/login/oauth/access_token
            user-info-uri: https://api.github.com/user
            user-name-attribute: login
```

**User Mapping Logic:**
```
1. User clicks "Sign in with GitHub"
2. Backend initiates OAuth flow: GET /auth/github/authorize
3. User redirected to GitHub consent screen
4. GitHub redirects back to: GET /auth/github/callback?code=...&state=...
5. Backend exchanges code for access_token
6. Backend fetches user info from GitHub API
7. Extract: github_id, github_username, email, name
8. Check if user exists by github_id
9. If exists: Update last_login
10. If not exists: Create new user with:
    - auth_provider: 'github'
    - github_id: GitHub user's unique ID
    - github_username: GitHub username (login)
    - email: from GitHub user profile
    - first_name, last_name: parsed from name field
    - password_hash: null (GitHub OAuth users don't have passwords)
11. Generate JWT tokens (15 min expiry)
12. Return auth_token & refresh_token to frontend
```

### 7.3 Frontend Implementation (React + Next.js)

**Login Component (pages/auth/login.tsx):**
```typescript
- Email/password login form
- "Sign in with GitHub" button
- On GitHub button click: redirect to /auth/github/authorize
- Handle callback and token storage

Example:
  const handleGitHubSignIn = () => {
    window.location.href = '/auth/github/authorize';
  };
```

**OAuth Redirect Flow:**
```
1. User clicks "Sign in with GitHub" button
   ↓
2. Frontend: window.location.href = '/auth/github/authorize'
   ↓
3. Backend redirects to GitHub OAuth consent screen
   ↓
4. User grants permission on GitHub
   ↓
5. GitHub redirects to: GET /auth/github/callback?code=...&state=...
   ↓
6. Backend processes, creates/updates user, generates JWT
   ↓
7. Backend redirects to: https://app.healthmonitoring.com/?token={jwt_token}
   ↓
8. Frontend extracts token from URL, stores in localStorage
   ↓
9. Frontend redirects to dashboard (/)
```

### 7.4 Security Best Practices

**Token Storage:**
- GitHub access token: Encrypted in database, backend-only (NOT sent to frontend)
- JWT token (for frontend): Short-lived (15 min), stored in localStorage or httpOnly cookie
- Refresh token: Longer-lived (7 days), stored securely in httpOnly cookie

**PKCE & State Parameter:**
- Generate random state for each OAuth request
- Validate state in callback to prevent CSRF attacks
- Store state in session with short TTL (10 minutes)

**Never Expose GitHub Token:**
- GitHub access token remains on backend only
- Frontend only receives JWT from our backend
- GitHub token used only for fetching user info on callback

### 7.5 User Experience

**First-time GitHub Login:**
- User clicks "Sign in with GitHub"
- Grants permission to read email
- Backend auto-creates account with GitHub user info
- No email verification needed (GitHub already verified)
- Optionally prompt for DOB, gender in profile completion screen

**Returning GitHub User:**
- Click "Sign in with GitHub" → Auto-login if account exists
- Matched by github_id

**Email/Password Users:**
- Still supported for users who prefer traditional login
- Can use either method independently

**Logout:**
- Clears JWT token
- GitHub access token deleted from backend
- No OAuth revocation needed (session-based)

---

## 8. Deployment Architecture

### 8.1 Docker
```
Dockerfile for Backend (Java Spring Boot)
- Base: openjdk:17-slim
- Copy JAR file
- Expose port 8080

Dockerfile for Frontend (Next.js)
- Base: node:18-alpine
- Build Next.js app
- Expose port 3000

docker-compose.yml (local dev)
- Backend service (port 8080)
- Frontend service (port 3000)
- PostgreSQL (port 5432)
- Redis (port 6379)
```

### 7.2 Kubernetes
```
Deployments:
- backend-deployment.yaml (replicas: 2)
- frontend-deployment.yaml (replicas: 2)

Services:
- backend-service (ClusterIP)
- frontend-service (ClusterIP)

Ingress:
- Expose frontend & backend APIs via ingress controller
- HTTPS with cert-manager

ConfigMaps:
- Database connection strings
- API endpoints
- Log levels
- GitHub OAuth redirect URI

Secrets:
- Database passwords
- JWT secret
- Third-party API keys (Fitbit, Apple)
- GitHub OAuth Client ID
- GitHub OAuth Client Secret

PersistentVolume:
- PostgreSQL data storage
```

### 8.3 Azure Deployment
```
1. Create AKS cluster
2. Create Azure Container Registry (ACR)
3. Push Docker images to ACR
4. Deploy to AKS using kubectl
5. Use Azure Database for PostgreSQL (managed)
6. Use Azure Cache for Redis (managed)
7. Configure Azure Key Vault for:
   - GitHub OAuth Client Secret
   - Database passwords
   - JWT signing key
   - API keys (Fitbit, Apple)
8. Configure Azure Application Insights for monitoring
9. Setup CI/CD with Azure DevOps / GitHub Actions
   - Auto-deploy on merge to main
   - GitHub OAuth credentials injected from Key Vault
```

---

## 9. Security Considerations

### 9.1 Authentication & Authorization
- JWT tokens with expiration (15 min access, 7 day refresh)
- Refresh token rotation
- Password hashing (bcrypt) for email/password users
- Email verification for new email/password signups (skip for OAuth)
- OAuth PKCE flow for additional security

### 9.2 GitHub OAuth Security
- State parameter validation to prevent CSRF
- Secure storage of GitHub access tokens (encrypted in DB, never in frontend)
- HTTPS-only redirect URIs
- GitHub access token not used beyond initial user info fetch
- Scope limitation (only user:email, nothing more)

### 9.3 Data Protection
- Encrypt sensitive data (access_tokens) at rest
- HTTPS/TLS for all communications
- Input validation & sanitization
- SQL injection prevention (parameterized queries)

### 9.4 Third-party API Keys
- Store encrypted in Azure Key Vault
- Never expose in frontend code
- Rotate regularly
- GitHub OAuth Client Secret managed via Key Vault

### 9.5 Rate Limiting
- API rate limiting to prevent abuse
- Implement per user/IP
- Higher limits for authenticated users

---

## 10. Development Phases

### Phase 1: Foundation (Week 1-2)
- [x] Project planning & architecture
- [ ] Database schema & models
- [ ] Backend setup (Spring Boot, PostgreSQL)
- [ ] Frontend setup (Next.js, TypeScript)
- [ ] Docker configuration

### Phase 2: Core Features (Week 3-5)
- [ ] User authentication (email/password login, signup, password reset)
- [ ] GitHub OAuth 2.0 integration
- [ ] GitHub OAuth credentials setup
- [ ] Health Services CRUD
- [ ] Manual health data entry
- [ ] Basic dashboard

### Phase 3: Integrations (Week 6-7)
- [ ] Fitbit API integration
- [ ] Apple Health integration
- [ ] Automated data sync

### Phase 4: Advanced Features (Week 8-9)
- [ ] Health goals
- [ ] Alerts & notifications
- [ ] Metrics trends & charts

### Phase 5: Deployment (Week 10)
- [ ] Docker & Docker Compose
- [ ] Kubernetes manifests
- [ ] Azure deployment
- [ ] CI/CD pipeline

### Phase 6: Polish & Testing (Week 11-12)
- [ ] Unit tests
- [ ] Integration tests
- [ ] Performance optimization
- [ ] Security audit

---

## 11. Next Steps

1. **Database Schema** - Deep dive into PostgreSQL design
2. **Backend Setup** - Initialize Spring Boot project & create models
3. **Frontend Setup** - Initialize Next.js project & components
4. **API Development** - Implement authentication & core endpoints
5. **Testing & Deployment** - Docker, K8s, Azure setup

---

## 12. Files to Create

- [ ] Backend project (pom.xml, application.properties, entity classes)
- [ ] Frontend project (package.json, tsconfig.json, pages & components)
- [ ] Docker files (Dockerfile for backend, frontend, docker-compose.yml)
- [ ] Kubernetes manifests (deployments, services, ingress)
- [ ] Database migration scripts (SQL schema)
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Environment configuration (.env files)
- [ ] CI/CD pipeline (GitHub Actions / Azure DevOps)

---

**Ready to break down any section further?**
