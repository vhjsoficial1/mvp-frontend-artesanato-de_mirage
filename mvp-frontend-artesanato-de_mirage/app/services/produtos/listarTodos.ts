export default async function listarTodos(){
    const response = await fetch('http://localhost:3000/produtos');
    return {
        status: response.status.toString(),
        data: await response.json()
    };
}