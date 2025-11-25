import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface LoginResponse {
  success: boolean;
  access_token: string;
  token_type: string;
  user: { id: number; email: string; password: string };
}

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [cookies, setCookie] = useCookies(["access_token", "user"]);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const continueValue = params.get("continue");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append("grant_type", "password");
      params.append("username", formData.email);
      params.append("password", formData.password);

      const { data } = await api.post<LoginResponse>("/api/v1/auth/login", params.toString(), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      if (data.success) {
        toast.success("Login successful!");
        setCookie("access_token", data.access_token);
        setCookie("user", JSON.stringify(data.user));
        navigate(continueValue || "/dashboard");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          toast.error("Invalid email or password.");
          return;
        }
      }
      toast.error("An error occurred during login. Please try again.");
    }
  };

  useEffect(() => {
    if (cookies.access_token && cookies.user) {
      navigate("/dashboard");
    }
  }, [cookies, navigate]);

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-neutral-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link to="/" className="flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center bg-primary text-white rounded-none">
            <Activity className="h-6 w-6" />
          </div>
        </Link>
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-neutral-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium leading-6 text-neutral-900">
              Email address
            </Label>
            <div className="mt-2">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="block w-full rounded-sm border-0 py-2.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-neutral-900"
              >
                Password
              </Label>
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-semibold text-primary hover:text-primary-hover"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="block w-full rounded-sm border-0 py-2.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-neutral-500">
          Not a member?{" "}
          <Link
            to="/signup"
            className="font-semibold leading-6 text-primary hover:text-primary-hover"
          >
            Start a 14 day free trial
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
