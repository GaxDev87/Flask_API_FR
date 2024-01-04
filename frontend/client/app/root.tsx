import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import Sidebar from "./routes/components/Sidebar";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";

import styles from "~/styles/app.css";
import { FiHome, FiUser } from "react-icons/fi";
import { FaCog } from "react-icons/fa";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

// export const loader = async ({ request }: LoaderArgs) => {
//   return json({ user: await getUser(request) });
// };

export default function App() {
  const location = useLocation();
  const menuOptions = [
    { path: '/', icon: <FaCog />},
    { path: '/', icon: <FiUser />},
    { path: '/', icon: <FiHome />}
    
  ];
  
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
      
        <Outlet />

        
      
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        
      </body>
    </html>
  );
}
