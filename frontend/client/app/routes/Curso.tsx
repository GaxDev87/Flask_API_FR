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

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: cursoStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];
// useEffect(() => {}, []);

export default function Curso(props) {
  const Location = useLocation();
  //   const menuOptions = [
  //     { path: "/", icon: <FaCog /> },
  //     { path: "/Micuenta", icon: <FaCircleUser /> },
  //     { path: "/", icon: <AiOutlineHome /> },
  //   ];
  const location = useLocation();
  console.log(props, "props");
  console.log(location, "useLocation Hook");
  const data = location.state;
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  useEffect(() => {
    setCourseName(data.course_Name);
    // setCourseDescription(data.course_Description);
  }, []);

  return (
    <Sidebar>
      <div
        className=" h-full flex justify-center items-center flex-col gap-4"
        style={{ marginLeft: "280px", marginRight: "250px", marginTop: "7%" }}
      >
        <h1 className="text-3xl font-bold text-white bg-blue-600">
          Te damos la bienvenida al curso de: <p>{courseName}</p>
          <br></br>
          <p className="text-3xl font-bold text-white">
            A continuación encontrarás los enlaces tanto a la documentación como
            a los videos del curso.
          </p>
          <br></br>
          <div>{/* <p>{courseDescription}</p> */}</div>
        </h1>
      </div>
    </Sidebar>
  );
}
