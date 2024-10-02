import { useEffect, useState } from 'react';
import styles from './Oficinas.module.css';
import { useNavigate } from 'react-router-dom';

const Oficinas = () => {
  const navigate = useNavigate();

  const confirmed = () => {
    navigate('/Obrigado');
  };

  const voltarrelatorio = () => {
    navigate('/relatoriodiagnoscar');
  };

  useEffect(() => {
    document.title = "Oficinas Perto";
  }, []);

  const [oficinaSelecionada, setOficinaSelecionada] = useState<string | null>(null);

  const handleConfirm = () => {
    if (oficinaSelecionada) {
      alert(`Você escolheu a oficina: ${oficinaSelecionada}`);
      confirmed();
    } else {
      alert('Por favor, selecione uma oficina.');
    }
  };

  const handleCancel = () => {
    setOficinaSelecionada(null);
    alert('Seleção cancelada.');
    voltarrelatorio();
  };

  return (
    <div className={styles.containera}>
      <h1>Escolha uma Oficina</h1>
      <div className={styles.workshops}>
        <label>
          <input
            type="radio"
            name="workshop"
            value="Oficina 1"
            checked={oficinaSelecionada === 'Oficina 1'}
            onChange={(e) => setOficinaSelecionada(e.target.value)}
          />
          Oficina de Criatividade
        </label>
        <label>
          <input
            type="radio"
            name="workshop"
            value="Oficina 2"
            checked={oficinaSelecionada === 'Oficina 2'}
            onChange={(e) => setOficinaSelecionada(e.target.value)}
          />
          Oficina de Programação
        </label>
        <label>
          <input
            type="radio"
            name="workshop"
            value="Oficina 3"
            checked={oficinaSelecionada === 'Oficina 3'}
            onChange={(e) => setOficinaSelecionada(e.target.value)}
          />
          Oficina de Design
        </label>
      </div>
      <div className={styles.botaos1}>
        <button className={styles.botao} onClick={handleConfirm}>Confirmar</button>
        <button className={styles.botao} onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default Oficinas;
