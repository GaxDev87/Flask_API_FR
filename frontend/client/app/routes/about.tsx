import { Layout } from "./components/layout";
import { Link } from "@remix-run/react";

export default function About() {
  return (
    <Layout>
      <h1>Esta es la Pagina About</h1>
      
      <Link to="/">Ir a index</Link>
    </Layout>
  );
}
