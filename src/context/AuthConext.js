import React, { useState, useContext, useEffect } from 'react';
import { auth } from './../firebase/firebaseConfig';

// Creamos el conexto
const AuthContext = React.createContext();

// Hook para acceder al contexto
const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [usuario, cambiarUsuario] = useState();

  const [cargando, cambiarCargando] = useState(true);

  // Efecto para ejecutar la comprobacion una sola vez
  useEffect(() => {
    // Comprobamos si hay un usuario
    const cancelarSuscripcion = auth.onAuthStateChanged((usuario) => {
      cambiarUsuario(usuario);
      cambiarCargando(false);
    });

    return cancelarSuscripcion;
  }, []);

  return (
    <AuthContext.Provider value={{ usuario: usuario }}>
      {!cargando && children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext, useAuth };
