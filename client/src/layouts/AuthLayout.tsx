import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [cookies] = useCookies(["access_token", "user"]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!cookies.access_token && !cookies.user) {
      navigate(`/login?continue=${encodeURIComponent(location.pathname)}`);
    }
  }, [cookies, navigate, location]);

  return children;
};

export default AuthLayout;
