import React, { useContext } from 'react';
import Layouts from '../components/layouts';
import AsignarCliente from '../components/pedidos/AsignarCliente';
import AsignarProducto from '../components/pedidos/AsignarProducto';
import ResumenPedido from '../components/pedidos/ResumenPedido';
import Total from '../components/pedidos/Total';

import PedidoContext from '../context/pedidos/PedidoContext';

const nuevoPedido = ()=> {
//usar context
const pedidoContext = useContext(PedidoContext);
  return(
    <Layouts>
    <h1 className="text-2xl text-gray-800 font-light">Nuevo Pedido</h1>
      
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
        <AsignarCliente/>
        <AsignarProducto/>
        <ResumenPedido/>
        <Total/>

        <button type='button' className={`bg-black w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900`}>
          Hacer Pedido
        </button>
        </div>
      </div>
    </Layouts>
  );
}

export default nuevoPedido;
