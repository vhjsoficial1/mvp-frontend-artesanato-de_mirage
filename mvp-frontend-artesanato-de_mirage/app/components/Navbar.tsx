import { Link } from "react-router";

export function Navbar() {
  return (
    <nav className="bg-amber-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Artesanato de Mirage</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-amber-200 transition-colors">Início</Link>
          <Link to="/artesao/cadastro" className="hover:text-amber-200 transition-colors">Cadastrar Artesão</Link>
          <Link to="/produto/cadastro" className="hover:text-amber-200 transition-colors">Cadastrar Produto</Link>
        </div>
      </div>
    </nav>
  );
}

