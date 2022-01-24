import React from 'react'
import Layouts from '../components/layouts'
import {gql, useQuery} from '@apollo/client'
import Producto from '../components/Producto'

const OBTENER_PRODUCTOS = gql`
query obtenerProductos{
    obtenerProductos {
      id
      precio
      nombre
      existencia
    }
  }
`
const Productos = () => {
    const {data,loading,error} = useQuery(OBTENER_PRODUCTOS)

    if(loading) return 'Cargandoo'
    console.log(data)
    return (
        <div>
        <Layouts>
        <h1 className="text-2xl text-gray-800 font-light">Productos</h1>
       
        <table className="table-auto shadow-md mt-10 w-full w-lg">
         <thead className="bg-gray-800">
           <tr className="text-white">
             <th className="w-1/5 py-2">Nombre</th>
             <th className="w-1/5 py-2">Precio</th>
             <th className="w-1/5 py-2">Stock</th>
             <th className="w-1/5 py-2">Eliminar</th>
             <th className="w-1/5 py-2">Editar</th>
           </tr>
         </thead>
         <tbody className="bg-white">

          {data.obtenerProductos.map(producto=>(
           <Producto key={producto.id} producto={producto}/>
          ))}
         </tbody >

       </table>

         </Layouts>
        </div>
    )
}

export default Productos
