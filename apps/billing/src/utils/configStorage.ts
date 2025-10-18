export interface AppConfig {
  apiBaseUrl: string;
  imageBaseUrl: string;
  printerApiBaseUrl?: string;
}

const CONFIG_STORAGE_KEY = "app_config";

export const getConfig = (): AppConfig => {
  try {
    const stored = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error parsing config from localStorage:", error);
  }

  // Return default values from environment variables
  return {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:9000",
    imageBaseUrl:
      import.meta.env.VITE_IMAGE_BASE_URL || "http://localhost:9000",
    printerApiBaseUrl:
      import.meta.env.VITE_PRINTER_API_BASE_URL || "http://localhost:9001",
  };
};

export const saveConfig = (config: Partial<AppConfig>): void => {
  try {
    const currentConfig = getConfig();
    const updatedConfig = { ...currentConfig, ...config };
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(updatedConfig));
  } catch (error) {
    console.error("Error saving config to localStorage:", error);
  }
};

export const resetConfig = (): void => {
  try {
    localStorage.removeItem(CONFIG_STORAGE_KEY);
  } catch (error) {
    console.error("Error removing config from localStorage:", error);
  }
};

export const getApiBaseUrl = (): string => {
  return getConfig().apiBaseUrl;
};

export const getImageBaseUrl = (): string => {
  return getConfig().imageBaseUrl;
};

export const getPrinterApiBaseUrl = (): string => {
  return getConfig().printerApiBaseUrl || "";
};
