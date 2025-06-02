import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import OnboardingLayout from "../layouts/OnboardingLayout";
import Onboarding from "../screens/onboarding/Onboarding";
import EmailVerification from "../screens/onboarding/EmailVerification";
import NotFound from "../screens/Error/NotFound";
import Register from "../screens/auth/Register";
import Login from "../screens/auth/Login";
import ForgotPassword from "../screens/auth/ForgotPassword";
import ForgotPassLayout from "../layouts/ForgotPassLayout";
import ResetPassword from "../screens/auth/ResetPassword";
import ResetPassOTP from "../screens/auth/ResetPassOTP";
import Dashboard from "../screens/dashboard/Dashboard";
import CreateWebsite from "../screens/dashboard/CreateWebsite";
import EmailCampaigns from "../screens/dashboard/EmailCampaigns";
import EmailSubscribers from "../components/dashboard/EmailCampaign/EmailSubscribers";
import EmailTemplates from "../components/dashboard/EmailCampaign/EmailTemplates";
import SocialScheduler from "../screens/dashboard/SocialScheduler";
import SEO from "../screens/dashboard/SEO";
import AdsManager from "../screens/dashboard/AdsManager";
import Templates from "../components/dashboard/Website/Templates";
import WebsiteAnalytics from "../components/dashboard/Website/WebsiteAnalytics";
import AllCampaigns from "../components/dashboard/EmailCampaign/AllCampaigns";
import SiteAudit from "../components/dashboard/seo/SiteAudit";
import DomainOverview from "../components/dashboard/seo/DomainOverview";
import TrafficAnalytics from "../components/dashboard/seo/TrafficAnalytics";
import KeywordOverview from "../components/dashboard/seo/KeywordOverview";
import BacklinkAudit from "../components/dashboard/seo/BacklinkAudit";
import BacklinkAnalytic from "../components/dashboard/seo/BacklinkAnalytic";
import ProtectedRoute from '../routes/ProtectedRoute';
import PublicRoute from '../routes/PublicRoute';
import { AuthProvider } from '../context/UseAuth';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      // Public routes (onboarding)
      {
        element: <OnboardingLayout />,
        children: [
          {
            path: "/",
            element: (
              <PublicRoute restricted={true}>
                <Onboarding />
              </PublicRoute>
            ),
          },
          {
            path: "/verify",
            element: (
              <PublicRoute>
                <EmailVerification />
              </PublicRoute>
            ),
          },
          {
            path: "/register",
            element: (
              <PublicRoute restricted={true}>
                <Register />
              </PublicRoute>
            ),
          },
        ],
      },

      // Auth routes (restricted - redirect to dashboard if logged in)
      {
        path: "/login",
        element: (
          <PublicRoute restricted={true}>
            <Login />
          </PublicRoute>
        ),
      },
      {
        element: <ForgotPassLayout />,
        children: [
          {
            path: "/forgot-password",
            element: (
              <PublicRoute restricted={true}>
                <ForgotPassword />
              </PublicRoute>
            ),
          },
          {
            path: "/enter-otp",
            element: (
              <PublicRoute restricted={true}>
                <ResetPassOTP />
              </PublicRoute>
            ),
          },
          {
            path: "/change-password",
            element: (
              <PublicRoute restricted={true}>
                <ResetPassword />
              </PublicRoute>
            ),
          },
        ],
      },

      // Protected routes (require authentication)
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/create-website",
        element: (
          <ProtectedRoute>
            <CreateWebsite />
          </ProtectedRoute>
        ),
      },
      {
        path: "/create-website/templates",
        element: (
          <ProtectedRoute>
            <Templates />
          </ProtectedRoute>
        ),
      },
      {
        path: "/create-website/analytics",
        element: (
          <ProtectedRoute>
            <WebsiteAnalytics />
          </ProtectedRoute>
        ),
      },
      {
        path: "/social-scheduler",
        element: (
          <ProtectedRoute>
            <SocialScheduler />
          </ProtectedRoute>
        ),
      },
      {
        path: "/ads-manager",
        element: (
          <ProtectedRoute>
            <AdsManager />
          </ProtectedRoute>
        ),
      },
      {
        path: "/seo-tools",
        element: (
          <ProtectedRoute>
            <SEO />
          </ProtectedRoute>
        ),
      },
      {
        path: "/seo-tools/site-audit",
        element: (
          <ProtectedRoute>
            <SiteAudit />
          </ProtectedRoute>
        ),
      },
      {
        path: "/seo-tools/backlink-audit",
        element: (
          <ProtectedRoute>
            <BacklinkAudit />
          </ProtectedRoute>
        ),
      },
      {
        path: "/seo-tools/backlink-analytic",
        element: (
          <ProtectedRoute>
            <BacklinkAnalytic />
          </ProtectedRoute>
        ),
      },
      {
        path: "/seo-tools/domain-overview",
        element: (
          <ProtectedRoute>
            <DomainOverview />
          </ProtectedRoute>
        ),
      },
      {
        path: "/seo-tools/traffic-analytics",
        element: (
          <ProtectedRoute>
            <TrafficAnalytics />
          </ProtectedRoute>
        ),
      },
      {
        path: "/seo-tools/keyword-overview",
        element: (
          <ProtectedRoute>
            <KeywordOverview />
          </ProtectedRoute>
        ),
      },
      {
        path: "/email-campaigns/analytics",
        element: (
          <ProtectedRoute>
            <EmailCampaigns />
          </ProtectedRoute>
        ),
      },
      {
        path: "/email-campaigns/subscribers",
        element: (
          <ProtectedRoute>
            <EmailSubscribers />
          </ProtectedRoute>
        ),
      },
      {
        path: "/email-campaigns/templates",
        element: (
          <ProtectedRoute>
            <EmailTemplates />
          </ProtectedRoute>
        ),
      },
      {
        path: "/email-campaigns/campaigns",
        element: (
          <ProtectedRoute>
            <AllCampaigns />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const AppRoutes = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default AppRoutes;