import { useNavigate } from "react-router-dom";
import styles from "./Cadastro.module.css"; 
import { useEffect } from 'react';
import InputMask from 'react-input-mask';

const Cadastro = () => {
    useEffect(() => {
        document.title = "Cadastro - Diagnoscar";
    }, []);

    const navigate = useNavigate();
    const logino = () => {
        navigate('/login');
    };

    return (
        <>
            <section className={styles.forms}>
                <form>
                    <label> Nome Completo: <br /> 
                        <input 
                            type="text" 
                            name="txtNome" 
                            id="txtNome" 
                            placeholder="Digite seu nome" 
                            className={styles.inputField}
                        /> 
                    </label>

                    <label> Data de nascimento: <br /> 
                        <input 
                            type="date" 
                            name="txtDataNascimento" 
                            id="txtNASCIMENTO" 
                            min="1900-01-01" 
                            max="2006-12-31" 
                            className={styles.inputField}
                        /> 
                    </label>

                    <label>Sexo:
                        <label> 
                            <input 
                                type="radio" 
                                name="rdoSEXO" 
                                id="rdoSEXOM" 
                                value="M" 
                                className={styles.radioInput}
                            />{" "} Masculino 
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="rdoSEXO" 
                                id="rdoSEXOF" 
                                value="F" 
                                className={styles.radioInput}
                            />{" "} Feminino 
                        </label>
                        <label> 
                            <input 
                                type="radio" 
                                name="rdoSEXO" 
                                id="rdoSEXO0" 
                                value="O" 
                                className={styles.radioInput}
                            /> Outro 
                        </label>
                    </label> <br />

                    <label>E-Mail: <br /> 
                        <input 
                            type="email" 
                            name="txtEmail" 
                            id="txtEMAIL" 
                            placeholder="Digite seu e-mail" 
                            className={styles.inputField}
                        /> 
                    </label>

                    <label> CPF: <br />
                        <InputMask
                            type="text" 
                            mask="999.999.999-99"
                            id="txtCPF"
                            name="txtcpf"
                            placeholder="Digite o CPF"
                            maxLength={15}
                            className={styles.inputField}
                        />
                    </label>

                    <label> CNH: <br />
                        <input
                            type="text" 
                            id="txtCNH"
                            name="txtcnh"
                            placeholder="Digite a CNH"
                            maxLength={11}
                            className={styles.inputField}
                        />
                    </label>

                    <label>RG: <br /> 
                        <InputMask
                            mask="99.999.999-9"
                            type="text" 
                            id="txtRG" 
                            name="txtrg" 
                            placeholder="Digite o RG" 
                            className={styles.inputField}
                        /> 
                    </label>

                    <label> Celular: <br />
                        <InputMask
                            type="text" 
                            mask="(99) 99999-9999"
                            id="txtCEL"
                            name="txtCEL"
                            placeholder="Digite o número de Celular"
                            className={styles.inputField}
                        />
                    </label>

                    <label>Endereço: <br />
                        <textarea
                            id="txtEndereco"
                            name="endereco"
                            placeholder="Rua, Número, Bairro, Cidade, Estado e CEP (Exemplo: Rua das Flores, 123, Bairro Jardim Primavera, São Paulo, São Paulo, 01000-000)"
                            rows={5}
                            className={styles.textArea}
                        />
                    </label> <br />

                    <label>Digite as informações do carro (Use / para separa os automoveís) : <br /> 
                        <input 
                            type="text" 
                            name="txtNome" 
                            id="txtNome" 
                            placeholder="Placa, Marca, Modelo e Ano" 
                            className={styles.inputField}
                        /> 
                    </label>

                    <input 
                        type="button" 
                        value="Cadastrar" 
                        onClick={logino}
                        className={styles.botao}
                    />
                </form>
            </section>
        </>
    );
}

export default Cadastro;
