import { Link } from "react-router";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-primary">404 ERROR</p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight text-neutral-900 sm:text-6xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-neutral-600 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't
          exist.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link to="/">
            <Button size="lg">Go back home</Button>
          </Link>
          <a
            href="#"
            className="text-sm font-semibold text-neutral-900 group hover:text-primary transition-colors"
          >
            Contact support{" "}
            <span
              aria-hidden="true"
              className="inline-block transition-transform group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
