import React from 'react';
import Swal from 'sweetalert2';
import { gql,useMutation } from '@apollo/client';
import Router from 'next/router';

const ELIMINAR_CLIENTE = gql`
mutation eliminarClientes($id:ID!){
    eliminarClientes(id:$id)
  }
`
const OBTENER_CLIENTES_USUARIO= gql`
query obtenerClientesVendedor{
  obtenerClientesVendedor{
    id
    nombre
    apellido
    empresa
    email
  }
}
`
const Cliente =({cliente}) => {
    const [eliminarCLientes] = useMutation(ELIMINAR_CLIENTE,{
        update(cache){
            const {obtenerClientesVendedor} = cache.readQuery({query:OBTENER_CLIENTES_USUARIO});

            cache.writeQuery({
                query:OBTENER_CLIENTES_USUARIO,
                data:{
                    obtenerClientesVendedor:obtenerClientesVendedor.filter(cliente=> cliente.id !== id)
                }
            })
        }

    
    })

    const {nombre,empresa,apellido,email,id} = cliente;

    const eliminandoCliente =id=>{
        Swal.fire({
            title: 'Estas seguro de eliminar este cliente?',
            text: "No se pueden revertir estos cambios",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then( async(result) => {
            if (result.isConfirmed) {
               try {
                   const {data} = await eliminarCLientes({
                       variables:{
                           id
                       }
                   })
                   console.log(data)

                Swal.fire(
                    'Eliminado!',
                    `Su cliente "${nombre} ${apellido}" ha sido eliminado exitosamente`,
                  )
               } catch (error) {
                    console.log(error)
               }
            }
          })          
    }
const editarCliente = ()=>{
Router.push({
    pathname:"/editarcliente/[id]",
    query:{id}
})
}
  return(
       <tr key={id}>
         <td className="border px-4 py-2">{nombre}{apellido}</td>
         <td className="border px-4 py-2">{empresa}</td>
         <td className="border px-4 py-2">{email}</td>
         <td className="border px-4 py-2">
             <button type='button' className='flex justify-center items-center py-2 px-4 w-full'
             onClick={()=> eliminandoCliente(id)}>
             Eliminar
             <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
             </button>
        </td>
        <td className="border px-4 py-2">
             <button type='button' className='flex justify-center items-center py-2 px-4 w-full'
             onClick={()=> editarCliente(id)}>
             Editar
             <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
</svg>
             </button>          
        </td>
       </tr>
     )
}

export default Cliente;
