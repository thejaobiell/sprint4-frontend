'use client';
import { useEffect } from 'react';
import styles from './Menu.module.css';
import Link from 'next/link'; 


const Menu = () => {
    useEffect(() => {
        document.title = "Menu - Diagnoscar";
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = '/img/portoLogo/iconPorto.ico';
        document.head.appendChild(link);
    }, []);

    return (
        <section className={styles.sectionMenu}>

            <div className={styles.fundoContainer}>
                <img className={styles.fundo} src="/img/fundo.png" alt="Foto de Fundo" />

                <article className={styles.botaoEtexto}>
                    <h1 className={styles.texto}>
                        A inteligência artificial da Porto Seguro que irá fazer um pré-diagnóstico do seu carro antes dele ir para oficina
                    </h1>

                    <Link href="/Login">
                        <button className={styles.botao}>Iniciar Pré-Diagnóstico</button>
                    </Link>

                </article>
                
            </div>

        </section>
    );
};

export default Menu;

