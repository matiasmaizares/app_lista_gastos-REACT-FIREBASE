import React from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo } from './../elementos/Header';
import BtnRegresar from './../elementos/BtnRegresar';
// import { useAuth } from './../context/AuthConext';

const ListaDeGastos = () => {
  // const { usuario } = useAuth();

  return (
    <>
      <Helmet>
        <title>Lista de Gastos</title>
      </Helmet>

      <Header>
        <BtnRegresar ruta='/' />
        <Titulo>Lista de Gastos</Titulo>
      </Header>
    </>
  );
};

export default ListaDeGastos;
