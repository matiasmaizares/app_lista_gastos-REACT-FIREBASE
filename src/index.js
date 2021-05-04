import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';
import Contenedor from './elementos/Contenedor';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EditarGasto from './componentes/EditarGasto';
import GastosPorCategoria from './componentes/GastosPorCategoria';
import InicioSesion from './componentes/InicioSesion';
import ListaDeGastos from './componentes/ListaDeGastos';
import RegistroUsuario from './componentes/RegistroUsuario';
import { Helmet } from 'react-helmet';
import favicon from './imagenes/logo.png';
import Fondo from './elementos/Fondo';
import { AuthProvider } from './context/AuthConext';
import RutaPrivada from './componentes/RutaPrivada';

WebFont.load({
  google: {
    families: ['Work Sans:400,500,700', 'sans-serif'],
  },
});

const Index = () => {
  return (
    <>
      <Helmet>
        <link rel='shortcut icon' href={favicon} type='image/x-icon' />
      </Helmet>

      <AuthProvider>
        <BrowserRouter>
          <Contenedor>
            <Switch>
              {/* Rutas publicas */}
              <Route path='/iniciar-sesion' component={InicioSesion} />
              <Route path='/crear-cuenta' component={RegistroUsuario} />

              {/* Rutas privadas*/}
              <RutaPrivada path='/categorias'>
                <GastosPorCategoria />
              </RutaPrivada>
              <RutaPrivada path='/lista'>
                <ListaDeGastos />
              </RutaPrivada>
              <RutaPrivada path='/editar/:id'>
                <EditarGasto />
              </RutaPrivada>
              <RutaPrivada path='/'>
                <App />
              </RutaPrivada>
            </Switch>
          </Contenedor>
        </BrowserRouter>
      </AuthProvider>

      <Fondo />
    </>
  );
};

ReactDOM.render(<Index />, document.getElementById('root'));
