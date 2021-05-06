import { db } from './firebaseConfig';

const editarGasto = ({ categoria, descripcion, cantidad, fecha, id }) => {
  return db
    .collection('gasto')
    .doc(id)
    .update({
      categoria,
      descripcion,
      cantidad: Number(cantidad),
      fecha,
    });
};

export default editarGasto;
