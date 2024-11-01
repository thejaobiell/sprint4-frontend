'use client';
import { useRouter } from 'next/navigation';
import styles from './Dashboard.module.css';
import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';

interface Carro {
  placa: string;
  marca: string;
  modelo: string;
  ano: string;
}

interface Endereco {
  rua: string;
  numeroResidencial: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

interface UserData {
  nome: string;
  sobrenome: string;
  dataNasc: string;
  genero: string;
  email: string;
  cpf: string;
  cnh: string;
  rg: string;
  senha: string; 
  endereco: Endereco; 
  carros: Carro[];
}

const Dashboard = () => {
  const [carros, setCarros] = useState<Carro[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [estaEditando, setEstaEditando] = useState(false);
  const [cep, setCep] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [MostrarSenha, setMostrarSenha] = useState(false);
  const [MostrarSenha2, setMostrarSenha2] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.title = "Dashboard - DiagnosCAR";
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = '/img/Logos/Diagnoscar.ico';
    document.head.appendChild(link);
  }, [])

  useEffect(() => {
    const logado = sessionStorage.getItem('logado');
    if (logado !== 'sim') {
      router.push('/Login');
    }

    const dataUserArmazenados = sessionStorage.getItem('user');
    if (dataUserArmazenados) {
      const dataAnalisado: UserData = JSON.parse(dataUserArmazenados);
      setCarros(dataAnalisado.carros);
      setUserData(dataAnalisado);
      setSenha(dataAnalisado.senha || ''); 
    }
  }, [router]);

  const ClickImagem = (carro: Carro) => {
    return () => {
      localStorage.setItem('carroSelecionado', JSON.stringify(carro));
      router.push('/Pre-Diagnostico');
    };
  };

  const logout = () => {
    sessionStorage.removeItem('logado');
    localStorage.removeItem('carroSelecionado');
    router.push('/Login');
  };

