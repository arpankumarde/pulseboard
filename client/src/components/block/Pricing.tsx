import { Check } from "lucide-react";
import { Button } from "../ui/button";

const tiers = [
  {
    name: "Starter",
    id: "tier-free",
    price: "₹0",
    description: "Essential tracking for casual builders.",
    features: [
      "Unlimited session logging",
      "Basic dashboard access",
      "7-day history retention",
      "Personal profile",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Professional",
    id: "tier-pro",
    price: "₹699",
    description: "Advanced insights for serious optimization.",
    features: [
      "Everything in Starter",
      "Advanced Analytics Dashboard",
      "Unlimited history retention",
      "Weekly PDF insights report",
      "Priority email support",
    ],
    cta: "Start 14-day trial",
    highlighted: true,
  },
];

const Pricing = () => {
  return (
    <div className="bg-white py-24 sm:py-32 border-t border-neutral-200" id="pricing">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Pricing</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Simple, transparent pricing
          </p>
          <p className="mt-6 text-lg leading-8 text-neutral-600">
            Start for free. Upgrade when you're ready to take your productivity to the next level.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-stretch gap-8 lg:max-w-4xl lg:grid-cols-2">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col justify-between p-8 ring-1 sm:p-10 ${
                tier.highlighted
                  ? "bg-dark text-white ring-dark shadow-2xl"
                  : "bg-white text-neutral-900 ring-neutral-200 shadow-sm"
              }`}
            >
              <div>
                <h3
                  id={tier.id}
                  className={`text-base font-semibold leading-7 ${
                    tier.highlighted ? "text-white" : "text-primary"
                  }`}
                >
                  {tier.name}
                </h3>
                <p className="mt-4 flex items-baseline gap-x-2">
                  <span className="text-5xl font-bold tracking-tight">{tier.price}</span>
                  <span
                    className={`text-base ${
                      tier.highlighted ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    /month
                  </span>
                </p>
                <p
                  className={`mt-6 text-base leading-7 ${
                    tier.highlighted ? "text-neutral-300" : "text-neutral-600"
                  }`}
                >
                  {tier.description}
                </p>
                <ul
                  role="list"
                  className={`mt-8 space-y-3 text-sm leading-6 ${
                    tier.highlighted ? "text-neutral-300" : "text-neutral-600"
                  }`}
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check
                        className={`h-6 w-5 flex-none ${
                          tier.highlighted ? "text-primary" : "text-primary"
                        }`}
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <Button variant={tier.highlighted ? "default" : "outline"} className="w-full">
                  {tier.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
