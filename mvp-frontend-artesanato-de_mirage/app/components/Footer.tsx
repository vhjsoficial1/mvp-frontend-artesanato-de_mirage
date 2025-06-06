export function Footer() {
  return (
    <footer className="bg-amber-800 text-white p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Artesanato de Mirage - Salvador, Bahia</p>
        <p className="text-sm mt-2">Conectando artesãos locais com clientes em todo o Brasil</p>
      </div>
    </footer>
  );
}

