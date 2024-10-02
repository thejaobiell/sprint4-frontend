import { useEffect } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    useEffect(() => {
        document.title = "Login - Diagnoscar";
    }, []);

    const navigate = useNavigate();
    const loginou = () => {
        navigate('/escolhacarro');
    };
    const cadastrar = () => {
        navigate('/cadastro');
    };

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
                <button type="button" className={styles.button} onClick={loginou}>Entrar</button>

                <button type="button" className={styles.button} onClick={cadastrar}>Fazer Cadastro</button>
            </form>
        </section>
    );
};

export default Login;
