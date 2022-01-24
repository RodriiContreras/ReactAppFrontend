import React from 'react';
import {useRouter} from 'next/router'
import Layouts from '../../components/layouts';
import {useQuery,gql,useMutation} from '@apollo/client'
import {Formik} from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2';

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

const ACTUALIZAR_CLIENTE = gql`
mutation actualizarCliente($id:ID!,$input:ClienteInput){
  actualizarCliente(id:$id,input:$input){
    nombre
    apellido
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

    const [actualizarCliente] = useMutation(ACTUALIZAR_CLIENTE);
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
  if(loading) return 'Cargandooo....';

  const infoCliente = async valores =>{
   const {nombre,apellido,empresa,email,telefono} = valores;
   try {
      const {data} = await actualizarCliente({
        variables:{
          id,
          input:{
            nombre,
            apellido,
            empresa,
            email,
            telefono
          }}
      })
      console.log(data)
      Swal.fire(
        'Editado!',
        `Su cliente ha sido editado exitosamente`,
        'success'
      )
      router.push('/')
      
   } catch (error) {
     console.log(error)
   }
  }

  const {obtenerCliente} = data;
  console.log(data)
  console.log(obtenerCliente)
  return(
     <Layouts>
         <h1 className="text-2xl text-gray-800 font-light">Editar Clientes</h1>

    <div className='flex justify-center mt-5'>
      <div className='w-full max-w-lg'>
        <Formik
         initialValues={obtenerCliente}
          validationSchema={schemaValidacion}
           enableReinitialize={obtenerCliente}
            onSubmit={(valores,funciones)=>{
            infoCliente(valores)
        }}> 
         {props => (
       <form className='bg-white shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={props.handleSubmit} >
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
               value={props.values.nombre}
               onChange={props.handleChange}/>
       </div>


       <div className='mb-4'>
         <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='apellido'>
          Apellido
         </label>
         <input
         className='shadow appearance-none border rounded w-full py-2 p-x3 text-gray-700 
         leading-tight focus:outline-none focus:shadow-outline'
         id='apellido'
         value={props.values.apellido}
        onChange={props.handleChange}
         type='text'
         placeholder='Apellido'

         />
       </div>

       <div className='mb-4'>
         <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='empresa'>
          Empresa
         </label>
         <input className='shadow appearance-none border rounded w-full py-2 p-x3 text-gray-700 
               leading-tight focus:outline-none focus:shadow-outline'
                id='empresa' type='text'  value={props.values.empresa}  onChange={props.handleChange} placeholder='Empresa'
                />
       </div>

       <div className='mb-4'>
         <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
          Email
         </label>
         <input className='shadow appearance-none border rounded w-full py-2 p-x3 text-gray-700 
               leading-tight focus:outline-none focus:shadow-outline'
                id='email' type='email'value={props.values.email} onChange={props.handleChange} placeholder='Email'
                /> 
       </div>

       <div className='mb-4'>
         <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='telefono'>
          Telefono ( NO es obligatorio)
         </label>
         <input className='shadow appearance-none border rounded w-full py-2 p-x3 text-gray-700 
               leading-tight focus:outline-none focus:shadow-outline'
              id='telefono' type='text' value={props.values.telefono}  onChange={props.handleChange} placeholder='Telefono'
              />
       </div>
       <input className='bg-violet-600 w-full mt-5 p-2 text-white uppercase font-bold' type='submit' value='Editar Cliente'/>



     </form>
         )}
        </Formik>
      </div>
    </div>

     </Layouts>
  );
}

export default editarCliente;
