import { HomeClient } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function Home() {
  const sessionData = await getServerSession(authOptions)

  if (!sessionData) {
    return <div className="flex flex-row justify-center items-center mt-4">
      <p>Please Login Here</p>
      <Link href={`${process.env.NEXTJS_URL}/api/auth/signin`}>
        <p className="text-blue-600 hover:text-blue-700 cursor-pointer">SignIn</p>
      </Link>
    </div>
  }
    
    let mygames ;
  try {
        let email=sessionData?.user?.email
        let res = await fetch(`https://chessmastershub.vercel.app/api/getusergames`,{
        // let res = await fetch(`http://localhost:8000//api/getusergames`,{
          method:'POST',
          headers:{
            'Access-Control-Allow-Origin': '*',
            Accept:"application/json",
            "Content-Type":"application/json"
          },
          credentials:'include',
          body:JSON.stringify({
            email 
          })
        })
        if(res.status !== 200) {
          console.log('serverside error');
          return ;      
        }
        let data = await res.json()  
        mygames = data.games
      } catch (error) {
        console.log('error in fetching usergames at server', error);
        return 
      }
    return (
      <HomeClient mygames = {mygames} sessionData = {sessionData} />
    )
}
