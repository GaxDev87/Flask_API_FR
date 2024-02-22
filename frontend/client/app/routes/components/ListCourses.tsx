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
import { Course } from "./course_interface";
import { LinksFunction, json } from "@remix-run/node";
import { cssBundleHref } from "@remix-run/css-bundle";
// import { safeRedirect } from "~/utils";
import cursoStyles from "~/styles/gestionar_cursos.css";
import { Navigate, useNavigate } from "react-router-dom";
import { User } from "./user_interface";
import { BsSearch } from "react-icons/bs";
import Navbar from "./Navbar";
import { FaCircleUser } from "react-icons/fa6";
import { AiFillExperiment, AiOutlineHome } from "react-icons/ai";
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
  const [user_Id, setId] = useState(0);
  const [firstName, setName] = useState("");
  const [lastName, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [group_Type, setgroup_Type] = useState("");
  const [user_type, setType] = useState("");

  const [searchCourseName, setSearchCourseName] = useState("");
  const [searchCourseThematic, setSearchCourseThematic] = useState("");
  const [courseThematic, setThematic] = useState([]);
  const [courseNames, setCourseNames] = useState([]);
  const [coursesList, setCoursesList] = useState([]);

  const navigate = useNavigate();

  // };
  const getCoursesListAPI = () => {
    fetch("http://localhost:5000/get_courses") // Fetch data based on the current page
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setCoursesList(data); // Set the fetched data
      });
  };

  useEffect(() => {
    // Trigger fetching method on component mount
    getCoursesListAPI();
  }, []);

  // State to hold fetched thematic data

  const getCoursesAPI = () => {
    fetch("http://localhost:5000/get_thematic") // Fetch data based on the current page
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setThematic(data); // Set the fetched data
      });
  };

  const getCourseNamesAPI = () => {
    fetch("http://localhost:5000/get_coursenames") // Fetch data based on the current page
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setCourseNames(data); // Set the fetched data
      });
  };
  useEffect(() => {
    // Fetch data using Promise with the Fetch API

    // Trigger fetching method on component mount
    getCourseNamesAPI();
    getCoursesAPI();
  }, []);

  useEffect(() => {
    try {
      // Para recuperar el ID del usuario que ha iniciado sesion
      const userId = sessionStorage.getItem("user_id");

      // console.log(userId);

      axios.get("http://localhost:5000/users/" + userId).then(
        (response) => {
          const data = response.data;
          const user: User = {
            user_Id: data["user_Id"],
            firstName: data["firstName"],
            lastName: data["lastName"],
            email: data["email"],
            // group_Type: data["group_Type"],
            user_Type: data["user_Type"],
          };

          setId(user.user_Id);
          setName(user.firstName);
          setSurname(user.lastName);
          // setgroup_Type(user.group_Type);
          setEmail(user.email);
          setType(user.user_Type);
        },
        (error) => {
          console.log(error);
          setInfo(
            "Error: La información del usuario no se ha podido obtener correctamente"
          );
          setIsOpen(true);
        }
      );
    } catch (error) {
      console.log(error);
      setInfo(
        "Error: La información del usuario no se ha podido obtener correctamente"
      );
      setIsOpen(true);
    }
  }, []);

  const getCoursesName = () => {
    fetch("http://localhost:5000/search_courseName/" + searchCourseName) // Fetch data based on the current page
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setCoursesList(data); // Set the fetched data
      });
  };

  const getCoursesThematic = () => {
    fetch("http://localhost:5000/search_courseThematic/" + searchCourseThematic) // Fetch data based on the current page
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setCoursesList(data); // Set the fetched data
      });
  };

  const handleSearch = () => {
    getCoursesName();
    getCoursesThematic();
    // getUsersEmail();
    // getUsersUserType();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div style={{ marginRight: "7%", marginTop: "1%" }}>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Nombre del Curso</th>
            <th>Temática del Curso</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th
              style={{
                paddingRight: "12%",
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
              </label>

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
                  width: "50%",
                }}
                className="dropdownsearch"
                name="searchName"
                onChange={(event) => setSearchCourseName(event.target.value)}
                value={searchCourseName}
                // value={search}
              >
                <option value="">Cursos</option>

                {courseNames.map((item) => {
                  return (
                    <>
                      <option key={item.course_Id}> {item.course_Name}</option>
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
                  width: "50%",
                }}
                className="dropdownsearch"
                name="searchName"
                onChange={(event) =>
                  setSearchCourseThematic(event.target.value)
                }
                value={searchCourseThematic}
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
          </tr>

          {coursesList.map((item) => (
            <tr key={item.course_Id}>
              <td></td>
              <td className="text-white font-bold size-15">
                {item.course_Name}
              </td>
              <td className="text-white font-bold size-15">
                {item.department_Name}
              </td>

              <td>
                <Link
                  to="/Course_Registration_template"
                  state={{
                    userId: user_Id,
                    firstName: firstName,
                    email: email,
                    course_Id: item.course_Id,
                    course_Name: item.course_Name,
                    course_Description: item.course_Description,
                    course_Picture: item.course_Picture,
                  }} // onClick={() =>
                  //   handleClickCourse(
                  //     item.curso.course_Id,
                  //     item.curso.course_Name,
                  //     item.curso.department_Name
                  //   )
                  // }
                  className="EditLink"
                >
                  Ver Curso
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
