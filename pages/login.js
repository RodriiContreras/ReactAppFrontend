import React from 'react'
import Layouts from '../components/layouts'


function login() {// px-8 = PADDING DERECHA IZQUIERDA , ROUNDED HACE EL EFECTO DE BORDER-RADIUS, 
    return (
        <>
            <Layouts>
            <h1 className='text-center text-2xl font-light text-white'>Login</h1>
            <div className='flex justify-center mt-5'>
              <div className='w-full max-w-sm'>
              <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
            <div>
                <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='email'>
                    Email
                </label>
                    <input className='shadow appearance-none border rounded w-full py-2 p-x3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='email' type='email' placeholder='Email'/>
            </div>
            <div className='pt-5'>
                <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='contraseña'>
                    Contraseña
                </label>
                    <input className='shadow appearance-none border rounded w-full py-2 p-x3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='contraseña' type='contraseña' placeholder='Contraseña'/>
            </div>
            
              <input type="submit" className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900' value='Iniciar Sesion'/>
              </form>
              </div>

          
            </div>
            </Layouts>
        </>
    )
}

export default login
