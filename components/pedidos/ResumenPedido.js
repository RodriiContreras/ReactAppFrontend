import React,{useContext} from 'react';
import PedidoContext from '../../context/pedidos/PedidoContext';
import ProductoResumen from './ProductoResumen';

const ResumenPedido = ()  =>{


const productoContext = useContext(PedidoContext)
const {productos} =productoContext;

console.log(productos)
  return(
<>
<p className='mt-2'>Ajusta las cantidades del producto</p>

{productos.length > 0 ?(
<>
{productos.map(producto =>(
    <ProductoResumen key={producto.id} producto={producto}/>
))}
</>
)
:(

<p>Todavia no hay ningún producto</p>

)}
</>
  )
}

export default ResumenPedido;
