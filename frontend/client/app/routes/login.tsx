import { Layout } from "./components/layout";
import { FormField } from "./components/form-field";
import { useState } from "react";
import { ActionFunction } from "@remix-run/node";

//Endpoint that collects the users input and handles post request
export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const action = form.get("_action");
  const email = form.get("email");
  const password = form.get("password");
  let firstName = form.get("firstName");
  let lastName = form.get("lastName");
};
export default function Login() {
  const [action, setAction] = useState("login");
  const [formulario, setFormData] = useState({
    email: "",
    pass: "",
    firstName: "",
    lastName: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData((form) => ({
      ...form,
      [field]: event.target.value,
    }));
  };
  return (
    <Layout>
      <div className="h-full flex justify-center items-center flex-col gap-4">
        <button
          onClick={() => setAction(action == "login" ? "sign up" : "login")}
          className=" absolute top-8 right-8 rounded-xl text-blue-600 font-semibold bg-yellow-400 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover: translate-y-1"
        >
          {action == "login" ? "Sign Up!" : "Sign In!"}
        </button>

        <h2 className=" text-xl justify-center font-extrabold text-white">
          {action == "login" ? "INICIO DE SESIÓN" : "Sign Up Page!"}
        </h2>
        <p className=" font-semibold text-lime-300">
          {action == "login"
            ? "Log In To Give Some Praise!"
            : "Sign Up To Get Started!"}
        </p>

        {/* {JSON.stringify(formData)} */}

        <form className=" rounded-2xl bg-lime-400 p-6 w-96">
          {/* Email fields */}
          <FormField
            htmlFor="email"
            label="Email"
            value={formulario.email}
            onChange={(e) => handleInputChange(e, "email")}
          />

          {/* Password fields */}
          <FormField
            htmlFor="password"
            label="Password"
            type="password"
            value={formulario.pass}
            onChange={(e) => handleInputChange(e, "pass")}
          />

          {/* fields that show up if sign up */}

          {action !== "login" ? (
            <>
              <FormField
                htmlFor="firstName"
                label="First Name"
                value={formulario.firstName}
                onChange={(e) => handleInputChange(e, "firstName")}
              />

              <FormField
                htmlFor="lastName"
                label="Last Name"
                value={formulario.lastName}
                onChange={(e) => handleInputChange(e, "lastName")}
              />
            </>
          ) : null}

          <div className="w-full text-center">
            <button
              type="submit"
              name="_action"
              value={action}
              className=" rounded-xl mt-2 bg-yellow-300 px-3 text-blue-600 font-semibold transition duration-300 ease-in-out
             hover:decoration-slate-300 hover:bg-violet-500 hover:translate-y-2"
            >
              {action == "login" ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
