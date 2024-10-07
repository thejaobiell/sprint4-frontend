'use client';

import { useEffect } from 'react';
import styles from './Login.module.css';
import Link from 'next/link';

const Login = () => {
    useEffect(() => {
        document.title = "Login - Diagnoscar";
    }, []);

    return (
        <section className={styles.section}>
            <form id={styles.LOGIN}>
                <fieldset className={styles.fieldset}>
                    <legend>Login</legend>
                    
                    <label htmlFor="txtEmail">
                        <h4>Email:</h4>
                        <input type="email" name="txtEmail" id="txtEmail" placeholder="Digite seu email" required />
                    </label>
                    <br />

                    <label htmlFor="txtCNH_CPF_RG">
                        <h4>CNH/CPF/RG:</h4>
                        <input type="text" id="txtCNH_CPF_RG" name="txtCNH_CPF_RG" placeholder="Digite o CNH ou CPF ou RG" required />
                    </label>
                    <br />

                    <Link href="/Cadastro">
                        <h1>Criar um cadastro</h1>
                    </Link>
                    <Link href="/Escolhacarro">
                        <button type="button" className={styles.button}>Entrar</button>
                    </Link>
                </fieldset>
            </form>
        </section>
    );
};

export default Login;
