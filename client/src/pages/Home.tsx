import AnalyticsDemo from "@/components/block/AnalyticsDemo";
import Pricing from "@/components/block/Pricing";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Zap,
} from "lucide-react";
import { Link } from "react-router";

const features = [
  {
    name: "Frictionless Logging",
    description:
      "Log your work in seconds. Type, Category, Duration. Done. Get back to building immediately.",
    icon: Clock,
  },
  {
    name: "Visualize Streaks",
    description:
      "Keep the momentum going. See your daily activity and maintain your streak to build lasting habits.",
    icon: Calendar,
  },
  {
    name: "Simple Analytics",
    description:
      "Understand where your time goes. Breakdown by category and see your most productive days.",
    icon: BarChart3,
  },
  {
    name: "Distraction Free",
    description:
      "No complex project management, no endless notifications. Just you and your focus logs.",
    icon: Zap,
  },
];

const Home = () => {
  return (
    <section className="px-2">
      <div className="relative isolate overflow-hidden bg-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-neutral-100),white)] opacity-20" />

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:shrink-0 lg:pt-8">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <a href="#pricing" className="inline-flex space-x-6">
                <span className="rounded-sm bg-primary/10 px-3 py-1 text-sm font-semibold leading-6 text-primary ring-1 ring-inset ring-primary/10">
                  v1.0 Released
                </span>
                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-neutral-600 hover:text-neutral-900">
                  <span>See what's new</span>
                  <ArrowRight className="h-4 w-4 text-neutral-400" />
                </span>
              </a>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-neutral-900 sm:text-6xl">
              Master your focus.
              <br />
              <span className="text-primary">Measure your impact.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-600">
              Pulseboard is the precision tracker for solo builders. Log
              sessions, analyze velocity, and optimize your workflow without the
              fluff.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button
                size="lg"
                className="shadow-xl shadow-blue-200/50"
                asChild
              >
                <Link to="/signup">Get Started Free</Link>
              </Button>
              <Button variant="ghost" size="lg" className="group">
                Learn more{" "}
                <span
                  aria-hidden="true"
                  className="ml-1 transition-transform group-hover:translate-x-1"
                >
                  <ArrowRight />
                </span>
              </Button>
            </div>
            <div className="mt-10 flex gap-x-6">
              <div className="flex items-center gap-x-2 text-sm text-neutral-500">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-x-2 text-sm text-neutral-500">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-24 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="-m-2 rounded-sm bg-neutral-900/5 p-2 ring-1 ring-inset ring-neutral-900/10 lg:-m-4 lg:p-4">
                <div className="shadow-2xl ring-1 ring-neutral-900/10 bg-white p-6 w-[350px] sm:w-[500px]">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-neutral-900">
                          Today's Focus
                        </h3>
                        <p className="text-sm text-neutral-500">Tue, Oct 24</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          4h 15m
                        </p>
                        <p className="text-xs text-neutral-500">Total time</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-neutral-50 border-l-4 border-primary">
                        <div>
                          <p className="text-sm font-bold text-neutral-900">
                            API Development
                          </p>
                          <p className="text-xs text-neutral-500">Coding</p>
                        </div>
                        <span className="text-sm font-semibold text-neutral-700">
                          90m
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-neutral-50 border-l-4 border-neutral-700">
                        <div>
                          <p className="text-sm font-bold text-neutral-900">
                            Blog Post Draft
                          </p>
                          <p className="text-xs text-neutral-500">Writing</p>
                        </div>
                        <span className="text-sm font-semibold text-neutral-700">
                          45m
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-neutral-50 border-l-4 border-neutral-400 opacity-60">
                        <div>
                          <p className="text-sm font-bold text-neutral-900">
                            React Hooks
                          </p>
                          <p className="text-xs text-neutral-500">Learning</p>
                        </div>
                        <span className="text-sm font-semibold text-neutral-700">
                          120m
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="bg-white py-24 sm:py-32 border-t border-neutral-100"
        id="features"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Build Better Habits
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Everything you need to stay consistent
            </p>
            <p className="mt-6 text-lg leading-8 text-neutral-600">
              Most tools are too complex for solo builders. Pulseboard strips
              away the noise and gives you exactly what you need to track your
              deep work.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-neutral-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center bg-dark text-white rounded-none">
                      <feature.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-neutral-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <AnalyticsDemo />

      <Pricing />
    </section>
  );
};

export default Home;
