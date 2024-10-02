import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const bmenu = () => {
        navigate('/menu');
    };

    return (
        <header>
            <img id="logo" src="img/portoLogo/Porto Seguro1.png" alt="Logo porto" onClick={bmenu} />
            <h1 id="Diagnoscar">
                <span className={styles.black}>Diagnos</span> <span className={styles.blue}>Car</span>
            </h1>
            <nav>
                <ul className={styles.navUl}>
                    <li className={styles.navLi}><Link className={styles.navLink} to="/Menu">Menu</Link></li>
                    <li className={styles.navLi}><Link className={styles.navLink} to="/membros">Membros</Link></li>
                    <li className={styles.navLi}><Link className={styles.navLink} to="/login">Login</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
