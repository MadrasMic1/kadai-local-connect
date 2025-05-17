
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.0b9cbbec6fa34020962467db3be0a167',
  appName: 'kadai-local-connect',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: "https://0b9cbbec-6fa3-4020-9624-67db3be0a167.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#9b87f5",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP"
    }
  },
  android: {
    backgroundColor: "#ffffff"
  }
};

export default config;
