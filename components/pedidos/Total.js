import React,{useContext} from 'react';
import PedidoContext from '../../context/pedidos/PedidoContext';


const Total = () => {
    const productoContext = useContext(PedidoContext)
    const {total} =productoContext;
  return(
      <div className='flex items-center mt-5 justify-between bg-violet-200 p-3 border-solid border-2 border-black-400'>
          <h2 className=' text-lg'>Total a pagar</h2>
          <p className='mt-0'>$ {total}</p>
      </div>
  )
}

export default Total;
