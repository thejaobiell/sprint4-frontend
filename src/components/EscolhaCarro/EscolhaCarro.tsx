import { useNavigate } from 'react-router-dom';
import styles from './EscolhaCarro.module.css';
import { useEffect } from 'react';

const EscolhaCarro = () => {

  useEffect(() => {
    document.title = "Escolha o Carro Defeituoso - Diagnoscar";
  }, []);
  
  const navigate = useNavigate();

  const clickimagens = () => {
    navigate('/relatoriodiagnoscar');
  };

  return (
    <section className={styles['selecao-carro']}>
      <h2 className={styles['selecao-carro__titulo']}>Escolha seu Carro com Problema:</h2>

      <div className={styles['selecao-carro__lista']}>
        <article className={styles['selecao-carro__item']}>
          <img
            src="img/carro/corolla-1.png"
            alt="Imagem do Corolla"
            className={styles['selecao-carro__imagem']}
            onClick={clickimagens}
          />
          <div className={styles['selecao-carro__info']}>
            <p>Marca: Toyota</p>
            <p>Modelo: Corolla</p>
            <p>Ano: 2021</p>
            <p>Placa: ABC1234</p>
          </div>
        </article>

        <article className={styles['selecao-carro__item']}>
          <img
            src="img/carro/corsa-1.png"
            alt="Imagem do Corsa"
            className={styles['selecao-carro__imagem']}
            onClick={clickimagens}
          />
          <div className={styles['selecao-carro__info']}>
            <p>Marca: Chevrolet</p>
            <p>Modelo: Corsa</p>
            <p>Ano: 2019</p>
            <p>Placa: XYZ5678</p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default EscolhaCarro;
