import { useEffect, useState } from "react";
import { Layout } from "~/components/Layout";
import listarTodos from "~/services/produtos/listarTodos";

export default function Produtos() {
    const [produtos, setProdutos] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const pegarProdutos = async () => {
            // Verifica se estamos no cliente antes de acessar localStorage
            if (typeof window !== 'undefined') {
                try {
                    const id = localStorage.getItem('id');
                    if (id) {
                        const response = await listarTodos(id);
                        setProdutos(response.data);
                    }
                } catch (error) {
                    console.error("Erro ao carregar produtos:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        pegarProdutos();
    }, []);

    return (
        <Layout>
            <div className="flex flex-col w-full gap-4">
                {isLoading ? (
                    <p className="text-black">Carregando...</p>
                ) : produtos.length > 0 ? (
                    produtos.map((produto: any) => (
                        <div 
                            key={produto.id} 
                            className="flex flex-col w-full bg-gradient-to-br from-gray-200 to-gray-300 text-black p-4 rounded-xl"
                        >
                            <div className="flex flex-col gap-1">
                                <p>{produto.nome}</p>
                                <p>R$ {produto.preco}</p>
                                <div>
                                    <p>Descrição:</p>
                                    <p className="p-4">{produto.descricao}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-black">Nenhum produto encontrado</p>
                )}
            </div>
        </Layout>
    );
}