import React from 'react'
import Layouts from '../components/layouts'
import Link from 'next/link'
function Pedidos() {
    return (
        <div>
        <Layouts>
            <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>

            <Link href='/nuevopedido'>
            <a className="bg-black py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-500">Nuevo Pedido</a>
            </Link>
         </Layouts>
        </div>
    )
}

export default Pedidos
