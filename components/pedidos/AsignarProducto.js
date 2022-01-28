import React,{useEffect,useState,useContext} from 'react';
import Select from 'react-select'
import {gql,useQuery} from '@apollo/client'
import PedidoContext from '../../context/pedidos/PedidoContext';

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
const AsignarProducto =() => {
    const [productos, setProductos] = useState([]);
const {data,loading,error} = useQuery(OBTENER_PRODUCTOS)
const productoContext = useContext(PedidoContext)
const {agregarProducto} =productoContext;
useEffect(() => {
    agregarProducto(productos)
  console.log(productos)
}, [productos]);


console.log(data)

const seleccionarProducto= productos =>{
    setProductos(productos)
console.log(productos)
}

if(loading) return null

const {obtenerProductos} = data;
  return (
    <>
    <p className='mt-2'>Asigna un Producto para el pedido</p>
    <Select
     options={obtenerProductos}
   onChange={opcion=>seleccionarProducto(opcion)}
   getOptionValue={(opciones)=> opciones.id}
   getOptionLabel={(opciones)=> opciones.nombre}
  placeholder='Seleccione su Producto'
  isMulti={true}
  noOptionsMessage={()=>'No Hay Resultados'}
    />
  </>
  )
}

export default AsignarProducto;
