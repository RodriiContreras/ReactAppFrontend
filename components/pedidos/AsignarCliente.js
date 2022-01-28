import React,{useState,useEffect,useContext} from 'react';
import Select from 'react-select'
import { gql,useQuery } from '@apollo/client';
import PedidoContext from '../../context/pedidos/PedidoContext';

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
   

const  AsignarCliente =() => {

    const [clientes, setClientes] = useState([]);

    const pedidoContext = useContext(PedidoContext)

     const {agregarCliente} = pedidoContext

    const {data,loading,error} = useQuery(OBTENER_CLIENTES_USUARIO)

    useEffect(() => {
      agregarCliente(clientes)
    }, [clientes]);

    const seleccionarCliente=clientes=>{
        setClientes(clientes);
    }

    if(loading) return null
    
     const {obtenerClientesVendedor} = data;

  return(
      <>

      <p className='mt-5'>Asigna un Cliente para el pedido</p>
    <Select
    options={obtenerClientesVendedor}
  onChange={opcion=>seleccionarCliente(opcion)}
  getOptionValue={(opciones)=> opciones.id}
  getOptionLabel={(opciones)=> opciones.nombre + ' ' + opciones.apellido}
  placeholder='Seleccione su producto'
  noOptionsMessage={()=>'No Hay Resultados'}
    />
  </>
)
}

export default AsignarCliente;
