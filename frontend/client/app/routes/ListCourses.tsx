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
import { Navigate, useNavigate } from "react-router-dom";
import { User } from "./components/user_interface";

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

  // const [info, setInfo] = useState("");
  // const [isValidEmail, setIsValidEmail] = useState(true);
  // const [isOpen, setIsOpen] = useState(false);
  // const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseDepartment, setDepartment] = useState("");
  const [search, setSearch] = useState("");
  const [courseThematic, setThematic] = useState([]);
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState<
    {
      curso: Course;
    }[]
  >([]);
  const data = useLoaderData();
  let courses_data = data["data_response"];
  // const [coursesList, setCourses] = useState([]);

  // State to hold fetched thematic data

  useEffect(() => {
    // Fetch data using Promise with the Fetch API
    const getCoursesAPI = () => {
      fetch("http://localhost:5000/get_thematic") // Fetch data based on the current page
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
          setThematic(data); // Set the fetched data
        });
    };

    // Trigger fetching method on component mount
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

  const handleClickCourse = (
    course_Id: number,
    course_Name: string,
    department_Name: string
  ) => {
    setId(course_Id);
    setCourseName(course_Name);
    setDepartment(department_Name);

    // setInfo("Editando curso " + course_Name);
    // setIsOpen(true);

    // navigate("/Course_Template", { state: course_Name });

    // <Link
    //   to="/Course_Template"
    //   state={{
    //     course_Id: courseId,
    //     course_Name: courseName, x
    //   }}
    // ></Link>;
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const updateCourses = () => {
    try {
      const courseData = Object.keys(courses_data).map((diccionarioKey) => {
        const diccionario = courses_data[diccionarioKey];
        const curso: Course = {
          course_Id: diccionario["course_Id"],
          course_Name: diccionario["course_Name"],
          department_Name: diccionario["department_Name"],
          course_Description: diccionario["course_Description"],
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
                // value={search}
              >
                <option value="">Cursos</option>

                {courseData.map((item) => {
                  return (
                    <>
                      <option key={item.curso.course_Id}>
                        {" "}
                        {item.curso.course_Name}
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
          </tr>

          {courseData.map((item) => (
            <tr key={item.curso.course_Id}>
              <td className="text-white font-bold size-15">
                {item.curso.course_Name}
              </td>
              <td className="text-white font-bold size-15">
                {item.curso.department_Name}
              </td>

              <td>
                <Link
                  to="/Course_Template"
                  state={{
                    userId: user_Id,
                    firstName: firstName,
                    email: email,
                    course_Id: item.curso.course_Id,
                    course_Name: item.curso.course_Name,
                    course_Description: item.curso.course_Description,
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
  );
};

export default ListarCursos;
