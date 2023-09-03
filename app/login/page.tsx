import { Authenticate, GoogleLogin, LoginForm } from '@/components'
import {getServerSession} from "next-auth"
import {redirect} from "next/navigation"
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function Home() {
  const session=await getServerSession(authOptions)

  if(session) redirect('/')
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
