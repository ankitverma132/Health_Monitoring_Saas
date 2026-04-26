// Mock Data Configuration
// This allows you to easily switch between different user profiles and mock scenarios

export interface MockConfig {
  userId: string;
  enableMockData: boolean;
  userProfile?: string; // 'demo', 'athlete', 'patient', 'custom'
}

// Default configuration
export const defaultMockConfig: MockConfig = {
  userId: '1',
  enableMockData: true,
  userProfile: 'demo',
};

// Get current mock configuration
export function getMockConfig(): MockConfig {
  if (typeof window === 'undefined') {
    return defaultMockConfig;
  }

  const stored = localStorage.getItem('mockConfig');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultMockConfig;
    }
  }

  return defaultMockConfig;
}

// Set mock configuration
export function setMockConfig(config: Partial<MockConfig>): MockConfig {
  const current = getMockConfig();
  const updated = { ...current, ...config };

  if (typeof window !== 'undefined') {
    localStorage.setItem('mockConfig', JSON.stringify(updated));
  }

  return updated;
}

// Set current user for mock data
export function setMockUserId(userId: string): void {
  setMockConfig({ userId });
}

// Get current user ID for mock data
export function getMockUserId(): string {
  return getMockConfig().userId;
}

// Toggle mock data on/off
export function toggleMockData(enabled: boolean): void {
  setMockConfig({ enableMockData: enabled });
}

// Get mock data enabled status
export function isMockDataEnabled(): boolean {
  return getMockConfig().enableMockData;
}

// Set user profile type
export function setMockUserProfile(profile: string): void {
  setMockConfig({ userProfile: profile });
}

// Get user profile type
export function getMockUserProfile(): string {
  return getMockConfig().userProfile || 'demo';
}
