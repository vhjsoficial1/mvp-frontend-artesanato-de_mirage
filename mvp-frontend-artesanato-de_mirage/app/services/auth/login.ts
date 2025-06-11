export type LoginData = {
    email: string;
    senha: string;
}

export type LoginError = {
    detail: string
}

export type LoginResponse = {
    status: string;
    data: {
        email: string,
        nome: string,
        id: string
    } | LoginError;
}

export default async function login(data : LoginData) : Promise<LoginResponse> {
    const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: data.email,
            senha: data.senha
        }),
    });
    return {
        status: response.status.toString(),
        data: await response.json()
    } as LoginResponse;
}