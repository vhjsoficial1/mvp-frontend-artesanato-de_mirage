'use client'
import {useMemo, useState } from "react";

export default function Perfil() {
    const [nome, setNome] = useState('Sua Conta');
    useMemo(() => {
        try {
            const nome = localStorage.getItem('nome');
            if (nome) {
                setNome(nome);
            }
        } catch (error) {
        }
    }, []);
    return (
        <div>
            <a href="/perfil" className="hover:text-amber-200 transition-colors flex justify-center items-center gap-4">
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" className="w-8"/>
                {nome}
            </a>
        </div>
    )
}