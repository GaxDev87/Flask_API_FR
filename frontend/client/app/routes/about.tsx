import { Layout } from "./components/layout";
import { Link } from "@remix-run/react";
import { useState, useEffect } from "react";

export default function About() {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
    {
      console.log(name);
    }
  };

  return (
    <div
      style={{ marginLeft: "150px", height: "600px", marginTop: "7%" }}
      className=" bg-cyan-600"
    >
      <input
        name="searcherId"
        value={name}
        className="search"
        onChange={handleChange}
      ></input>
    </div>
  );
}
