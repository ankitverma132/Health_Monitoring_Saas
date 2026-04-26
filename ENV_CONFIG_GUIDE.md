# Environment Configuration Guide

This document explains all environment variables available for the Health Monitoring SaaS frontend application.

## Quick Start

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` with your desired configuration

3. Restart the development server for changes to take effect

## Environment Variables

### API Configuration

#### `NEXT_PUBLIC_API_URL`
- **Type**: String
- **Default**: `http://localhost:8080/api`
- **Description**: Base URL for the backend API
- **Example**:
  ```
  NEXT_PUBLIC_API_URL=http://localhost:3001/api
  NEXT_PUBLIC_API_URL=https://api.example.com/api
  ```

### Mock Data Configuration

#### `NEXT_PUBLIC_USE_MOCK_DATA`
- **Type**: Boolean (`true` | `false`)
- **Default**: `true`
- **Description**: Enable/disable mock data mode
- **When to use**:
  - `true` - Development without backend (mock responses)
  - `false` - Production or with real backend API
- **Example**:
  ```
  NEXT_PUBLIC_USE_MOCK_DATA=true
  ```

#### `NEXT_PUBLIC_MOCK_DEFAULT_USER_ID`
- **Type**: String
- **Default**: `1`
- **Description**: Default user ID for mock data generation
- **Example**:
  ```
  NEXT_PUBLIC_MOCK_DEFAULT_USER_ID=1
  NEXT_PUBLIC_MOCK_DEFAULT_USER_ID=2
  ```

#### `NEXT_PUBLIC_MOCK_DEFAULT_PROFILE`
- **Type**: String (`demo` | `athlete` | `patient`)
- **Default**: `demo`
- **Description**: Default user profile type for mock data
- **Profile Details**:
  - `demo` - John Doe, moderate activity, balanced health metrics
  - `athlete` - Sarah Smith, high activity, low resting heart rate
  - `patient` - Michael Johnson, low activity, monitoring needed
- **Example**:
  ```
  NEXT_PUBLIC_MOCK_DEFAULT_PROFILE=athlete
  ```

#### `NEXT_PUBLIC_MOCK_REALISTIC_VARIATIONS`
- **Type**: Boolean (`true` | `false`)
- **Default**: `true`
- **Description**: Add random variations to mock metrics for realism
- **Example**:
  ```
  NEXT_PUBLIC_MOCK_REALISTIC_VARIATIONS=true
  ```

#### `NEXT_PUBLIC_MOCK_API_DELAY`
- **Type**: Number (milliseconds)
- **Default**: `0`
- **Description**: Simulate API network delay
- **Use Cases**:
  - `0` - Instant responses (fast testing)
  - `300-500` - Realistic network delay
  - `1000` - Slow network simulation
- **Example**:
  ```
  NEXT_PUBLIC_MOCK_API_DELAY=0
  NEXT_PUBLIC_MOCK_API_DELAY=500
  ```

### Application Configuration

#### `NEXT_PUBLIC_APP_NAME`
- **Type**: String
- **Default**: `Health Monitoring SaaS`
- **Description**: Application name for display
- **Example**:
  ```
  NEXT_PUBLIC_APP_NAME=Health Tracker Pro
  ```

#### `NEXT_PUBLIC_ENVIRONMENT`
- **Type**: String (`development` | `staging` | `production`)
- **Default**: `development`
- **Description**: Current environment
- **Example**:
  ```
  NEXT_PUBLIC_ENVIRONMENT=development
  ```

#### `NEXT_PUBLIC_DEBUG`
- **Type**: Boolean (`true` | `false`)
- **Default**: `true`
- **Description**: Enable debug logging and utilities
- **Example**:
  ```
  NEXT_PUBLIC_DEBUG=true
  ```

### UI Configuration

#### `NEXT_PUBLIC_THEME_MODE`
- **Type**: String (`light` | `dark` | `auto`)
- **Default**: `light`
- **Description**: Application theme mode
- **Example**:
  ```
  NEXT_PUBLIC_THEME_MODE=dark
  ```

