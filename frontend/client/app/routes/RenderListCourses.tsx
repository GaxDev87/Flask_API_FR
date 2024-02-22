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
import ListCourses from "./components/ListCourses";
import { FaCircleUser } from "react-icons/fa6";
import { AiFillExperiment, AiOutlineHome } from "react-icons/ai";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: gestionarUsuariosStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

const RenderListCourses = () => {
  const menuOptions = [
    // { path: "/", icon: <FaCog /> },
    { path: "/Micuenta", icon: <FaCircleUser /> },
    { path: "/", icon: <AiOutlineHome /> },
  ];
  return (
    <Sidebar>
      <Navbar title="CURSOS DISPONIBLES" options={menuOptions} />{" "}
      <h1
        style={{
          marginLeft: "9.8%",
          width: "83.6%",
          borderRadius: "15px",
          marginTop: "5%",
        }}
        className="text-3xl font-bold text-white bg-blue-600 align-middle"
      >
        <p
          style={{
            paddingBottom: "25px",
          }}
        >
          LISTADO DE CURSOS DISPONIBLES:
        </p>
      </h1>
      <div style={{ marginLeft: "280px", marginTop: "2%" }}>
        {/* <h1 className="text-blue-500 font-bold size-10">CURSOS DISPONIBLES:</h1> */}
        <ListCourses />
      </div>
    </Sidebar>
  );
};

export default RenderListCourses;
