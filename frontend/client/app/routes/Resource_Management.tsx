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

export default function Resource_Template(props) {
  const Location = useLocation();
  console.log(props, "props");
  console.log(Location, "useLocation Hook");
  const data = Location.state;

  const [info, setInfo] = useState("");
  const [isEditOpen, setEditOpen] = useState(false);
  const [isCreatetDocumentOpen, setisCreatetDocumentOpen] = useState(false);
  const [isCreatetVideoOpen, setisCreatetVideoOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [isClosedCreatetOpen, setClosedCreatetOpen] = useState(false);

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
  const [documentId, setDocumentId] = useState(0);
  const [documentName, setDocumentName] = useState("");
  const [documentURL, setDocumentURL] = useState("");
  const [videoName, setVideoName] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const navigate = useNavigate();

  const [CourseDocuments, setCourseDocuments] = useState([]);
  const [CourseVideos, setCourseVideos] = useState([]);

  //   const navigate = useNavigate();

  //   const [courseData, setCourseData] = useState<
  //     {
  //       curso: Course;
  //     }[]
  //   >([]);
  //   const data = useLoaderData();
  //   let courses_data = data["data_response"];

  // const [coursesList, setCourses] = useState([]);

  // State to hold fetched thematic data

  useEffect(() => {
    // Fetch data using Promise with the Fetch API
    const getCourseDocumentsAPI = () => {
      fetch("http://localhost:5000/course_document/" + data.course_Id) // Fetch data based on the current page
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
          setCourseDocuments(data); // Set the fetched data
        });
    };

    const getCourseVideosAPI = () => {
      fetch("http://localhost:5000/course_video/" + data.course_Id) // Fetch data based on the current page
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
          setCourseVideos(data); // Set the fetched data
        });
    };

    // Trigger fetching method on component mount
    getCourseDocumentsAPI();
    getCourseVideosAPI();
  }, []);

  const handleSubmitDocument = async (event: {
    preventDefault: () => void;
  }) => {
    let nombre_curso_sin_espacios = documentName.trim();
    let nombre_tematica_sin_espacios = documentURL.trim();

    if (nombre_curso_sin_espacios === "") {
      setInfo("Por favor, introduzca el nombre del recurso");
      setClosedCreatetOpen(true);

      return;
    }

    if (nombre_tematica_sin_espacios === "") {
      setInfo("Por favor, introduzca la URL del recurso");

      setClosedCreatetOpen(true);

      return;
    }

    try {
      // setInfo("course_Id " + data.course_Id);
      // setInfo("document_Name" + documentName);
      // // setInfo("document_Url" + documentURL);

      // setIsOpen(true);

      axios
        .post("http://localhost:5000/document", {
          course_Id: data.course_Id,
          course_Name: documentName,
          document_Url: documentURL,
        })
        .then((response) => {
          setInfo("Documento creado correctamente!");
          setIsOpen(true);
        })
        .catch((error) => {
          setInfo("Fallo al crear el documento");
          setIsOpen(true);
        });
    } catch {}
  };

  const handleClose = () => {
    location.href = "/Resource_Management"; // Actualizar la tabla después
    setIsOpen(false);
  };

  const handleCloseCreate = () => {
    setClosedCreatetOpen(false);
    setisCreatetDocumentOpen(true); // location.href = "/Admin_cursos"; // Actualizar tabla cursos
  };

  const handleCloseCancel = () => {
    location.href = "/Resource_Management"; // Actualizar la tabla después
    // updateCourses();
    setIsOpenConfirm(false);
  };

  const handleCloseConfirm = () => {
    const data = {
      id: documentId,
    };
  };

  const handleClickAdd = () => {
    // setInfo("Editando usuario " + id);
    setisCreatetDocumentOpen(true);
  };

  if (CourseDocuments.map != null && CourseVideos.map == null) {
    <Sidebar>
      <div style={{ marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}>
        <h1
          style={{ marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}
          className="text-3xl font-bold text-blue-700"
        >
          DOCUMENTOS DEL CURSO {data.course_Name}{" "}
        </h1>
        <table>
          <thead>
            <tr>
              <td>
                <Button className="AddLink">
                  ANADIR NUEVO DOCUMENTO <IoAddOutline />
                </Button>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>ID del Documento</th>
              <th> Nombre del Documento</th>
              <th> URL del Documento</th>

              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <input
                  name="searcherId"
                  // value={searchId}
                  className="search"
                  // onChange={handleChangeId}
                ></input>
              </th>
              <th>
                <input
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

            {CourseDocuments.map((item) => (
              <tr key={item.document_Id}>
                <td className="text-white font-bold size-15">
                  {item.document_Id}
                </td>
                <td className="text-white font-bold size-15">
                  {item.document_Name}
                </td>
                <td className="text-white font-bold size-15">
                  {item.document_Url}
                </td>

                <td>
                  <Link
                    to="#"
                    //   onClick={() =>
                    //     handleClickEdit(
                    //       item.usuario.user_Id,
                    //       item.usuario.firstName,
                    //       item.usuario.lastName,
                    //       item.usuario.email,
                    //       item.usuario.user_Type
                    //     )
                    //   }
                    className="EditLink"
                  >
                    <TbEdit />
                  </Link>
                </td>
                <td>
                  <Link
                    to="#"
                    //   onClick={() => handleClickDelete(item.usuario.user_Id)}
                    className="DeleteLink"
                  >
                    <FaTrash />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <br></br>

        <table>
          <thead>
            <tr>
              <td>
                <Button className="AddLink">
                  ANADIR NUEVO VIDEO <IoAddOutline />
                </Button>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>ID del Video</th>
              <th> Nombre del Video</th>
              <th> URL del Video</th>

              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <input
                  name="searcherId"
                  // value={searchId}
                  className="search"
                  // onChange={handleChangeId}
                ></input>
              </th>
              <th>
                <input
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
        </table>
      </div>
    </Sidebar>;
  }

  if (CourseDocuments.map == null || CourseVideos.map == null) {
    return (
      <Sidebar>
        <div style={{ marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}>
          <h1
            style={{ marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}
            className="text-3xl font-bold text-blue-700"
          >
            DOCUMENTOS DEL CURSO {data.course_Name}{" "}
          </h1>
          <table>
            <thead>
              <tr>
                <td>
                  <Button onClick={handleClickAdd} className="AddLink">
                    ANADIR NUEVO DOCUMENTO <IoAddOutline />
                  </Button>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>ID del Documento</th>
                <th> Nombre del Documento</th>
                <th> URL del Documento</th>

                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <input
                    name="searcherId"
                    // value={searchId}
                    className="search"
                    // onChange={handleChangeId}
                  ></input>
                </th>
                <th>
                  <input
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
              isOpen={isCreatetDocumentOpen}
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
                CREAR DOCUMENTO
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
                  <label htmlFor="documentName">Nombre del Documento:</label>
                  <input
                    style={{
                      marginTop: "20px",
                      backgroundColor: "skyblue",
                      textAlign: "center",
                      fontSize: "25px",
                      borderRadius: "15px",
                    }}
                    type="text"
                    id="documentName"
                    value={documentName}
                    onChange={(event) => setDocumentName(event.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="document_URL">URL del Documento:</label>
                  <input
                    style={{
                      backgroundColor: "skyblue",
                      textAlign: "center",
                      marginTop: "20px",
                      fontSize: "25px",
                      borderRadius: "15px",
                    }}
                    type="text"
                    id="documentURL"
                    value={documentURL}
                    onChange={(event) => setDocumentURL(event.target.value)}
                  />
                </div>

                <div>
                  <Button
                    onClick={handleSubmitDocument}
                    className="popUpButtonCreate"
                  >
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

          <br></br>
          <h1
            style={{ marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}
            className="text-3xl font-bold  text-blue-700"
          >
            VIDEOS DEL CURSO {data.course_Name}{" "}
          </h1>
          <table>
            <thead>
              <tr>
                <td>
                  <Button className="AddLink">
                    ANADIR NUEVO VIDEO <IoAddOutline />
                  </Button>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>ID del Video</th>
                <th> Nombre del Video</th>
                <th> URL del Video</th>

                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <input
                    name="searcherId"
                    // value={searchId}
                    className="search"
                    // onChange={handleChangeId}
                  ></input>
                </th>
                <th>
                  <input
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
          </table>
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <div style={{ marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}>
        <h1
          style={{ marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}
          className="text-3xl font-bold text-blue-700"
        >
          DOCUMENTOS DEL CURSO {data.course_Name}{" "}
        </h1>
        <table>
          <thead>
            <tr>
              <td>
                <Button className="AddLink">
                  ANADIR NUEVO DOCUMENTO <IoAddOutline />
                </Button>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>ID del Documento</th>
              <th> Nombre del Documento</th>
              <th> URL del Documento</th>

              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <input
                  name="searcherId"
                  // value={searchId}
                  className="search"
                  // onChange={handleChangeId}
                ></input>
              </th>
              <th>
                <input
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

            {CourseDocuments.map((item) => (
              <tr key={item.document_Id}>
                <td className="text-white font-bold size-15">
                  {item.document_Id}
                </td>
                <td className="text-white font-bold size-15">
                  {item.document_Name}
                </td>
                <td className="text-white font-bold size-15">
                  {item.document_Url}
                </td>

                <td>
                  <Link
                    to="#"
                    //   onClick={() =>
                    //     handleClickEdit(
                    //       item.usuario.user_Id,
                    //       item.usuario.firstName,
                    //       item.usuario.lastName,
                    //       item.usuario.email,
                    //       item.usuario.user_Type
                    //     )
                    //   }
                    className="EditLink"
                  >
                    <TbEdit />
                  </Link>
                </td>
                <td>
                  <Link
                    to="#"
                    //   onClick={() => handleClickDelete(item.usuario.user_Id)}
                    className="DeleteLink"
                  >
                    <FaTrash />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <br></br>
        <h1
          style={{ marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}
          className="text-3xl font-bold  text-blue-700"
        >
          VIDEOS DEL CURSO {data.course_Name}{" "}
        </h1>
        <table>
          <thead>
            <tr>
              <td>
                <Button className="AddLink">
                  ANADIR NUEVO VIDEO <IoAddOutline />
                </Button>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>ID del Video</th>
              <th> Nombre del Video</th>
              <th> URL del Video</th>

              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <input
                  name="searcherId"
                  // value={searchId}
                  className="search"
                  // onChange={handleChangeId}
                ></input>
              </th>
              <th>
                <input
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
        </table>
      </div>
    </Sidebar>
  );
}
