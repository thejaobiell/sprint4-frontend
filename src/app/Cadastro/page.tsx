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
    const [genero, setGenero] = useState('');
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
        document.title = "Cadastro - DiagnosCAR";
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = '/img/portoLogo/Diagnoscar.ico';
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

    if (senha.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return;
    }

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
        genero,
        email,
        senha,
        cpf,
        cnh,
        rg,
        endereco,
        carros
    };

        sessionStorage.setItem('user', JSON.stringify(user));
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
                                min="1900-01-01" 
                                max="2006-12-31"
                                value={dataNasc}
                                onChange={(e) => setDataNasc(e.target.value)}  
                                required  
                                className={styles.inputField}
                            /> 
                        </label><br />

                        <label className={styles.label}>Gênero:
                            <select 
                                name="genero" 
                                onChange={(e) => setGenero(e.target.value)} 
                                required 
                                className={styles.inputField}
                            >
                                <option value="" disabled selected>Selecione...</option>
                                <option value="M">Masculino</option>
                                <option value="F">Feminino</option>
                                <option value="O">Outro</option>
                                <option value="ND">Prefiro não dizer</option>
                            </select>
                        </label><br />

                        <label className={styles.label}>E-mail: <br /> 
                            <input 
                                type="email" 
                                name="email"  
                                placeholder="Digite seu e-mail" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required  
                                className={styles.inputField}
                            /> 
                        </label><br/>

                        <label className={styles.label}>Senha: <br /> 
                            <div className={styles.passwordWrapper}>
                                <input 
                                    type={showPassword ? 'text' : 'password'}
                                    name="senha" 
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
                        </label><br/>
                    </fieldset>

                    <fieldset className={styles.fieldset}>
                        <legend className={styles.legenda}>Endereço</legend>

                        <label className={styles.label}> CEP: <br />
                            <InputMask
                                mask="99999-999"
                                type="text" 
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
                                name="rua" 
                                placeholder="Digite sua Rua"
                                value={rua}
                                onChange={(e) => setRua(e.target.value)}
                                className={styles.inputField} 
                                readOnly
                            />
                        </label><br/>

                        <label className={styles.label}> Número Residencial: <br />
                            <input
                                type="number"  
                                name="numeroResidencial" 
                                placeholder="Digite o Número Residencial"
                                value={numeroResidencial}
                                onChange={(e) => setNumeroResidencial(e.target.value)}
                                className={styles.inputField}
                                required 
                            />
                        <p className={styles.letrinhas}>Se caso não houver, digite 00 </p> <br />
                        </label><br/>

                        <label className={styles.label}> Complemento: <br />
                            <input
                                type="text" 
                                name="complemento" 
                                placeholder="Digite um Complemento"
                                value={complemento}
                                onChange={(e) => setComplemento(e.target.value)}
                                className={styles.inputField} 
                            />
                        <p className={styles.letrinhas}>NÃO OBRIGATÓRIO</p> <br />
                        </label><br/>

                        <label className={styles.label}> Bairro: <br />
                            <input
                                type="text" 
                                name="bairro" 
                                placeholder="Digite seu Bairro"
                                value={bairro}
                                onChange={(e) => setBairro(e.target.value)}
                                className={styles.inputField} 
                                readOnly
                            />
                        </label><br/>

                        <label className={styles.label}> Cidade: <br />
                            <input
                                type="text" 
                                name="cidade" 
                                placeholder="Digite sua Cidade"
                                value={cidade}
                                onChange={(e) => setCidade(e.target.value)}
                                className={styles.inputField} 
                                readOnly
                            />
                        </label><br/>

                        <label className={styles.label}> Estado: <br />
                            <input
                                type="text" 
                                name="estado" 
                                placeholder="Digite seu Estado"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                                className={styles.inputField} 
                                readOnly
                            />
                        </label><br/>
                    </fieldset>

                    <fieldset className={styles.fieldset}>
                        <legend className={styles.legenda}>Documentos</legend>

                        <label className={styles.label}>CPF: <br />
                            <InputMask
                                mask="999.999.999-99"
                                type="text" 
                                name="cpf" 
                                placeholder="xxx.xxx.xxx-xx" 
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)} 
                                required  
                                className={styles.inputField}
                            />
                        </label><br/>

                        <label className={styles.label}>CNH: <br />
                            <InputMask 
                                mask="99999999999"
                                type="text" 
                                name="cnh" 
                                placeholder="xxxxxxxxxxx" 
                                value={cnh}
                                onChange={(e) => setCnh(e.target.value)} 
                                required 
                                className={styles.inputField}
                            />
                        </label><br/>

                        <label className={styles.label}>RG: <br />
                            <InputMask
                                mask="99.999.999-9" 
                                type="text" 
                                name="rg" 
                                placeholder="xx.xxx.xxx-x" 
                                value={rg}
                                onChange={(e) => setRg(e.target.value)} 
                                required  
                                className={styles.inputField}
                            />
                        </label><br/>
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
