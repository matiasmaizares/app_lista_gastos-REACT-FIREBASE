import React from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo } from './../elementos/Header';
import BtnRegresar from './../elementos/BtnRegresar';

const GastosPorCategoria = () => {
  return (
    <>
      <Helmet>
        <title>Gastos por Categoria</title>
      </Helmet>

      <Header>
        <BtnRegresar ruta='/' />
        <Titulo>Gastos por Categoria</Titulo>
      </Header>
    </>
  );
};

export default GastosPorCategoria;
