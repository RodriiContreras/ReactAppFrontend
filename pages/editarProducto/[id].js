import React from 'react';
import Layouts from '../../components/layouts';
import {  Formik } from 'formik';
import { useRouter } from 'next/router';
import { gql,useMutation,useQuery } from '@apollo/client';
import * as Yup from 'yup'
import Swal from 'sweetalert2';

const OBTENER_PRODUCTO=gql`
query obtenerProductoId($id:ID!){
    obtenerProductoId(id:$id){
      nombre
      precio
      existencia
    }
  }`

  const ACTUALIZAR_PRODUCTO=gql`
  mutation actualizarProducto($id:ID!,$input:ProductoInput){
    actualizarProducto(id:$id,input:$input){
      id
      nombre
      existencia
      precio
    }
  }
`
const editarProducto = () => {
    const router = useRouter();
    const {query:{id}} = router;


    const {data,loading,err} = useQuery(OBTENER_PRODUCTO,{
        variables:{
            id
        }
    })

    const [actualizarProducto] = useMutation(ACTUALIZAR_PRODUCTO)
    const schemaValidacion=Yup.object({

        nombre:Yup.string()
        .required('El Nombre es obligatorio'),
     
        precio:
        Yup.number()
        .required('El Precio es obligatorio').positive('El Numero debe ser positivo'),
  
        existencia:
        Yup.number()
        .required('El Stock es obligatorio').positive('El Numero debe ser positivo'),
  
  
      });
 
    if(loading) return 'Cargandoo'

    const infoProducto = async valores =>{
        const {nombre,precio,existencia} = valores;
        try {
            const {data} = await actualizarProducto({
                variables:{
                    id,
                    input:{
                    nombre,
                    precio,
                    existencia
                    }
                }
            })
            Swal.fire(
                'Producto Actualizado',
                'Producto Actualizado Correctamente',
                'success'
              )
              router.push('/productos')
           console.log(data)
        } catch (error) {
          console.log(error)
        }
       }

     const{obtenerProductoId} = data;
    console.log(data)
  return(
<Layouts>
   <h1 className="text-2xl text-gray-800 font-light">Editar Productos</h1>

   <div className='flex justify-center mt-5'>

<div className='w-full max-w-sm'>
    <Formik
    initialValues={obtenerProductoId}
    validationSchema={schemaValidacion}
     enableReinitialize={obtenerProductoId}
      onSubmit={(valores,funciones)=>{
      infoProducto(valores)
  }}
    >
    {props =>{
        return(

 
      <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={props.handleSubmit}>
      <div className='pt-1'>
        <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='nombre'>
            Nombre Del Producto
        </label>
      <input
      className='shadow appearance-none border rounded w-full py-2 p-x3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      id='nombre' type='text' placeholder='Nombre' value={props.values.nombre} onChange={props.handleChange} onBlur={props.handleBlur} />
      </div>
      
    {props.errors.nombre ?
      <div className='my-2 bg-red-100 border-l-8 border-red-500 text-red-700 p-4'>  
         <p className='font-bold'>Error</p>
         <p className='font-bold'>{props.errors.nombre}</p>
      </div> 
      : null}
      
      
      <div className='pt-5'>
        <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='precio'>
            Precio Del Producto
        </label>
      
      <input className='shadow appearance-none border rounded w-full py-2 p-x3
      text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      id='precio' type='number' placeholder='Precio' value={props.values.precio} onChange={props.handleChange} onBlur={props.handleBlur}  
      />
      </div>
      {props.errors.precio ?
      <div className='my-2 bg-red-100 border-l-8 border-red-500 text-red-700 p-4'>  
         <p className='font-bold'>Error</p>
         <p className='font-bold'>{props.errors.precio}</p>
      </div> 
      : null}
      
      
      <div className='pt-5'>
        <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='existencia'>
            Stock Del Producto 
        </label>
          <input className='shadow appearance-none border rounded w-full py-2 p-x3 text-gray-700 leading-tight
          focus:outline-none focus:shadow-outline' id='existencia'
           type='number' placeholder='existencia' value={props.values.existencia} onChange={props.handleChange} onBlur={props.handleBlur} 
          />
      </div>
      
     {props.errors.existencia ?
      <div className='my-2 bg-red-100 border-l-8 border-red-500 text-red-700 p-4'>  
         <p className='font-bold'>Error</p>
         <p className='font-bold'>{props.errors.existencia}</p>
      </div> 
      : null}
      
      
          <input type="submit" className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900' value='Editar Producto'/>
      </form>
        )
     }}
      </Formik>
      </div>


</div>

</Layouts>
  );
}

export default editarProducto;
