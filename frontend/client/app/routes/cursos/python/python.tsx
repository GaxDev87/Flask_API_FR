import { Layout } from "../components/layout";
import { Link } from "@remix-run/react";
import { useLocation } from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";
import cursoStyles from "~/styles/gestionar_cursos.css";
import { LinksFunction, json } from "@remix-run/node";
import Sidebar from "~/routes/components/Sidebar";
import Courses_Layout from "~/routes/courses_Layout";
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
        <div></div>
      </div>
    </Sidebar>
  );
}
