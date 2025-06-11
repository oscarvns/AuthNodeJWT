// // src/pages/Login.jsx
// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [formError, setFormError] = useState('');
//   const { login, error, clearError } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormError('');
//     clearError();
    
//     try {
//       await login(formData);
//       navigate('/profile');
//     } catch (err) {
//       setFormError(err.response?.data?.message || 'Error al iniciar sesión');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Iniciar Sesión</h2>
//       {(formError || error) && (
//         <div className="error-message">{formError || error}</div>
//       )}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Contraseña</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit" className="btn-submit">
//           Iniciar Sesión
//         </button>
//       </form>
//       <p className="auth-link">
//         ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
//       </p>
//     </div>
//   );
// };

// export default Login;



import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formError, setFormError] = useState('');
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    clearError();
    
    try {
      await login(formData);
      navigate('/profile');
    } catch (err) {
      setFormError(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Panel lateral izquierdo - solo visible en pantallas medianas y grandes */}
      <div className="hidden md:flex md:w-1/2 bg-indigo-600 items-center justify-center">
        <div className="max-w-md px-8">
          <h1 className="text-4xl font-bold text-white mb-6">Bienvenido a nuestra plataforma</h1>
          <p className="text-indigo-100 text-lg mb-6">
            Accede a tu cuenta para gestionar tu perfil y disfrutar de todas las funcionalidades.
          </p>
          <div className="flex space-x-3">
            <div className="h-2 w-2 rounded-full bg-white opacity-90"></div>
            <div className="h-2 w-2 rounded-full bg-white opacity-60"></div>
            <div className="h-2 w-2 rounded-full bg-white opacity-30"></div>
          </div>
        </div>
      </div>

      {/* Formulario de login */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          {/* Logo o nombre de la app */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Auth JWT</h2>
            <p className="mt-2 text-sm text-gray-600">Inicia sesión en tu cuenta</p>
          </div>

          {/* Mensaje de error */}
          {(formError || error) && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-600 flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{formError || error}</span>
            </div>
          )}

          {/* Formulario */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                           placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="ejemplo@correo.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                           placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm 
                         text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
              >
                Iniciar sesión
              </button>
            </div>
          </form>

          {/* Enlaces adicionales */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                Regístrate ahora
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;