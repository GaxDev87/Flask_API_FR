import {
  FiHome,
  FiCompass,
  FiUsers,
  FiLogOut,
  FiChevronDown,
  FiChevronUp,
  FiCodesandbox,
} from "react-icons/fi";
import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import { cssBundleHref } from "@remix-run/css-bundle";
import gestionarUsuariosStyles from "~/styles/gestionar_usuarios.css";
import { LinksFunction, json } from "@remix-run/node";

import { User } from "./components/user_interface";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";

import { IoCloseCircle, IoBookSharp } from "react-icons/io5";
import Sidebar from "./components/Sidebar";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: gestionarUsuariosStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];
const Cursos = () => {
  const [info, setInfo] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const URL = "http://localhost:5000/get_courses";

  // State to hold fetched data
  const [coursesList, setCourses] = useState([]);

  useEffect(() => {
    // Fetch data using Promise with the Fetch API
    const fetchUsingPromiseWithFetchApi = () => {
      fetch(URL) // Fetch data based on the current page
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
          setCourses(data); // Set the fetched data
        });
    };

    // Trigger fetching method on component mount
    fetchUsingPromiseWithFetchApi();
  }, []);

  return (
    <Sidebar>
      <div
        className=" h-full flex justify-center items-center flex-col gap-4 bg-ambar-400"
        style={{ width: "600px", height: "500px" }}
      >
        <div className="dropcontainer">
          <select>
            {coursesList.map((curso) => {
              return (
                <option value="Seleccione..." key={curso.course_Id}>
                  {" "}
                  {curso.course_Name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </Sidebar>
  );
};

export default Cursos;
