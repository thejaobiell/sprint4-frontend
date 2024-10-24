'use client'
import { useNavigate } from 'react-router-dom';
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

    const navigate = useNavigate();

    const voltarMenu = () => {
        navigate('/menu');
    };

    return (
        <div className={styles.thanks}>
            <h1 className={styles.titulo}>Obrigado por usar a DIAGNOSCAR!</h1>
            <button className={styles.botao} onClick={voltarMenu}>
                Voltar ao Menu
            </button>
        </div>
    );
};

export default ObrigadoPorUsar;
