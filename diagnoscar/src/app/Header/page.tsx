import styles from './Header.module.css';
import Link from 'next/link';

const Header = () => {
    return (
        <main className = {styles.main} >

            <header className={styles.header}>
                <Link href="/">
                    <img id="logo" src="/img/Logos/TESTE.png" alt="Logo DiagnoCAR" />
                </Link>

                <h1>
                    <span className={styles.lefti}>Diagnos</span><span className={styles.righti}>CAR</span>
                </h1>

                <nav>
                    <ul className={styles.navUl}>
                        <li className={styles.navLi}><Link className={styles.navLink} href="/">Home</Link></li>
                        <li className={styles.navLi}><Link className={styles.navLink} href="/Login">Login</Link></li>
                        <li className={styles.navLi}><Link className={styles.navLink} href="/Membros">Membros</Link></li>
                    </ul>
                </nav>

            </header>
            
        </main>
    );
};

export default Header;
