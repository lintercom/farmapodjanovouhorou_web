import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AdminProvider } from "./contexts/AdminContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import { startVisibleTextNormalization } from "./utils/normalizeVisibleText";

// Load migration tools for console access
if (import.meta.env.DEV) {
  import("./utils/quickMigrate");
}

function App() {
  useEffect(() => {
    return startVisibleTextNormalization();
  }, []);

  return (
    <AdminProvider>
      <RouterProvider router={router} />
    </AdminProvider>
  );
}

export default App;