'use client';

import { useEffect, useState } from 'react';
import styles from './Login.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [MostrarSenha, setMostrarSenha] = useState(false);
    const router = useRouter(); 

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault(); 

        const user = localStorage.getItem('user');
        if (user) {
            const analiseUser = JSON.parse(user);

            if (analiseUser.email === email && analiseUser.senha === senha) {
                router.push('/EscolhaCarro');
            } else {
                setError('Email ou senha incorretos');
            }
            
        } else {
            setError('Usuário não encontrado. Faça o cadastro primeiro.'); 
        }
    }

    useEffect(() => {
        document.title = "Login - Diagnoscar";
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = '/img/portoLogo/iconPorto.ico';
        document.head.appendChild(link);
    }, []);

    const mudarVisibilidadeSenha = () => {
        setMostrarSenha(!MostrarSenha);
    };


    return (
        <section className={styles.section}>
            <form id={styles.LOGIN} onSubmit={handleLogin}>
                <fieldset className={styles.fieldset}>
                    <legend>Login</legend>
                    
                    <label htmlFor="txtEmail">
                        <h1>Email:</h1>
                        <input 
                        type="email" 
                            name="txtEmail" 
                            placeholder="Digite seu email"
                            value={email}
                            onChange= {(e) => setEmail(e.target.value)} 
                        required />
                    </label>
                    <br />

                    <div>
                        <h1>Senha:</h1>
                        <div className={styles.passwordContainer}>
                            <input 
                                className={styles.input} 
                                type={MostrarSenha ? 'text' : 'password'} 
                                placeholder='Digite sua senha' 
                                value={senha} 
                                onChange={(e) => setSenha(e.target.value)} 
                                required
                            />
                            <button 
                                type="button" 
                                onClick={mudarVisibilidadeSenha} 
                                className={styles.toggleButton}
                            >
                                {MostrarSenha ? '👁️' : '🙈'}
                            </button>
                        </div>
                    </div>

                    <br/>

                    {error && <p style={{ color: 'red' }}>{error}</p>} 

                    <Link href="/Cadastro">
                        <h1>Criar um cadastro</h1>
                    </Link>
                    <button type="submit" className={styles.button}>Entrar</button>
                </fieldset>
            </form>
        </section>
    );
};

export default Login;
