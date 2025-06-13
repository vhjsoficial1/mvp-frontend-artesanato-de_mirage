export default async function listarTodos(id: string) {
    const response = await fetch('http://localhost:3000/produtos/' + id);
    return {
        status: response.status.toString(),
        data: await response.json()
    };
}