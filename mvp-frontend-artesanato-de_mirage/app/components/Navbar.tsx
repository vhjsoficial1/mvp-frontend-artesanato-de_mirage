import { Link } from "react-router";
import Perfil from "./Perfil";

export function Navbar() {
  return (
    <nav className="bg-amber-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Artesanato de Mirage</Link>
        <div className="space-x-4 flex">
          <Perfil/>
          <button onClick={
            () => {
              localStorage.clear();
              window.location.reload();
            }
          }>
            <img src="https://static-00.iconduck.com/assets.00/logout-icon-512x512-2x08s84n.png" alt="Logout" className="w-4 cursor-pointer"/>
          </button>
        </div>
      </div>
    </nav>
  );
}

