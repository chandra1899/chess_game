import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import GroupCreatedBy from '@/models/groupCreatedBy'
import BoardState from '@/models/boardState'
import { z } from "zod"

const inputTypes = z.object({
    email : z.string().email(),
    roomName : z.string()
})

export async function POST(req:Request){
    try {
      const body = await req.json()
        const parsedInput = inputTypes.safeParse(body)
        if(!parsedInput.success){
            return NextResponse.json({message:parsedInput.error},{status:411})
        }

        let turn='white'
        let isWhiteSide=true
        await connectMongoDB()
        let existRoomName=await GroupCreatedBy.findOne({roomName : parsedInput.data.roomName})

        if(!existRoomName){
        await GroupCreatedBy.create({
          email : parsedInput.data.email,
          roomName : parsedInput.data.roomName
        })
        //set isWhiteSIde true
      }else{
        let grphistory=await BoardState.find({roomName : parsedInput.data.roomName}).sort('-createdAt')
        
        if(grphistory&& grphistory[0] && grphistory[0].isWhiteSide){
          turn='black'
        }
        if(existRoomName.email!==parsedInput.data.email){
            isWhiteSide=false
        }
      }    
        return NextResponse.json({isWhiteSide,turn},{status:200})
    } catch (error) {
      console.log(error);
      
        return NextResponse.json({message:'server error'},{status:500})
    }
}