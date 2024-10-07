'use client'
import { useRouter } from 'next/navigation';
import styles from "./Cadastro.module.css"; 
import { useEffect } from 'react';
import InputMask from 'react-input-mask';

const Cadastro = () => {
    useEffect(() => {
        document.title = "Cadastro - Diagnoscar";
    }, []);

    const router = useRouter();

    const handleCadastro = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        if (evento.currentTarget.checkValidity()) {
            router.push('/Login');
        } else {
            evento.currentTarget.reportValidity();
        }
    };

    return (
        <>
            <section className={styles.forms}>
                <form onSubmit={handleCadastro}>
                    <label className={styles.label}> Nome Completo: <br /> 
                        <input 
                            type="text" 
                            name="nomeCompleto" 
                            id="nomeCompleto" 
                            placeholder="Digite seu nome completo" 
                            required  
                            className={styles.inputField}
                        /> 
                    </label>

                    <label className={styles.label}> Data de Nascimento: <br /> 
                        <input 
                            type="date" 
                            name="dataNascimento" 
                            id="dataNascimento" 
                            min="1900-01-01" 
                            max="2006-12-31" 
                            required  
                            className={styles.inputField}
                        /> 
                    </label>

                    <label className={styles.label}>Sexo:
                        <label> 
                            <input 
                                type="radio" 
                                name="sexo" 
                                id="sexoM" 
                                value="M" 
                                required  
                                className={styles.radioInput}
                            />{" "} Masculino 
                        </label>

                        <label className={styles.label}>
                            <input 
                                type="radio" 
                                name="sexo" 
                                id="sexoF" 
                                value="F" 
                                className={styles.radioInput}
                            />{" "} Feminino 
                        </label>

                        <label className={styles.label}> 
                            <input 
                                type="radio" 
                                name="sexo" 
                                id="sexoOutro" 
                                value="O" 
                                className={styles.radioInput}
                            /> Outro 
                        </label>
                    </label> <br />

                    <label className={styles.label}>E-mail: <br /> 
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Digite seu e-mail" 
                            required  
                            className={styles.inputField}
                        /> 
                    </label>

                    <label className={styles.label}> CPF: <br />
                        <InputMask
                            type="text" 
                            mask="999.999.999-99"
                            id="cpf"
                            name="cpf"
                            placeholder="Digite o CPF"
                            required  
                            maxLength={15}
                            className={styles.inputField}
                        />
                    </label>

                    <label className={styles.label}> CNH: <br />
                        <input
                            type="text" 
                            id="cnh"
                            name="cnh"
                            placeholder="Digite a CNH"
                            required  
                            maxLength={11}
                            className={styles.inputField}
                        />
                    </label>

                    <label className={styles.label}>RG: <br /> 
                        <InputMask
                            mask="99.999.999-9"
                            type="text" 
                            id="rg" 
                            name="rg" 
                            placeholder="Digite o RG" 
                            required  
                            className={styles.inputField}
                        /> 
                    </label>

                    <label className={styles.label}> Celular: <br />
                        <InputMask
                            type="text" 
                            mask="(99) 99999-9999"
                            id="celular"
                            name="celular"
                            placeholder="Digite o número de celular"
                            required  
                            className={styles.inputField}
                        />
                    </label>

                    <label className={styles.label}>Endereço: <br />
                        <textarea
                            id="endereco"
                            name="endereco"
                            placeholder="Rua, Número, Bairro, Cidade, Estado e CEP (Exemplo: Rua das Flores, 123, Bairro Jardim Primavera, São Paulo, São Paulo, 01000-000)"
                            required  
                            rows={5}
                            className={styles.textArea}
                        />
                    </label> <br />

                    <label className={styles.label}> CEP: <br />
                        <input
                            type="text" 
                            id="cep"
                            name="cep"
                            placeholder="Digite a CEP"
                            required  
                            maxLength={11}
                            className={styles.inputField}
                        />
                    </label>

                    <label className={styles.label}>Digite as informações do carro (Use / para separar os automóveis): <br /> 
                        <input 
                            type="text" 
                            name="informacaoCarro" 
                            id="informacaoCarro" 
                            placeholder="Placa, Marca, Modelo e Ano" 
                            required  
                            className={styles.inputField}
                        /> 
                    </label>

                    <input 
                        type="submit" 
                        value="Cadastrar" 
                        className={styles.botao}
                    />
                </form>
            </section>
        </>
    );
}

export default Cadastro;
