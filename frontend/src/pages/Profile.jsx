
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <div className="w-10 h-10 border-t-4 border-indigo-500 border-solid rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Cargando información del perfil...</p>
        </div>
      </div>
    );
  }

  // Formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return 'No disponible';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
            {/* Cabecera del perfil */}
            <div className="bg-white rounded-t-xl shadow-sm overflow-hidden">
                {/* Banner superior */}
                <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
          
                {/* Información principal */}
                <div className="relative px-4 sm:px-6 pb-8">
                    {/* Avatar */}
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                        <div className="w-32 h-32 bg-indigo-800 rounded-full border-4 border-white flex items-center justify-center text-white text-4xl font-bold">
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                    </div>
                </div>
                {/* Detalles del usuario */}
                <div className="mt-12 mb-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">{user.name || 'Usuario'}</h1>
                    <p className="text-gray-500 mt-1">{user.email}</p>
                    <p className="text-sm text-gray-400 mt-1">Miembro desde {formatDate(user.createdAt)}</p>
                </div>          
            </div>
        
        {/* Contenido principal */}
        <div className="bg-white rounded-b-xl shadow-sm overflow-hidden mb-6">
          {/* Sección de información del perfil */}
          <div className="border-b border-gray-200">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Información del perfil</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Detalles personales y datos de la cuenta.</p>
            </div>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">ID de usuario</dt>
                <dd className="mt-1 text-sm text-gray-900">{user.id}</dd>
              </div>
              
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Nombre completo</dt>
                <dd className="mt-1 text-sm text-gray-900">{user.name || 'No especificado'}</dd>
              </div>
              
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Correo electrónico</dt>
                <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
              </div>
              
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Cuenta creada</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatDate(user.createdAt)}</dd>
              </div>
              
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Última actualización</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatDate(user.updatedAt)}</dd>
              </div>
            </dl>
          </div>
          
          {/* Botones de acción */}
          <div className="px-4 py-5 sm:p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4">
            <button 
              className="inline-flex justify-center py-2 px-4 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Editar perfil
            </button>
            <button 
              onClick={logout}
              className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
        
        {/* Sección de actividad (opcional) */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Actividad reciente</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Historial de actividades en la plataforma.</p>
          </div>
          
          <div className="px-4 py-6 sm:px-6">
            <div className="flex items-center justify-center py-8 text-gray-500">
              <p>No hay actividad reciente para mostrar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;



