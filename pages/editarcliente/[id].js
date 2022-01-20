import React from 'react';
import {useRouter} from 'next/router'
import Layouts from '../../components/layouts';
import {useQuery,gql} from '@apollo/client'
import {Formik} from 'formik'
import * as Yup from 'yup'

const OBTENER_CLIENTE = gql`
query obtenerCliente($id:ID!){
  obtenerCliente(id:$id){
    id
    empresa
    telefono
    apellido
    nombre
    email
  }
}
`
function editarCliente() {

    const router = useRouter();
    const {query:{id}} = router;


    const {data,loading,error} = useQuery(OBTENER_CLIENTE,{
      variables:{
        id
      }
    });
    const schemaValidacion=Yup.object({

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

    });
    console.log(data)
  if(loading) return 'Cargandooo....';

  return(
     <Layouts>
         <h1 className="text-2xl text-gray-800 font-light">Editar Clientes</h1>

    <div className='flex justify-center mt-5'>
      <div className='w-full max-w-lg'>
        <Formik validationSchema={schemaValidacion}>
          {props =>{
            console.log(props);

            return(

          <form className='bg-white shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={props.handleSubmit}>
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
                    //  value={formik.values.nombre}
                     onChange={props.handleChange}
                     onBlur={props.handleBlur}
                    /></div>

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
            //   value={props.values.apellido}
               onChange={props.handleChange}
               onBlur={props.handleBlur}
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='empresa'>
               Empresa
              </label>
              <input className='shadow appearance-none border rounded w-full py-2 p-x3 text-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline'
                     id='empresa' type='text' placeholder='Empresa'
                    //  value={props..values.empresa}
                     onChange={props.handleChange}
                      onBlur={props.handleBlur}
                     />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
               Email
              </label>
              <input className='shadow appearance-none border rounded w-full py-2 p-x3 text-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline'
                     id='email' type='email' placeholder='Email'
                    //  value={props..values.email}
                     onChange={props.handleChange} onBlur={props.handleBlur}
                     />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='telefono'>
               Telefono ( NO es obligatorio)
              </label>
              <input className='shadow appearance-none border rounded w-full py-2 p-x3 text-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline'
                   id='telefono' type='text' placeholder='Telefono'
                //    value={props..values.telefono}
                 onChange={props.handleChange}
                  onBlur={props.handleBlur}
                   />
            </div>

            <input className='bg-violet-600 w-full mt-5 p-2 text-white uppercase font-bold' type='submit' value='Registrar Cliente'/>



          </form>
                 )}}
        </Formik>
      </div>
    </div>

     </Layouts>
  );
}

export default editarCliente;
