import { useState } from "react";
import { Menu, X, Activity } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="flex h-8 w-8 items-center justify-center bg-primary text-white rounded-none">
              <Activity className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-neutral-900">
              Pulseboard
            </span>
          </div>

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
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Get Started</Button>
              </Link>
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
            <Link to="/login" className="block">
              <Button variant="outline" className="w-full justify-center">
                Log in
              </Button>
            </Link>
            <Link to="/signup" className="block">
              <Button className="w-full justify-center">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
