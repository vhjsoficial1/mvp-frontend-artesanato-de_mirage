export type CadastrarData = {
    nome: string;
    descricao: string;
    preco: number;
    artesaoId: number;
};

export default async function cadastrar(produto : CadastrarData) {
    const response = await fetch('https://mvp-backend-artesanato-de-mirage.onrender.com' + '/produtos/' + produto.artesaoId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: produto.nome,
            descricao: produto.descricao,
            preco: produto.preco,
            artesaoId: produto.artesaoId
        } as CadastrarData),
    });
    return {
        status: response.status.toString(),
        data: await response.json()
    };
}