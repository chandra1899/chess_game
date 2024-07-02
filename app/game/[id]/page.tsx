import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { GameClient, NotFound } from "@/components";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Game({params} : {params : { id : string}}) {
  const sessionData = await getServerSession(authOptions)

  if (!sessionData) {
    return <div className="flex flex-row justify-center items-center mt-4">
      <p>Please Login Here</p>
      <Link href={`${process.env.NEXTJS_URL}/api/auth/signin`}>
        <p className="text-blue-600 hover:text-blue-700 cursor-pointer">SignIn</p>
      </Link>
    </div>
  }
  const roomName = params.id
  let initialCheckForWhiteSide ;
  try {
        let email=sessionData?.user?.email
        let res = await fetch(`https://chessmastershub.vercel.app/api/groupCreatedBy`,{
        // let res = await fetch(`http://localhost:8000/api/groupCreatedBy`,{
          method:'POST',
          headers:{
            'Access-Control-Allow-Origin': '*',
            Accept:"application/json",
            "Content-Type":"application/json"
          },
          credentials:'include',
          body:JSON.stringify({
            email,roomName 
          })
        })
        if(res.status !== 200) {
          console.log('serverside error');
          return ;      
        }
        initialCheckForWhiteSide = await res.json()  
      } catch (error) {
        console.log('error in fetching initialCheckForWhiteSide at server', error);
        return 
      }
  let initialMessages ;
  try {
        let res = await fetch(`https://chessmastershub.vercel.app/api/getmessages`,{
        // let res = await fetch(`http://localhost:8000/api/getmessages`,{
          method:'POST',
          headers:{
            'Access-Control-Allow-Origin': '*',
            Accept:"application/json",
            "Content-Type":"application/json"
          },
          credentials:'include',
          body:JSON.stringify({
            roomName 
          })
        })
        if(res.status !== 200) {
          console.log('serverside error');
          return ;      
        }
        initialMessages = await res.json() 
      } catch (error) {
        console.log('error in fetching initialMessages at server', error);
        return 
      }
  let initialHistory ;
  try {
        let res = await fetch(`https://chessmastershub.vercel.app/api/gethistory`,{
        // let res = await fetch(`http://localhost:8000/api/gethistory`,{
          method:'POST',
          headers:{
            'Access-Control-Allow-Origin': '*',
            Accept:"application/json",
            "Content-Type":"application/json"
          },
          credentials:'include',
          body:JSON.stringify({
            roomName 
          })
        })
        if(res.status !== 200) {
          console.log('serverside error');
          return ;      
        }
        initialHistory = await res.json()    
      } catch (error) {
        console.log('error in fetching initialHistory at server', error);
        return 
      }

  return (
    <GameClient initialCheckForWhiteSide = {initialCheckForWhiteSide} initialMessages = {initialMessages} initialHistory = {initialHistory} sessionData = {sessionData} />
  )
}
