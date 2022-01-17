import React from 'react'
import Layouts from '../components/layouts'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useMutation,gql} from '@apollo/client'
import { useState } from 'react'
import {useRouter} from 'next/router'

const NUEVA_CUENTA=gql`
mutation nuevoUsuario($input:UsuarioInput){
    nuevoUsuario(input:$input){
      id
      nombre
      apellido
      email
    }
  
  }
`
function nuevacuenta() {// px-8 = PADDING DERECHA IZQUIERDA , ROUNDED HACE EL EFECTO DE BORDER-RADIUS, 
    const router = useRouter();
    const [mensaje,guardarMensaje] =useState(null)
    const [mensajecorrecto, mensajeCorrecto] = useState(null)
    const [nuevoUsuario] = useMutation(NUEVA_CUENTA);

    //Validando formulario
    const formik = useFormik({
        initialValues:{
            nombre:'',
            apellido:'',
            email:'',
            password:''
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

            password:Yup.string()
            .required('La Contraseña es obligatoria')
            .min(6,'La Contraseña debe contar con mas de 6 caracteres')

        }),
        onSubmit: async valores=>{
            const {nombre,apellido,email,password} = valores;
            console.log(nombre,apellido,email,password)
            try {
                await nuevoUsuario({
                    variables:{
                        input:{
                           nombre,
                           apellido,
                           email,
                           password
                        }
                    }
                })
                guardarMensaje(null)
                mensajeCorrecto('Se ha creado el usuario correctamente.')
                setTimeout(() => {
                    router.push('/login')
                  },1500);
            } catch (error) {
                guardarMensaje(error.message)
            }
        }
    });
    const  mostrarMensajeCorrecto = () =>{
        return (
        <div className='my-2 bg-green-100 border-red-500 text-green-700 p-4'>
                <p>{mensajecorrecto}</p>
        </div>
        )
    }

    const mostrarMensaje= () =>{
        return(
            <div className='my-2 bg-red-100 border-l-8 border-red-500 text-red-700 p-4'>
                <p>{mensaje}</p>
            </div>
        )
    }
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
              {mensaje && mostrarMensaje()}

            <div className='pt-5'>
             <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='password'>
                    Contraseña
                </label>
                <input className='shadow appearance-none border rounded w-full py-2 p-x3 text-gray-700 leading-tight
                 focus:outline-none focus:shadow-outline' id='password' type='password'
                  placeholder='Contraseña' value={formik.values.password} onChange={formik.handleChange}
                  />
            </div>
            {formik.errors.contraseña ?
             <div className='my-2 bg-red-100 border-l-8 border-red-500 text-red-700 p-4'>  
                 <p className='font-bold'>Error</p>
                 <p className='font-bold'>{formik.errors.password}</p>
             </div> 
             : null}
             {mensajecorrecto && mostrarMensajeCorrecto()}
            
              <input type="submit" className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900' value='Crear Nueva Cuenta'/>
              </form>
              </div>

          
            </div>
            </Layouts>
        </>
    )
}

export default nuevacuenta
