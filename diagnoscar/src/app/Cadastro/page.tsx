'use client';
import { useRouter } from 'next/navigation';
import styles from "./Cadastro.module.css"; 
import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import CarroForm from './CarroForm'; // Importar o componente

const Cadastro = () => {
    const [carros, setCarros] = useState([{ placa: '', marca: '', modelo: '', ano: '' }]);
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar visibilidade da senha

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

    const adicionarCarro = () => {
        setCarros((prevCarros) => [...prevCarros, { placa: '', marca: '', modelo: '', ano: '' }]);
    };

    const removerCarro = (index: number) => {
        if (carros.length > 1) {
            setCarros((prevCarros) => prevCarros.filter((_, i) => i !== index));
        }
    };

    const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCarros((prevCarros) =>
            prevCarros.map((carro, i) => i === index ? { ...carro, [name]: value } : carro)
        );
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Alterna entre mostrar e ocultar senha
    };

    return (
        <>
            <section className={styles.forms}>
                <form onSubmit={handleCadastro}>

                    {/* Informações Pessoais */}
                    <fieldset className={styles.fieldset}>
                        <legend>Informações Pessoais</legend>

                        <label className={styles.label}> Nome Completo: <br /> 
                            <input 
                                type="text" 
                                name="nomeCompleto" 
                                id="nomeCompleto" 
                                placeholder="Digite seu nome completo" 
                                required  
                                className={`${styles.inputField} ${styles.CampoLargo}`}
                            /> 
                        </label><br />

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
                        </label><br />

                        <label className={styles.label}>Sexo:<br />
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

                            <label className={styles.label}><br />
                                <input 
                                    type="radio" 
                                    name="sexo" 
                                    id="sexoF" 
                                    value="F" 
                                    className={styles.radioInput}
                                />{" "} Feminino 
                            </label>

                            <label className={styles.label}> <br />
                                <input 
                                    type="radio" 
                                    name="sexo" 
                                    id="sexoOutro" 
                                    value="O" 
                                    className={styles.radioInput}
                                /> Outro 
                            </label>
                        </label> <br /> <br />

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

                        <label className={styles.label}>Senha: <br /> 
                            <div className={styles.passwordWrapper}>
                                <input 
                                    type={showPassword ? 'text' : 'password'}
                                    name="senha" 
                                    id="senha" 
                                    placeholder="Digite uma senha" 
                                    required  
                                    className={styles.inputField}
                                />
                                <button 
                                    type="button" 
                                    onClick={togglePasswordVisibility}
                                    className={styles.toggleButton}
                                >
                                    {showPassword ? 'Ocultar' : 'Mostrar'}
                                </button>
                            </div>
                        </label>


                    </fieldset>

                    {/* Documentos */}
                    <fieldset className={styles.fieldset}>
                        <legend>Documentos</legend>

                        <label className={styles.label}> CPF: <br />
                            <InputMask
                                type="text" 
                                mask="999.999.999-99"
                                id="cpf"
                                name="cpf"
                                placeholder="Digite o CPF"
                                required  
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
                    </fieldset>

                    {/* Informações do Carro */}
                    {carros.map((carro, index) => (
                        <fieldset className={styles.fieldset} key={index}>
                            <CarroForm
                                index={index}
                                carro={carro}
                                handleInputChange={handleInputChange}
                                removerCarro={removerCarro}  // Passando a função de remover como prop
                                carros={carros}  // Passando todos os carros para controle
                            />
                        </fieldset>
                    ))}

                    <button 
                        type="button" 
                        onClick={adicionarCarro}
                        className={styles.botaoAdicionar}
                    >
                        Adicionar Carro
                    </button>

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
