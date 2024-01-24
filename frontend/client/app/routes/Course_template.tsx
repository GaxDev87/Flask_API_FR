import { Layout } from "./components/layout";
import { Link } from "@remix-run/react";
import { useState, useEffect } from "react";

// useEffect(() => {}, []);

export default function Course_Template() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1 className="text-3xl font-bold text-green-300 bg-blue-600">
        Bienvendo al curso...
      </h1>
    </div>
  );
}
