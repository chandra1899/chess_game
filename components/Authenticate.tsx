import Image from 'next/image'
import { GoogleLogin } from '.'

export default function Authenticate(){
    return <div className="h-[100vh] w-[100vw]">
        <Image
            fill
            className='z-[-1]'
            // quality={25} // {number 1-100}
            src="/chess_bg.jpg"
            alt="chess background"
    />    
    </div>
}