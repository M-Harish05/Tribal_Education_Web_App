import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import BasicLiteracyLearning from './pages/basic-literacy-learning';
import ProgressTracking from './pages/progress-tracking';
import GovernmentSchemesHub from './pages/government-schemes-hub';
import TraditionalKnowledge from './pages/traditional-knowledge';
import LoginAuthentication from './pages/login-authentication';
import DashboardHome from './pages/dashboard-home';
import StoriesGames from './pages/stories-games';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<DashboardHome />} />
        <Route path="/basic-literacy-learning" element={<BasicLiteracyLearning />} />
        <Route path="/progress-tracking" element={<ProgressTracking />} />
        <Route path="/government-schemes-hub" element={<GovernmentSchemesHub />} />
        <Route path="/traditional-knowledge" element={<TraditionalKnowledge />} />
        <Route path="/login-authentication" element={<LoginAuthentication />} />
        <Route path="/dashboard-home" element={<DashboardHome />} />
        <Route path="/stories-games" element={<StoriesGames />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
