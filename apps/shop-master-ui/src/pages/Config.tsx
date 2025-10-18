import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Alert,
} from "ui";
import {
  getConfig,
  saveConfig,
  resetConfig,
  AppConfig,
} from "../utils/configStorage";

const ConfigPage = () => {
  const [config, setConfig] = useState<AppConfig>({
    apiBaseUrl: "",
    imageBaseUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    const currentConfig = getConfig();
    setConfig(currentConfig);
  }, []);

  const handleInputChange = (field: keyof AppConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      // Validate URLs
      const urlFields: (keyof AppConfig)[] = ["apiBaseUrl", "imageBaseUrl"];
      for (const field of urlFields) {
        if (config[field]) {
          new URL(config[field] as string);
        }
      }

      saveConfig(config);
      setMessage({
        type: "success",
        text: "Configuration saved successfully!",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: "Invalid URL format. Please check your URLs.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    resetConfig();
    const defaultConfig = getConfig();
    setConfig(defaultConfig);
    setMessage({ type: "success", text: "Configuration reset to defaults!" });
  };

  return (
    <Box className="mx-auto max-w-2xl p-6">
      <Typography variant="h4" className="mb-6">
        Application Configuration
      </Typography>

      {message && (
        <Alert
          severity={message.type}
          className="mb-4"
          onClose={() => setMessage(null)}
        >
          {message.text}
        </Alert>
      )}

      <Card>
        <CardContent className="space-y-6">
          <Box>
            <Typography variant="h6" className="mb-2">
              Backend URLs
            </Typography>
            <Typography variant="body2" color="text.secondary" className="mb-4">
              Configure the backend API endpoints for your application.
            </Typography>
          </Box>

          <TextField
            label="API Base URL"
            value={config.apiBaseUrl}
            onChange={(e) => handleInputChange("apiBaseUrl", e.target.value)}
            fullWidth
            placeholder="http://localhost:9000"
            helperText="Main API endpoint for data operations"
          />

          <TextField
            label="Image Base URL"
            value={config.imageBaseUrl}
            onChange={(e) => handleInputChange("imageBaseUrl", e.target.value)}
            fullWidth
            placeholder="http://localhost:9000"
            helperText="Base URL for image assets and uploads"
          />

          <Box className="flex gap-4 pt-4">
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Configuration"}
            </Button>

            <Button
              variant="outlined"
              onClick={handleReset}
              disabled={isLoading}
            >
              Reset to Defaults
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Box className="mt-6 rounded-lg bg-gray-50 p-4">
        <Typography variant="body2" color="text.secondary">
          <strong>Note:</strong> Changes will take effect immediately. Make sure
          the URLs are accessible and the services are running before saving.
        </Typography>
      </Box>
    </Box>
  );
};

export default ConfigPage;
