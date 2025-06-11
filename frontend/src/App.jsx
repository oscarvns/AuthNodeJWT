import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import './App.css';

// Componente de ruta protegida
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
  
  if (!user) return <Navigate to="/login" />;
  
  return children;
};

function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          {/* <Navbar /> */}
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="min-h-screen bg-gray-50">
//           <Navbar />
//           <main>
//             <Routes>
//               <Route path="/" element={<Navigate to="/login" />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />
//               <Route 
//                 path="/profile" 
//                 element={
//                   <ProtectedRoute>
//                     <Profile />
//                   </ProtectedRoute>
//                 } 
//               />
//             </Routes>
//           </main>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

export default App;