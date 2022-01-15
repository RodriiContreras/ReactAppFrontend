import React from 'react'
import Head from 'next/head';
import SideBar from './SideBar';
import {useRouter} from 'next/router'


function Layouts({children}) {
    const router = useRouter();
    console.log(router.pathname)
    return (
        <>
        <Head>
            <title>Proyecto React Avanzado</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <script src="https://cdn.tailwindcss.com"></script>
        </Head>

      {router.pathname === '/login' || router.pathname ==='/nuevacuenta' ? (
          <div className='bg-violet-600 min-h-screen flex flex-col justify-center'>
              <div>
              {children}
              </div>
          </div>
      ) : (
   <div className='bg-gray-200 min-h-screen'>
       <div className='flex min-h-screen'>
             <SideBar/>
             <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-10">
             {children}
             </main>
         </div>
     </div>
      )}    
 
      
        </>
    )
}

export default Layouts;
