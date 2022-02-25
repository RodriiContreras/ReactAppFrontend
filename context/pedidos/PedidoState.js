import React,{useReducer} from 'react'
import PedidoContext from './PedidoContext'
import PedidoReducer from './PedidoReducer'

import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTOS,
    ACTUALIZAR_TOTAL
} from '../../types/index'

const PedidoState =({children})=>{
    const initialState= {
        cliente:{},
        productos:[],
        total:0
    }
    const [state,dispatch] =  useReducer(PedidoReducer,initialState);
  
    const agregarCliente = cliente=>{
 dispatch({
     type:SELECCIONAR_CLIENTE,
     payload: cliente  //lo que se le pasa al state para modificar o agregar algo nuevo
 })
    }

 const agregarProducto = productoSeleccionados =>{
    let nuevoState ;
    if(state.productos.length > 0 ){
        nuevoState = productoSeleccionados.map(productos=>{
            const objetoNuevo = state.productos.find(productoState => productoState.id === productos.id);
            return{...productos,...objetoNuevo}
        })
    }else{
        nuevoState=productoSeleccionados;
    }
    dispatch({
        type:SELECCIONAR_PRODUCTO,
        payload:nuevoState
    })
}
const cantidadProductos = nuevoProducto =>{
    dispatch({
        type:CANTIDAD_PRODUCTOS,
        payload:nuevoProducto
    })
}
const actualizarTotal = ()=>{
   dispatch({
       type:ACTUALIZAR_TOTAL
   })
}
    return( 
     <PedidoContext.Provider value={
         {productos:state.productos
         ,cantidadProductos,
         agregarCliente,
         agregarProducto,
         actualizarTotal,
         total:state.total,
         cliente:state.cliente
         
         }}>
     {children}
     </PedidoContext.Provider>
    )
}

export default PedidoState