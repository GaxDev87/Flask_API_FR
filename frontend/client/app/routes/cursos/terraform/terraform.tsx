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
          Terraform es una poderosa herramienta para crear, cambiar y
          administrar infraestructura. Proporciona un flujo de trabajo simple
          para escribir código para crear y cambiar su infraestructura para que
          no tenga que lidiar con una complejidad innecesaria. Terraform se
          ejecuta en cualquier sistema operativo, incluidos Windows, MacOS,
          Linux y FreeBSD. Terraform te permite trabajar sin problemas en la
          nube sin tener que administrar la infraestructura de hardware.
          Terraform admite muchos proveedores de nube, herramientas de
          implementación y estilos de administración de configuración
          diferentes. Terraform es una herramienta para administrar la
          infraestructura de la nube como código. Es compatible con muchos
          proveedores de nube, herramientas de implementación y estilos de
          administración de configuración diferentes. Terraform lee un archivo
          de configuración que describe la infraestructura que se construirá y
          utiliza las herramientas adecuadas para crear o actualizar el entorno.
        </p>
        <br></br>
        <h1 className="text-3xl font-bold text-white bg-blue-600">
          Objetivos de aprendizaje:{" "}
        </h1>
        <p className=" text-xl">
          En este módulo, se abordará:
          <br></br>
          <ul>
            <li> 1. Los componentes de Terraform.</li>
            <li>
              {" "}
              2. Las herramientas recomendadas para trabajar con terraform .
            </li>
            <li>3. El lenguaje Hashicorp configuration language.</li>
            <li> 5. Manejo de estado Remoto.</li>
            <li> 6. Integración continua con Terraform.</li>
            <li> 7. Entre otros temas.</li>
          </ul>
        </p>
        <br></br>
        <p></p>
      </div>
    </Sidebar>
  );
}