  const lidarMudancas = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (userData) {
      setUserData((prevData) => ({
        ...prevData!,
        [name]: value,
        endereco: {
          ...prevData!.endereco,
          [name]: value,
        },
      }));
    }
  };

  const buscaCep = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const CepUser = e.target.value.replace(/\D/g, '');
    setCep(CepUser);

    if (CepUser.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${CepUser}/json/`);
        const dadosCEP = await response.json();

        if (!dadosCEP.erro) {
          setUserData((prevData) => ({
            ...prevData!,
            endereco: {
              ...prevData!.endereco,
              rua: dadosCEP.logradouro,
              bairro: dadosCEP.bairro,
              cidade: dadosCEP.localidade,
              estado: dadosCEP.uf,
              cep: CepUser,
            },
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
      }
    }
  };

  const VisibilidadeSenha = () => {
    setMostrarSenha(prev => !prev);
  };
  const VisibilidadeSenha2 = () => {
    setMostrarSenha2(prev => !prev);
  };

  const salvarEdicao = () => {
    if (senha !== confirmarSenha) { 
      alert('As senhas não coincidem!\nTente Novamente!');
      return;
    }

    if (userData) {
      sessionStorage.setItem('user', JSON.stringify({ ...userData, senha })); 
      alert('Informações salvas com sucesso!');
      setEstaEditando(false);
    }
  };


  const lidarEdicao = () => {
    setEstaEditando(true);
  };

  const cancelarEdicao = () => {
    setEstaEditando(false);
    const dataUserArmazenados = localStorage.getItem('user');
    if (dataUserArmazenados) {
      const data = JSON.parse(dataUserArmazenados);
      setUserData(data);
      setSenha(data.senha || ''); 
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    buscaCep(e);
    lidarMudancas(e);
  };

  return (
    <>
      <section className={styles.container}>
        <fieldset className={`${styles.fieldset} ${styles.info_usuario}`}>
          <legend><h1>Informações do Usuário:</h1></legend>
          <div className={styles.info}>
            {estaEditando ? (
              userData && (
                <>
                  <label>Nome: <br/>
                    <input
                      type="text"
                      name="nome"
                      value={userData.nome || ''}
                      onChange={lidarMudancas}
                      className={styles.inputField}
                      placeholder='Digite seu NOME (NÃO DEIXE VAZIO)'
                    />
                  </label><br/>

                  <label>Sobrenome: <br/>
                    <input
                      type="text"
                      name="sobrenome"
                      value={userData.sobrenome || ''}
                      onChange={lidarMudancas}
                      className={styles.inputField}
                      placeholder='Digite seu SOBRENOME (NÃO DEIXE VAZIO)'
                    />
                  </label><br/>

                  <label>Data de Nascimento: <br/>
                    <input
                      type="date"
                      name="dataNasc"
                      value={userData.dataNasc || ''}
                      onChange={lidarMudancas}
                      className={styles.inputField}
                    />
                  </label><br/>

                  <label>Gênero: <br/> 
                    <select
                      name="genero"
                      value={userData.genero || ''}
                      onChange={lidarMudancas}
                      className={styles.inputField}
                    >
                      <option value="" disabled>Selecione...</option>
                      <option value="M">Masculino</option>
                      <option value="F">Feminino</option>
                      <option value="O">Outro</option>
                      <option value="ND">Prefiro não dizer</option>
                    </select>
                  </label><br/>

                  <label>Email: <br/>
                    <input
                      type="email"
                      name="email"
                      value={userData.email || ''}
                      onChange={lidarMudancas}
                      className={styles.inputField}
                      placeholder='Digite seu EMAIL (NÃO DEIXE VAZIO)'
                    />
                  </label><br/>

                  <label>Senha: <br />
                    <div className={styles.passwordWrapper}>
                      <input 
                        type={MostrarSenha ? 'text' : 'password'}
                        name="senha" 
                        id="senha" 
                        placeholder="Digite a SENHA"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)} 
                        required  
                        className={styles.inputField}
                      />
                      <button 
                        type="button" 
                        onClick={VisibilidadeSenha}
                        className={styles.toggleButton}
                      >
                        {MostrarSenha ? '👁️' : '🙈'}
                      </button>
                    </div>
                  </label>
                  <label>Confirmar Senha: <br />
                    <div className={styles.passwordWrapper}>
                      <input 
                        type={MostrarSenha2 ? 'text' : 'password'}
                        name="confirmarSenha" 
                        id="confirmarSenha" 
                        placeholder="Confirme a SENHA"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)} 
                        required  
                        className={styles.inputField}
                      />
                      <button 
                        type="button" 
                        onClick={VisibilidadeSenha2}
                        className={styles.toggleButton}
                      >
                        {MostrarSenha2 ? '👁️' : '🙈'}
                      </button>
                    </div>
                  </label><br/>

                  <label>CPF: <br/>
                    <input
                      type="text"
                      name="cpf"
                      value={userData.cpf || ''}
                      readOnly
                      className={styles.inputField}
                    />
                  </label><br/>

                  <label>CNH: <br/> 
                    <input
                      type="text"
                      name="cnh"
                      value={userData.cnh || ''}
                      readOnly
                      className={styles.inputField}
                    />
                  </label><br/>

                  <label>RG: <br/>                                                 
                    <input
                      type="text"
                      name="rg"
                      value={userData.rg || ''}
                      readOnly
                      className={styles.inputField}
                    />
                  </label><br/>

                  <label>CEP: <br/>
                    <InputMask
                      mask="99999-999"
                      type="text"
                      name="cep"
                      value={userData.endereco.cep || ''}
                      onChange={handleCepChange}
                      className={styles.inputField}
                    />
                  </label><br/>

                  <label>Rua: <br/>
                    <input
                      type="text"
                      name="rua"
                      value={userData.endereco.rua || ''}
                      onChange={lidarMudancas}
                      className={styles.inputField}
                      readOnly
                    />
                  </label><br/>

                  <label>Número: <br/>
                    <input
                      type="number"
                      name="numeroResidencial"
                      value={userData.endereco.numeroResidencial || ''}
                      onChange={lidarMudancas}
                      className={styles.inputField}
                      placeholder='Digite seu NÚMERO RESIDENCIAL'
                    />
                  </label><br/>

                  <label>Complemento:<p className={styles.letrinhas}>Campo não Obrigatório</p> <br/>
                    <input
                      type="text"
                      name="complemento"
                      value={userData.endereco.complemento || ''}
                      onChange={lidarMudancas}
                      className={styles.inputField}
                      placeholder='Digite um COMPLEMENTO '
                    />
                  </label><br/>

                  <label>Bairro: <br/>
                    <input
                      type="text"
                      name="bairro"
                      value={userData.endereco.bairro || ''}
                      onChange={lidarMudancas}
                      className={styles.inputField}
                      readOnly
                    />
                  </label><br/>

                  <label>Cidade: <br/>
                    <input
                      type="text"
                      name="cidade"
                      value={userData.endereco.cidade || ''}
                      onChange={lidarMudancas}
                      className={styles.inputField}
                      readOnly
                    />
                  </label><br/>

                  <label>Estado: <br/>
                    <input
                      type="text"
                      name="estado"
                      value={userData.endereco.estado || ''}
                      onChange={lidarMudancas}
                      className={styles.inputField}
                      readOnly
                    />
                  </label><br/>

                  <button onClick={salvarEdicao} className={styles.botao}>
                    Salvar
                  </button>

                  <button onClick={cancelarEdicao} className={styles.cancelButton}>
                    Cancelar
                  </button>
                </>
              )
            ) : (
              userData && (
                <>
                  <p>Nome: {userData.nome}</p>
                  <p>Sobrenome: {userData.sobrenome}</p>
                  <p>Data de Nascimento: {userData.dataNasc}</p>
                  <p>Gênero: {userData.genero}</p>
                  <p>Email: {userData.email}</p>
                  <p>Senha: {"*".repeat(userData.senha.length)}</p>
                  <p>CPF: {userData.cpf}</p>
                  <p>CNH: {userData.cnh}</p>
                  <p>RG: {userData.rg}</p>

                  <p>CEP: {userData.endereco.cep}</p>
                  <p>Rua: {userData.endereco.rua}</p>
                  <p>Número: {userData.endereco.numeroResidencial}</p>
                  <p>Complemento: {userData.endereco.complemento}</p>
                  <p>Bairro: {userData.endereco.bairro}</p>
                  <p>Cidade: {userData.endereco.cidade}</p>
                  <p>Estado: {userData.endereco.estado}</p>

                  <button onClick={lidarEdicao} className={`${styles.botao} ${styles.editButton}`}>
                    Editar
                  </button>
                </>
              )
            )}
          </div>
        </fieldset>

        <section className={styles.selecao_carro}>
          <fieldset className={styles.fieldset}>
            <legend> <h1>Selecione um carro da lista abaixo:</h1> </legend>
            <div className={styles.lista}>
              {carros.length > 0 ? (
                carros.map((carro, index) => (
                  <article key={index} className={styles.item}>
                    <img
                      src="/img/carro/CarroGenerico.png"
                      alt="Imagem genérica de Carro"
                      className={styles.img}
                      onClick={ClickImagem(carro)}
                    />
                    <div className={styles.info}>
                      <p>Marca: {carro.marca}</p>
                      <p>Modelo: {carro.modelo}</p>
                      <p>Ano: {carro.ano}</p>
                      <p>Placa: {carro.placa}</p>
                    </div>
                  </article>
                ))
              ) : (
                <p>Nenhum carro cadastrado</p>
              )}
            </div>
          </fieldset>
        </section>
      </section>

      <button onClick={logout} className={styles.logoutButton}>
        Logout
      </button>
    </>
  );
};

export default Dashboard;