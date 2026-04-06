import { useSearchParams } from "react-router-dom";
import { mailCallback } from "../../functions/authFunctions";
import { useEffect } from "react";

const MailOauth = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    handleOperations();
  },[]);

  const handleOperations = async () => {
    try {
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      console.log("Queries: ", { code, state });

      if (code && state) {
        console.log("Sending queries");
        const res = await mailCallback(code, state);
        console.log("Res: ", res || res.data);
      }
    } catch (error) {
      console.log("Error occured: ", error);
    }
  };
  return <div>Loading Mail Auth......</div>;
};

export default MailOauth;
