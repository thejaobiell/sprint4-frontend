'use client';
import { useRouter } from 'next/navigation';
import styles from './Dashboard.module.css';
import { useEffect, useState } from 'react';

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
  sexo: string;
  email: string;
  cpf: string;
  cnh: string;
  rg: string;
  senha: string; // Adicionado
  endereco: Endereco; 
  carros: Carro[];
}

const Dashboard = () => {
  const [carros, setCarros] = useState<Carro[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [estaEditando, setEstaEditando] = useState(false);
  const [cep, setCep] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.title = "Escolha o Carro Defeituoso - DiagnosCAR";
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = '/img/Logos/Diagnoscar.ico';
    document.head.appendChild(link);

    const dataUserArmazenados = localStorage.getItem('user');
    if (dataUserArmazenados) {
      const dataAnalisado: UserData = JSON.parse(dataUserArmazenados);
      setCarros(dataAnalisado.carros);
      setUserData(dataAnalisado);
      setSenha(dataAnalisado.senha || ''); // Adicionado
    }
  }, []);

  const ClickImagem = () => {
    router.push('/relatoriodiagnoscar');
  };

  const logout = () => {
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
    const cepUSER = e.target.value.replace(/\D/g, '');
    setCep(cepUSER);

    if (cepUSER.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepUSER}/json/`);
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
              cep: cepUSER,
            },
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const salvarEdicao = () => {
    if (userData) {
      localStorage.setItem('user', JSON.stringify({ ...userData, senha })); // Adicionado
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
      setSenha(data.senha || ''); // Adicionado
    }
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
                    />
                  </label><br/>

                  <label>Sobrenome: <br/>
                    <input
                      type="text"
                      name="sobrenome"
                      value={userData.sobrenome || ''}
                      onChange={lidarMudancas}
                      className={styles.inputField}
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

                  <label>Sexo: <br/> 
                    <select
                      name="sexo"
                      value={userData.sexo || ''}
                      onChange={lidarMudancas}
                      className={styles.inputField}
                    >
                      <option value="" disabled>Selecione...</option>
                      <option value="M">Masculino</option>
                      <option value="F">Feminino</option>
                      <option value="O">Outro</option>
                    </select>
                  </label><br/>

                  <label>Email: <br/>
                    <input
                      type="email"
                      name="email"
                      value={userData.email || ''}
                      onChange={lidarMudancas}
                      className={styles.inputField}
                    />
                  </label><br/>

                  <label>CPF: <br/>
                    <input
                      type="text"
                      name="cpf"
                      value={userData.cpf || ''}
                      onChange={lidarMudancas}
                      className={styles.inputField}
                    />
                  </label><br/>

                  <label>CNH: <br/> 
                    <input
                      type="text"
                      name="cnh"
                      value={userData.cnh || ''}
                      onChange={lidarMudancas}
                      className={styles.inputField}
                    />
                  </label><br/>

                  <label>RG: <br/>                                                 
                    <input
                      type="text"
                      name="rg"
                      value={userData.rg || ''}
                      onChange={lidarMudancas}
                      className={styles.inputField}
                    />
                  </label><br/>

                  <label>Senha: <br /> 
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
                  </label><br/>

                  {/* Campos do Endereço */}
                  <label>CEP: <br/>
                    <input
                      type="text"
                      name="cep"
                      value={userData.endereco.cep || ''}
                      onChange={buscaCep} // Usar buscaCep
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
                    />
                  </label><br/>

                  <label>Número: <br/>
                    <input
                      type="text"
                      name="numeroResidencial"
                      value={userData.endereco.numeroResidencial || ''}
                      onChange={lidarMudancas}
                      className={styles.inputField}
                    />
                  </label><br/>

                  <label>Complemento: <br/>
                    <input
                      type="text"
                      name="complemento"
                      value={userData.endereco.complemento || ''}
                      onChange={lidarMudancas}
                      className={styles.inputField}
                    />
                  </label><br/>

                  <label>Bairro: <br/>
                    <input
                      type="text"
                      name="bairro"
                      value={userData.endereco.bairro || ''}
                      onChange={lidarMudancas}
                      className={styles.inputField}
                    />
                  </label><br/>

                  <label>Cidade: <br/>
                    <input
                      type="text"
                      name="cidade"
                      value={userData.endereco.cidade || ''}
                      onChange={lidarMudancas}
                      className={styles.inputField}
                    />
                  </label><br/>

                  <label>Estado: <br/>
                    <input
                      type="text"
                      name="estado"
                      value={userData.endereco.estado || ''}
                      onChange={lidarMudancas}
                      className={styles.inputField}
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
                  <p>Sexo: {userData.sexo}</p>
                  <p>Email: {userData.email}</p>
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
                      onClick={ClickImagem}
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
