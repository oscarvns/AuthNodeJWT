// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      {/* <div className="navbar-brand">
        <Link to="/">Auth Demo</Link>
      </div> */}
      <div className="navbar-menu">
        {user ? (
          <>
            <Link to="/profile">Perfil</Link>
            <button onClick={logout} className="btn-logout">
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/register">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;