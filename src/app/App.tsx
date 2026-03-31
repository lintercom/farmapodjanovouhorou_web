import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AdminProvider } from "./contexts/AdminContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import { startVisibleTextNormalization } from "./utils/normalizeVisibleText";
import { bootstrapAnalyticsShell, syncAnalyticsScripts } from "./utils/analytics/runtime";
import { COOKIE_CONSENT_CHANGE_EVENT } from "./utils/cookieConsent";

// Load migration tools for console access
if (import.meta.env.DEV) {
  import("./utils/quickMigrate");
}

function App() {
  useEffect(() => {
    return startVisibleTextNormalization();
  }, []);

  useEffect(() => {
    bootstrapAnalyticsShell();
    syncAnalyticsScripts();

    const onConsent = () => syncAnalyticsScripts();
    window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, onConsent);
    return () => window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, onConsent);
  }, []);

  return (
    <AdminProvider>
      <RouterProvider router={router} />
    </AdminProvider>
  );
}

export default App;