import { useMemo, useState } from "react";
import listarTodos from "~/services/produtos/listarTodos";

async function pegarProdutos() {
    const response = await fetch('http://localhost:3000/produtos');
    return await response.json();
}

export default function Produtos() {
    const [produtos, setProdutos] = useState([] as any);
    useMemo(() => {
        setProdutos(pegarProdutos());
    }, [])
    return <h1 className="text-2xl text-black">{JSON.stringify(produtos)}</h1>
}