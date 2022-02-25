import React, { useContext,useState } from 'react';
import Layouts from '../components/layouts';
import AsignarCliente from '../components/pedidos/AsignarCliente';
import AsignarProducto from '../components/pedidos/AsignarProducto';
import ResumenPedido from '../components/pedidos/ResumenPedido';
import Total from '../components/pedidos/Total';
import { gql,useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

import PedidoContext from '../context/pedidos/PedidoContext';
const NUEVO_PEDIDO = gql`
mutation nuevoPedido($input:PedidoInput){
  nuevoPedido(input:$input){
  id
  }
}
`
const OBTENER_PEDIDOS = gql`
query obtenerPedidosVendedor{
    obtenerPedidosVendedor{
      id
  }
}
`
const nuevoPedido = ()=> {
//usar context
const router = useRouter();
const [mensaje, guardarMensaje] = useState(null)
const pedidoContext = useContext(PedidoContext);
const {cliente,productos,total}=pedidoContext;
const [nuevoPedido] =useMutation(NUEVO_PEDIDO,{
  update(cache,{data:{nuevoPedido}}){
    const {obtenerPedidosVendedor} = cache.readQuery({
      query:OBTENER_PEDIDOS
    })
    cache.writeQuery({
      query:OBTENER_PEDIDOS,
      data:{
        obtenerPedidosVendedor: [...obtenerPedidosVendedor,nuevoPedido]
      }
    })
  }
});

const validarPedido=()=>{
 return !productos.every(producto => producto.cantidad > 0) || total === 0 || cliente.length === 0 ?  " opacity-50 cursor-not-allowed " :'' ;
}

const crearNuevoPedido = async ()=>{
  const {id} = cliente;
 const pedido = productos.map(({__typename,existencia,...producto})=> producto)
 console.log(pedido)
  try {
    const {data} = await nuevoPedido({
      variables:{
        input:{
        cliente: id,
        total,
        pedido
      }
      }
    })
    Swal.fire(
      'Enviado!',
      `Su Pedido ha sido enviado exitosamente`,
      'success',
    )
    setTimeout(() => {
      router.push('/')
    }, 1500);
  } catch (error) {
    guardarMensaje(error.message)
  }
}

const mostrarMensaje= () =>{
  return(
      <div className='my-2 bg-red-100 border-l-8 border-red-500 text-red-700 p-4'>
          <p>{mensaje}</p>
      </div>
  )
}
  return(
    <Layouts>
    <h1 className="text-2xl text-gray-800 font-light">Nuevo Pedido</h1>
      
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
        <AsignarCliente/>
        <AsignarProducto/>
        <ResumenPedido/>
        <Total/>

        <button
         type='button'
        className=
        {`bg-black
        w-full mt-5
         p-2 text-white
          uppercase 
          font-bold
           hover:bg-gray-900 ${validarPedido()}`
          
        } onClick={()=>crearNuevoPedido()}>
          Hacer Pedido
        </button>

        {mensaje && mostrarMensaje()}
        </div>
      </div>
    </Layouts>
  );
}

export default nuevoPedido;
