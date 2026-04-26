/**
 * Mock Data Utilities
 * Provides helper functions to easily manage mock data during development
 * 
 * Usage in browser console:
 * - mockUtils.enable() - Enable mock data
 * - mockUtils.disable() - Disable mock data
 * - mockUtils.setApiDelay(500) - Set network delay
 * - mockUtils.printAll() - Show all mock data
 */

import {
  getMockConfig,
  setMockConfig,
  toggleMockData,
  isMockDataEnabled,
  getMockApiDelay,
  setMockApiDelay,
  hasRealisticVariations,
  resetMockConfig,
} from './mockConfig';

import { mockDataFactory } from './mockDataFactory';

export const mockUtils = {
  // Configuration getters/setters
  config: getMockConfig,
  setConfig: setMockConfig,

  // Data generation (all users get same data)
  generateUser: (userId: string = '1') => mockDataFactory.generateMockUser(userId),
  generateAuthResponse: (userId: string = '1') => mockDataFactory.generateMockAuthResponse(userId),
  generateMetrics: (userId: string = '1') => mockDataFactory.generateMockMetrics(userId),
  generateGoals: (userId: string = '1') => mockDataFactory.generateMockGoals(userId),
  generateAlerts: (userId: string = '1') => mockDataFactory.generateMockAlerts(userId),
  generateServices: (userId: string = '1') => mockDataFactory.generateMockServices(userId),

  // Mock data control
  enable: () => {
    toggleMockData(true);
    console.log('✅ Mock data enabled');
  },

  disable: () => {
    toggleMockData(false);
    console.log('✅ Mock data disabled - will use real API');
  },

  isEnabled: () => {
    const enabled = isMockDataEnabled();
    console.log(`Mock data is ${enabled ? 'enabled' : 'disabled'}`);
    return enabled;
  },

  // Configuration management
  setApiDelay: (delayMs: number) => {
    setMockApiDelay(delayMs);
    console.log(`✅ API delay set to ${delayMs}ms`);
  },

  getApiDelay: () => {
    const delay = getMockApiDelay();
    console.log(`Current API delay: ${delay}ms`);
    return delay;
  },

  setRealisticVariations: (enabled: boolean) => {
    setMockConfig({ realisticVariations: enabled });
    console.log(`✅ Realistic variations ${enabled ? 'enabled' : 'disabled'}`);
  },

  reset: () => {
    resetMockConfig();
    console.log('✅ Mock config reset to defaults');
  },

  // Utility functions
  refresh: () => {
    window.location.reload();
  },

  printConfig: () => {
    const config = getMockConfig();
    console.table(config);
  },

  printUser: () => {
    const user = mockDataFactory.generateMockUser('1');
    console.table(user);
  },

  printMetrics: () => {
    const metrics = mockDataFactory.generateMockMetrics('1');
    console.table(metrics);
  },

  printGoals: () => {
    const goals = mockDataFactory.generateMockGoals('1');
    console.table(goals);
  },

  printAll: () => {
    console.group('Mock Data');
    console.log('Config:', getMockConfig());
    console.log('User:', mockDataFactory.generateMockUser('1'));
    console.log('Metrics:', mockDataFactory.generateMockMetrics('1'));
    console.log('Goals:', mockDataFactory.generateMockGoals('1'));
    console.log('Alerts:', mockDataFactory.generateMockAlerts('1'));
    console.log('Services:', mockDataFactory.generateMockServices('1'));
    console.groupEnd();
  },

  // Quick start examples
  help: () => {
    console.log(`
╔════════════════════════════════════════════════════════════════╗
║                  MOCK DATA UTILITIES                           ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  MOCK DATA CONTROL:                                            ║
║  ├─ mockUtils.enable()                  - Enable mock data    ║
║  ├─ mockUtils.disable()                 - Disable mock data   ║
║  ├─ mockUtils.isEnabled()               - Check status        ║
║  │                                                             ║
║  CONFIGURATION:                                                ║
║  ├─ mockUtils.setApiDelay(300)          - Set API delay (ms)  ║
║  ├─ mockUtils.getApiDelay()             - Get API delay       ║
║  ├─ mockUtils.setRealisticVariations()  - Toggle variations   ║
║  ├─ mockUtils.reset()                   - Reset to defaults   ║
║  │                                                             ║
║  DATA GENERATION:                                              ║
║  ├─ mockUtils.generateMetrics('1')      - Get metrics data    ║
║  ├─ mockUtils.generateGoals('1')        - Get goals data      ║
║  ├─ mockUtils.generateAlerts('1')       - Get alerts data     ║
║  ├─ mockUtils.generateServices('1')     - Get services data   ║
║  │                                                             ║
║  DEBUGGING:                                                    ║
║  ├─ mockUtils.printConfig()             - Print config        ║
║  ├─ mockUtils.printUser()               - Print user data     ║
║  ├─ mockUtils.printMetrics()            - Print metrics       ║
║  ├─ mockUtils.printAll()                - Print everything    ║
║  ├─ mockUtils.help()                    - Show this help      ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
    `);
  },
};

// Export for global access
if (typeof window !== 'undefined') {
  (window as any).mockUtils = mockUtils;
}

export default mockUtils;
