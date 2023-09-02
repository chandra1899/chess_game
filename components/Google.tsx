import Image from 'next/image'

export default function Google(){
    return <div className="h-[50px] w-[300px] my-5 flex justify-center rounded-lg items-center bg-black">
        <Image
            height={100}
             width={100}
            src="/google_text.png"
            alt="google login text"
    />
    </div>
}