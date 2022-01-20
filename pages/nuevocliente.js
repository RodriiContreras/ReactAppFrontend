import React from 'react';
import Layouts from '../components/layouts';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {gql,useMutation} from '@apollo/client'
import { useRouter } from 'next/router';
import { useState } from 'react';


const NUEVO_CLIENTE = gql`
mutation nuevoCliente($input:ClienteInput){
  nuevoCliente(input:$input){
    id
    nombre
    apellido
    empresa
    email
    telefono
  }
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
const nuevoCliente =() => {
  const router = useRouter();
  const [mensaje, guardarMensaje] = useState(null);

  //FORMA DE ACTUALIZAR CACHE :
  const [nuevoCliente]= useMutation(NUEVO_CLIENTE,{
     update(cache , {data : {nuevoCliente} } ) {
       const {obtenerClientesVendedor} = cache.readQuery({query:OBTENER_CLIENTES_USUARIO});

       cache.writeQuery({
        query:OBTENER_CLIENTES_USUARIO,
        data:{
          obtenerClientesVendedor:[...obtenerClientesVendedor,nuevoCliente]
        }
  
      })
     }
  })
  const formik = useFormik({
    initialValues:{
      nombre:'',
      apellido:'',
      email:'',
      empresa:'',
      telefono:''
    },
    validationSchema:Yup.object({

      nombre:Yup.string()
      .required('El Nombre es obligatorio'),
   
      apellido:
      Yup.string()
      .required('El Apellido es obligatorio'),

      email:
      Yup.string()
      .email('Email no valido')
      .required('El E-Mail es obligatorio'),

      empresa:
      Yup.string()
      .required('La empresa es necesaria')

    }),
    onSubmit: async valores=>{
      const {nombre,apellido,empresa,email,telefono} =  valores
      console.log(valores)
      try { 
       const {data} = await nuevoCliente({
         variables:{
           input:{
             nombre,
             apellido,
             empresa,
             email,
             telefono
           }
         }
       })
     
       router.push('/')
        
      } catch (error) {
        guardarMensaje(error.message)
        console.log(error.message)
      }
    }
  })
  const mostrarMensaje=()=>{
    return (
      <div className='my-2 bg-red-100 border-red-500 text-red-700 p-4'>
              <p>{mensaje}</p>
      </div>
      )
  }
  return(
      <Layouts>
      <h1 className='text-2xl text-gray-800 font-light'>Nuevo Cliente</h1>

      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <form className='bg-white shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nombre'>
               Nombre
              </label>
              <input
                    className='shadow appearance-none border rounded w-full py-2 p-x3 text-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline'
                    id='nombre'
                    type='text'
                    placeholder='Nombre'
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}/>
            </div>
            {formik.errors.nombre ?
             <div className='my-2 bg-red-100 border-l-8 border-red-500 text-red-700 p-4'>  
                 <p className='font-bold'>{formik.errors.nombre}</p>
             </div> 
             : null}

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='apellido'>
               Apellido
              </label>
              <input
              className='shadow appearance-none border rounded w-full py-2 p-x3 text-gray-700 
              leading-tight focus:outline-none focus:shadow-outline'
              id='apellido'
              type='text'
              placeholder='Apellido'
              value={formik.values.apellido}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              />
            </div>
            {formik.errors.apellido ?
             <div className='my-2 bg-red-100 border-l-8 border-red-500 text-red-700 p-4'>  
                 <p className='font-bold'>{formik.errors.apellido}</p>
             </div> 
             : null}

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='empresa'>
               Empresa
              </label>
              <input className='shadow appearance-none border rounded w-full py-2 p-x3 text-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline'
                     id='empresa' type='text' placeholder='Empresa'
                     value={formik.values.empresa} onChange={formik.handleChange} onBlur={formik.handleBlur}
                     />
            </div>
            {formik.errors.empresa ?
             <div className='my-2 bg-red-100 border-l-8 border-red-500 text-red-700 p-4'>  
                 <p className='font-bold'>{formik.errors.empresa}</p>
             </div> 
             : null}

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
               Email
              </label>
              <input className='shadow appearance-none border rounded w-full py-2 p-x3 text-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline'
                     id='email' type='email' placeholder='Email'
                     value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                     />
            </div>
            {formik.errors.email ?
             <div className='my-2 bg-red-100 border-l-8 border-red-500 text-red-700 p-4'>  
                 <p className='font-bold'>{formik.errors.email}</p>
             </div> 
             : null}

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='telefono'>
               Telefono ( NO es obligatorio)
              </label>
              <input className='shadow appearance-none border rounded w-full py-2 p-x3 text-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline'
                   id='telefono' type='text' placeholder='Telefono'
                   value={formik.values.telefono} onChange={formik.handleChange} onBlur={formik.handleBlur}
                   />
            </div>
            {mensaje && mostrarMensaje()}
            <input className='bg-violet-600 w-full mt-5 p-2 text-white uppercase font-bold' type='submit' value='Registrar Cliente'/>



          </form>
        </div>
      </div>
      </Layouts>
  )
}

export default nuevoCliente;
