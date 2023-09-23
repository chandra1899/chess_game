import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import GroupCreatedBy from '@/models/groupCreatedBy'
import BoardState from '@/models/boardState'

export async function POST(req:Request){
    try {
        const {email,roomName}=await req.json()
        let turn='white'
        let isWhiteSide=true
        await connectMongoDB()
        let existRoomName=await GroupCreatedBy.findOne({roomName})

        if(!existRoomName){
        await GroupCreatedBy.create({
          email,roomName
        })
        //set isWhiteSIde true
      }else{
        let grphistory=await BoardState.find({roomName}).sort('-createdAt')
        console.log(grphistory);
        
        if(grphistory && grphistory[0].isWhiteSide){
          turn='black'
        }
        if(existRoomName.email!==email){
            isWhiteSide=false
        }
      }    
        return NextResponse.json({isWhiteSide,turn},{status:200})
    } catch (error) {
        return NextResponse.json({message:'server error'},{status:500})
    }
}