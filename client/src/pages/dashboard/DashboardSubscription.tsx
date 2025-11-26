import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

type Subscription = {
  id: string;
  user_id: string;
  plan_id: string;
  status: string;
  pg_subscription_id: string;
};

interface StatusResponse {
  success: boolean;
  data: {
    user: User;
    subscription: Subscription | null;
  };
}

interface SubCreateResponse {
  success: boolean;
  data: {
    subscription_id: string;
  };
}

const DashboardSubscription = () => {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isPro, setIsPro] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [cookies, ,] = useCookies(["access_token"]);

  const handlePayment = () => {
    const options = {
      key: import.meta.env.VITE_PG_KEY_ID,
      amount: "69900",
      currency: "INR",
      subscription_id: subscription?.pg_subscription_id || "",
      // name: "Pulseboard",
      description: "Upgrade to Pulseboard Pro",
      handler: (response: unknown) => {
        console.log(response);
        // alert("Payment Successful!");
      },
      prefill: {
        name: user?.name,
        email: user?.email,
        contact: user?.phone || null,
      },
      theme: {
        color: "#0f62fe",
      },
    };
    try {
      // @ts-expect-error Razorpay is expected to be a constructor
      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Error opening Razorpay:", error);
      toast.error("Error opening payment gateway. Please try again.");
    }
  };

  const getCurrentStatus = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<StatusResponse>("/api/v1/subscription/status", {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
      });
      return data.data;
    } catch (error) {
      console.error("Error fetching subscription status:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handlePlanUpgrade = async () => {
    try {
      setLoading(true);
      const { data } = await api.post<SubCreateResponse>(
        "/api/v1/subscription/create",
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        },
      );
      if (data.success) {
        handlePayment();
      }
    } catch (error) {
      console.error("Error upgrading plan:", error);
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          toast.error(error?.response?.data?.detail || "Invalid email or password.");
          return;
        }
      }
      toast.error("Error upgrading plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      getCurrentStatus().then((data) => {
        if (data) {
          setUser(data.user);
          setSubscription(data.subscription);
          setIsPro(
            data.subscription !== null && data.subscription.status === "active" ? true : false,
          );
        }
      });
    } catch (error) {
      console.error("Error fetching subscription status:", error);
      toast.error("Error fetching subscription status. Please refresh the page.");
    }
  }, []);
  console.log(loading);

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-neutral-900 sm:truncate sm:text-3xl sm:tracking-tight pb-2">
            Subscription & Billing
          </h2>
        </div>
      </div>

      <div className="overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-neutral-200">
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold leading-6 text-neutral-900">Current Plan</h3>
              <div className="mt-2 max-w-xl text-sm text-neutral-500">
                <p>
                  You are currently on the{" "}
                  <span className="font-bold text-neutral-900">{isPro ? "Pro" : "Free"}</span> plan.
                </p>
              </div>
            </div>
            <div className="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:shrink-0 sm:items-center">
              <span
                className={`inline-flex items-center rounded-sm px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                  isPro
                    ? "bg-green-50 text-green-700 ring-green-600/20"
                    : "bg-neutral-50 text-neutral-600 ring-neutral-500/10"
                }`}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : isPro ? (
                  "Active"
                ) : (
                  "Basic Account"
                )}
              </span>
            </div>
          </div>
        </div>

        {!isPro && (
          <div className="bg-neutral-50 px-4 py-5 sm:p-6 border-t border-neutral-200">
            <div className="flex items-start gap-4">
              <div className="shrink-0">
                <AlertTriangle className="h-6 w-6 text-yellow-600" aria-hidden="true" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-900">Upgrade to Pulseboard Pro</h4>
                <p className="mt-1 text-sm text-neutral-600 mb-4">
                  Unlock advanced analytics, unlimited history retention, and weekly PDF reports.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                  {[
                    "Advanced Analytics Dashboard",
                    "Unlimited History",
                    "Export Data (CSV/PDF)",
                    "Priority Support",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-neutral-700">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {loading ? (
                  <Button disabled>
                    <Loader2 className="animate-spin" />
                  </Button>
                ) : (
                  <Button onClick={handlePlanUpgrade}>Upgrade for ₹699/mo</Button>
                )}
              </div>
            </div>
          </div>
        )}

        {isPro && (
          <div className="bg-neutral-50 px-4 py-4 sm:px-6 border-t border-neutral-200 flex justify-between items-center">
            <div className="text-sm text-neutral-500">
              Next billing date:{" "}
              <span className="font-medium text-neutral-900">November 24, 2024</span>
            </div>
            <Button variant="outline" size="sm">
              Manage Subscription
            </Button>
          </div>
        )}
      </div>

      {/* <div className="overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-neutral-200">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-neutral-900">Payment Methods</h3>
          <div className="mt-5 text-sm text-neutral-500">
            <p className="mb-4">Securely managed by Razorpay. No payment methods added yet.</p>
            <Button variant="ghost" size="sm" className="-ml-4">
              + Add Payment Method
            </Button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default DashboardSubscription;
