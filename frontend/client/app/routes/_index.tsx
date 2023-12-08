import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Layout } from "./components/layout";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">
        Hello world!, esta es la pagina principal
      </h1>

      <nav>
        <ul>
          <li>
            <Link to="/about">
              <h3>Ir a about</h3>
            </Link>
          </li>
          <li>
            <Link to="/login">
              <h3>Ir a login</h3>
            </Link>
          </li>
        </ul>
      </nav>
    </Layout>
  );
}
