import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { EXTERNAL_URLS } from "@/constants/externalUrls";

const Signup = () => {
  useEffect(() => {
    window.location.href = EXTERNAL_URLS.PRESTATIE_PROGRAM_SIGNUP;
  }, []);

  return <Navigate to="/" replace />;
};

export default Signup;
