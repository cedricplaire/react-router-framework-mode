import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useLocation, Link, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, Meta, Links, ScrollRestoration, Scripts, isRouteErrorResponse, useNavigation, Form } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState } from "react";
import { GlobeAltIcon, HomeIcon, DocumentDuplicateIcon, UserGroupIcon, Bars3Icon, XMarkIcon, BellIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Disclosure, DisclosureButton, Menu, MenuButton, MenuItems, MenuItem, DisclosurePanel } from "@headlessui/react";
import { d as database, g as guestBook } from "./app-B5lPJmsb.js";
import "@react-router/express";
import "drizzle-orm/postgres-js";
import "express";
import "postgres";
import "node:async_hooks";
import "drizzle-orm/pg-core";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function AcmeLogo({ open }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `flex flex-row items-center leading-none text-white`,
      children: [
        /* @__PURE__ */ jsx(GlobeAltIcon, { className: "h-12 w-12 rotate-[15deg]" }),
        /* @__PURE__ */ jsx("p", { className: `${open ? "block" : "hidden"} text-[44px]`, children: "Acme" })
      ]
    }
  );
}
const links$1 = [
  { name: "Home", href: "/", icon: HomeIcon },
  {
    name: "Factures",
    href: "/factures",
    icon: DocumentDuplicateIcon
  },
  { name: "Clients", href: "/clients", icon: UserGroupIcon }
];
function NavLinks({ open }) {
  const location = useLocation();
  return /* @__PURE__ */ jsx(Fragment, { children: links$1.map((link) => {
    const LinkIcon = link.icon;
    return /* @__PURE__ */ jsxs(
      Link,
      {
        to: link.href,
        className: clsx(
          location.pathname === link.href ? "bg-purple-500/50 text-white" : "text-gray-300 hover:bg-white/5 hover:text-white",
          "flex h-[52px] grow items-center justify-center gap-2 bg-gray-800 p-3 text-md font-medium md:flex-none md:p-2 md:px-3 data-focus:bg-white/5 data-focus:outline-hidden",
          {
            "md:justify-center": open === false,
            "md:justify-start": open === true
          }
        ),
        children: [
          /* @__PURE__ */ jsx(LinkIcon, { className: "w-7 mx-3" }),
          /* @__PURE__ */ jsx("p", { className: `${open ? "block" : "hidden"}`, children: link.name })
        ]
      },
      link.name
    );
  }) });
}
function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  return /* @__PURE__ */ jsx("div", { className: `h-full ${isOpen ? "w-64" : "w-20"} bg-gray-800 text-white transition-width duration-300`, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 ml-1 border-b border-gray-600", children: [
      /* @__PURE__ */ jsx("h1", { className: `text-lg ml-2 font-semibold ${isOpen ? "block" : "hidden"}`, children: "Dashboard" }),
      /* @__PURE__ */ jsx("button", { title: "switch bar", type: "button", onClick: handleIsOpen, className: "p-2 rounded-md hover:bg-gray-900/50 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white", children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16" }) }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between py-4 pl-4 border-b border-gray-600", children: /* @__PURE__ */ jsx(AcmeLogo, { open: isOpen }) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(NavLinks, { open: isOpen }) })
  ] }) });
}
const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Client", href: "/clients", current: false },
  { name: "Factures", href: "/factures", current: false },
  { name: "Détails", href: "/dashboard", current: false }
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function NavBar() {
  const location = useLocation();
  return /* @__PURE__ */ jsxs(
    Disclosure,
    {
      as: "nav",
      className: "relative bg-gray-800 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10",
      children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-2 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "relative flex h-18 items-center justify-between", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 flex items-center sm:hidden", children: /* @__PURE__ */ jsxs(DisclosureButton, { className: "group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500", children: [
            /* @__PURE__ */ jsx("span", { className: "absolute -inset-0.5" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Open main menu" }),
            /* @__PURE__ */ jsx(Bars3Icon, { "aria-hidden": "true", className: "block size-6 group-data-open:hidden" }),
            /* @__PURE__ */ jsx(XMarkIcon, { "aria-hidden": "true", className: "hidden size-6 group-data-open:block" })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center justify-center sm:items-stretch sm:justify-start", children: [
            /* @__PURE__ */ jsx("div", { className: "flex shrink-0 items-center", children: /* @__PURE__ */ jsx(
              "img",
              {
                alt: "Your Company",
                src: "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500",
                className: "h-8 w-auto"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "hidden sm:ml-6 sm:block", children: /* @__PURE__ */ jsx("div", { className: "flex space-x-4", children: navigation.map((item) => /* @__PURE__ */ jsx(
              Link,
              {
                to: item.href,
                "aria-current": item.current ? "page" : void 0,
                className: clsx(
                  location.pathname === item.href ? "bg-purple-500/50 text-white" : "text-gray-300 hover:bg-white/5 hover:text-white",
                  "rounded-md px-3 py-2 text-sm font-medium"
                ),
                children: item.name
              },
              item.name
            )) }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                className: "relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "absolute -inset-1.5" }),
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "View notifications" }),
                  /* @__PURE__ */ jsx(BellIcon, { "aria-hidden": "true", className: "size-6" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(Menu, { as: "div", className: "relative ml-3", children: [
              /* @__PURE__ */ jsxs(MenuButton, { className: "relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500", children: [
                /* @__PURE__ */ jsx("span", { className: "absolute -inset-1.5" }),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Open user menu" }),
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    alt: "",
                    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                    className: "size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs(
                MenuItems,
                {
                  transition: true,
                  className: "absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in",
                  children: [
                    /* @__PURE__ */ jsx(MenuItem, { children: /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: "/profil",
                        className: "block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden",
                        children: "Your profile"
                      }
                    ) }),
                    /* @__PURE__ */ jsx(MenuItem, { children: /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: "/usersettings",
                        className: "block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden",
                        children: "Settings"
                      }
                    ) }),
                    /* @__PURE__ */ jsx(MenuItem, { children: /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: "/signout",
                        className: "block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden",
                        children: "Sign out"
                      }
                    ) })
                  ]
                }
              )
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(DisclosurePanel, { className: "sm:hidden", children: /* @__PURE__ */ jsx("div", { className: "space-y-1 px-2 pt-2 pb-3", children: navigation.map((item) => /* @__PURE__ */ jsx(
          DisclosureButton,
          {
            as: "a",
            href: item.href,
            "aria-current": item.current ? "page" : void 0,
            className: classNames(
              item.current ? "bg-gray-950/50 text-white" : "text-gray-300 hover:bg-white/5 hover:text-white",
              "block rounded-md px-3 py-2 text-base font-medium"
            ),
            children: item.name
          },
          item.name
        )) }) })
      ]
    }
  );
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx("aside", {
        children: /* @__PURE__ */ jsx(Sidebar, {})
      }), /* @__PURE__ */ jsxs("main", {
        children: [/* @__PURE__ */ jsx(NavBar, {}), /* @__PURE__ */ jsx("div", {
          className: "w-full h-full sm:p-4 md:p-8",
          children
        })]
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const logoDark = "/assets/logo-dark-pX2395Y0.svg";
const logoLight = "/assets/logo-light-CVbx2LBR.svg";
function Welcome({
  guestBook: guestBook2,
  guestBookError,
  message
}) {
  const navigation2 = useNavigation();
  return /* @__PURE__ */ jsx("main", { className: "flex items-center justify-center pt-16 pb-4", children: /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center gap-16 min-h-0", children: [
    /* @__PURE__ */ jsxs("header", { className: "flex flex-col items-center gap-9", children: [
      /* @__PURE__ */ jsx("h1", { className: "sr-only", children: message }),
      /* @__PURE__ */ jsxs("div", { className: "w-[500px] max-w-[100vw] p-4", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: logoLight,
            alt: "React Router",
            className: "block w-full dark:hidden"
          }
        ),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: logoDark,
            alt: "React Router",
            className: "hidden w-full dark:block"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-[300px] w-full space-y-6 px-4", children: [
      /* @__PURE__ */ jsxs("nav", { className: "rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4", children: [
        /* @__PURE__ */ jsx("p", { className: "leading-6 text-gray-700 dark:text-gray-200 text-center", children: "What's next?" }),
        /* @__PURE__ */ jsx("ul", { children: resources.map(({ href, text, icon }) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          "a",
          {
            className: "group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500",
            href,
            target: "_blank",
            rel: "noreferrer",
            children: [
              icon,
              text
            ]
          }
        ) }, href)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4", children: [
        /* @__PURE__ */ jsxs(
          Form,
          {
            method: "post",
            className: "space-y-4 w-full max-w-lg",
            onSubmit: (event) => {
              if (navigation2.state === "submitting") {
                event.preventDefault();
              }
              const form = event.currentTarget;
              requestAnimationFrame(() => {
                form.reset();
              });
            },
            children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "name",
                  placeholder: "Name",
                  required: true,
                  className: "w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:ring-blue-500 h-10 px-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500"
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "email",
                  type: "email",
                  placeholder: "your@email.com",
                  required: true,
                  className: "w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:ring-blue-500 h-10 px-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: navigation2.state === "submitting",
                  className: "w-full h-10 px-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600",
                  children: "Sign Guest Book"
                }
              ),
              guestBookError && /* @__PURE__ */ jsx("p", { className: "text-red-500 dark:text-red-400", children: guestBookError })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("ul", { className: "text-center", children: [
          /* @__PURE__ */ jsx("li", { className: "p-3", children: message }),
          guestBook2.map(({ id, name }) => /* @__PURE__ */ jsx("li", { className: "p-3", children: name }, id))
        ] })
      ] })
    ] })
  ] }) });
}
const resources = [
  {
    href: "https://reactrouter.com/docs",
    text: "React Router Docs",
    icon: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "20",
        viewBox: "0 0 20 20",
        fill: "none",
        className: "stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M9.99981 10.0751V9.99992M17.4688 17.4688C15.889 19.0485 11.2645 16.9853 7.13958 12.8604C3.01467 8.73546 0.951405 4.11091 2.53116 2.53116C4.11091 0.951405 8.73546 3.01467 12.8604 7.13958C16.9853 11.2645 19.0485 15.889 17.4688 17.4688ZM2.53132 17.4688C0.951566 15.8891 3.01483 11.2645 7.13974 7.13963C11.2647 3.01471 15.8892 0.951453 17.469 2.53121C19.0487 4.11096 16.9854 8.73551 12.8605 12.8604C8.73562 16.9853 4.11107 19.0486 2.53132 17.4688Z",
            strokeWidth: "1.5",
            strokeLinecap: "round"
          }
        )
      }
    )
  },
  {
    href: "https://rmx.as/discord",
    text: "Join Discord",
    icon: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "20",
        viewBox: "0 0 24 20",
        fill: "none",
        className: "stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M15.0686 1.25995L14.5477 1.17423L14.2913 1.63578C14.1754 1.84439 14.0545 2.08275 13.9422 2.31963C12.6461 2.16488 11.3406 2.16505 10.0445 2.32014C9.92822 2.08178 9.80478 1.84975 9.67412 1.62413L9.41449 1.17584L8.90333 1.25995C7.33547 1.51794 5.80717 1.99419 4.37748 2.66939L4.19 2.75793L4.07461 2.93019C1.23864 7.16437 0.46302 11.3053 0.838165 15.3924L0.868838 15.7266L1.13844 15.9264C2.81818 17.1714 4.68053 18.1233 6.68582 18.719L7.18892 18.8684L7.50166 18.4469C7.96179 17.8268 8.36504 17.1824 8.709 16.4944L8.71099 16.4904C10.8645 17.0471 13.128 17.0485 15.2821 16.4947C15.6261 17.1826 16.0293 17.8269 16.4892 18.4469L16.805 18.8725L17.3116 18.717C19.3056 18.105 21.1876 17.1751 22.8559 15.9238L23.1224 15.724L23.1528 15.3923C23.5873 10.6524 22.3579 6.53306 19.8947 2.90714L19.7759 2.73227L19.5833 2.64518C18.1437 1.99439 16.6386 1.51826 15.0686 1.25995ZM16.6074 10.7755L16.6074 10.7756C16.5934 11.6409 16.0212 12.1444 15.4783 12.1444C14.9297 12.1444 14.3493 11.6173 14.3493 10.7877C14.3493 9.94885 14.9378 9.41192 15.4783 9.41192C16.0471 9.41192 16.6209 9.93851 16.6074 10.7755ZM8.49373 12.1444C7.94513 12.1444 7.36471 11.6173 7.36471 10.7877C7.36471 9.94885 7.95323 9.41192 8.49373 9.41192C9.06038 9.41192 9.63892 9.93712 9.6417 10.7815C9.62517 11.6239 9.05462 12.1444 8.49373 12.1444Z",
            strokeWidth: "1.5"
          }
        )
      }
    )
  }
];
function meta({}) {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
async function action({
  request
}) {
  const formData = await request.formData();
  let name = formData.get("name");
  let email = formData.get("email");
  if (typeof name !== "string" || typeof email !== "string") {
    return {
      guestBookError: "Name and email are required"
    };
  }
  name = name.trim();
  email = email.trim();
  if (!name || !email) {
    return {
      guestBookError: "Name and email are required"
    };
  }
  const db = database();
  try {
    await db.insert(guestBook).values({
      name,
      email
    });
  } catch (error) {
    return {
      guestBookError: "Error adding to guest book"
    };
  }
}
async function loader$1({
  context
}) {
  const db = database();
  const guestBook2 = await db.query.guestBook.findMany({
    columns: {
      id: true,
      name: true
    }
  });
  return {
    guestBook: guestBook2,
    message: context.VALUE_FROM_EXPRESS
  };
}
const home = UNSAFE_withComponentProps(function Home({
  actionData,
  loaderData
}) {
  return /* @__PURE__ */ jsx(Welcome, {
    guestBook: loaderData.guestBook,
    guestBookError: actionData == null ? void 0 : actionData.guestBookError,
    message: loaderData.message
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: home,
  loader: loader$1,
  meta
}, Symbol.toStringTag, { value: "Module" }));
async function loader({
  context
}) {
  const db = database();
  const guestBook2 = await db.query.guestBook.findMany({
    columns: {
      id: true,
      name: true
    }
  });
  return {
    guestBook: guestBook2,
    message: context.VALUE_FROM_EXPRESS
  };
}
const about = UNSAFE_withComponentProps(function about2(loaderData) {
  const data = loaderData.guestBook;
  return /* @__PURE__ */ jsx("div", {
    children: /* @__PURE__ */ jsxs("ul", {
      className: "text-center",
      children: [/* @__PURE__ */ jsx("li", {
        className: "p-3",
        children: "Personnes ayant signer"
      }), data.map(({
        id,
        name
      }) => /* @__PURE__ */ jsx("li", {
        className: "p-3",
        children: name
      }, id))]
    })
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: about,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-D8laE_xY.js", "imports": ["/assets/chunk-B7RQU5TL-CQbPFoM8.js", "/assets/index-DdQ6tu2z.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-edNdUw8R.js", "imports": ["/assets/chunk-B7RQU5TL-CQbPFoM8.js", "/assets/index-DdQ6tu2z.js"], "css": ["/assets/root-DbtqFDZb.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-DPghoEsW.js", "imports": ["/assets/chunk-B7RQU5TL-CQbPFoM8.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/about-BBL7Ahlb.js", "imports": ["/assets/chunk-B7RQU5TL-CQbPFoM8.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-cd5c9ab4.js", "version": "cd5c9ab4", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
