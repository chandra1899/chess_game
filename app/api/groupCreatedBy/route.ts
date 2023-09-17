import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import GroupCreatedBy from '@/models/groupCreatedBy'

export async function POST(req:Request){
    try {
        const {email,roomName}=await req.json()
        
        let isWhiteSide=true
        await connectMongoDB()
        let existRoomName=await GroupCreatedBy.findOne({roomName})

        if(!existRoomName){
        await GroupCreatedBy.create({
          email,roomName
        })
        //set isWhiteSIde true
      }else{
        if(existRoomName.email!==email){
            isWhiteSide=false
        }
      }    
        return NextResponse.json({isWhiteSide},{status:200})
    } catch (error) {
        return NextResponse.json({message:'server error'},{status:500})
    }
}