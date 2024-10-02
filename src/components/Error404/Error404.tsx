import { useEffect } from "react";
import styles from "./Error404.module.css";

const Error404 = () => {
  useEffect(() => {
    document.title = "Erro 404 - Página Não Encontrada";
  }, []);

  return (
    <div className={styles.j}>
      <h1 className={styles.error}>Erro 404</h1>
      <h2 className={styles.mensagem}>
        Ops! Infelizmente a página que você tentou acessar não existe.
      </h2>
    </div>
  );
};

export default Error404;
