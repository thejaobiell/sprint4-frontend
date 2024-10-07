'use client'; // Para indicar que este componente é um componente cliente
import { useEffect } from 'react';
import styles from './Login.module.css';
import Link from 'next/link'; // Importando o Link do Next.js

const Login = () => {
    useEffect(() => {
        document.title = "Login - Diagnoscar";
    }, []);

    return (
        <section className={styles.section}>
            <form id={styles.LOGIN}>
                <label htmlFor="txtEmail">
                    <h4>Email:</h4>
                    <br />
                    <input type="email" name="txtEmail" id="txtEmail" placeholder="Digite seu email" />
                </label>
                <br />

                <label htmlFor="txtCNH_CPF_RG">
                    <h4>CNH/CPF/RG:</h4>
                    <br />
                    <input type="text" id="txtCNH_CPF_RG" name="txtCNH_CPF_RG" placeholder="Digite o CNH ou CPF ou RG" />
                </label>
                <br />
                <Link href="/escolhacarro">
                    <button type="button" className={styles.button}>Entrar</button>
                </Link>

                <Link href="/cadastro">
                    <button type="button" className={styles.button}>Fazer Cadastro</button>
                </Link>
            </form>
        </section>
    );
};

export default Login;
