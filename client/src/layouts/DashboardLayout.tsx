import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { Activity, LayoutDashboard, CreditCard, LogOut, Menu } from "lucide-react";
import { useCookies } from "react-cookie";
import { Button } from "@/components/ui/button";

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(["access_token", "user"]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Subscription", href: "/dashboard/subscription", icon: CreditCard },
  ];

  const handleLogout = () => {
    removeCookie("access_token");
    removeCookie("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-neutral-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-neutral-900 text-white transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center gap-2 px-6 bg-neutral-800">
          <div className="flex h-8 w-8 items-center justify-center bg-primary text-white rounded-none">
            <Activity className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">Pulseboard</span>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-6">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-sm transition-colors ${
                  isActive
                    ? "bg-neutral-800 text-white border-l-4 border-primary"
                    : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 shrink-0 ${
                    isActive ? "text-primary" : "text-neutral-500 group-hover:text-white"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-neutral-800 p-4">
          <Button
            variant={"ghost"}
            onClick={handleLogout}
            className="group flex items-center px-3 py-2 text-sm font-medium text-neutral-400 rounded-sm hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5 shrink-0 text-neutral-500 group-hover:text-white" />
            Sign out
          </Button>
        </div>
      </div>

      {/* Mobile header */}
      <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-neutral-200 bg-white px-4 shadow-sm lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-neutral-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-neutral-900">Dashboard</div>
      </div>

      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
