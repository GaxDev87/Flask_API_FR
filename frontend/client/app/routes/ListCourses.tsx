import {
  FiHome,
  FiInfo,
  FiSettings,
  FiMail,
  FiUser,
  FiPieChart,
  FiCompass,
  FiUsers,
  FiLogOut,
  FiUserPlus,
  FiUserCheck,
  FiTool,
} from "react-icons/fi";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { Course } from "./components/course_interface";
import { LinksFunction, json } from "@remix-run/node";
import { cssBundleHref } from "@remix-run/css-bundle";
// import { safeRedirect } from "~/utils";
import cursoStyles from "~/styles/gestionar_cursos.css";

import { CgArrowRightR } from "react-icons/cg";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: cursoStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

const ListarCursos = () => {
  const [info, setInfo] = useState("");
  const [isEditOpen, setEditOpen] = useState(false);
  const [isCreatetOpen, setCreateOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [courseId, setId] = useState(0);
  const [courseName, setCourseName] = useState("");
  const [courseDepartment, setDepartment] = useState("");
  const [search, setSearch] = useState("");
  const [courseThematic, setThematic] = useState([]);

  const [courseData, setCourseData] = useState<
    {
      curso: Course;
    }[]
  >([]);
  const data = useLoaderData();
  let courses_data = data["data_response"];
  const URL = "http://localhost:5000/get_thematic";
  // const [coursesList, setCourses] = useState([]);

  // State to hold fetched thematic data

  useEffect(() => {
    // Fetch data using Promise with the Fetch API
    const getCoursesAPI = () => {
      fetch(URL) // Fetch data based on the current page
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
          setThematic(data); // Set the fetched data
        });
    };

    // Trigger fetching method on component mount
    getCoursesAPI();
  }, []);

  const updateCourses = () => {
    try {
      const courseData = Object.keys(courses_data).map((diccionarioKey) => {
        const diccionario = courses_data[diccionarioKey];
        const curso: Course = {
          id: diccionario["course_Id"],
          course_Name: diccionario["course_Name"],
          department_Name: diccionario["department_Name"],
        };

        return {
          curso: curso,
        };
      });

      setCourseData(courseData);
      console.log(courseData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateCourses(); // Obtener los usuarios
  }, []);

  return (
    <div style={{ marginRight: "7%", marginTop: "1%" }}>
      <table>
        <thead>
          <tr>
            <th>Nombre del Curso</th>
            <th>Temática del Curso</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              <select
                className="dropdownsearch"
                name="searchName"
                value={search}
              >
                <option value="">Cursos</option>

                {courseData.map((item) => {
                  return (
                    <>
                      <option key={item.curso.id}>
                        {" "}
                        {item.curso.course_Name}
                      </option>
                    </>
                  );
                })}
              </select>
            </th>
            <th>
              <select className="dropdownsearch">
                <option value="">Temática</option>

                {courseThematic.map((item) => {
                  return (
                    <>
                      <option key={item.course_Id}>
                        {" "}
                        {item.department_Name}
                      </option>
                    </>
                  );
                })}
              </select>
            </th>
            <th></th>
          </tr>

          {courseData.map((item) => (
            <tr key={item.curso.id}>
              <td className="text-white font-bold size-15">
                {item.curso.course_Name}
              </td>
              <td className="text-white font-bold size-15">
                {item.curso.department_Name}
              </td>

              <td>
                <Link to="/Course_Template">
                  <button className="GoCourse"> Ver Curso</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarCursos;
