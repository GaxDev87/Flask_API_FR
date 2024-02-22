import React, { useEffect, useState } from "react";
import axios from "axios";
import { cssBundleHref } from "@remix-run/css-bundle";
import gestionarUsuariosStyles from "~/styles/gestionar_usuarios.css";
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
import { FaCircleUser } from "react-icons/fa6";
import { AiFillExperiment, AiOutlineHome } from "react-icons/ai";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: gestionarUsuariosStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

const Admin_courses = () => {
  const menuOptions = [
    // { path: "/admin", icon: <FaCog /> },
    { path: "/Micuenta", icon: <FaCircleUser /> },
    { path: "/", icon: <AiOutlineHome /> },
  ];

  return (
    <Sidebar>
      <div
        style={{
          marginLeft: "300px",
          marginRight: "250px",
          marginTop: "150px",
        }}
      >
        <h1
          style={{ marginLeft: "4.6%", width: "83.5%", borderRadius: "15px" }}
          className="text-3xl font-bold text-white bg-blue-600 align-middle"
        >
          <p
            style={{
              paddingBottom: "25px",
            }}
          >
            <Navbar title="GESTIONAR CURSOS" options={menuOptions} />
            LISTADO DE CURSOS REGISTRADOS
          </p>
        </h1>
        <CoursesList />
      </div>
    </Sidebar>
  );
};

export default Admin_courses;
