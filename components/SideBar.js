import React from 'react'
import Link from 'next/link'
import  {useRouter} from 'next/router'

function SideBar() {
    const router = useRouter();
    return (//al ponerle paramametros en el classname,puedo hacer que el div tome el espacio en base a la pantalla para small va a ser 1/3 y XL (grande) seria de 1/5
  <aside className="bg-violet-500 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div >
          <p className=" text-2xl font-light text-white	">Administrados de clientes y pedidos</p>
      </div>
      <nav className='mt-5 list-none'>
          <li className={router.pathname === '/productos' ? 'bg-indigo-300 p-2' : 'p-2'}>
       <Link
        href='/productos'>
            <a className='text-white mb-2 block p-3'>Productos</a>
       </Link>
       </li>
       <li className={router.pathname=== '/pedidos' ? 'bg-indigo-300 p-2' : 'p-2'}>
       <Link href='/pedidos'>
       <a className='text-white mb-2 block p-3'>Pedidos</a>
       </Link> 
       </li> 
       <li className={router.pathname=== '/' ? 'bg-indigo-300 p-2' : 'p-2'}>
       <Link href='/'>
       <a className='text-white mb-2 block p-3'>Clientes</a>
       </Link> 
       </li> 
      </nav>


  </aside>
    )
}

export default SideBar
