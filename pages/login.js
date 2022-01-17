import React from 'react'
import { useState } from 'react'
import Layouts from '../components/layouts'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {gql,useMutation} from '@apollo/client'
import { useRouter } from 'next/router'


const AUTENTICAR_CUENTA = gql`
mutation autenticacionUsuario($input:AutenticarInput){
    autenticacionUsuario(input:$input) {
      token
    }
  }
`
function login() {// px-8 = PADDING DERECHA IZQUIERDA , ROUNDED HACE EL EFECTO DE BORDER-RADIUS, 
    const [mensaje, guardarMensaje] = useState(null)
    const router = useRouter();
    const [autenticacionUsuario]  = useMutation(AUTENTICAR_CUENTA)
    const formik = useFormik({
          initialValues:{
              email:'',
              password:''
          },
          validationSchema:Yup.object({
              email:Yup.string().email('El E-Mail no es valido').required('El E-Mail es obligatorio'),
              password:Yup.string().required('La Contraseña es obligatoria')
          }),
          onSubmit: async valores=>{
              const {email,password} = valores;
            try { //{data} obtendria el return de la funcion
                const {data} = await autenticacionUsuario({
                    variables:{
                        input:{
                            email,
                            password
                        }
                    }
                });
               const {token} = data.autenticacionUsuario;
               localStorage.setItem('token',token);
               setTimeout(() => {
                   router.push('/')
               }, 1500);
            } catch (error) {
                guardarMensaje(error.message)
            }
          }
    });
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
            <h1 className='text-center text-2xl font-light text-white'>Login</h1>
            <div className='flex justify-center mt-5'>
              <div className='w-full max-w-sm'>
              <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
            <div>
                <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='email'>
                    Email
                </label>
                    <input className='shadow appearance-none border rounded w-full py-2 p-x3 text-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline'
                     id='email' type='email' placeholder='Email' onChange={formik.handleChange} value={formik.values.email}  onBlur={formik.handleBlur}
                     />
            </div>
            {formik.errors.email ?
             <div className='my-2 bg-red-100 border-l-8 border-red-500 text-red-700 p-4'>  
                 <p className='font-bold'>{formik.errors.email}</p>
             </div> 
             : null}
            <div className='pt-5'>
                <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='password '>
                    Contraseña
                </label>
                    <input className='shadow appearance-none border rounded w-full py-2 p-x3 text-gray-700
                    leading-tight focus:outline-none focus:shadow-outline' id='password' type='password'
                     placeholder='Contraseña'
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.password} />
            </div>
            {formik.errors.password ?
             <div className='my-2 bg-red-100 border-l-8 border-red-500 text-red-700 p-4'>  
                 <p className='font-bold'>{formik.errors.password}</p>
             </div> 
             : null}
                {mensaje && mostrarMensaje()}
              <input type="submit" className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900' value='Iniciar Sesion'/>
              </form>
              </div>

          
            </div>
            </Layouts>
        </>
    )
}

export default login
