import { Link } from "react-router";
import Perfil from "./Perfil";

export function Navbar() {
  return (
    <nav className="bg-amber-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Artesanato de Mirage</Link>
        <div className="space-x-4">
          <Perfil/>
        </div>
      </div>
    </nav>
  );
}

