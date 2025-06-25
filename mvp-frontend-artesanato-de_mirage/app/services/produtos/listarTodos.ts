export default async function listarTodos(id: string) {
    const response = await fetch('https://mvp-backend-artesanato-de-mirage.onrender.com' + '/produtos/' + id);
    return {
        status: response.status.toString(),
        data: await response.json()
    };
}