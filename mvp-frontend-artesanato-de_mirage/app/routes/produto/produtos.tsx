import { useEffect, useMemo, useState } from "react";
import { Layout } from "~/components/Layout";
import listarTodos from "~/services/produtos/listarTodos";

async function pegarProdutos() {
    const response = await fetch('http://localhost:3000/produtos');
    return await response.json();
}

export default function Produtos() {
    const [produtos, setProdutos] = useState([] as any);
    useEffect(() => {
        const carregarProdutos = async () => {
            const produtos = await pegarProdutos();
            setProdutos(produtos);
        }
        carregarProdutos();
    }, [])
    return (
        <Layout>
            <div className="flex flex-col w-full">
                {produtos.map((produto: any) => (
                    <div key={produto.id} className="flex flex-col w-full bg-gradient-to-br from-gray-200 to-gray-300 text-black p-4 rounded-xl">
                        <div className="flex flex-col gap-1">
                            <p>{produto.nome}</p>
                            <p>R$ {produto.preco}</p>
                            <div>
                                <p>Descrição:</p>
                                <p className="p-4">{produto.descricao}</p>
                            </div>
                        </div>
                    </div>
                ))}
                {produtos.length === 0 && <p className="text-black text-center">Nenhum produto cadastrado ou você não está logado.</p>}
            </div>
        </Layout>
    )
}