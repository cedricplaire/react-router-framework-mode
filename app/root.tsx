import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { useState } from "react";
import type { Route } from "./+types/root";
import AcmeLogo from "./component/navigation/acme-logo";
import NavLinks from "./component/navigation/nav-links";
import "./app.css";
import NavBar from "./component/navigation/navbar";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="overflow-y-auto">
        <div
          className={`h-full ${isOpen ? "w-64" : "w-20"} fixed bottom-0 bg-gray-800 text-gray-200 transition-width duration-300`}
        >
          <div className="flex items-center justify-between p-4 ml-1 border-b border-gray-600">
            <h1
              className={`text-lg ml-2 font-semibold ${isOpen ? "block" : "hidden"}`}
            >
              Minimize ToolBar
            </h1>
            <button
              title="switch bar"
              type="button"
              onClick={handleIsOpen}
              className="p-2 rounded-md hover:bg-gray-900/50 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-between py-4 pl-4 border-b border-gray-600">
            <AcmeLogo open={isOpen} />
          </div>
          <div>
            <NavLinks open={isOpen} />
          </div>
        </div>
        <div
          className={`h-full ${isOpen ? "ml-64" : "ml-20"}  bottom-0 bg-gray-950 text-gray-200 transition-width duration-300`}
        >
          <main className="w-full">
            <NavBar />
            <div className="p-6 md:p-4">{children}</div>
          </main>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
