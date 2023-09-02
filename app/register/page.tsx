import { Authenticate, RetgisterForm, GoogleLogin } from '@/components'

export default function Home() {
  return (
    <main className='relative flex justify-center items-center'>
    <Authenticate/>
    <div className='flex flex-col absolute '>
    <GoogleLogin/>
    <RetgisterForm/>
    </div>
  </main>
  )
}
