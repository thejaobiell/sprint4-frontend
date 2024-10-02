import { useEffect, useState } from 'react';
import styles from './RelatorioDiagnoscar.module.css';
import { useNavigate } from 'react-router-dom';

const RelatorioDiagnoscar = () => {
    const navigate = useNavigate();

    const chamarGuincho = () => {
        navigate('/envioGuincho');
    };

    const oficinasParceiras = () => {
        navigate('/OficinasPerto');
    };

    useEffect(() => {
        document.title = "Início do Pré-Diagnóstico - Diagnoscar";
    }, []);

    const [mostrarChat, setMostrarChat] = useState(false);
    const alternarChat = () => {
        setMostrarChat(!mostrarChat);
    };

    return (
        <>
            <div className={styles.informacoes}>
                <h2>Informações: </h2>
                <h4>Marca: XXXXX</h4>
                <h4>Modelo: xxxxxx</h4>
                <h4>Ano: 0000</h4>
            </div>

            <div className={styles.descricao}>
                <h2>Descrição do Problema:</h2>
                <p>...</p>
            </div>

            <div className={styles.preDiagnostico}>
                <h1>Pré-diagnóstico:</h1>
                <p>...</p>
            </div>

            <div className={styles.duplabotao}>
                <button className={styles.botao} onClick={chamarGuincho}>Chamar o Guincho</button>
                <button className={styles.botao} onClick={oficinasParceiras}>Oficinas Perto de Você</button>
            </div>

            <div className={styles.solobotao}>
                <button className={styles.botao} onClick={alternarChat}>Chat</button>
            </div>

            {mostrarChat && (
                <div className={styles.chatContainer}>
                    <button className={styles.fecharChat} onClick={alternarChat}>Sair</button>
                    <div className={styles.chatBox}>
                        <p>Chat em Desenvolvimento</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default RelatorioDiagnoscar;
