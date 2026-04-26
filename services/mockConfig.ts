// Mock Data Configuration - Single Profile
// All users get the same mock data for simplicity

export interface MockConfig {
  enableMockData: boolean;
  realisticVariations: boolean;
  apiDelay: number; // milliseconds
}

// Get default configuration from environment variables
function getDefaultConfig(): MockConfig {
  return {
    enableMockData: process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true',
    realisticVariations: process.env.NEXT_PUBLIC_MOCK_REALISTIC_VARIATIONS !== 'false',
    apiDelay: parseInt(process.env.NEXT_PUBLIC_MOCK_API_DELAY || '0', 10),
  };
}

// Default configuration
const defaultMockConfig = getDefaultConfig();

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

// Toggle mock data on/off
export function toggleMockData(enabled: boolean): void {
  setMockConfig({ enableMockData: enabled });
}

// Get mock data enabled status
export function isMockDataEnabled(): boolean {
  return getMockConfig().enableMockData;
}

// Get API delay setting
export function getMockApiDelay(): number {
  return getMockConfig().apiDelay;
}

// Set API delay
export function setMockApiDelay(delay: number): void {
  setMockConfig({ apiDelay: delay });
}

// Get realistic variations setting
export function hasRealisticVariations(): boolean {
  return getMockConfig().realisticVariations;
}

// Reset configuration to defaults
export function resetMockConfig(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('mockConfig');
  }
}
