import React from 'react'
import Layouts from '../components/layouts'
import Link from 'next/link'
import {gql,useQuery} from '@apollo/client'
import Pedido from '../components/pedidos/Pedido'


const OBTENER_PEDIDOS = gql`
query obtenerPedidosVendedor{
    obtenerPedidosVendedor{
      id
      cliente{
          id
          nombre
          apellido
          email
          telefono
      }
      pedido {
        nombre
        cantidad
        id
      }
      vendedor
      total
      estado
    }
  }
`
const Pedidos =() => {
const {data,loading,err} = useQuery(OBTENER_PEDIDOS)
if(loading) return 'Cargando'
const {obtenerPedidosVendedor} = data;
console.log(data)
    return (
        <div>
        <Layouts>
            <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>

            <Link href='/nuevopedido'>
            <a className="bg-black py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-500">Nuevo Pedido</a>
            </Link>

            {obtenerPedidosVendedor.length===0 ?
             (<p className='text-center'> Todavia no hay pedidos</p>) 
             
             
             :(obtenerPedidosVendedor.map(pedido =>(
                 <Pedido key={pedido.id} pedido={pedido}/>
             )))}
         </Layouts>
        </div>  
    )
}

export default Pedidos
