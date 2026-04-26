# Quick Reference - Mock Configuration (Simplified)

## 🚀 Common Tasks

### Enable/Disable Mock Data

Edit `.env.local`:
```bash
NEXT_PUBLIC_USE_MOCK_DATA=true   # Use mock data
NEXT_PUBLIC_USE_MOCK_DATA=false  # Use real API
```

Restart server:
```bash
npm run dev
```

---

### Simulate Network Delay

Option 1: Via `.env.local`
```
NEXT_PUBLIC_MOCK_API_DELAY=500  # 500ms delay
```

Option 2: Via console
```javascript
mockUtils.setApiDelay(1000)  // 1 second delay
mockUtils.refresh()
```

---

### Disable Mock & Use Real API

Edit `.env.local`:
```
NEXT_PUBLIC_USE_MOCK_DATA=false
```

Or via console:
```javascript
mockUtils.disable()
mockUtils.refresh()
```

---

### View Current Configuration

```javascript
mockUtils.printConfig()
```

Output:
```javascript
{
  enableMockData: true,
  realisticVariations: true,
  apiDelay: 0
}
```

---

### View All Mock Data

```javascript
mockUtils.printAll()
```

Shows:
- Configuration
- User profile
- Health metrics
- Health goals
- Alerts
- Wearable services

---

### Reset to Defaults

```javascript
mockUtils.reset()
mockUtils.refresh()
```

---

## 📋 Configuration Files

### `.env.local` - Current Settings
```bash
# Edit this for your development environment
NEXT_PUBLIC_USE_MOCK_DATA=true
NEXT_PUBLIC_MOCK_API_DELAY=0
```

### `.env.example` - Template
```bash
# Shows all available variables
# Copy variables to .env.local and customize
```

---

## 👤 Single User Profile

All users get the same mock data:

**User: John Doe**
- Email: user@example.com
- Age: 34
- Height: 180 cm
- Weight: 75 kg

**Mock Health Data:**
- Heart Rate: ~72 bpm (with ±20 variation)
- Daily Steps: ~8,245 (with ±2000 variation)
- Sleep: ~7.5 hours (with ±1.5 variation)
- Weight: 75 kg
- Blood Pressure: 120/80 mmHg

---

## 🔄 Workflow Example

```bash
# 1. Start app (mock data auto-enabled)
npm run dev

# 2. Open http://localhost:3000

# 3. Login with any email/password

# 4. Open DevTools (F12) and check configuration
mockUtils.printAll()

# 5. View specific data
mockUtils.printMetrics()
mockUtils.printGoals()

# 6. Test with network delay
mockUtils.setApiDelay(2000)  # 2 second delay
mockUtils.refresh()

# 7. Disable mock and use real API
mockUtils.disable()
mockUtils.refresh()
```

---

## 💡 Tips

1. **Keep `.env.local` gitignored** - Never commit personal configs

2. **Use console for quick testing** - No server restart needed

3. **Enable realistic variations** by default:
   ```javascript
   mockUtils.setRealisticVariations(true)
   ```

4. **Add API delay** when testing loading states:
   ```javascript
   mockUtils.setApiDelay(2000)  // 2 second delay
   ```

5. **Check help anytime**:
   ```javascript
   mockUtils.help()
   ```

---

## 🐛 Troubleshooting

**Mock data not working?**
```javascript
// Check if mock is enabled
mockUtils.isEnabled()  // Should return true

// If false, enable it
mockUtils.enable()
mockUtils.refresh()
```

**Settings not persisting?**
```javascript
// Reset and try again
mockUtils.reset()
localStorage.clear()  // Clear all storage
mockUtils.refresh()
```

**Want to start fresh?**
```javascript
mockUtils.reset()
mockUtils.refresh()
```

---

## 📞 Console Commands

```javascript
// Enable/Disable
mockUtils.enable()
mockUtils.disable()
mockUtils.isEnabled()

// Configuration
mockUtils.setApiDelay(500)
mockUtils.getApiDelay()
mockUtils.setRealisticVariations(true)
mockUtils.reset()

// View Data
mockUtils.printConfig()
mockUtils.printUser()
mockUtils.printMetrics()
mockUtils.printGoals()
mockUtils.printAll()

// Utilities
mockUtils.refresh()          // Reload page
mockUtils.help()             // Show help
```

---

## 📊 Environment Variables

| Variable | Values | Default |
|----------|--------|---------|
| `NEXT_PUBLIC_USE_MOCK_DATA` | `true`/`false` | `true` |
| `NEXT_PUBLIC_MOCK_REALISTIC_VARIATIONS` | `true`/`false` | `true` |
| `NEXT_PUBLIC_MOCK_API_DELAY` | `0-5000` ms | `0` |
| `NEXT_PUBLIC_ENVIRONMENT` | `development`/`staging`/`production` | `development` |
| `NEXT_PUBLIC_DEBUG` | `true`/`false` | `true` |

---

## ✨ What Changed

**Removed:**
- ❌ Multiple user profiles (demo, athlete, patient)
- ❌ Profile-specific health data variations
- ❌ Environment variables for user ID and profile
- ❌ Runtime profile switching

**Kept:**
- ✅ Mock data factory
- ✅ Configurable API delay
- ✅ Realistic metric variations
- ✅ Easy enable/disable toggle
- ✅ Console utilities for quick testing
