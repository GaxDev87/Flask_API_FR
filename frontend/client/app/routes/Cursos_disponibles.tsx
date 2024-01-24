import React, { useEffect, useState } from "react";
import axios from "axios";
import { cssBundleHref } from "@remix-run/css-bundle";
import gestionarUsuariosStyles from "~/styles/gestionar_cursos.css";
import { LinksFunction, json } from "@remix-run/node";

import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useParams,
} from "@remix-run/react";
import { FaCog } from "react-icons/fa";
import { FiUser, FiHome } from "react-icons/fi";
import Navbar from "./components/Navbar";
import CoursesList from "./components/CoursesList";
import Sidebar from "./components/Sidebar";
import CoursesListAlumnos from "./CoursesListAlumnos";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: gestionarUsuariosStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export function loader() {
  return axios
    .get("http://localhost:5000/get_courses")
    .then((response) => {
      const data = response.data;
      let data_response = data;
      if (typeof response.data === "string") {
        console.log("Error: no data");
        return "no data";
      } else {
        console.log("Usuarios obtenidos correctamente");
        return { data_response };
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

const Alumnos_cursos = () => {
  const menuOptions = [
    { path: "/admin", icon: <FaCog /> },
    { path: "/perfil", icon: <FiUser /> },
    { path: "/main", icon: <FiHome /> },
  ];
  return (
    <Sidebar>
      <div style={{ marginLeft: "280px", marginTop: "7%" }}>
        <h1 className="text-blue-500 font-bold size-10">CURSOS DISPONIBLES:</h1>
        <CoursesListAlumnos />
      </div>
    </Sidebar>
  );
};

export default Alumnos_cursos;
