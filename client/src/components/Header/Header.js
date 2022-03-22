import { NavLink } from "react-router-dom";
import styles from'./Header.module.css';

export default function Header() {
  return (
    <header>
      <h1>Complainer App</h1>
      <nav>
        <NavLink to="/" exact activeClassName={styles.activeNavbarLink}>Home</NavLink>
        <NavLink to="/form" activeClassName={styles.activeNavbarLink}>Create Complaint</NavLink>
        <NavLink to="/posts" activeClassName={styles.activeNavbarLink}>All complaints</NavLink>
      </nav>
    </header>
  );
}
