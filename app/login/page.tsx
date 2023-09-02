import { Authenticate, GoogleLogin, LoginForm } from '@/components'

export default function Home() {
  return (
    <main className='relative flex justify-center items-center'>
      <Authenticate/>
      <div className='flex flex-col absolute '>
      <GoogleLogin/>
      <LoginForm/>
      </div>
    </main>
  )
}
