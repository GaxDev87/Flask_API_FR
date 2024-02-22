import React from "react";
import Sidebar from "./Sidebar";
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
import { User_Courses } from "./usercourses_interface";
import { FaCog } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { AiFillExperiment, AiOutlineHome } from "react-icons/ai";
import { Registration } from "./course_interface";
import { BsSearch } from "react-icons/bs";
import Navbar from "./Navbar";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: cursoStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

const User_courses = () => {
  const [info, setInfo] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  // const [info, setInfo] = useState("");
  // const [isValidEmail, setIsValidEmail] = useState(true);
  // const [isOpen, setIsOpen] = useState(false);
  // const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [courseId, setcourseId] = useState(0);
  const [course, setCourse] = useState("");
  const [searchCourseName, setSearchCourseName] = useState("");
  const [searchCourseThematic, setSearchCourseThematic] = useState("");
  const [courseThematic, setThematic] = useState([]);
  const [coursesNames, setCoursesNames] = useState([]);
  const [courseName, setCourseName] = useState("");

  // const [courses, setData] = useState([]);
  const [courseData, setCoursesData] = useState([]);
  const navigate = useNavigate();
  // const Location = useLocation();
  // console.log(props, "props");
  // console.log(Location, "useLocation Hook");
  // const data = Location.state;
  //   {
  //     curso: User_Courses;
  //   }[]
  // >([]);

  const Location = useLocation();
  const menuOptions = [
    // { path: "/", icon: <FaCog /> },
    { path: "/Micuenta", icon: <FaCircleUser /> },
    { path: "/", icon: <AiOutlineHome /> },
  ];

  const getUserCoursesListAPI = () => {
    const userId = sessionStorage.getItem("user_id");
    console.log(userId);

    fetch("http://localhost:5000/user_courses/" + userId) // Fetch data based on the current page
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setCoursesData(data);
      });
  };

  const getUserCoursesAPI = () => {
    const userId = sessionStorage.getItem("user_id");

    fetch("http://localhost:5000/user_courses/" + userId) // Fetch data based on the current page
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setCoursesNames(data);
      });
  };

  useEffect(() => {
    getUserCoursesListAPI();
    getUserCoursesAPI();
  }, []);

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

  // Filtering registered courses by user id

  const getCoursesName = () => {
    const userId = sessionStorage.getItem("user_id");

    axios
      .post(
        "http://localhost:5000/search_registeredCourseName/" + searchCourseName,
        {
          user_Id: userId,
        }
      ) // Fetch data based on the current page
      .then((response) => setCoursesData(response.data)); // Parse the response as JSON
  };

  // Filtering course thematic by user id

  const getCoursesThematic = () => {
    const userId = sessionStorage.getItem("user_id");

    axios
      .post(
        "http://localhost:5000/search_registeredcourseThematic/" +
          searchCourseThematic,
        {
          user_Id: userId,
        }
      ) // Fetch data based on the current page
      .then((response) => setCoursesData(response.data)); // Parse the response as JSON
  };

  const handleClickDelete = (id: number, course_Name: string) => {
    setcourseId(id);
    setCourse(course_Name);
    setInfo(
      "¿Estás seguro de que deseas darte de baja del curso " + course_Name + "?"
    );
    setIsOpenConfirm(true);
  };

  const handleClose = () => {
    location.href = "/User_courses"; // Actualizar tabla cursos
    getUserCoursesAPI();
    setIsOpen(false);
  };

  const handleCloseConfirm = () => {
    const data = {
      id: courseId,
    };

    setIsOpenConfirm(false);

    axios
      .delete("http://localhost:5000/delete_usercourse/" + courseId)
      .then((response) => {
        setInfo("Curso " + course + " dado de baja correctamente!");
        setIsOpen(true);
      })
      .catch((error) => {
        console.log(error);
        setInfo("Fallo al dar de baja el curso" + course);
        setIsOpen(true);
      });
  };

  const handleCloseCancel = () => {
    location.href = "/User_courses"; // Actualizar la tabla después
    getUserCoursesAPI();
    setIsOpenConfirm(false);
  };

  const handleSearch = () => {
    getCoursesName();
    getCoursesThematic();
    // getUsersEmail();
    // getUsersUserType();
  };

  //redirectng user to course content according to course name
  const courseRedirect = (courseId: number, courseName: string) => {
    // console.log(courseName);
    // switch (courseName) {
    //   case "Python":
    //     return navigate("/Python", {
    //       state: { course_Id: courseId, course_Name: courseName },
    //     });
    //   case "Terraform":
    //     return navigate("/Terraform", {
    //       state: { course_Id: courseId, course_Name: courseName },
    //     });
    //   case "Docker-Kubernetes":
    //     return navigate("/Docker-Kubernetes", {
    //       state: { course_Id: courseId, course_Name: courseName },
    //     });
    //   case "Ansible":
    //     return navigate("/Ansible", {
    //       state: { course_Id: courseId, course_Name: courseName },
    //     });
    //   case "Rundeck":
    //     return navigate("/Rundeck", {
    //       state: { course_Id: courseId, course_Name: courseName },
    //     });
    //   case "Bitbucket":
    //     return navigate("/Bitbucket", {
    //       state: { course_Id: courseId, course_Name: courseName },
    //     });
    //   case "Everauto":
    //     return navigate("/Everauto", {
    //       state: { course_Id: courseId, course_Name: courseName },
    //     });
    //   case "GIT":
    //     return navigate("/GIT", {
    //       state: { course_Id: courseId, course_Name: courseName },
    //     });
    //   default:
    //     return (location.href = "/User_courses");
    // }
  };
  // // State to hold fetched thematic data

  if (courseData.map == null) {
    return (
      <Sidebar>
        <div style={{ marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}>
          <Navbar title="CURSOS INSCRITOS" options={menuOptions} />{" "}
          <h1
            style={{
              marginLeft: "10%",
              marginRight: "10%",
              marginTop: "5%",
              borderRadius: "15px",
            }}
            className="text-3xl font-bold text-white bg-blue-600"
          >
            NO EXISTEN CURSOS INSCRITOS PARA EL USUARIO ACTUAL
          </h1>
        </div>
      </Sidebar>
    );
  }
  return (
    <Sidebar>
      <Navbar title="CURSOS INSCRITOS" options={menuOptions} />{" "}
      <h1
        style={{
          marginLeft: "10%",
          width: "80%",
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
          CURSOS EN LOS QUE TE HAS REGISTRADO:
        </p>
      </h1>
      <div style={{ marginLeft: "10%", marginRight: "10%", marginTop: "1%" }}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Nombre del Curso</th>
              <th>Temática del Curso</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th
                style={{
                  paddingRight: "9.8%",
                }}
              >
                <label
                  style={{
                    marginLeft: "60%",
                    marginTop: "-5%",
                    fontSize: "18px",
                  }}
                >
                  Filtrar
                </label>{" "}
                <div
                  style={{
                    marginRight: "100%",
                  }}
                >
                  <button
                    style={{
                      fontSize: "34px",
                      width: "58px",
                      height: "58px",
                    }}
                    onClick={handleSearch}
                    className="Buscar"
                  >
                    <BsSearch />
                  </button>
                </div>
              </th>
              <th>
                <select
                  style={{
                    backgroundColor: "white",
                    textAlign: "left",
                    fontSize: "20px",
                    borderRadius: "15px",
                  }}
                  className="dropdownsearch"
                  name="searchName"
                  onChange={(event) => setSearchCourseName(event.target.value)}
                  value={searchCourseName}
                >
                  <option value="">Cursos</option>

                  {coursesNames?.map((item) => {
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
                  style={{
                    backgroundColor: "white",
                    textAlign: "left",
                    fontSize: "20px",
                    borderRadius: "15px",
                  }}
                  onChange={(event) =>
                    setSearchCourseThematic(event.target.value)
                  }
                  value={searchCourseThematic}
                  className="dropdownsearch"
                  name="searchName"

                  // value={search}
                >
                  <option value="">Temática</option>

                  {courseThematic?.map((item) => {
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
              <th> </th>
              <th></th>
            </tr>

            {courseData?.map((item) => (
              <tr key={item.course_Id}>
                <td></td>
                <td className="text-white font-bold size-15">
                  {item.course_Name}
                </td>
                <td className="text-white font-bold size-15">
                  {item.department_Name}
                </td>

                <td>
                  <button
                    // state={{
                    //   userId: user_Id,
                    //   firstName: firstName,
                    //   email: email,
                    //   user_course_Id: item.user_course_Id,
                    //   course_Id: item.course_Id,
                    //   course_Name: item.course_Name,
                    // }}

                    onClick={() =>
                      courseRedirect(item.course_Id, item.course_Name)
                    }
                    className="EditLink"
                  >
                    Ir al Curso
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleClickDelete(item.user_course_Id, item.course_Name)
                    }
                    className="EditLink"
                  >
                    Darme de baja
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <Modal
            isOpen={isOpenConfirm}
            onRequestClose={handleCloseCancel}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                position: "absolute",
                top: "50%",
                left: "750px",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                borderRadius: "5px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                padding: "20px",
                height: "300px",
                maxWidth: "700px",
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
            <button onClick={handleCloseConfirm} className="popUpButton2">
              Aceptar
            </button>
            <button onClick={handleCloseCancel} className="popUpButton2">
              Cancelar
            </button>
          </Modal>
        </table>
        <Modal
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
        </Modal>
      </div>
    </Sidebar>
  );
};

export default User_courses;
