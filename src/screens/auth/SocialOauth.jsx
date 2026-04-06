import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { socialCallback } from "../../functions/authFunctions";

const SocialOauth = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    handleOperations();
  }, []);

  const handleOperations = async () => {
    try {
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      console.log("Queries: ", { code, state });

      if (code && state) {
        console.log("Sending ads queries");
        const res = await socialCallback(code, state);
        console.log("Res: ", res || res.data);
      }
    } catch (error) {
      console.log("Error occured: ", error);
    }
  };
  return <div>Loading Social Auth......</div>;
};

export default SocialOauth;
