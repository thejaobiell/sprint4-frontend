diagnoscar\src\app\Cadastro\page.tsx
COPIAR ⬇⬇⬇

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
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [numeroResidencial, setNumeroResidencial] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
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

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

    const endereco = {
        rua,
        numeroResidencial,
        complemento,
        bairro,
        cidade,
        estado,
        cep
    };

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
        endereco,
        carros
    };

        localStorage.setItem('user', JSON.stringify(user));
        router.push('/Login');
    };

    const buscaCep = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const cepUSER = e.target.value.replace(/\D/g, '');
        setCep(cepUSER);

        if (cepUSER.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cepUSER}/json/`);
                const dadosCEP = await response.json();

                if (!dadosCEP.erro) {
                    setRua(dadosCEP.logradouro);
                    setBairro(dadosCEP.bairro);
                    setCidade(dadosCEP.localidade);
                    setEstado(dadosCEP.uf);
                }
            } catch (error) {
                console.error("Erro ao buscar o CEP:", error);
            }
        }
    };

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

                        <label className={styles.label}>Sexo:
                            <label> 
                                <input 
                                    type="radio" 
                                    name="sexo" 
                                    id="sexoM" 
                                    value="M"
                                    onChange={(e) => setSexo(e.target.value)}
                                    required  
                                    className={styles.radioInput}
                                /> Masculino 
                            </label>

                            <label className={styles.label}>
                                <input 
                                    type="radio" 
                                    name="sexo" 
                                    id="sexoF" 
                                    value="F"
                                    onChange={(e) => setSexo(e.target.value)} 
                                    className={styles.radioInput}
                                /> Feminino 
                            </label>

                            <label className={styles.label}>
                                <input 
                                    type="radio" 
                                    name="sexo" 
                                    id="sexoOutro" 
                                    value="O"
                                    onChange={(e) => setSexo(e.target.value)}
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
                        <legend className={styles.legenda}>Endereço</legend>

                        <label className={styles.label}> CEP: <br />
                            <InputMask
                                mask="99999-999"
                                type="text" 
                                id="cep" 
                                name="cep" 
                                placeholder="Digite seu CEP" 
                                value={cep}
                                onChange={buscaCep} 
                                required 
                                className={styles.inputField}
                            />
                        </label><br />

                        <label className={styles.label}> Rua: <br />
                            <input
                                type="text" 
                                id="rua" 
                                name="rua" 
                                placeholder="Digite sua Rua"
                                value={rua}
                                onChange={(e) => setRua(e.target.value)}
                                className={styles.inputField} 
                                readOnly
                            />
                        </label>

                        <label className={styles.label}> Número Residencial: <br />
                            <input
                                type="text" 
                                id="numeroResidencial" 
                                name="numeroResidencial" 
                                placeholder="Digite o Número Residencial"
                                value={numeroResidencial}
                                onChange={(e) => setNumeroResidencial(e.target.value)}
                                className={styles.inputField}
                                required 
                            />
                        <p className={styles.letrinhas}>Se caso não houver, digite 00 </p> <br />
                        </label>

                        <label className={styles.label}> Complemento: <br />
                            <input
                                type="text" 
                                id="complemento" 
                                name="complemento" 
                                placeholder="Digite um Complemento"
                                value={complemento}
                                onChange={(e) => setComplemento(e.target.value)}
                                className={styles.inputField} 
                            />
                        <p className={styles.letrinhas}>NÃO OBRIGATÓRIO</p> <br />
                        </label>

                        <label className={styles.label}> Bairro: <br />
                            <input
                                type="text" 
                                id="bairro" 
                                name="bairro" 
                                placeholder="Digite seu Bairro"
                                value={bairro}
                                onChange={(e) => setBairro(e.target.value)}
                                className={styles.inputField} 
                                readOnly
                            />
                        </label>

                        <label className={styles.label}> Cidade: <br />
                            <input
                                type="text" 
                                id="cidade" 
                                name="cidade" 
                                placeholder="Digite sua Cidade"
                                value={cidade}
                                onChange={(e) => setCidade(e.target.value)}
                                className={styles.inputField} 
                                readOnly
                            />
                        </label>

                        <label className={styles.label}> Estado: <br />
                            <input
                                type="text" 
                                id="estado" 
                                name="estado" 
                                placeholder="Digite seu Estado"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                                className={styles.inputField} 
                                readOnly
                            />
                        </label>
                    </fieldset>

                    <fieldset className={styles.fieldset}>
                        <legend className={styles.legenda}>Documentos</legend>

                        <label className={styles.label}>CPF: <br />
                            <InputMask
                                mask="999.999.999-99"
                                type="text" 
                                id="cpf" 
                                name="cpf" 
                                placeholder="Digite seu CPF" 
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)} 
                                required  
                                className={styles.inputField}
                            />
                        </label>

                        <label className={styles.label}>CNH: <br />
                            <InputMask 
                                mask="99999999999"
                                type="text" 
                                id="cnh" 
                                name="cnh" 
                                placeholder="Digite seu CNH" 
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
                                placeholder="Digite seu RG" 
                                value={rg}
                                onChange={(e) => setRg(e.target.value)} 
                                required  
                                className={styles.inputField}
                            />
                        </label>
                    </fieldset>

                    {carros.map((carro, index) => (
                        <fieldset className={styles.fieldset} key={index}>
                            <CarroForm
                                index={index}
                                carro={carro}
                                handleInputChange={handleInputChange}
                                removerCarro={removerCarro}
                                carros={carros}
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
                        className={styles.botao}
                    > 
                        Cadastrar
                    </button>
                </form>
            </section>
        </>
    );
};

export default Cadastro;
