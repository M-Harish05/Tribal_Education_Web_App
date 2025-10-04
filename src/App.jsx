import React from "react";
import Routes from "./Routes";
import { AuthProvider } from "./contexts/AuthContext";
import { ProgressProvider } from "./contexts/ProgressContext";
import { LanguageProvider } from "./contexts/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ProgressProvider>
          <Routes />
        </ProgressProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;