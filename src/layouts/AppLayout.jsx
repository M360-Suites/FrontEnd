import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import OnBoardingHeader from "./OnBoardingHeader";
import { useAuth } from "../context/UseAuth";

const AppLayout = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Check if the current route is a dashboard/authenticated route
  const isDashboardRoute = location.pathname.includes("/dashboard");

  return (
    <div className='min-h-screen bg-gray-50'>
      {isAuthenticated ? <Header /> : <OnBoardingHeader />}

      <div className='flex'>
        {isAuthenticated && <SideBar />}

        <main
          className={`flex-1 ${
            isDashboardRoute && isAuthenticated
              ? "md:ml-[-220px] mt-4"
              : ""
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
