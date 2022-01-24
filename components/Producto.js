import React from 'react';
import Swal from 'sweetalert2';

const Producto=({producto})=> {
    const {nombre,precio,existencia} = producto



    const eliminandoProducto =()=>{
        Swal.fire({
            title: 'Estas seguro de eliminar este cliente?',
            text: "No se pueden revertir estos cambios",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si,Eliminar producto'
          })   
    }

  return(
    <tr key={producto.id}>
    <td className="border px-4 py-2 text-center">{nombre}</td>
    <td className="border px-4 py-2 text-center">${precio}</td>
    <td className="border px-4 py-2 text-center">{existencia}</td>
    <td className="border px-4 py-2">
        <button type='button' className='flex justify-center items-center py-2 px-4 w-full'
        onClick={()=> eliminandoProducto()}>
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

export default Producto ;
