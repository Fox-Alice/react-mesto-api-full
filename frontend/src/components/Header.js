import logo from '../images/header__logo.svg';
import { Link, Route, Switch } from 'react-router-dom';

function Header({ loggedIn, onLogout, email }) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Логотип проекта Место"
      />
      <Switch>
        <Route path="/signin">
          <Link to="/signup" className="header__signup-link">Регистрация</Link>
        </Route>
        <Route path="/signup">
          <Link to="/signin" className="header__signup-link">Войти</Link>
        </Route>
        <Route path="/">
          {loggedIn &&
            <>
              <p className='header__user'>{email}</p>
              <Link
                to="/signin"
                className="header__signup-link"
                onClick={onLogout}>
                Выйти
              </Link>
            </>
          }
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
