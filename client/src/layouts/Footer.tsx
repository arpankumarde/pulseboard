import { Activity, Twitter, Github } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <h2 className="sr-only">Footer</h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center bg-dark text-white rounded-none">
                <Activity className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-neutral-900">
                Pulseboard
              </span>
            </div>
            <p className="text-sm leading-6 text-neutral-600">
              Helping solo builders stay consistent and ship more.
            </p>
            <div className="flex space-x-6">
              <Link to="/" className="text-neutral-400 hover:text-neutral-500">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" aria-hidden="true" />
              </Link>
              <Link to="/" className="text-neutral-400 hover:text-neutral-500">
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-neutral-900">
                  Product
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a
                      href="/#features"
                      className="text-sm leading-6 text-neutral-600 hover:text-neutral-900"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#pricing"
                      className="text-sm leading-6 text-neutral-600 hover:text-neutral-900"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm leading-6 text-neutral-600 hover:text-neutral-900"
                    >
                      Changelog
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-neutral-900">
                  Company
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-sm leading-6 text-neutral-600 hover:text-neutral-900"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm leading-6 text-neutral-600 hover:text-neutral-900"
                    >
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-neutral-900">
                  Legal
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-sm leading-6 text-neutral-600 hover:text-neutral-900"
                    >
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm leading-6 text-neutral-600 hover:text-neutral-900"
                    >
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-neutral-200 pt-8">
          <p className="text-xs leading-5 text-neutral-500">
            &copy; 2025 Pulseboard Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
