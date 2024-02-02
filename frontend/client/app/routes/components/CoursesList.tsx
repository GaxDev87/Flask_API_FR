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
import { FaTrash } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { IoAddOutline } from "react-icons/io5";
import { LinksFunction, json } from "@remix-run/node";
import { cssBundleHref } from "@remix-run/css-bundle";
// import { safeRedirect } from "~/utils";
import cursoStyles from "~/styles/gestionar_cursos.css";

import { Button, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: cursoStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

const CoursesList = () => {
  const [info, setInfo] = useState("");
  const [isEditOpen, setEditOpen] = useState(false);
  const [isCreatetOpen, setCreateOpen] = useState(false);
  const [isClosedCreatetOpen, setClosedCreatetOpen] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [courseId, setId] = useState(0);
  const [courseName, setCourseName] = useState("");
  const [courseDepartment, setDepartment] = useState("");
  const [courseThematic, setThematic] = useState([]);
  const [courseData, setCourseData] = useState<
    {
      curso: Course;
    }[]
  >([]);
  const data = useLoaderData();
  let courses_data = data["data_response"];
  // const [coursesList, setCourses] = useState([]);

  const handleClickDelete = (id: number) => {
    setId(id);
    setInfo("¿Está seguro de que desea eliminar el curso " + id + "?");
    setIsOpenConfirm(true);
  };

  // State to hold fetched courses data

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

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    let nombre_curso_sin_espacios = courseName.trim();
    let nombre_tematica_sin_espacios = courseDepartment.trim();

    if (nombre_curso_sin_espacios === "") {
      setInfo("Por favor, introduzca el nombre del curso");
      setClosedCreatetOpen(true);

      return;
    }

    if (nombre_tematica_sin_espacios === "") {
      setInfo("Por favor, introduzca la tematica del curso");

      setClosedCreatetOpen(true);

      return;
    }

    try {
      axios
        .post("http://localhost:5000/course", {
          course_Name: courseName,
          department_Name: courseDepartment,
        })
        .then((response) => {
          setInfo("Curso creado correctamente!");
          setIsOpen(true);
        })
        .catch((error) => {
          setInfo("Fallo al crear el curso");
          setIsOpen(true);
        });
    } catch {}
  };

  const handleSearch = () => {
    // getUsersId();
    // getUsersFirst();
    // getUsersSurname();
    // getUsersEmail();
    // getUsersUserType();
  };

  const handleClickEdit = (
    course_Id: number,
    course_Name: string,
    department_Name: string
  ) => {
    setId(course_Id);
    setCourseName(course_Name);
    setDepartment(department_Name);

    // setInfo("Editando curso " + course_Name);
    setEditOpen(true);
  };

  const handleClickUpdate = () => {
    axios
      .put("http://localhost:5000/update_course/" + courseId, {
        course_Name: courseName,
        department_Name: courseDepartment,
      })
      .then((response) => {
        setInfo("Curso actualizado correctamente!");
        setIsOpen(true);
      })
      .catch((error) => {
        setInfo("Fallo al actualizar el curso " + courseId);
        setIsOpen(true);
      });
  };

  const handleClose = () => {
    location.href = "/Admin_courses"; // Actualizar tabla cursos
    updateCourses();
    setIsOpen(false);
  };

  const handleCloseCreate = () => {
    setClosedCreatetOpen(false);
    setCreateOpen(true); // location.href = "/Admin_cursos"; // Actualizar tabla cursos
  };

  const handleCloseCancel = () => {
    location.href = "/Admin_courses";
    updateCourses();
    setIsOpenConfirm(false);
  };

  const handleCloseConfirm = () => {
    const data = {
      id: courseId,
    };

    setIsOpenConfirm(false);

    axios
      .delete("http://localhost:5000/delete_course/" + courseId)
      .then((response) => {
        setInfo("Curso eliminado correctamente!");
        setIsOpen(true);
      })
      .catch((error) => {
        console.log(error);
        setInfo("Fallo al eliminar el curso" + courseId);
        setIsOpen(true);
      });
  };

  const handleClickAdd = () => {
    // setInfo("Editando usuario " + id);
    setCreateOpen(true);
  };

  const handleClickCreate = () => {
    axios
      .post("http://localhost:5000/course", {
        course_Name: courseName,
        department_Name: courseDepartment,
      })
      .then((response) => {
        setInfo("Curso creado correctamente!");
        setIsOpen(true);
      })
      .catch((error) => {
        setInfo("Fallo al crear el curso");
        setIsOpen(true);
      });
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
            <td>
              <Button onClick={handleClickAdd} className="AddLink">
                ANADIR NUEVO CURSO <IoAddOutline />
              </Button>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th></th>
            <th
              style={{
                paddingLeft: "4%",
              }}
            >
              ID del Curso
            </th>
            <th>Nombre del Curso</th>
            <th>Temática del Curso</th>
            <th>Editar Curso</th>
            <th>Eliminar Curso</th>
            <th>Gestionar Recursos</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              {" "}
              <div>
                <button onClick={handleSearch} className="Buscar">
                  Buscar
                </button>
              </div>
            </th>
            <th>
              <input
                name="searcherId"
                value={searchId}
                className="search"
                onChange={(event) => setSearchId(event.target.value)}
                style={{
                  width: "200px",
                  backgroundColor: "white",
                  textAlign: "center",
                  fontSize: "20px",
                  borderRadius: "15px",
                  marginLeft: "33%",
                }}
              ></input>
            </th>
            <th>
              <select
                style={{
                  backgroundColor: "white",
                  textAlign: "left",
                  fontSize: "20px",
                  borderRadius: "15px",
                  width: "100%",
                }}
                className="dropdownsearch"
              >
                <option value="">Curso</option>

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
                style={{
                  backgroundColor: "white",
                  textAlign: "left",
                  fontSize: "20px",
                  borderRadius: "15px",
                  width: "110%",
                }}
                className="dropdownsearch"
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

            <th> </th>
            <th></th>
            <th></th>
            <th></th>
          </tr>

          {courseData.map((item) => (
            <tr key={item.curso.course_Id}>
              <td></td>
              <td
                style={{
                  paddingLeft: "5%",
                }}
                className="text-white font-bold size-15"
              >
                {item.curso.course_Id}
              </td>

              <td className="text-white font-bold size-15">
                {item.curso.course_Name}
              </td>
              <td className="text-white font-bold size-15">
                {item.curso.department_Name}
              </td>

              <td>
                <Link
                  to="#"
                  onClick={() =>
                    handleClickEdit(
                      item.curso.course_Id,
                      item.curso.course_Name,
                      item.curso.department_Name
                    )
                  }
                  className="EditLink"
                >
                  <TbEdit />
                </Link>
              </td>
              <td>
                <Link
                  to="#"
                  onClick={() => handleClickDelete(item.curso.course_Id)}
                  className="DeleteLink"
                >
                  <FaTrash />
                </Link>
              </td>

              <td>
                <Link
                  to="/Documents"
                  state={{
                    course_Id: item.curso.course_Id,
                    course_Name: item.curso.course_Name,
                    course_Description: item.curso.course_Description,
                  }}
                  // onClick={() => handleClickDelete(item.curso.id)}
                  className="EditLink"
                >
                  Gestionar documentos
                </Link>

                <Link
                  to="/Videos"
                  state={{
                    course_Id: item.curso.course_Id,
                    course_Name: item.curso.course_Name,
                    course_Description: item.curso.course_Description,
                  }}
                  // onClick={() => handleClickDelete(item.curso.id)}
                  className="EditLink"
                >
                  Gestionar videos
                </Link>
              </td>

              <td></td>
            </tr>
          ))}
        </tbody>
        <Modal
          isOpen={isCreatetOpen}
          onRequestClose={handleClose}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              borderRadius: "5px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
              padding: "20px",
              height: "570px",
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
            {" "}
            CREAR CURSO
          </h4>
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "22px",
            }}
          >
            {/* {info} */}
          </p>
          <form className="max-w-sm mx-auto bg">
            <div>
              <label htmlFor="name">Nombre del Curso:</label>
              <input
                style={{
                  marginTop: "20px",
                  backgroundColor: "skyblue",
                  textAlign: "center",
                  fontSize: "25px",
                  borderRadius: "15px",
                }}
                type="text"
                id="courseName"
                value={courseName}
                onChange={(event) => setCourseName(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="surname">Temática:</label>
              <input
                style={{
                  backgroundColor: "skyblue",
                  textAlign: "center",
                  marginTop: "20px",
                  fontSize: "25px",
                  borderRadius: "15px",
                }}
                type="text"
                id="courseDetartment"
                value={courseDepartment}
                onChange={(event) => setDepartment(event.target.value)}
              />
            </div>

            <div>
              <Button onClick={handleSubmit} className="popUpButtonCreate">
                CREAR
              </Button>
              <Button onClick={handleCloseCancel} className="popUpButtonCancel">
                CANCELAR
              </Button>
            </div>
          </form>
        </Modal>

        <Modal
          isOpen={isEditOpen}
          onRequestClose={handleClose}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              borderRadius: "5px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
              padding: "20px",
              height: "570px",
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
            {" "}
            EDITAR CURSO
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
          <form className="max-w-sm mx-auto bg">
            <div>
              <label htmlFor="name">Nombre del Curso:</label>
              <input
                style={{
                  marginTop: "20px",
                  backgroundColor: "skyblue",
                  textAlign: "center",
                  fontSize: "25px",
                  borderRadius: "15px",
                }}
                type="text"
                id="courseName"
                value={courseName}
                onChange={(event) => setCourseName(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="surname">Temática:</label>
              <input
                style={{
                  backgroundColor: "skyblue",
                  textAlign: "center",
                  marginTop: "20px",
                  fontSize: "25px",
                  borderRadius: "15px",
                }}
                type="text"
                id="courseDetartment"
                value={courseDepartment}
                onChange={(event) => setDepartment(event.target.value)}
              />
            </div>

            <div>
              <Button onClick={handleClickUpdate} className="popUpButtonUpdate">
                ACTUALIZAR
              </Button>
              <Button onClick={handleClose} className="popUpButtonCancel">
                CANCELAR
              </Button>
            </div>
          </form>
        </Modal>
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
      <div style={{ marginLeft: "280px", marginTop: "7%" }}>
        <h1 className="text-blue-500 font-bold size-10">
          {/* LISTADO DE RECURSOS POR CURSOS: */}
        </h1>
      </div>
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

      <Modal
        isOpen={isClosedCreatetOpen}
        onRequestClose={handleCloseCreate}
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
        <Button onClick={handleCloseCreate} className="popUpButton">
          Aceptar
        </Button>
      </Modal>
    </div>
  );
};

export default CoursesList;
