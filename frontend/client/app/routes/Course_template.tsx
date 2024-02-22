import { Layout } from "./components/layout";
import { Link } from "@remix-run/react";
import { useLocation } from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";
import cursoStyles from "~/styles/gestionar_cursos.css";
import { LinksFunction, json } from "@remix-run/node";
import Sidebar from "./components/Sidebar";
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
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setCourseName(data.course_Name);
    setCourseId(data.course_Id);
    // setCourseDescription(data.course_Description);
  }, []);

  const courseRedirect = () => {
    switch (courseName) {
      case "Python":
        return navigate("/Python", {
          state: { course_Id: courseId, course_Name: courseName },
        });

      case "Terraform":
        return navigate("/Terraform", {
          state: { course_Id: courseId, course_Name: courseName },
        });
      case "Kubernetes":
        return navigate("/Kubernetes", {
          state: { course_Id: courseId, course_Name: courseName },
        });
      case "Ansible":
        return navigate("/Ansible", {
          state: { course_Id: courseId, course_Name: courseName },
        });
      case "Rundeck":
        return navigate("/Rundeck", {
          state: { course_Id: courseId, course_Name: courseName },
        });

      default:
        return (location.href = "/Course_template");
    }
  };

  return (
    <Sidebar>
      <div
        className=" h-full flex justify-center items-center flex-col gap-4"
        style={{ marginLeft: "280px", marginRight: "250px", marginTop: "7%" }}
      >
        <h1 className="text-3xl font-bold text-white bg-blue-600">
          Te damos la bienvenida al curso de: <p>{courseName}</p>
          <br></br>
          <p className="text-3xl font-bold text-white"> </p>
          <ul>
            <p>Durante este curso se abordarán los siguientes modulos:</p>
            <br></br>

            <li>-Introduccion a {courseName}</li>
            <li>-Objetivos de aprendisaje del curso {courseName}</li>
            <li>-Aspectos básicos de {courseName}</li>
            <li>-Antecedentes de {courseName}</li>
          </ul>
          <br></br>
          <div>
            <button onClick={courseRedirect} className="EditLink">
              Iniciar
            </button>
          </div>
        </h1>
      </div>
    </Sidebar>
  );
}
