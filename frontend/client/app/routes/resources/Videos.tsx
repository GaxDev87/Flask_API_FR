import { Layout } from "../components/layout";
import { Link } from "@remix-run/react";
import { useLocation } from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";
import cursoStyles from "~/styles/gestionar_cursos.css";
import { LinksFunction, json } from "@remix-run/node";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { FaTrash } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { IoAddOutline } from "react-icons/io5";
import { Button, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { AiFillExperiment, AiOutlineHome } from "react-icons/ai";
import { FaCircleUser } from "react-icons/fa6";
import Navbar from "../components/Navbar";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: cursoStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function Videos(props) {
  const menuOptions = [
    // { path: "/", icon: <FaCog /> },
    { path: "/Micuenta", icon: <FaCircleUser /> },
    { path: "/", icon: <AiOutlineHome /> },
  ];
  const Location = useLocation();
  console.log(props, "props");
  console.log(Location, "useLocation Hook");
  const data = Location.state;

  const [info, setInfo] = useState("");
  const [isEditOpen, setEditOpen] = useState(false);
  const [isCreatetVideoOpen, setisCreatetVideoOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [isClosedCreatetOpen, setClosedCreatetOpen] = useState(false);
  const [searchvideoId, setSearchVideoId] = useState("");
  const [searchvideoName, setSearchVideoName] = useState("");
  const [searchvideoModule, setSearchVideoModule] = useState("");

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
  const [videoId, setVideoId] = useState(0);
  const [videoName, setVideoName] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [courseName, setCourseName] = useState("");
  const [videoModule, setVideoModule] = useState("");

  const navigate = useNavigate();

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
  // Fetch data using Promise with the Fetch API

  const getCourseVideosAPI = () => {
    fetch("http://localhost:5000/course_video/" + data.course_Id) // Fetch data based on the current page
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setCourseVideos(data); // Set the fetched data
      });
  };

  useEffect(() => {
    setCourseName(data.course_Name);

    // Trigger fetching method on component mount

    getCourseVideosAPI();
  }, []);

  const handleSubmitDocument = async (event: {
    preventDefault: () => void;
  }) => {
    let video_curso_sin_espacios = videoName.trim();
    let video_URL_sin_espacios = videoURL.trim();

    if (video_curso_sin_espacios === "") {
      setInfo("Por favor, introduzca el nombre del video");
      setClosedCreatetOpen(true);

      return;
    }

    if (video_URL_sin_espacios === "") {
      setInfo("Por favor, introduzca la URL del video");

      setClosedCreatetOpen(true);

      return;
    }

    try {
      // setInfo("course_Id " + data.course_Id);
      // setInfo("document_Name" + documentName);
      // // setInfo("document_Url" + documentURL);

      // setIsOpen(true);

      axios
        .post("http://localhost:5000/video", {
          course_Id: data.course_Id,
          video_Name: videoName,
          video_Url: videoURL,
          video_Module: videoModule,
        })
        .then((response) => {
          setInfo("Video creado correctamente!");
          setIsOpen(true);
        })
        .catch((error) => {
          setInfo("Fallo al crear el video");
          setIsOpen(true);
        });
    } catch {}
  };

  const handleClickDelete = (id: number) => {
    setVideoId(id);
    setInfo("¿Está seguro de que desea eliminar el video " + id + "?");
    setIsOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    const data = {
      videoId: videoId,
    };

    setIsOpenConfirm(false);

    axios
      .delete("http://localhost:5000/delete_video/" + videoId)
      .then((response) => {
        setInfo("Video eliminado correctamente!");
        setIsOpen(true);
      })
      .catch((error) => {
        console.log(error);
        setInfo("Fallo al eliminar el video" + videoId);
        setIsOpen(true);
      });
  };

  const handleClickEdit = (
    video_Id: number,
    video_Name: string,
    video_Url: string,
    video_Module: string
  ) => {
    setVideoId(video_Id);
    setVideoName(video_Name);
    setVideoURL(video_Url);
    setVideoModule(video_Module);

    // setInfo("Editando curso " + course_Name);
    setEditOpen(true);
  };

  const handleClickUpdate = () => {
    axios
      .put("http://localhost:5000/update_video/" + videoId, {
        video_Name: videoName,
        video_Url: videoURL,
        video_Module: videoModule,
      })
      .then((response) => {
        setInfo("Video actualizado correctamente!");
        setIsOpen(true);
      })
      .catch((error) => {
        setInfo("Fallo al actualizar el video");
        setIsOpen(true);
      });
  };

  const handleClose = () => {
    location.href = "/Videos"; // Actualizar la tabla después
    getCourseVideosAPI();

    setIsOpen(false);
  };

  const handleCloseCreate = () => {
    setClosedCreatetOpen(false);
    setisCreatetVideoOpen(true); // location.href = "/Admin_cursos"; // Actualizar tabla cursos
  };

  const handleCloseCancel = () => {
    location.href = "/Documents"; // Actualizar la tabla después
    getCourseVideosAPI();
    setIsOpenConfirm(false);
  };

  const handleClickAdd = () => {
    // setInfo("Editando usuario " + id);
    setisCreatetVideoOpen(true);
  };

  const getVideoId = () => {
    axios
      .post("http://localhost:5000/search_videoId/" + searchvideoId, {
        course_Id: data.course_Id,
      }) // Fetch data based on the current page
      .then((response) => setCourseVideos(response.data)); // Parse the response as JSON
  };
  const getVideoName = () => {
    axios
      .post("http://localhost:5000/search_videoName/" + searchvideoName, {
        course_Id: data.course_Id,
      }) // Fetch data based on the current page
      .then((response) => setCourseVideos(response.data)); // Parse the response as JSON
  };

  const getVideoModule = () => {
    axios
      .post("http://localhost:5000/search_video_module/" + searchvideoModule, {
        course_Id: data.course_Id,
      }) // Fetch data based on the current page
      .then((response) => setCourseVideos(response.data)); // Parse the response as JSON
  };

  const handleSearch = () => {
    getVideoId();
    getVideoName();
    getVideoModule();
    // getUsersEmail();
    // getUsersUserType();
  };

  if (CourseVideos.map == null) {
    return (
      <>
        <Navbar title="GESTIONAR VIDEOS" options={menuOptions} />

        <Sidebar>
          <div
            style={{ marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}
          >
            <h1
              style={{ marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}
              className="text-3xl font-bold text-blue-700"
            >
              {" "}
              VIDEOS DEL CURSO {courseName}{" "}
            </h1>
            <table>
              <thead>
                <tr>
                  <td>
                    <Button onClick={handleClickAdd} className="AddLink">
                      ANADIR NUEVO VIDEO <IoAddOutline />
                    </Button>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th
                    style={{
                      display: "auto",
                      marginRight: "auto",
                      marginLeft: "auto",
                    }}
                  >
                    ID
                  </th>
                  <th
                    style={{
                      display: "auto",
                      marginRight: "auto",
                      marginLeft: "auto",
                    }}
                  >
                    {" "}
                    Nombre
                  </th>
                  <th
                    style={{
                      display: "auto",
                      marginRight: "auto",
                      marginLeft: "auto",
                    }}
                  >
                    {" "}
                    Módulo
                  </th>
                  <th
                    style={{
                      display: "auto",
                      marginRight: "auto",
                      marginLeft: "auto",
                    }}
                  >
                    {" "}
                    URL
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    <input
                      style={{
                        width: "150px",
                        backgroundColor: "white",
                        textAlign: "center",
                        fontSize: "25px",
                        borderRadius: "15px",
                        display: "auto",
                        marginRight: "auto",
                        marginLeft: "auto",
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
                        width: "300px",

                        backgroundColor: "white",
                        textAlign: "center",
                        fontSize: "25px",
                        borderRadius: "15px",
                        display: "auto",
                        marginRight: "auto",
                        marginLeft: "auto",
                      }}
                      name="searchName"
                      // value={searchFirstName}
                      className="search"
                      // onChange={handleChangeFirstName}
                    ></input>
                  </th>
                  <th>
                    <input
                      style={{
                        width: "150px",

                        backgroundColor: "white",
                        textAlign: "center",
                        fontSize: "25px",
                        borderRadius: "15px",
                        display: "auto",
                        marginRight: "auto",
                        marginLeft: "auto",
                      }}
                      name="VideoModule"
                      // value={searchFirstName}
                      className="search"
                      // onChange={handleChangeFirstName}
                    ></input>
                  </th>

                  <th></th>
                  <th></th>
                </tr>
              </tbody>
              <Modal
                isOpen={isCreatetVideoOpen}
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
                  CREAR VIDEO
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
                    <label htmlFor="videoName">Nombre del Video:</label>
                    <input
                      style={{
                        width: "100%",
                        marginTop: "20px",
                        backgroundColor: "skyblue",
                        textAlign: "center",
                        fontSize: "25px",
                        borderRadius: "15px",
                      }}
                      type="text"
                      id="videoName"
                      value={videoName}
                      onChange={(event) => setVideoName(event.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="videoURL">URL del Video:</label>
                    <input
                      style={{
                        width: "100%",
                        backgroundColor: "skyblue",
                        textAlign: "center",
                        marginTop: "20px",
                        fontSize: "25px",
                        borderRadius: "15px",
                      }}
                      type="text"
                      id="videoURL"
                      value={videoURL}
                      onChange={(event) => setVideoURL(event.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="videoModule">Modulo del Video:</label>
                    <input
                      style={{
                        width: "30%",

                        backgroundColor: "skyblue",
                        textAlign: "center",
                        marginTop: "20px",
                        fontSize: "25px",
                        borderRadius: "15px",
                      }}
                      type="text"
                      id="videoModule"
                      value={videoModule}
                      onChange={(event) => setVideoModule(event.target.value)}
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
          </div>
        </Sidebar>
      </>
    );
  }

  return (
    <>
      <Navbar title="GESTIONAR VIDEOS" options={menuOptions} />

      <Sidebar>
        <div style={{ marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}>
          <h1
            style={{ marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}
            className="text-3xl font-bold text-blue-700"
          >
            VIDEOS DEL CURSO {courseName}{" "}
          </h1>
          <table>
            <thead>
              <tr>
                <th>
                  <Button onClick={handleClickAdd} className="AddLink">
                    ANADIR NUEVO VIDEO <IoAddOutline />
                  </Button>
                </th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
              <tr>
                <th
                  style={{
                    display: "auto",
                    marginRight: "auto",
                    marginLeft: "auto",
                  }}
                ></th>
                <th
                  style={{
                    display: "auto",
                    marginRight: "auto",
                    marginLeft: "auto",
                  }}
                >
                  ID
                </th>
                <th
                  style={{
                    display: "auto",
                    marginRight: "auto",
                    marginLeft: "auto",
                  }}
                >
                  {" "}
                  Nombre
                </th>
                <th
                  style={{
                    display: "auto",
                    marginRight: "auto",
                    marginLeft: "auto",
                  }}
                >
                  {" "}
                  Módulo
                </th>
                <th
                  style={{
                    display: "auto",
                    marginRight: "auto",
                    marginLeft: "auto",
                  }}
                >
                  {" "}
                  URL
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  {" "}
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
                  <input
                    style={{
                      width: "150px",
                      backgroundColor: "white",
                      textAlign: "center",
                      fontSize: "25px",
                      borderRadius: "15px",
                      display: "auto",
                      marginRight: "auto",
                      marginLeft: "auto",
                    }}
                    name="searchvideoId"
                    value={searchvideoId}
                    className="search"
                    onChange={(event) => setSearchVideoId(event.target.value)}
                    // onChange={handleChangeId}
                  ></input>
                </th>
                <th>
                  <input
                    style={{
                      width: "350px",
                      backgroundColor: "white",
                      textAlign: "center",
                      fontSize: "25px",
                      borderRadius: "15px",
                      display: "auto",
                      marginRight: "auto",
                      marginLeft: "auto",
                    }}
                    name="searchvideoName"
                    value={searchvideoName}
                    className="search"
                    onChange={(event) => setSearchVideoName(event.target.value)}
                    // onChange={handleChangeFirstName}
                  ></input>
                </th>
                <th>
                  <input
                    style={{
                      width: "150px",

                      backgroundColor: "white",
                      textAlign: "center",
                      fontSize: "25px",
                      borderRadius: "15px",
                      display: "auto",
                      marginRight: "auto",
                      marginLeft: "auto",
                    }}
                    name="VideoModule"
                    value={searchvideoModule}
                    className="search"
                    onChange={(event) =>
                      setSearchVideoModule(event.target.value)
                    }
                  ></input>
                </th>
                <th></th>
                <th></th>
                <th></th>
              </tr>

              {CourseVideos.map((item) => (
                <tr key={item.video_Id}>
                  <td></td>
                  <td className="text-white font-bold size-15">
                    {item.video_Id}
                  </td>
                  <td className="text-white font-bold size-15">
                    {item.video_Name}
                  </td>

                  <td className="text-white font-bold size-15">
                    {item.video_Module}
                  </td>

                  <td className="text-white font-bold size-15">
                    {item.video_Url}
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        handleClickEdit(
                          item.video_Id,
                          item.video_Name,
                          item.video_Url,
                          item.video_Module
                        )
                      }
                      className="EditLink"
                    >
                      <TbEdit />
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleClickDelete(item.video_Id)}
                      className="DeleteLink"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <Modal
              isOpen={isCreatetVideoOpen}
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
                CREAR VIDEO
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
                  <label htmlFor="videoName">Nombre del Video:</label>
                  <input
                    style={{
                      width: "100%",
                      marginTop: "20px",
                      backgroundColor: "skyblue",
                      textAlign: "center",
                      fontSize: "25px",
                      borderRadius: "15px",
                    }}
                    type="text"
                    id="videoName"
                    value={videoName}
                    onChange={(event) => setVideoName(event.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="videoURL">URL del Video:</label>
                  <input
                    style={{
                      width: "100%",
                      backgroundColor: "skyblue",
                      textAlign: "center",
                      marginTop: "20px",
                      fontSize: "25px",
                      borderRadius: "15px",
                    }}
                    type="text"
                    id="videoURL"
                    value={videoURL}
                    onChange={(event) => setVideoURL(event.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="videoModule">Modulo del Video:</label>
                  <input
                    style={{
                      width: "30%",

                      backgroundColor: "skyblue",
                      textAlign: "center",
                      marginTop: "20px",
                      fontSize: "25px",
                      borderRadius: "15px",
                    }}
                    type="text"
                    id="videoModule"
                    value={videoModule}
                    onChange={(event) => setVideoModule(event.target.value)}
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
                EDITAR VIDEO
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
                  <label htmlFor="videoName">Nombre del Video:</label>
                  <input
                    style={{
                      width: "100%",
                      marginTop: "20px",
                      backgroundColor: "skyblue",
                      textAlign: "center",
                      fontSize: "25px",
                      borderRadius: "15px",
                    }}
                    type="text"
                    id="videoName"
                    value={videoName}
                    onChange={(event) => setVideoName(event.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="videoURL">URL del Video:</label>
                  <input
                    style={{
                      width: "100%",
                      backgroundColor: "skyblue",
                      textAlign: "center",
                      marginTop: "20px",
                      fontSize: "25px",
                      borderRadius: "15px",
                    }}
                    type="text"
                    id="videoURL"
                    value={videoURL}
                    onChange={(event) => setVideoURL(event.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="videoModule">Modulo del Video:</label>
                  <input
                    style={{
                      width: "30%",

                      backgroundColor: "skyblue",
                      textAlign: "center",
                      marginTop: "20px",
                      fontSize: "25px",
                      borderRadius: "15px",
                    }}
                    type="text"
                    id="videoModule"
                    value={videoModule}
                    onChange={(event) => setVideoModule(event.target.value)}
                  />
                </div>

                <div>
                  <Button
                    onClick={handleClickUpdate}
                    className="popUpButtonUpdate"
                  >
                    ACTUALIZAR
                  </Button>
                  <Button onClick={handleClose} className="popUpButtonCancel">
                    CANCELAR
                  </Button>
                </div>
              </form>
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
    </>
  );
}
