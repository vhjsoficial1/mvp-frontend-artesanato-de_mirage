import type { Route } from "./+types/home";
import { Layout } from "../components/Layout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Artesanato de Mirage - Conectando artesãos e clientes" },
    { name: "description", content: "Plataforma para conectar artesãos locais com clientes em todo o Brasil" },
  ];
}

export default function Home() {
  return (
    <Layout>
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-amber-800 mb-4">Bem-vindo ao Artesanato de Mirage</h1>
        <p className="text-xl text-gray-600 mb-8">Conectando artesãos locais de Salvador com clientes em todo o Brasil</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md border border-amber-100 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-amber-700 mb-4">Área do Artesão</h2>
            <p className="text-gray-600 mb-6">Cadastre-se como artesão, gerencie seus produtos e conecte-se com clientes em todo o Brasil.</p>
            <div className="flex justify-center gap-4">
              <a 
                href="/artesao/cadastro" 
                className="inline-block px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
              >
                Cadastrar como Artesão
              </a>
              <a 
                href="/artesao/login" 
                className="inline-block px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
              >
                Logar como Artesão
              </a>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-amber-100 hover:shadow-lg transition-shadow " >
            <h2 className="text-2xl font-semibold text-amber-700 mb-4">Área do Produto</h2>
            <p className="text-gray-600 mb-6">Já é um artesão cadastrado? Adicione seus produtos à nossa plataforma ou veja os produtos cadastrados.</p>
            <div className="flex justify-center gap-4">  
              <a 
                href="/produto/cadastro" 
                className="inline-block px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
              >
                Cadastrar Produto
              </a>
              <a 
                href={`/artesao/produtos`} 
                className="inline-block px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
              >
                Listar Produtos
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-16 bg-amber-50 py-10 px-4 rounded-lg">
          <h2 className="text-2xl font-semibold text-amber-800 mb-6">Sobre o Artesanato de Mirage</h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            O Artesanato de Mirage é uma plataforma inovadora desenvolvida em Salvador para conectar 
            artesãos locais com clientes em todo o Brasil. Nossa missão é valorizar o trabalho artesanal, 
            promover a cultura local e facilitar o acesso a produtos únicos e autênticos.
          </p>
        </div>
      </div>
    </Layout>
  );
}

