// // src/pages/Register.jsx
// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [formError, setFormError] = useState('');
//   const { register, error, clearError } = useAuth();
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
    
//     // Validar que las contraseñas coincidan
//     if (formData.password !== formData.confirmPassword) {
//       setFormError('Las contraseñas no coinciden');
//       return;
//     }
    
//     try {
//       // Eliminar confirmPassword antes de enviar al servidor
//       const { confirmPassword, ...userData } = formData;
//       await register(userData);
//       navigate('/profile');
//     } catch (err) {
//       setFormError(err.response?.data?.message || 'Error al registrarse');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Registrarse</h2>
//       {(formError || error) && (
//         <div className="error-message">{formError || error}</div>
//       )}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Nombre</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
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
//         <div className="form-group">
//           <label>Confirmar Contraseña</label>
//           <input
//             type="password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit" className="btn-submit">
//           Registrarse
//         </button>
//       </form>
//       <p className="auth-link">
//         ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
//       </p>
//     </div>
//   );
// };

// export default Register;



import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formError, setFormError] = useState('');
  const { register, error, clearError } = useAuth();
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
    
    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setFormError('Las contraseñas no coinciden');
      return;
    }
    
    try {
      // Eliminar confirmPassword antes de enviar al servidor
      const { confirmPassword, ...userData } = formData;
      await register(userData);
      navigate('/profile');
    } catch (err) {
      setFormError(err.response?.data?.message || 'Error al registrarse');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Panel lateral izquierdo - solo visible en pantallas medianas y grandes */}
      <div className="hidden md:flex md:w-1/2 bg-indigo-600 items-center justify-center">
        <div className="max-w-md px-8">
          <h1 className="text-4xl font-bold text-white mb-6">Únete a nuestra plataforma</h1>
          <p className="text-indigo-100 text-lg mb-6">
            Crea una cuenta para acceder a todas las funcionalidades y comenzar tu experiencia.
          </p>
          <div className="flex space-x-3">
            <div className="h-2 w-2 rounded-full bg-white opacity-90"></div>
            <div className="h-2 w-2 rounded-full bg-white opacity-60"></div>
            <div className="h-2 w-2 rounded-full bg-white opacity-30"></div>
          </div>
        </div>
      </div>

      {/* Formulario de registro */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          {/* Logo o nombre de la app */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Crear cuenta</h2>
            <p className="mt-2 text-sm text-gray-600">Completa tus datos para registrarte</p>
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
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre completo
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                           placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Ej: Juan Pérez"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                           placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="ejemplo@correo.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                           placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Contraseña segura"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">La contraseña debe tener al menos 8 caracteres</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmar contraseña
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                           placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Repite tu contraseña"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm 
                         text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
              >
                Crear cuenta
              </button>
            </div>
          </form>

          {/* Enlaces adicionales */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                Inicia sesión
              </Link>
            </p>
          </div>
          
          {/* Términos y condiciones */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Al registrarte, aceptas nuestros{' '}
              <a href="#" className="text-indigo-600 hover:text-indigo-500">
                Términos de servicio
              </a>{' '}
              y{' '}
              <a href="#" className="text-indigo-600 hover:text-indigo-500">
                Política de privacidad
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