#### `NEXT_PUBLIC_EXPERIMENTAL_FEATURES`
- **Type**: Boolean (`true` | `false`)
- **Default**: `false`
- **Description**: Enable experimental/beta features
- **Example**:
  ```
  NEXT_PUBLIC_EXPERIMENTAL_FEATURES=true
  ```

### Feature Flags

Control which features are available in the application:

#### `NEXT_PUBLIC_FEATURE_METRICS`
- **Default**: `true`
- **Description**: Enable health metrics dashboard

#### `NEXT_PUBLIC_FEATURE_GOALS`
- **Default**: `true`
- **Description**: Enable health goals management

#### `NEXT_PUBLIC_FEATURE_ALERTS`
- **Default**: `true`
- **Description**: Enable health alerts

#### `NEXT_PUBLIC_FEATURE_WEARABLES`
- **Default**: `true`
- **Description**: Enable wearable device integration

#### `NEXT_PUBLIC_FEATURE_PROFILE`
- **Default**: `true`
- **Description**: Enable user profile management

**Example - Disable specific features**:
```
NEXT_PUBLIC_FEATURE_ALERTS=false
NEXT_PUBLIC_FEATURE_WEARABLES=false
```

### Third-Party Services

#### `NEXT_PUBLIC_GITHUB_CLIENT_ID`
- **Type**: String
- **Default**: Empty
- **Description**: GitHub OAuth client ID for authentication
- **Example**:
  ```
  NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id_here
  ```

#### `NEXT_PUBLIC_SENTRY_DSN`
- **Type**: String (URL)
- **Default**: Empty
- **Description**: Sentry error tracking endpoint
- **Example**:
  ```
  NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
  ```

#### `NEXT_PUBLIC_GA_ID`
- **Type**: String
- **Default**: Empty
- **Description**: Google Analytics tracking ID
- **Example**:
  ```
  NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
  ```

### Monitoring

#### `NEXT_PUBLIC_ENABLE_MONITORING`
- **Type**: Boolean (`true` | `false`)
- **Default**: `false`
- **Description**: Enable application monitoring
- **Example**:
  ```
  NEXT_PUBLIC_ENABLE_MONITORING=true
  ```

---

## Common Configuration Scenarios

### Scenario 1: Development with Mock Data
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_USE_MOCK_DATA=true
NEXT_PUBLIC_MOCK_DEFAULT_PROFILE=demo
NEXT_PUBLIC_MOCK_API_DELAY=0
NEXT_PUBLIC_DEBUG=true
```

### Scenario 2: Development with Backend + Network Simulation
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_USE_MOCK_DATA=false
NEXT_PUBLIC_MOCK_API_DELAY=500
NEXT_PUBLIC_DEBUG=true
```

### Scenario 3: Testing Different User Profiles
```
NEXT_PUBLIC_USE_MOCK_DATA=true
NEXT_PUBLIC_MOCK_DEFAULT_USER_ID=1
NEXT_PUBLIC_MOCK_DEFAULT_PROFILE=athlete
NEXT_PUBLIC_MOCK_REALISTIC_VARIATIONS=true
```

### Scenario 4: Production
```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_USE_MOCK_DATA=false
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_DEBUG=false
NEXT_PUBLIC_ENABLE_MONITORING=true
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

---

## Runtime Configuration via Console

You can also override configuration at runtime using browser console:

```javascript
// Import mock utilities (available in console)
mockUtils.setUser('2', 'athlete')
mockUtils.setApiDelay(500)
mockUtils.setRealisticVariations(true)
mockUtils.reset()

// View configuration
mockUtils.printConfig()
mockUtils.help()
```

---

## Important Notes

1. **Environment variables with `NEXT_PUBLIC_` prefix** are exposed to the browser. Don't put secrets here.

2. **Restart the server** after changing `.env.local`:
   ```bash
   npm run dev
   ```

3. **`.env.local` is gitignored** - it won't be committed to version control.

4. **Use `.env.example`** as a template for new environments.

5. **Runtime console utilities** (`mockUtils`) provide additional flexibility without restarting the server.
