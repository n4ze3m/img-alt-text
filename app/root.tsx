import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';

import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ApplicationLayout } from "./components/Layout";
import rootStyles from "~/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Notifications } from '@mantine/notifications';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: rootStyles },
];

export default function App() {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
        <script
          src="https://www.google.com/recaptcha/api.js"
          async
          defer
        ></script>
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <MantineProvider
            // defaultColorScheme="dark"
            theme={{
              fontFamily: "Inter, sans-serif",
            }}
          >
            <ApplicationLayout>
              <Notifications />
              <Outlet />
              <ScrollRestoration />
              <Scripts />
              <LiveReload />
            </ApplicationLayout>
          </MantineProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
