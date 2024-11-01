'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Oficinas.module.css';

const Oficinas = () => {
    const router = useRouter();

    useEffect(() => {
        const logado = sessionStorage.getItem('logado');
        if (logado !== 'sim') {
            router.push('/Login');
        }
    }, [router]);

    useEffect(() => {
        document.title = "Oficinas Recomendadas - DiagnosCAR";
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = '/img/Logos/Diagnoscar.ico';
        document.head.appendChild(link);
    }, []);

    const oficinas = [
        {
            Endereco_Oficina: "Rua do Oratório, 630, Mooca, 03116-000 - São Paulo - SP",
            Cnpj_Oficina: "37.139.429/0001-74",
            Nome_Oficina: "BASTOS CAR FUNILARIA E PINTURA",
            Avaliacao_Oficina: 8.5,
            Especializacao_Oficina: "Funilaria e pintura",
        },
        {
            Endereco_Oficina: "Rua CLIMACO BARBOSA, 191, CAMBUCI, 01523-000 - SAO PAULO - SP",
            Cnpj_Oficina: "10.437.521/0001-64",
            Nome_Oficina: "CLUBCAR VEICULOS CAMBUCI",
            Avaliacao_Oficina: 8.7,
            Especializacao_Oficina: "Elétrica",
        },
    ];

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Oficinas por Perto</h1>
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr className={styles.tr}>
                        <th className={styles.th}>Endereço</th>
                        <th className={styles.th}>CNPJ</th>
                        <th className={styles.th}>Nome</th>
                        <th className={styles.th}>Especialização</th>
                        <th className={styles.th}>Avaliação</th>
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {oficinas.map((oficina, index) => (
                        <tr key={index} className={styles.tr}>
                            <td className={styles.td}>{oficina.Endereco_Oficina}</td>
                            <td className={styles.td}>{oficina.Cnpj_Oficina}</td>
                            <td className={styles.td}>{oficina.Nome_Oficina}</td>
                            <td className={styles.td}>{oficina.Especializacao_Oficina}</td>
                            <td className={styles.td}>{oficina.Avaliacao_Oficina}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Oficinas;
