import React,{useReducer} from 'react'
import PedidoContext from './PedidoContext'
import PedidoReducer from './PedidoReducer'

import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTOS
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

 const agregarProducto = productos =>{
    dispatch({
        type:SELECCIONAR_PRODUCTO,
        payload:productos
    })
}
    return( 
     <PedidoContext.Provider value={{productos:state.productos,agregarCliente,agregarProducto}}>
     {children}
     </PedidoContext.Provider>
    )
}

export default PedidoState