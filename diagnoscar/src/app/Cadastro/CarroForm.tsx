import React from 'react';
import styles from "./Cadastro.module.css";

interface CarroFormProps {
    index: number;
    carro: { placa: string; marca: string; modelo: string; ano: string };
    handleInputChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
    removerCarro: (index: number) => void;
    carros: { placa: string; marca: string; modelo: string; ano: string }[]; 
}

const CarroForm: React.FC<CarroFormProps> = ({ index, carro, handleInputChange, removerCarro, carros }) => {
    return (
        <>
            <legend>Informações do Carro {index + 1}</legend>

            <label className={styles.label}>Placa: <br /> 
                <input 
                    type="text" 
                    name="placa" 
                    value={carro.placa}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Digite a placa" 
                    required  
                    className={styles.inputField}
                /> 
            </label>

            <label className={styles.label}>Marca: <br /> 
                <input 
                    type="text" 
                    name="marca" 
                    value={carro.marca}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Digite a marca" 
                    required  
                    className={styles.inputField}
                /> 
            </label>

            <label className={styles.label}>Modelo: <br /> 
                <input 
                    type="text" 
                    name="modelo" 
                    value={carro.modelo}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Digite o modelo" 
                    required  
                    className={styles.inputField}
                /> 
            </label>

            <label className={styles.label}>Ano: <br /> 
                <input 
                    type="number" 
                    name="ano" 
                    value={carro.ano}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Digite o ano" 
                    required  
                    className={styles.inputField}
                    min="1900" 
                    max={new Date().getFullYear()}
                /> 
            </label>

            {carros.length > 1 && (
                <button 
                    type="button" 
                    onClick={() => removerCarro(index)}
                    className={styles.botaoRemover}
                >
                    Remover Carro
                </button>
            )}
        </>
    );
};

export default CarroForm;
