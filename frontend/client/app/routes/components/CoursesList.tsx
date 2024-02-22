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
import { BsSearch } from "react-icons/bs";
import Sidebar from "./Sidebar";

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
  const [searchCourseId, setSearchCourseId] = useState("");
  const [searchCourseName, setSearchCourseName] = useState("");
  const [searchCourseThematic, setSearchCourseThematic] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [courseId, setcourseId] = useState(0);
  const [courseName, setCourseName] = useState("");
  const [courseDepartment, setDepartment] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseImageURL, setcourseImageURL] = useState("");

  const [courseThematic, setThematic] = useState([]);
  const [courseNames, setCourseNames] = useState([]);

  const [coursesList, setCoursesList] = useState([]);

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

  const handleClickDelete = (id: number, coursename: string) => {
    setcourseId(id);
    setInfo("¿Está seguro de que desea eliminar el curso " + coursename + "?");
    setIsOpenConfirm(true);
  };

  // State to hold fetched courses data

  useEffect(() => {
    // Fetch data using Promise with the Fetch API

    const getCourseNamesAPI = () => {
      fetch("http://localhost:5000/get_coursenames") // Fetch data based on the current page
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
          setCourseNames(data); // Set the fetched data
        });
    };
    const getThematicAPI = () => {
      fetch("http://localhost:5000/get_thematic") // Fetch data based on the current page
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
          setThematic(data); // Set the fetched data
        });
    };

    // Trigger fetching method on component mount
    getCourseNamesAPI();
    getThematicAPI();
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
          course_Description: courseDescription,
          course_Picture: courseImageURL,
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

  const handleClickEdit = (
    course_Id: number,
    course_Name: string,
    department_Name: string,
    course_Description: string,
    course_Picture: string
  ) => {
    setcourseId(course_Id);
    setCourseName(course_Name);
    setDepartment(department_Name);
    setCourseDescription(course_Description);
    setcourseImageURL(course_Picture);

    // setInfo("Editando curso " + course_Name);
    setEditOpen(true);
  };

  const handleClickUpdate = () => {
    axios
      .put("http://localhost:5000/update_course/" + courseId, {
        course_Name: courseName,
        department_Name: courseDepartment,
        course_Description: courseDescription,
        course_Picture: courseImageURL,
      })
      .then((response) => {
        setInfo("Curso actualizado correctamente!");
        setIsOpen(true);
      })
      .then((response) => {
        setInfo("Curso actualizado correctamente!");
        setIsOpen(true);
      })
      .catch((error) => {
        setInfo("Ya existe un curso con el mismo nombre ");
        setIsOpen(true);
      });

    //updating user Courses table inc case changes are made in table courses

    axios.put("http://localhost:5000/update_user_course/" + courseId, {
      course_Name: courseName,
      department_Name: courseDepartment,
    });
  };

  const handleClose = () => {
    location.href = "/Admin_courses"; // Actualizar tabla cursos
    getCoursesListAPI();
    setIsOpen(false);
  };

  const handleCloseCreate = () => {
    setClosedCreatetOpen(false);
    setCreateOpen(true); // location.href = "/Admin_cursos"; // Actualizar tabla cursos
  };

  const handleCloseCancel = () => {
    location.href = "/Admin_courses";
    getCoursesListAPI();
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

  const getCoursesId = () => {
    fetch("http://localhost:5000/search_courseId/" + searchCourseId) // Fetch data based on the current page
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setCoursesList(data); // Set the fetched data
      });
  };

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
    getCoursesId();
    getCoursesName();
    getCoursesThematic();
    // getUsersEmail();
    // getUsersUserType();
  };

  useEffect(() => {
    getCoursesListAPI(); // Obtener los usuarios
  }, []);

  if (coursesList.map == null) {
    return (
      <Sidebar>
        <div style={{ marginRight: "7%", marginTop: "1%" }}>
          <table
            style={{
              width: "90%",
              display: "auto",
              marginRight: "auto",
              marginLeft: "auto",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    width: "10%",
                  }}
                >
                  <Button onClick={handleClickAdd} className="AddLink">
                    ANADIR NUEVO CURSO <IoAddOutline />
                  </Button>
                </th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
              <tr>
                <th></th>
                <th
                  style={{
                    paddingLeft: "10%",
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
                  <input
                    style={{
                      width: "230px",
                      backgroundColor: "white",
                      textAlign: "center",
                      fontSize: "25px",
                      borderRadius: "15px",
                      marginLeft: "35%",
                    }}
                    name="searcherId"
                    // value={searchId}
                    className="search"
                    // onChange={handleChangeId}
                  ></input>
                </th>
                <th>
                  <input
                    style={{
                      backgroundColor: "white",
                      textAlign: "center",
                      fontSize: "25px",
                      borderRadius: "15px",
                    }}
                    name="searchName"
                    // value={searchFirstName}
                    className="search"
                    // onChange={handleChangeFirstName}
                  ></input>
                </th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
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
                  height: "750px",
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
                  <label htmlFor="surname">Temática del curso:</label>
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
                  <label htmlFor="surname">Descripción del curso:</label>

                  <textarea
                    style={{
                      marginTop: "20px",
                      backgroundColor: "skyblue",
                      textAlign: "center",
                      fontSize: "25px",
                      borderRadius: "15px",
                      width: "100%",
                      height: "70%",
                    }}
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="surname">URL Imagen del curso:</label>
                  <input
                    style={{
                      backgroundColor: "skyblue",
                      textAlign: "center",
                      marginTop: "20px",
                      fontSize: "25px",
                      borderRadius: "15px",
                    }}
                  ></input>
                </div>

                <div>
                  <Button onClick={handleSubmit} className="popUpButtonCreate">
                    CREAR
                  </Button>
                  <Button
                    onClick={handleCloseCancel}
                    className="popUpButtonCancel"
                  >
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
  }

  return (
    <div style={{ marginRight: "7%", marginTop: "1%" }}>
      <table
        style={{
          width: "90%",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                width: "10%",
              }}
            >
              <Button onClick={handleClickAdd} className="AddLink">
                ANADIR NUEVO CURSO <IoAddOutline />
              </Button>
            </th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <th></th>
            <th>ID del Curso</th>
            <th
              style={{
                display: "auto",
                marginRight: "auto",
                marginLeft: "auto",
              }}
            >
              Nombre del Curso
            </th>
            <th
              style={{
                display: "auto",
                marginRight: "auto",
                marginLeft: "auto",
              }}
            >
              Temática del Curso
            </th>
            <th
              style={{
                display: "auto",
                marginRight: "auto",
                marginLeft: "auto",
              }}
            >
              Editar Curso
            </th>
            <th
              style={{
                display: "auto",
                marginRight: "auto",
                marginLeft: "auto",
              }}
            >
              Eliminar Curso
            </th>
            <th
              style={{
                display: "auto",
                marginRight: "auto",
                marginLeft: "auto",
              }}
            >
              Gestionar Recursos
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th
              style={{
                paddingRight: "11%",
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
              <div>
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
              <input
                name="searchCourseId"
                value={searchCourseId}
                className="search"
                onChange={(event) => setSearchCourseId(event.target.value)}
                style={{
                  width: "150px",
                  backgroundColor: "white",
                  textAlign: "center",
                  fontSize: "20px",
                  borderRadius: "15px",
                  display: "auto",
                  marginRight: "auto",
                  marginLeft: "auto",
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
                  width: "350px",
                  display: "auto",
                  marginRight: "auto",
                  marginLeft: "auto",
                }}
                className="dropdownsearch"
                onChange={(event) => setSearchCourseName(event.target.value)}
                value={searchCourseName}
              >
                <option value="">Curso</option>

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
                  width: "100%",
                  display: "auto",
                  marginRight: "auto",
                  marginLeft: "auto",
                }}
                className="dropdownsearch"
                onChange={(event) =>
                  setSearchCourseThematic(event.target.value)
                }
                value={searchCourseThematic}
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

          {coursesList.map((item) => (
            <tr key={item.course_Id}>
              <td></td>
              <td className="text-white font-bold size-15">{item.course_Id}</td>

              <td className="text-white font-bold size-15">
                {item.course_Name}
              </td>
              <td className="text-white font-bold size-15">
                {item.department_Name}
              </td>

              <td>
                <Link
                  to="#"
                  onClick={() =>
                    handleClickEdit(
                      item.course_Id,
                      item.course_Name,
                      item.department_Name,
                      item.course_Description,
                      item.course_Picture
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
                  onClick={() =>
                    handleClickDelete(item.course_Id, item.course_Name)
                  }
                  className="DeleteLink"
                >
                  <FaTrash />
                </Link>
              </td>

              <td>
                <Link
                  to="/Documents"
                  state={{
                    course_Id: item.course_Id,
                    course_Name: item.course_Name,
                    course_Description: item.course_Description,
                  }}
                  // onClick={() => handleClickDelete(item.curso.id)}
                  className="EditLink"
                >
                  Gestionar documentos
                </Link>

                <Link
                  to="/Videos"
                  state={{
                    course_Id: item.course_Id,
                    course_Name: item.course_Name,
                    course_Description: item.course_Description,
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
              height: "750px",
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
              <label htmlFor="surname">Temática del curso:</label>
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
              <label htmlFor="courseDescription">Descripción del curso:</label>

              <textarea
                style={{
                  marginTop: "20px",
                  backgroundColor: "skyblue",
                  textAlign: "center",
                  fontSize: "25px",
                  borderRadius: "15px",
                  width: "100%",
                  height: "70%",
                }}
                value={courseDescription}
                onChange={(event) => setCourseDescription(event.target.value)}
              ></textarea>
            </div>

            <div>
              <label htmlFor="courseImageURL">URL Imagen del curso:</label>
              <input
                style={{
                  backgroundColor: "skyblue",
                  textAlign: "center",
                  marginTop: "20px",
                  fontSize: "25px",
                  borderRadius: "15px",
                }}
                value={courseImageURL}
                onChange={(event) => setcourseImageURL(event.target.value)}
              ></input>
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
              height: "800px",
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
              <label htmlFor="courseDepartment">Temática del curso:</label>
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
              <label htmlFor="courseDescription">Descripción del curso:</label>

              <textarea
                style={{
                  marginTop: "20px",
                  backgroundColor: "skyblue",
                  textAlign: "center",
                  fontSize: "25px",
                  borderRadius: "15px",
                  width: "100%",
                  height: "70%",
                }}
                value={courseDescription}
                onChange={(event) => setCourseDescription(event.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="courseImageURL">URL Imagen del curso:</label>
              <input
                style={{
                  backgroundColor: "skyblue",
                  textAlign: "center",
                  marginTop: "20px",
                  fontSize: "25px",
                  borderRadius: "15px",
                }}
                value={courseImageURL}
                onChange={(event) => setcourseImageURL(event.target.value)}
              ></input>
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
