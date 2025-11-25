import { useState } from "react";
import { Menu, X, Activity } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(["access_token", "user"]);
  const authenticated = Boolean(cookies?.access_token && cookies?.user);

  const handleLogout = () => {
    removeCookie("access_token");
    removeCookie("user");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <div className="flex h-8 w-8 items-center justify-center bg-primary text-white rounded-none">
              <Activity className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-neutral-900">Pulseboard</span>
          </Link>

          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <a
                href="/#features"
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900"
              >
                Features
              </a>
              <a
                href="/#analytics"
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900"
              >
                Analytics
              </a>
              <a
                href="/#pricing"
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900"
              >
                Pricing
              </a>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {authenticated ? (
                <>
                  <Button asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                  <Button variant={"destructive"} onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/signup">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-500 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-b border-neutral-200 bg-white">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <a
              href="/#features"
              className="block px-3 py-2 text-base font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
            >
              Features
            </a>
            <a
              href="/#analytics"
              className="block px-3 py-2 text-base font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
            >
              Analytics
            </a>
            <a
              href="/#pricing"
              className="block px-3 py-2 text-base font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
            >
              Pricing
            </a>
          </div>
          <div className="border-t border-neutral-200 pb-3 pt-4 px-4 space-y-3">
            {authenticated ? (
              <>
                <Button className="w-full justify-center" asChild>
                  <Link to="/dashboard" className="block">
                    Dashboard
                  </Link>
                </Button>
                <Button
                  variant="destructive"
                  className="w-full justify-center"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="w-full justify-center" asChild>
                  <Link to="/login" className="block">
                    Log in
                  </Link>
                </Button>
                <Button className="w-full justify-center" asChild>
                  <Link to="/signup" className="block">
                    Get Started Free
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
