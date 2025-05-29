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
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        element: <OnboardingLayout />,
        children: [
          {
            path: "/",
            element: <Onboarding />,
          },
          {
            path: "/verify",
            element: <EmailVerification />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/create-website",
        element: <CreateWebsite />,
      },
      {
        path: "/create-website/templates",
        element: <Templates />,
      },
      {
        path: "/create-website/analytics",
        element: <WebsiteAnalytics />,
      },
      {
        path: "/social-scheduler",
        element: <SocialScheduler />,
      },
      {
        path: "/ads-manager",
        element: <AdsManager />,
      },
      {
        path: "/seo-tools",
        element: <SEO />,
      },
      {
        path: "/seo-tools/site-audit",
        element: <SiteAudit />,
      },
      {
        path: "/seo-tools/backlink-audit",
        element: <BacklinkAudit />,
      },
         {
        path: "/seo-tools/backlink-analytic",
        element: <BacklinkAnalytic />,
      },
      {
        path: "/seo-tools/domain-overview",
        element: <DomainOverview />,
      },
      {
        path: "/seo-tools/traffic-analytics",
        element: <TrafficAnalytics />,
      },
      {
        path: "/seo-tools/keyword-overview",
        element: <KeywordOverview />,
      },
      {
        path: "/email-campaigns/analytics",
        element: <EmailCampaigns />,
      },
      {
        path: "/email-campaigns/subscribers",
        element: <EmailSubscribers />,
      },
      {
        path: "/email-campaigns/templates",
        element: <EmailTemplates />,
      },
      {
        path: "/email-campaigns/campaigns",
        element: <AllCampaigns />,
      },
      {
        element: <ForgotPassLayout />,
        children: [
          {
            path: "/forgot-password",
            element: <ForgotPassword />,
          },
          {
            path: "/enter-otp",
            element: <ResetPassOTP />,
          },
          {
            path: "/change-password",
            element: <ResetPassword />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
