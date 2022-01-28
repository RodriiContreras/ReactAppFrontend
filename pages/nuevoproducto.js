import React from 'react';
import Layouts from '../components/layouts';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { gql,useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const NUEVO_PRODUCTO=gql`
mutation nuevoProducto($input:ProductoInput){
    nuevoProducto(input:$input){
      id
      nombre
      precio
      existencia
    }
  }
`

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


const nuevoproducto =() => {
    const router = useRouter();


    const [nuevoProducto] = useMutation(NUEVO_PRODUCTO,{
        update(cache,{data:{nuevoProducto}}){
            const {obtenerProductos} = cache.readQuery({query:OBTENER_PRODUCTOS});


            cache.writeQuery({
                query:OBTENER_PRODUCTOS,
                data:{
                    obtenerProductos:[...obtenerProductos,nuevoProducto]
                }
            })
        }
    
    })

    const formik = useFormik({
        initialValues:{
            nombre:'',
            existencia:'',
            precio:''
        },
        validationSchema:Yup.object({
            nombre:Yup.string().required('El Nombre del producto es obligatorio'),
            precio: Yup.number().required('El Precio es indispensable').positive('no se aceptan numeros negativos') ,
            existencia:Yup.number().required('El Stock del producto es indispensable').positive('No pueden ser numeros negativos').integer('El stock es en base a numeros enteros')
        }),
        onSubmit: async valores=>{
            const {id,nombre,precio,existencia} = valores;
          try {
            const {data} = await nuevoProducto({
                variables:{
                    input:{
                       nombre,
                       precio,
                       existencia
                    }
                }
            })
            Swal.fire(
                'Producto Creado',
                'Producto Creado Correctamente',
                'success'
              )
              router.push('/productos')
          } catch (error) {
              console.log(error)
          }
        }
    })
  return (
<Layouts>
  <h1 className='text-2xl text-gray-800 font-light'>Nuevo Producto</h1> 

  <div className='flex justify-center mt-5'>

              <div className='w-full max-w-sm'>
              <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
              <div className='pt-1'>
                <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='nombre'>
                    Nombre Del Producto
                </label>
            <input
             className='shadow appearance-none border rounded w-full py-2 p-x3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='nombre' type='text' placeholder='Nombre' value={formik.values.nombre} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </div>

            {formik.errors.nombre ?
             <div className='my-2 bg-red-100 border-l-8 border-red-500 text-red-700 p-4'>  
                 <p className='font-bold'>Error</p>
                 <p className='font-bold'>{formik.errors.nombre}</p>
             </div> 
             : null}


            <div className='pt-5'>
                <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='precio'>
                    Precio Del Producto
                </label>

            <input className='shadow appearance-none border rounded w-full py-2 p-x3
             text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='precio' type='number' placeholder='Precio' value={formik.values.precio} onChange={formik.handleChange} onBlur={formik.handleBlur} 
              />
            </div>
            {formik.errors.precio ?
             <div className='my-2 bg-red-100 border-l-8 border-red-500 text-red-700 p-4'>  
                 <p className='font-bold'>Error</p>
                 <p className='font-bold'>{formik.errors.precio}</p>
             </div> 
             : null}


            <div className='pt-5'>
                <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='existencia'>
                    Stock Del Producto 
                </label>
             <input className='shadow appearance-none border rounded w-full py-2 p-x3 text-gray-700 leading-tight
              focus:outline-none focus:shadow-outline' id='existencia'
               type='number' placeholder='existencia'  value={formik.values.existencia} onChange={formik.handleChange} onBlur={formik.handleBlur} 
               />
            </div>

            {formik.errors.existencia ?
             <div className='my-2 bg-red-100 border-l-8 border-red-500 text-red-700 p-4'>  
                 <p className='font-bold'>Error</p>
                 <p className='font-bold'>{formik.errors.existencia}</p>
             </div> 
             : null}

            
              <input type="submit" className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900' value='Crear Nuevo Producto'/>
              </form>
              </div>

          
            </div>
</Layouts>
  );
}

export default nuevoproducto;
