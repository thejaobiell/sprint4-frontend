'use client'
import Link from 'next/link';
import styles from './ObrigadoPorUsar.module.css';
import { useEffect } from 'react';

const ObrigadoPorUsar = () => {

    useEffect(() => {
        document.title = "Obrigado por usar a DiagnosCAR!";
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = '/img/Logos/Diagnoscar.ico';
        document.head.appendChild(link);
    }, []);

    return (
        <div className={styles.thanks}>
            <h1 className={styles.titulo}>Obrigado por usar a DiagnosCAR!</h1>
            <Link href="/Dashboard"> 
                <button className={styles.botao}>
                    Voltar ao Menu
                </button>
            </Link>

        </div>
    );
};

export default ObrigadoPorUsar;
