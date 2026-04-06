import { useSearchParams } from "react-router-dom";
import { adsCallback } from "../../functions/authFunctions";
import { useEffect } from "react";

const AdsOauth = () => {
  const [searchParams, setSearchParams] = useSearchParams();
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
          console.log("Sending ads queries");
          const res = await adsCallback(code, state, oauth_token, oauth_verifier);
          console.log("Res: ", res || res.data);
        }
      } catch (error) {
        console.log("Error occured: ", error);
      }
    };
    return <div>Loading Ads Auth......</div>;
};

export default AdsOauth;
