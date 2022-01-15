import React from 'react'
import Layouts from '../components/layouts'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useQuery,gql} from '@apollo/client'

const QUERY=gql`
query obtenerProductos{
    obtenerProductos {
      id
      precio
      nombre
      creado
      existencia
    }
  }
`
function nuevacuenta() {// px-8 = PADDING DERECHA IZQUIERDA , ROUNDED HACE EL EFECTO DE BORDER-RADIUS, 
    const {data} = useQuery(QUERY);
    console.log(data)
    //Validando formulario
    const formik = useFormik({
        initialValues:{
            nombre:'',
            apellido:'',
            email:'',
            contraseña:''
        },
        validationSchema:Yup.object({
            nombre: 
            Yup.string()
            .required('El Nombre es obligatorio'),
          
            apellido:Yup.string()
            .required('El Apellido es obligatorio'),
         
            email:Yup.string()
            .email('El E-Mail no es valido')
            .required('El E-Mail es obligatorio'),

            contraseña:Yup.string()
            .required('La Contraseña es obligatoria')
            .min(6,'La contraseña debe contar con mas de 6 caracteres')

        }),
        onSubmit:valores=>{
            console.log('enviando')
            console.log(valores)
        }
    });
    return (

        <>
            <Layouts>
            <h1 className='text-center text-2xl font-light text-white'>Crear Nueva Cuenta</h1>
            <div className='flex justify-center mt-5'>
              <div className='w-full max-w-sm'>
              <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
              <div className='pt-1'>
                <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='nombre'>
                    Nombre
                </label>
            <input
             className='shadow appearance-none border rounded w-full py-2 p-x3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='nombre' type='text' placeholder='Nombre' value={formik.values.nombre} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </div>
            { formik.touched.nombre && formik.errors.nombre ? (
             <div className='my-2 bg-red-100 border-l-8 border-red-500 text-red-700 p-4'>  
                 <p className='font-bold'>Error</p>
                 <p className='font-bold'>{formik.errors.nombre}</p>
             </div> )
             : null}

            <div className='pt-5'>
                <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='apellido'>
                    Apellido
                </label>

            <input className='shadow appearance-none border rounded w-full py-2 p-x3
             text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='apellido' type='text' placeholder='Apellido' value={formik.values.apellido} onChange={formik.handleChange}
              />
            </div>
            {formik.errors.apellido ?
             <div className='my-2 bg-red-100 border-l-8 border-red-500 text-red-700 p-4'>  
                 <p className='font-bold'>Error</p>
                 <p className='font-bold'>{formik.errors.apellido}</p>
             </div> 
             : null}

            <div className='pt-5'>
                <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='email'>
                    Email
                </label>
             <input className='shadow appearance-none border rounded w-full py-2 p-x3 text-gray-700 leading-tight
              focus:outline-none focus:shadow-outline' id='email'
               type='email' placeholder='Email' value={formik.values.email} onChange={formik.handleChange}
               />
            </div>
            {formik.errors.email ?
             <div className='my-2 bg-red-100 border-l-8 border-red-500 text-red-700 p-4'>  
                 <p className='font-bold'>Error</p>
                 <p className='font-bold'>{formik.errors.email}</p>
             </div> 
             : null}

            <div className='pt-5'>
             <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='contraseña'>
                    Contraseña
                </label>
                <input className='shadow appearance-none border rounded w-full py-2 p-x3 text-gray-700 leading-tight
                 focus:outline-none focus:shadow-outline' id='contraseña' type='password'
                  placeholder='Contraseña' value={formik.values.contraseña} onChange={formik.handleChange}
                  />
            </div>
            {formik.errors.contraseña ?
             <div className='my-2 bg-red-100 border-l-8 border-red-500 text-red-700 p-4'>  
                 <p className='font-bold'>Error</p>
                 <p className='font-bold'>{formik.errors.contraseña}</p>
             </div> 
             : null}
            
              <input type="submit" className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900' value='Crear Nueva Cuenta'/>
              </form>
              </div>

          
            </div>
            </Layouts>
        </>
    )
}

export default nuevacuenta
