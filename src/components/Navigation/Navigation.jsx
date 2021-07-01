import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Navigation.module.scss';
import img from '../../content/img/Logo.png'

export function Navigation (props) {

    let loginData = props.loginData

    const [isActive, setActive] = useState(false);

    const handleToggle = () => {
        setActive(!isActive);
    }

    return (
        <header>
            <nav className={style.nav}>

                        <a class="navbar-brand" href="/">
      <div class="logo-image">
            <img src={img} alt ="a" class="img-fluid" />
      </div>
      </a>
      <p>4-7 juli 2022</p>

                <ul className={style.desktop}>
                    <li><Link className={style.navigationLinks} to="/">Forside</Link></li>
                    <li><Link className={style.navigationLinks} to="/koeb-billet">Køb Billet</Link></li>
                    <li><Link className={style.navigationLinks} to="/events">Events</Link></li>
                    <li><Link className={style.navigationLinks} to="/camps">Camps</Link></li>
                    <li><Link className={style.navigationLinks} to="/praktisk-info">Praktisk Info</Link></li>
                    <li><Link className={style.navigationLinks} to="/login">{loginData.username ? 'Min side' : 'Login'}</Link></li>
                </ul>

                <div className={isActive ? style.burgerMenuActive : style.burgerMenu} onClick={handleToggle}>
                    <div className={style.burgerMenuLine}></div>
                    <div className={style.burgerMenuLine}></div>
                    <div className={style.burgerMenuLine}></div>
                </div>

                <ul className={isActive ? style.activeMenu : style.menu}>
                    <li><Link className={style.navigationLinks} to="/" onClick={handleToggle}>Forside</Link></li>
                    <li><Link className={style.navigationLinks} to="koeb-billet" onClick={handleToggle}>Køb Billet</Link></li>
                    <li><Link className={style.navigationLinks} to="/events" onClick={handleToggle}>Events</Link></li>
                    <li><Link className={style.navigationLinks} to="/camps" onClick={handleToggle}>Camps</Link></li>
                    <li><Link className={style.navigationLinks} to="/praktisk-info" onClick={handleToggle}>Praktisk Info</Link></li>
                    <li><Link className={style.navigationLinks} to="/login" onClick={handleToggle}>Login</Link></li>
                </ul>
            </nav>
        </header>
    )
}