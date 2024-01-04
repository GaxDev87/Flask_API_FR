import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import LogoNTT from '~/images/NTT-Data-Logo.png';
import { Layout } from "./components/layout";
import ReadOnlyEditable from "./components/ReadOnlyEditable";
import Model from './modal';

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to NTT!" },
  ];
};

export default function Index() {
    return (
        <main className="bg-gradient-to-r from-blue-700 to-blue-700 min-h-screen flex items-center justify-center">
          <div className="max-w-3xl mx-auto px-8 py-12 sm:px-12 sm:py-16 bg-white rounded-lg shadow-xl">
            <div className="flex items-center justify-center mb-8">
            </div>
            <div className="flex flex-col items-center space-y-4">
            <img src={LogoNTT} alt="Logo de NTT DATA" style={{ width: '30%', height: 'auto', marginBottom: '50px', marginLeft: '25px'}}/>
            <h2 style={{color: '#1C4D85', fontSize: '22px', fontWeight: 'bold'}}>¡BIENVENIDO A NTT DATA FORMACIÓN!</h2>
            <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
            
                <Link
                    to="/registro"
                    className="flex items-center justify-center rounded-md bg-sky-700 px-4 py-3 font-medium text-white hover:bg-blue-900"
                  >
                    Registrarse
                </Link>
                <Link
                  to="/inicio"
                  className="flex items-center justify-center rounded-md bg-blue-700 px-4 py-3 font-medium text-white hover:bg-blue-900"
                >
                  Iniciar Sesión
                </Link>
              </div>
            </div>
          </div>
        </main>
      );
}
