import { useSearchParams, useNavigate } from "react-router-dom";
import { mailCallback } from "../../functions/authFunctions";
import { useEffect, useState } from "react";

const MailOauth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Loading Mail Auth...");

  useEffect(() => {
    handleOperations();
  },[]);

  const handleOperations = async () => {
    try {
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      console.log("Queries: ", { code, state });

      if (code && state) {
        setStatus("Verifying Mail Connection...");
        
        // Strict API integration: will throw if backend fails
        await mailCallback(code, state);
        
        setStatus("Success! Redirecting...");
        
        setTimeout(() => {
            window.close();
            navigate("/email-campaigns/campaigns");
        }, 1500);
      } else {
        setStatus("Invalid Authentication parameters.");
      }
    } catch (error) {
      console.error("API Error occured: ", error);
      setStatus("Failed to authenticate with backend.");
      setTimeout(() => {
          window.close();
          navigate("/email-campaigns/campaigns");
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Mail Auth</h2>
            <div className="flex items-center justify-center gap-3">
               {status.includes("Loading") || status.includes("Verifying") ? (
                  <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
               ) : null}
               <p className="text-gray-600 font-medium">{status}</p>
            </div>
        </div>
    </div>
  );
};

export default MailOauth;
