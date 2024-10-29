import React, { useState } from 'react';
import styles from "./Cadastro.module.css";

interface CarroFormProps {
    index: number;
    carro: { placa: string; marca: string; modelo: string; ano: string; cor: string };
    handleInputChange: (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    removerCarro: (index: number) => void;
    carros: { placa: string; marca: string; modelo: string; ano: string; cor: string }[];
}

const CarroForm: React.FC<CarroFormProps> = ({ index, carro, handleInputChange, removerCarro, carros }) => {
    const [customColor, setCustomColor] = useState('');

    const handleUppercaseInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.toUpperCase();
        handleInputChange(index, e);
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        handleInputChange(index, e); // Atualiza a cor selecionada
        if (value === "Outro") {
            setCustomColor(carro.cor); // Resgata a cor personalizada se já estiver setada
        } else {
            setCustomColor(''); // Limpa a cor personalizada se uma cor padrão for selecionada
        }
    };

    const handleCustomColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setCustomColor(value);
        handleInputChange(index, { ...e, target: { ...e.target, value } }); // Atualiza a cor personalizada
    };

    return (
        <fieldset className={styles.formGroup}>
            <legend className={styles.legenda}>Informações do Carro {index + 1}</legend>

            <label className={styles.label}>
                Placa: <br />
                <input
                    type="text"
                    name="placa"
                    value={carro.placa}
                    onChange={handleUppercaseInput}
                    placeholder="Digite a placa"
                    maxLength={7}
                    required
                    className={styles.inputField}
                />
            </label> <br/>

            <label className={styles.label}>
                Marca: <br />
                <select
                    name="marca"
                    value={carro.marca}
                    onChange={(e) => handleInputChange(index, e)}
                    required
                    className={styles.inputField}
                >
                    <option value="" disabled>Selecione a marca</option>
                    <option value="Audi">Audi</option>
                    <option value="BMW">BMW</option>
                    <option value="CAOA Cherry">CAOA Cherry</option>
                    <option value="Chevrolet">Chevrolet</option>
                    <option value="Citroën">Citroën</option>
                    <option value="Ferrari">Ferrari</option>
                    <option value="Fiat">Fiat</option>
                    <option value="Ford">Ford</option>
                    <option value="Honda">Honda</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Jaguar">Jaguar</option>
                    <option value="JAC">JAC</option>
                    <option value="Jeep">Jeep</option>
                    <option value="Kia">Kia</option>
                    <option value="Lamborghini">Lamborghini</option>
                    <option value="Maserati">Maserati</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="Mitsubishi">Mitsubishi</option>
                    <option value="Nissan">Nissan</option>
                    <option value="Peugeot">Peugeot</option>
                    <option value="Porsche">Porsche</option>
                    <option value="RAM">RAM</option>
                    <option value="Renault">Renault</option>
                    <option value="Subaru">Subaru</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Volkswagen">Volkswagen</option>
                    <option value="Volvo">Volvo</option>
                </select>
            </label> <br/>

            <label className={styles.label}>
                Modelo: <br />
                <input
                    type="text"
                    name="modelo"
                    value={carro.modelo}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Digite o modelo"
                    required
                    className={styles.inputField}
                />
            </label> <br/>

            <label className={styles.label}>
                Ano: <br />
                <input
                    type="number"
                    name="ano"
                    value={carro.ano}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Digite o ano"
                    required
                    className={styles.inputField}
                    min="1950"
                    max="2025"
                />
            </label> <br/>

            <label className={styles.label}>
                Cor: <br />
                <select
                    name="cor"
                    value={carro.cor}
                    onChange={handleColorChange}
                    required
                    className={styles.inputField}
                >
                    <option value="" disabled>Selecione a cor</option>
                    <option value="Preto">Preto</option>
                    <option value="Branco">Branco</option>
                    <option value="Vermelho">Vermelho</option>
                    <option value="Azul">Azul</option>
                    <option value="Verde">Verde</option>
                    <option value="Cinza">Cinza</option>
                    <option value="Amarelo">Amarelo</option>
                    <option value="Prata">Prata</option>
                    <option value="Laranja">Laranja</option>
                    <option value="Roxo">Roxo</option>
                    <option value="Outro">Outro</option>
                </select>
            </label> <br/>

            {carro.cor === "Outro" && (
                <label className={styles.label}>
                    Especifique a cor: <br />
                    <input
                        type="text"
                        name="customCor"
                        value={customColor}
                        onChange={handleCustomColorInputChange}
                        placeholder="Digite a cor ou código (#RRGGBB)"
                        className={styles.inputField}
                    />
                </label>
            )}

            {carros.length > 1 && (
                <button
                    type="button"
                    onClick={() => removerCarro(index)}
                    className={styles.botaoRemover}
                >
                    Remover Carro
                </button>
            )}
        </fieldset>
    );
};

export default CarroForm;
