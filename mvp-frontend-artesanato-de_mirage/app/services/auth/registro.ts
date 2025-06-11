export type RegistroData = {
    nome: string;
    email: string;
    senha: string;
}

export type RegistroError = {
    detail: string
}

export type RegistroResponse = {
    status: string;
    data: {
        email: string,
        nome: string
    } | RegistroError;
}

export default async function registro(data : RegistroData) : Promise<RegistroResponse> {
    const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: data.nome,
            email: data.email,
            senha: data.senha
        }),
    });
    return {
        status: response.status.toString(),
        data: await response.json()
    } as RegistroResponse;
}