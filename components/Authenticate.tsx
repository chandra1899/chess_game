import Image from 'next/image'
import { GoogleLogin } from '.'

export default function Authenticate(){
    return <div className="h-[100vh] w-[100vw]">
        <div className='absolute h-[100vh] w-[100vw] bg-slate-500 opacity-50'></div>
        <Image
            fill
            className='z-[-2]'
            // quality={25} // {number 1-100}
            src="/chess_bg.jpg"
            alt="chess background"
    />    
    </div>
}