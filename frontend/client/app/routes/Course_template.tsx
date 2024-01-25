import { Layout } from "./components/layout";
import { Link } from "@remix-run/react";
import { useLocation } from "@remix-run/react";

// useEffect(() => {}, []);

export default function Course_Template() {
  const location = useLocation();
  // console.log(props, "props");
  // console.log(location, "useLocation Hook");
  const data = location.state;
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1 className="text-3xl font-bold text-green-300 bg-blue-600">
        Bienvendo al curso de
        <p>{data.course_Id} </p>
        <p>{data.course_Name}</p>
      </h1>
    </div>
  );
}
