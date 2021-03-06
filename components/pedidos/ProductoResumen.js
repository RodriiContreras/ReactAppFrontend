import React,{useState,useEffect,useContext} from 'react';
import PedidoContext from '../../context/pedidos/PedidoContext';

const ProductoResumen =({producto}) => {
    const [cantidad, setCantidad] = useState(0);
    const productoContext = useContext(PedidoContext)
    const {cantidadProductos,actualizarTotal} =productoContext;
    useEffect(() => {
        actualizarCantidad();
        actualizarTotal()
    }, [cantidad]);

    const actualizarCantidad =()=>{
    const  nuevoProducto = {...producto,cantidad:Number (  cantidad )}
    cantidadProductos(nuevoProducto)
    }
    const {nombre,precio} = producto
    
  return(
     <div className='md:flex md:justify-center md:items-center mt-5'>
         <div className='md:w-2/4 mb-2 md:mb-0'>
          <p className='text-sm'>{nombre}  ${precio}</p>
          <p></p>
         </div>
         <input type='number'
         placeholder='Cantidad'
         className='shadow apperance-none border text-center rounded w-full py-2 -px3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4'
        value={cantidad}
         onChange={e=>setCantidad(e.target.value)}
         />
     </div>
  );
}

export default ProductoResumen;
