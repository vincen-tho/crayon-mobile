import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const LogoutPage = () => {
  localStorage.removeItem("user");

  useEffect(() => {
    localStorage.removeItem("user");
  }, []);

  return <Navigate to="/" />;
};
export default LogoutPage;
