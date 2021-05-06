import React, { useState, useEffect } from 'react';
import Boton from '../elementos/Botton';
import {
  ContenedorFiltros,
  Formulario,
  Input,
  InputGrande,
  ContenedorBoton,
} from './../elementos/ElementosDeFormulario';
import { ReactComponent as IconoPlus } from './../imagenes/plus.svg';
import DatePicker from './DatePicker';
import SelectorCategorias from './SelectCategorias';
import fromUnixTime from 'date-fns/fromUnixTime';
import getUnixTime from 'date-fns/getUnixTime';
import agregarGasto from './../firebase/agregarGasto';
import { useAuth } from './../context/AuthConext';
import Alerta from './../elementos/Alerta';
import { useHistory } from 'react-router-dom';
import editarGasto from '../firebase/editarGasto';

const FormularioGasto = ({ gasto }) => {
  const [inputDescripcion, cambiarInputDescripcion] = useState('');
  const [inputCantidad, cambiarInputCantidad] = useState('');
  const [categoria, cambiarCategoria] = useState('hogar');
  const [fecha, cambiarFecha] = useState(new Date());
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});

  const history = useHistory();
  const { usuario } = useAuth();

  useEffect(() => {
    if (gasto) {
      if (gasto.data().uidUsuario === usuario.uid) {
        cambiarCategoria(gasto.data().categoria);
        cambiarFecha(fromUnixTime(gasto.data().fecha));
        cambiarInputDescripcion(gasto.data().descripcion);
        cambiarInputCantidad(gasto.data().cantidad);
      } else {
        history.push('/lista');
      }
    }
  }, [gasto, usuario, history]);

  const handleChange = (e) => {
    if (e.target.name === 'descripcion') {
      cambiarInputDescripcion(e.target.value);
    } else if (e.target.name === 'cantidad') {
      cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let cantidad = parseFloat(inputCantidad).toFixed(2);

    if (inputDescripcion !== '' && inputCantidad !== '') {
      if (cantidad) {
        if (gasto) {
          editarGasto({
            id: gasto.id,
            categoria: categoria,
            descripcion: inputDescripcion,
            cantidad: cantidad,
            fecha: getUnixTime(fecha),
          })
            .then(() => {
              history.push('/lista');
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          agregarGasto({
            categoria: categoria,
            descripcion: inputDescripcion,
            cantidad: cantidad,
            fecha: getUnixTime(fecha),
            uidUsuario: usuario.uid,
          })
            .then(() => {
              cambiarCategoria('hogar');
              cambiarInputDescripcion('');
              cambiarInputCantidad('');
              cambiarFecha(new Date());

              cambiarEstadoAlerta(true);
              cambiarAlerta({
                tipo: 'exito',
                mensaje: 'El gasto fue agregado correctamente',
              });
            })
            .catch((error) => {
              cambiarEstadoAlerta(true);
              cambiarAlerta({
                tipo: 'error',
                mensaje: 'Hubo un problema al intentar agregar el gasto',
              });
            });
        }
      } else {
        cambiarEstadoAlerta(true);
        cambiarAlerta({
          tipo: 'error',
          mensaje: 'El valor que ingresaste no es valido',
        });
      }
    } else {
      cambiarEstadoAlerta(true);
      cambiarAlerta({ tipo: 'error', mensaje: 'Rellene todo los campos' });
    }
  };

  return (
    <Formulario onSubmit={handleSubmit}>
      <ContenedorFiltros>
        <SelectorCategorias
          categoria={categoria}
          cambiarCategoria={cambiarCategoria}
        />
        <DatePicker fecha={fecha} cambiarFecha={cambiarFecha} />
      </ContenedorFiltros>

      <div>
        <Input
          type='text'
          name='descripcion'
          id='descripcion'
          placeholder='Descripcion del gasto'
          value={inputDescripcion}
          onChange={handleChange}
        />
        <InputGrande
          type='text'
          name='cantidad'
          id='cantidad'
          placeholder='$0,00'
          value={inputCantidad}
          onChange={handleChange}
        />
      </div>
      <ContenedorBoton>
        <Boton as='button' primario conIcono type='submit'>
          {gasto ? ' Editar Gasto' : 'Agregar Gasto'}
          <IconoPlus />
        </Boton>
      </ContenedorBoton>

      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEstadoAlerta={cambiarEstadoAlerta}
      />
    </Formulario>
  );
};

export default FormularioGasto;
