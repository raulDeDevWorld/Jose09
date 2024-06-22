'use client';

import Link from 'next/link'
import "animate.css/animate.compat.css"



const Button = ({ url, children, src }) => {
    return <button className='bg-[#ffbd2f] w-[150px] sm:w-[200px] lg:w-[250px] flex flex-col justify-self-center justify-center items-center  p-2 rounded-[5px]  m-3'>
        <img src={src} className='w-[100px]' alt="" />
        <Link href={`/Admin/Cotizador/Section?item=${url}`} className='font-medium'> {children}</Link>
    </button>
}
export default function Home() {

    return (
        <div className="relative min-h-full"
            style={{
                backgroundImage: 'url(/gif.gif)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover'
            }}>
            <img src="/airplane-bg.jpg" className='fixed top-0 w-screen h-screen  object-cover ' alt="" />
            <div className='relative  py-[100px]  lg:pb-[100px] h-screen flex flex-col justify-center z-10 '>
                <div className='hidden lg:flex justify-center'>
                    <img src="/logo.svg" className='w-[20vw]' alt="User" />
                </div>
                <div className='relative   z-10  grid grid-cols-2 '>
                    <Button url='FTL' src="/icons/FTL.png" >Cotizador FTL  </Button>
                    <Button url='FCL' src="/icons/FCL.png" > Cotizador FCL  </Button>
                </div>
            </div>
        </div>
    )
}
