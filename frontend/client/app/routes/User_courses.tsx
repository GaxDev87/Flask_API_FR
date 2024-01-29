import React from "react";
import Sidebar from "./components/Sidebar";
import { Layout } from "./components/layout";
import { useLocation } from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";
import cursoStyles from "~/styles/gestionar_cursos.css";
import { LinksFunction, json } from "@remix-run/node";
import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { Navigate, useNavigate } from "react-router-dom";
import { User_Courses } from "./components/usercourses_interface";
import { FaCog } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { AiFillExperiment, AiOutlineHome } from "react-icons/ai";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: cursoStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

const User_courses = () => {
  const [info, setInfo] = useState("");
  const [isEditOpen, setEditOpen] = useState(false);
  const [isCreatetOpen, setCreateOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [user_Id, setId] = useState(0);
  const [firstName, setName] = useState("");
  const [lastName, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [group_Type, setgroup_Type] = useState("");
  const [user_type, setType] = useState("");

  // const [info, setInfo] = useState("");
  // const [isValidEmail, setIsValidEmail] = useState(true);
  // const [isOpen, setIsOpen] = useState(false);
  // const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [courseId, setcourseId] = useState(0);
  const [courseName, setCourseName] = useState("");
  const [courseDepartment, setDepartment] = useState("");
  const [search, setSearch] = useState("");
  const [courseThematic, setThematic] = useState([]);
  const [courses, setData] = useState([]);
  const navigate = useNavigate();
  // const [courseData, setCourseData] = useState<
  //   {
  //     curso: User_Courses;
  //   }[]
  // >([]);

  const location = useLocation();
  const menuOptions = [
    { path: "/", icon: <FaCog /> },
    { path: "/Micuenta", icon: <FaCircleUser /> },
    { path: "/", icon: <AiOutlineHome /> },
  ];

  // useEffect(() => {
  //   const getCoursesListAPI = () => {
  //     try {
  //       // Para recuperar el ID del usuario que ha iniciado sesion
  //       const userId = sessionStorage.getItem("user_id");

  //       console.log(userId);

  //       axios.get("http://localhost:5000/user_courses/" + userId).then(
  //         (response) => {
  //           const data = response.data;
  //           setData(data);

  //           const course: User_Courses = {
  //             user_Id: data["user_Id"],
  //             course_Id: data["course_Id"],
  //             course_Name: data["course_Name"],
  //             department_Name: data["department_Name"],
  //           };

  //           setId(course.user_Id);
  //           setcourseId(course.course_Id);
  //           setCourseName(course.course_Name);
  //           // setgroup_Type(user.group_Type);
  //           setDepartment(course.department_Name);
  //         },
  //         (error) => {
  //           console.log(error);
  //           setInfo(
  //             "Error: La información del usuario no se ha podido obtener correctamente"
  //           );
  //           setIsOpen(true);
  //         }
  //       );
  //     } catch (error) {
  //       console.log(error);
  //       setInfo(
  //         "Error: La información del usuario no se ha podido obtener correctamente"
  //       );
  //       setIsOpen(true);
  //     }

  //     getCoursesListAPI();
  //   };
  // }, []);

  useEffect(() => {
    // Fetch data using Promise with the Fetch API
    const getCoursesAPI = () => {
      const userId = sessionStorage.getItem("user_id");

      fetch("http://localhost:5000/user_courses/" + userId) // Fetch data based on the current page
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
          setData(data);
        });
    };

    // Trigger fetching method on component mount
    getCoursesAPI();
  }, []);

  // useEffect(() => {
  //   updateCourses(); // Obtener los usuarios
  // }, []);

  // const data = useLoaderData();
  // let courses_data = data["data_response"];

  // const updateCourses = () => {
  //   try {
  //     const courseData = Object.keys(courses_data).map((diccionarioKey) => {
  //       const diccionario = courses_data[diccionarioKey];
  //       const curso: User_Courses = {
  //         user_Id: diccionario["user_Id"],
  //         course_Id: diccionario["course_Id"],
  //         course_Name: diccionario["course_Name"],
  //         department_Name: diccionario["department_Name"],
  //       };

  //       return {
  //         curso: curso,
  //       };
  //     });

  //     setCourseData(courseData);
  //     console.log(courseData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   try {
  //     // Para recuperar el ID del usuario que ha iniciado sesion
  //     const userId = sessionStorage.getItem("user_id");

  //     // console.log(userId);

  //     axios.get("http://localhost:5000/user_courses/" + userId).then(
  //       (response) => {
  //         const data = response.data;
  //         const course: User_Courses = {
  //           user_Id: data["user_Id"],
  //           course_Id: data["course_Id"],
  //           course_Name: data["course_Name"],
  //           department_Name: data["department_Name"],
  //         };

  //         setId(course.user_Id);
  //         setcourseId(course.course_Id);
  //         setCourseName(course.course_Name);
  //         // setgroup_Type(user.group_Type);
  //         setDepartment(course.department_Name);
  //       },
  //       (error) => {
  //         console.log(error);
  //         setInfo(
  //           "Error: La información del usuario no se ha podido obtener correctamente"
  //         );
  //         setIsOpen(true);
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //     setInfo(
  //       "Error: La información del usuario no se ha podido obtener correctamente"
  //     );
  //     setIsOpen(true);
  //   }
  // }, []);

  // // State to hold fetched thematic data

  useEffect(() => {
    // Fetch data using Promise with the Fetch API
    const userId = sessionStorage.getItem("user_id");

    const getCoursesAPI = () => {
      fetch("http://localhost:5000/get_distinct_thematic/" + userId) // Fetch data based on the current page
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
          setThematic(data); // Set the fetched data
        });
    };

    // Trigger fetching method on component mount
    getCoursesAPI();
  }, []);

  if (courses.map == null) {
    return (
      <Sidebar>
        <div style={{ marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}>
          {" "}
          <h1
            style={{ marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}
            className="text-3xl font-bold text-white bg-blue-600"
          >
            NO EXISTEN CURSOS INSCRITOS PARA EL USUARIO ACTUAL
          </h1>
        </div>
      </Sidebar>
    );
  } else
    return (
      <Sidebar>
        <div style={{ marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}>
          <table>
            <thead>
              <tr>
                <th>Nombre del Curso</th>
                <th>Temática del Curso</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <select
                    className="dropdownsearch"
                    name="searchName"
                    // value={search}
                  >
                    <option value="">Cursos</option>

                    {courses.map((item) => {
                      return (
                        <>
                          <option key={item.course_Id}>
                            {" "}
                            {item.course_Name}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </th>
                <th>
                  <select
                    className="dropdownsearch"
                    name="searchName"
                    // value={search}
                  >
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
                <th></th>
              </tr>

              {courses.map((item) => (
                <tr key={item.course_Id}>
                  <td className="text-white font-bold size-15">
                    {item.course_Name}
                  </td>
                  <td className="text-white font-bold size-15">
                    {item.department_Name}
                  </td>

                  <td>
                    <Link
                      to="#"
                      // state={{
                      //   userId: user_Id,
                      //   firstName: firstName,
                      //   email: email,
                      //   course_Id: item.curso.course_Id,
                      //   course_Name: item.curso.course_Name,
                      //   course_Description: item.curso.course_Description,
                      // }} // onClick={() =>
                      //   handleClickCourse(
                      //     item.curso.course_Id,
                      //     item.curso.course_Name,
                      //     item.curso.department_Name
                      //   )
                      // }
                      className="EditLink"
                    >
                      Ir al Curso
                    </Link>
                  </td>
                  <td>
                    <Link
                      to="#"
                      // state={{
                      //   userId: user_Id,
                      //   firstName: firstName,
                      //   email: email,
                      //   course_Id: item.curso.course_Id,
                      //   course_Name: item.curso.course_Name,
                      //   course_Description: item.curso.course_Description,
                      // }} // onClick={() =>
                      //   handleClickCourse(
                      //     item.curso.course_Id,
                      //     item.curso.course_Name,
                      //     item.curso.department_Name
                      //   )
                      // }
                      className="EditLink"
                    >
                      Darme de baja
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* <Modal
          isOpen={isOpen}
          onRequestClose={handleClose}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              borderRadius: "5px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
              padding: "20px",
              height: "300px",
              maxWidth: "500px",
              width: "100%",
            },
          }}
        >
          <h4
            style={{
              textAlign: "center",
              marginRight: "40px",
              fontSize: "30px",
            }}
          >
            AVISO
          </h4>
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "22px",
            }}
          >
            {info}
          </p>
          <button onClick={handleClose} className="popUpButton">
            Aceptar
          </button>
        </Modal> */}
          </table>
        </div>
      </Sidebar>
    );
};

export default User_courses;