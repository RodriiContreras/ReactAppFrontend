import React,{useEffect, useState} from 'react';
import { gql,useMutation } from '@apollo/client';
import Swal from 'sweetalert2';

const ACTUALIZAR_PEDIDO= gql`
mutation actualizarPedido($id:ID!, $input: PedidoInput){
  actualizarPedido(id:$id,input:$input){
    estado
  }
}
`

const ELIMINAR_PEDIDO = gql`
mutation eliminarPedido($id: ID!) {
  eliminarPedido(id: $id)
}
`

const OBTENER_PEDIDOS = gql`
query obtenerPedidosVendedor{
    obtenerPedidosVendedor{
      id
  }
}
`

const Pedido =({pedido}) => {
  const {id,total,cliente:{nombre,apellido,telefono,email},estado,cliente} = pedido;

  const [actualizarPedido] = useMutation(ACTUALIZAR_PEDIDO)
  const [eliminarPedido] = useMutation(ELIMINAR_PEDIDO,{
    update(cache){
      const {obtenerPedidosVendedor} = cache.readQuery({
        query:OBTENER_PEDIDOS
      })
      cache.writeQuery({
        query:OBTENER_PEDIDOS,
        data:{
          obtenerPedidosVendedor:obtenerPedidosVendedor.filter(pedidoAEliminar => pedidoAEliminar.id !== id)
        }
      })
    }
  })

  const [estadoPedido, setEstadoPedido] = useState(estado);
  const [clase, setClase] = useState('');

  useEffect(() => { 
    if(estadoPedido){
      setEstadoPedido(estadoPedido)
    }
    clasePedido()
  }, [estadoPedido]);
  
  const clasePedido = ()=>{
    if(estadoPedido === 'Pendiente'){
     setClase('border-yellow-500')
    }
    if(estadoPedido === 'Completado'){
      setClase('border-green-500')
    }
    else{
      setClase('border-red-700')
    }

  }

  const cambiarEstadoPedido= async nuevoEstado=>{
   try {
      const {data} = await actualizarPedido({
        variables:{
          id,
          input:{
           estado : nuevoEstado,
           cliente: cliente.id
          }
        }
      })
      setEstadoPedido(data.actualizarPedido.estado)
   } catch (error) {
     console.log(error)
   }
    }
  const confirmarEliminarPedido =()=>{
    Swal.fire({
      title: 'Estas seguro de eliminar este cliente?',
      text: "No se pueden revertir estos cambios",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then( async (resultado) =>{
      if(resultado.value){
        try {
           await eliminarPedido({
             variables:{
               id
             }
           })    
           Swal.fire(
            'Eliminado!',
            `Su Pedido ha sido eliminado exitosamente`,
          )
        } catch (error) {
          console.log(error)
        }
      }
    })
  }
  return(
      <div className={` ${clase} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}>
      <div>
        <p className='text-gray-800 font-bold'>{nombre} {apellido}</p>
        <p className='text-gray-800 font-bold mt-2'>{email}</p>
        <p className='text-gray-800 font-bold mt-1'>{telefono}</p>

        <h2 className='text-gray-800 mt-10'> Estado del pedido</h2>
        <select className='mt-2' value={estadoPedido} onChange={e => cambiarEstadoPedido(e.target.value)}>
          <option value='Completado'>Completado</option>
          <option value='Pendiente' >Pendiente</option>
          <option value='Cancelado' >Cancelado</option>
        </select>
      </div>
      <div>
       <h2 className='mt-2 font-bold text-gray-800'>Resumen Pedido:</h2>
       {pedido.pedido.map(articulo=>( 
            <div key={articulo.id} className='mt-4'>
             <p className='text-sm text-gray-600'>Producto: {articulo.nombre}</p>
             <p className='text-sm text-gray-600'>Cantidad: {articulo.cantidad}</p>
            </div>
       ))}
       <p className='text-gray-800 mt-3 font-bold'> Total A Pagar : 
        <span className='text-sm'> {total}</span>
       </p>
       <button className=' text-xs flex items-center mt-4 bg-red-600 px-5 py-2 inline-block text-white rounded leading.tight'
       onClick={()=>confirmarEliminarPedido()}>
         Eliminar Pedido
       <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
       </button>
      </div>
      </div>
  )
}

export default Pedido;
