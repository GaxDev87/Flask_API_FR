import { Layout } from "../components/layout";
import { Link } from "@remix-run/react";
import { useLocation } from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";
import cursoStyles from "~/styles/gestionar_cursos.css";
import { LinksFunction, json } from "@remix-run/node";
import Sidebar from "~/routes/components/Sidebar";
import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { FaTrash } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { IoAddOutline } from "react-icons/io5";
import { Button, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: cursoStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];
// useEffect(() => {}, []);

export default function Curso(props) {
  const Location = useLocation();
  console.log(props, "props");
  console.log(Location, "useLocation Hook");
  const data = Location.state; //   const menuOptions = [
  //     { path: "/", icon: <FaCog /> },
  //     { path: "/Micuenta", icon: <FaCircleUser /> },
  //     { path: "/", icon: <AiOutlineHome /> },
  //   ];

  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setCourseName(data.course_Name);
    // setCourseDescription(data.course_Description);
  }, []);

  //   const courseRedirect = () => {
  //     switch (courseName) {
  //       case "Python":
  //         return (location.href = "/python");

  //       case "Terraform":
  //         return (location.href = "/terraform");

  //       default:
  //         return (location.href = "/");
  //     }
  //   };

  return (
    <Sidebar>
      <div
        className=" h-full flex justify-left items-left flex-col gap-4"
        style={{
          marginLeft: "280px",

          marginTop: "7%",
        }}
      >
        <h1 className="text-3xl font-bold text-white bg-blue-600">
          Introducción a {courseName}
        </h1>{" "}
        <p className=" text-xl">
          Python es uno de los lenguajes de programación más populares y con un
          crecimiento más rápido del mundo. Se usa para todo tipo de tareas,
          como las de programación web y análisis de datos, y se ha convertido
          en el lenguaje que hay que conocer para el aprendizaje automático. Esa
          popularidad significa que los desarrolladores de Python están muy
          solicitados y los trabajos de programación de Python pueden ser
          rentables. Las razones mencionadas anteriormente representan el por
          qué podría ser una buena idea aprender a programar en Python. En este
          módulo se proporcionará una introducción al uso de Python para
          compilar una aplicación, que puede ser un punto de partida para
          convertirse en programador de Python.
        </p>
        <br></br>
        <h1 className="text-3xl font-bold text-white bg-blue-600">
          Objetivos de aprendizaje{" "}
        </h1>
        <p className=" text-xl">
          En este módulo, aprenderá a:
          <br></br>
          <ul>
            <li>
              {" "}
              1. Explorar las opciones disponibles para ejecutar aplicaciones de
              Python.
            </li>
            <li>
              {" "}
              2. Usar el intérprete de Python para ejecutar instrucciones y
              scripts.
            </li>
            <li>3. Obtener información sobre cómo declarar variables.</li>
            <li>
              {" "}
              4. Compilar una aplicación sencilla de Python que toma una entrada
              y genera una salida.
            </li>
          </ul>
        </p>
        <br></br>
        <p></p>
      </div>
    </Sidebar>
  );
}
