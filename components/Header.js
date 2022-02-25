import React from 'react';
import { gql,useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
const OBTENER_USUARIO= gql`
query obtenerUsuario{
    obtenerUsuario{
      id
      nombre
      email
      apellido
    }
 }
`
const Header =() => {
    const router = useRouter();
    const {data,loading,error} = useQuery(OBTENER_USUARIO);

    if(loading) return null;


    if(!data){
     router.push("/login")
    }


    const {nombre,apellido} = data.obtenerUsuario;


    const cerrarSesion = ()=>{
        localStorage.removeItem('token')
        router.push('/login')
    }
    return (
<div>
   
   <div className='sm:flex  sm:justify-between mb-4'>
            <p>Hola! {nombre}</p>

            
            <button type='button' onClick={()=> cerrarSesion()} className='ml-2 bg-violet-700 w-full sm:w-auto font-bold text-xs rounded py-2 px-2 uppercase shadow-md text-white'>Cerrar Sesion</button>

        </div>
   


 </div>
    )
}

export default Header
