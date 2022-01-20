import Layouts from "../components/layouts";
import {gql,useQuery} from '@apollo/client'
import { useRouter } from "next/router";
import Link from "next/link";
import Cliente from "../components/Cliente";


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
 const Home=  () => {
     const router= useRouter();

    //consulta apollo
  const {data ,loading,error}=useQuery(OBTENER_CLIENTES_USUARIO);
  console.log(data)
  console.log(loading)

  if(loading) return 'Cargandooo...';

  
  

  if(!data.obtenerClientesVendedor){ 
    router.push('/login')
    return null
  }


  return (
   <div>
     <Layouts>
    
        <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
        <Link href='/nuevocliente'>
        <a className="bg-black py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-500">Nuevo Cliente</a>
        </Link>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
         <thead className="bg-gray-800">
           <tr className="text-white">
             <th className="w-1/5 py-2">Nombre</th>
             <th className="w-1/5 py-2">Empresa</th>
             <th className="w-1/5 py-2">Email</th>
             <th className="w-1/5 py-2">Eliminar</th>
             <th className="w-1/5 py-2">Editar</th>
           </tr>
         </thead>
         <tbody className="bg-white">

          {data.obtenerClientesVendedor.map(cliente=>(
           <Cliente key={cliente.id} cliente={cliente}/>
          ))}
         </tbody >

       </table>
  

     </Layouts>
   </div>
  )
}
export default Home;