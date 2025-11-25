import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useLocation, useNavigate } from "react-router";

const AuthLayout = () => {
  const [cookies] = useCookies(["access_token", "user"]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!cookies.access_token && !cookies.user) {
      navigate(`/login?continue=${encodeURIComponent(location.pathname)}`);
    }
  }, [cookies, navigate, location]);

  return <Outlet />;
};

export default AuthLayout;
