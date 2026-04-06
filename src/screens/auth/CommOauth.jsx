import { useSearchParams } from "react-router-dom";
import { commCallback } from "../../functions/authFunctions";
import { useEffect } from "react";

const CommOauth = () => {
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
        console.log("Sending queries");
        const res = await commCallback(code, state);
        console.log("Res: ", res || res.data);
      }
    } catch (error) {
      console.log("Error occured: ", error);
    }
  };
  return <div>Loading Community Auth......</div>;
};

export default CommOauth;
