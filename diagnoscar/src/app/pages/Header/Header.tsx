
import styles from './Header.module.css';
import Link from 'next/link';

const Header = () => {
    return (
        <main className = {styles.main} >
            <header className={styles.header}>
                <Link href="/menu">
                    <img id="logo" src="/img/portoLogo/Porto Seguro1.png" alt="Logo Porto" />
                </Link>
                <h1 id="Diagnoscar">
                    <span className={styles.black}>Diagnos</span> <span className={styles.blue}>Car</span>
                </h1>
                <nav>
                    <ul className={styles.navUl}>
                        <li className={styles.navLi}><Link className={styles.navLink} href="/Menu">Menu</Link></li>
                        <li className={styles.navLi}><Link className={styles.navLink} href="/Membros">Membros</Link></li>
                        <li className={styles.navLi}><Link className={styles.navLink} href="/Login">Login</Link></li>
                    </ul>
                </nav>
            </header>
        </main>
    );
};

export default Header;
