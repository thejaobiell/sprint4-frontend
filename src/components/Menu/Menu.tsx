import { useEffect } from 'react';
import styles from './Menu.module.css';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    useEffect(() => {
        document.title = "Menu - Diagnoscar";
    }, []);

    const navigate = useNavigate();
    const loginou = () => {
        navigate('/login');
    };

    return (
        <section className={styles.sectionMenu}>
            <div className={styles.fundoContainer}>
                <img className={styles.fundo} src="/img/fundo.png" alt="Foto de Fundo" />
                <article className={styles.botaoEtexto}>
                    <h1 className={styles.texto}>
                        A inteligência artificial da Porto Seguro que irá fazer um pré-diagnóstico do seu carro antes dele ir para oficina
                    </h1>
                    <button className={styles.botao} onClick={loginou}>Iniciar Pré-Diagnóstico</button>
                </article>
            </div>
        </section>
    );
};

export default Menu;
