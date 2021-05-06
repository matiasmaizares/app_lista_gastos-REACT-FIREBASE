import { db } from './firebaseConfig';

const agregarGasto = ({
  categoria,
  descripcion,
  cantidad,
  fecha,
  uidUsuario,
}) => {
  return db.collection('gasto').add({
    categoria,
    descripcion,
    cantidad: Number(cantidad),
    fecha,
    uidUsuario,
  });
};

export default agregarGasto;
