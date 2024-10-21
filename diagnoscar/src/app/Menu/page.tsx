'use client';
import { useRouter } from 'next/navigation';
import styles from "./Cadastro.module.css"; 
import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import CarroForm from './CarroForm';

const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [sexo, setSexo] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [cnh, setCnh] = useState('');
    const [rg, setRg] = useState('');
    const [carros, setCarros] = useState([{ placa: '', marca: '', modelo: '', ano: '' }]);
    const [showPassword, setShowPassword] = useState(false); 

useEffect(() => {
    document.title = "Cadastro - Diagnoscar";
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = '/img/portoLogo/iconPorto.ico';
    document.head.appendChild(link);
}, []);

    const router = useRouter();

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
        setShowPassword(!showPassword);
    };

    const handleRegister = (e: React.FormEvent)=>{
        e.preventDefault();

        const user = {
            nome,
            sobrenome,
            dataNasc,
            sexo,
            email,
            senha,
            cpf,
            cnh,
            rg,
            carros
        }

        localStorage.setItem('user', JSON.stringify(user));
        router.push('/Login')
    }

    return (
        <>
            <section className={styles.forms}>
                <form onSubmit={handleRegister}>

                    <fieldset className={styles.fieldset}>
                        <legend className={styles.legenda}>Informações Pessoais</legend>
                        <label className={styles.label}> Nome: <br /> 
                            <input 
                                type="text" 
                                name="Nome" 
                                id="Nome" 
                                placeholder="Digite seu Nome" 
                                value={nome}
                                onChange={(e) => setNome(e.target.value)} 
                                required  
                                className={styles.inputField}
                            /> 
                        </label><br />

                        <label className={styles.label}> Sobrenome: <br /> 
                            <input 
                                type="text" 
                                name="Sobrenome" 
                                id="Sobrenome" 
                                placeholder="Digite seu Sobrenome" 
                                value={sobrenome}
                                onChange={(e) => setSobrenome(e.target.value)} 
                                required  
                                className={styles.inputField}
                            /> 
                        </label><br />

                        <label className={styles.label}> Data de Nascimento: <br /> 
                            <input 
                                type="date" 
                                name="dataNascimento" 
                                id="dataNascimento" 
                                min="1900-01-01" 
                                max="2006-12-31"
                                value={dataNasc}
                                onChange={(e) => setDataNasc(e.target.value)}  
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
                                    onChange={(e) => setSexo(e.target.value)}
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
                                    onChange={(e) => setSexo(e.target.value)} 
                                    className={styles.radioInput}
                                />{" "} Feminino 
                            </label>

                            <label className={styles.label}> <br />
                                <input 
                                    type="radio" 
                                    name="sexo" 
                                    id="sexoOutro" 
                                    value="O"
                                    onChange={(e) => setSexo(e.target.value)}
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)} 
                                    required  
                                    className={styles.inputField}
                                />
                                <button 
                                    type="button" 
                                    onClick={togglePasswordVisibility}
                                    className={styles.toggleButton}
                                >
                                    {showPassword ? '👁️' : '🙈'}
                                </button>
                            </div>
                        </label>


                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <legend className={styles.legenda}>Documentos</legend>

                        <label className={styles.label}> CPF: <br />
                            <InputMask
                                type="text" 
                                mask="999.999.999-99"
                                id="cpf"
                                name="cpf"
                                placeholder="Digite o CPF"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
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
                                maxLength={11}
                                value={cnh}
                                onChange={(e) => setCnh(e.target.value)}
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
                                value={rg}
                                onChange={(e) => setRg(e.target.value)}
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

                    <button
                        type="submit" 
                        value="Cadastrar" 
                        className={styles.botao}
                    > 
                        Cadastrar
                    </button>
                </form>
            </section>
        </>
    );
}

export default Cadastro;
