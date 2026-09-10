import { useSearchParams, useNavigate } from "react-router-dom";
import { adsCallback } from "../../functions/authFunctions";
import { useEffect, useState } from "react";

const AdsOauth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Loading Ads Auth...");

  useEffect(() => {
    handleOperations();
  },[]);

  const handleOperations = async () => {
    try {
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      const oauth_verifier = searchParams.get("oauth_verifier");
      const oauth_token = searchParams.get("oauth_token");
      console.log("Queries: ", { code, state, oauth_token, oauth_verifier });

      if ((code && state) || (oauth_token && oauth_verifier)) {
        setStatus("Verifying Ads Connection...");
        
        // Strict API integration: will throw if backend fails
        await adsCallback(code, state, oauth_token, oauth_verifier);
        
        setStatus("Success! Redirecting...");

        setTimeout(() => {
            window.close();
            navigate("/ads-manager");
        }, 1500);
      } else {
        setStatus("Invalid Authentication parameters.");
      }
    } catch (error) {
      console.error("API Error occured: ", error);
      setStatus("Failed to authenticate with backend.");
      setTimeout(() => {
          window.close();
          navigate("/ads-manager");
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Ads Manager Auth</h2>
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

export default AdsOauth;
